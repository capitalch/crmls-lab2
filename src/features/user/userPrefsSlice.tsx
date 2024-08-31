import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as dot from "dot-object";
import { RootState, store } from "../../app/store";
import _ from "lodash";
import { getProfileData, put, saveProfileData } from "../../adapters";

const storageName = "mh.user.prefs";

export type Selector<S> = (state: RootState) => S;

export type prefSections = {
	// add additional sections as we go - any sections added here should be added in the defaultPrefs object
	applications: any;
	theme: any;
	dashboardSettings: any;
	memberSettings: any;
	officeSettings: any;
	productSettings: any;
	registeredListings: any;
	training: any;
	articles: any;
	notifications: any;
	systemNotifications: any;
	profile: any;
};

export const defaultPrefs = {
	applications: {
		favorites: []
	},
	theme: {
		selectedTheme: "light",
	},
	dashboardSettings: {},
	memberSettings: {},
	officeSettings: {},
	productSettings: {},
	registeredListings: {},
	training: {},
	articles: {
		read: [],
		favorites: [],
	},
	notifications: {
		archived: [],
		read: [],
	},
	systemNotifications: {
		read: [],
	},
	profile: {},
};

export type prefPayload = {
	key: string; // this should be in dot notation for the whole nested structure, eg. marketing.campaigns.selectors.campaignType
	value: any; // this can be another object, array, etc.
};

export type crmlsUserPrefs = {
	UserPrefs: prefSections;
};

// Define the initial state
const initialState: crmlsUserPrefs = {
	UserPrefs: defaultPrefs,
};

export const fetchAPIMemberPrefs = createAsyncThunk("userPrefs/fetchAPIMemberPrefs", async (memberId: string, thunkAPI) => {
	if (memberId) {
		const response = await getProfileData(memberId);
		if (response.status < 200 || response.status > 299) {
			const message = `An error has occurred: ${response.statusText}`;
			throw new Error(message);
		}

		const responseData = response.data;
		const userStoredPrefs = responseData.profileBag && !_.isEmpty(responseData.profileBag) ? responseData.profileBag : defaultPrefs;

		// Sync up default prefs and stored user prefs
		const defaultPrefsCopy = _.cloneDeep(defaultPrefs);
		const userStoredPrefsCopy = _.cloneDeep(userStoredPrefs);

		// Populate current prefs state with data from profile response
		defaultPrefsCopy.applications.favorites = responseData.favApps || [];
		defaultPrefsCopy.articles.read = responseData.articlesRead || [];
		defaultPrefsCopy.articles.favorites = responseData.favArticles || [];
		defaultPrefsCopy.notifications.read = responseData.userNotifications || [];
		defaultPrefsCopy.notifications.archived = responseData.userNotificationsArchived || [];
		defaultPrefsCopy.systemNotifications.read = responseData.systemNotificationsAcknowledged || [];
		defaultPrefsCopy.profile = responseData;

		delete userStoredPrefsCopy?.dashboard; // now stored in dashboardSettings object
		delete userStoredPrefsCopy?.applications?.view; // now stored in dashboardSettings object 
		delete userStoredPrefsCopy?.undefined; // remove any undefined keys

		const combinedPrefs = _.merge(defaultPrefsCopy, userStoredPrefsCopy);
		return combinedPrefs;
	} else {
		return defaultPrefs;
	}
});

export const saveAPIMemberPrefs = async (prefs: prefSections) => {
	// Save profile preferences back to profile endpoint (only if profile data exists)
	if (prefs.profile && !_.isEmpty(prefs.profile)) {
		const profilePayload = _.cloneDeep(prefs.profile);
		const profilePrefsCopy = _.cloneDeep(prefs);

		// Prepare profile payload with data from current state
		profilePayload.favApps = profilePrefsCopy.applications.favorites;
		profilePayload.articlesRead = profilePrefsCopy.articles.read;
		profilePayload.favArticles = profilePrefsCopy.articles.favorites;
		profilePayload.systemNotificationsAcknowledged = profilePrefsCopy.systemNotifications.read;
		profilePayload.userNotifications = profilePrefsCopy.notifications.read;
		profilePayload.userNotificationsArchived = profilePrefsCopy.notifications.archived;

		// Reset arrays and delete profile property stored in profileBag - these are populated with api response data - no need to store
		profilePrefsCopy.applications.favorites = [];
		profilePrefsCopy.articles.read = [];
		profilePrefsCopy.notifications.archived = [];
		profilePrefsCopy.notifications.read = [];
		profilePrefsCopy.systemNotifications.read = [];
		delete profilePrefsCopy.profile;

		// Set profileBag to trimmed down prefs
		profilePayload.profileBag = profilePrefsCopy;

		const response = await saveProfileData(profilePayload);
		if (response.status < 200 || response.status > 299) {
			const message = `An error has occurred: ${response.statusText}`;
			throw new Error(message);
		}
	}
};

export const userPrefsSlice = createSlice({
	name: "userPrefs",
	initialState,
	reducers: {
		setUserPrefs: (state, action: PayloadAction<prefPayload>) => {
			let currentState = { ...state.UserPrefs };
			// unset the current path or dot-object pukes
			dot.delete(action.payload.key, currentState);
			dot.str(action.payload.key, action.payload.value, currentState);
			// localStorage.setItem(storageName, JSON.stringify(currentState));
			state.UserPrefs = currentState;
			saveAPIMemberPrefs(currentState);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAPIMemberPrefs.fulfilled, (state, action) => {
			state.UserPrefs = action.payload;
		});
	},
});

export const selectPrefByPath = (path: string): any => {
	let state: RootState = store.getState();

	// loop over the settings starting from the API level settings and work down
	if (dot.pick(path, state.userPrefs.UserPrefs)) {
		return dot.pick(path, state.userPrefs.UserPrefs);
	}

	return undefined;
};

export const { setUserPrefs } = userPrefsSlice.actions;
const { reducer } = userPrefsSlice;
export default reducer;
