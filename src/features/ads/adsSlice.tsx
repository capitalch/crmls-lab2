import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { isPendingAction, isRejectedAction, mace_url } from "../../adapters";

export const AdsAdapter = createEntityAdapter<any>({
	selectId: (ad) => ad.id
});

const initialState = AdsAdapter.getInitialState({
	status: "idle",
	error: "",
	entities: {},
});

export const fetchAllAds = createAsyncThunk("notifications/fetchAllAds", async (thunkAPI) => {
	const response = await axios.get(mace_url + "api/app/GenericAds").catch(function (error) {
		if (error.response) {
			console.error("Generic Ads error: ", error);
		}
	});

	if (response) {
		return response.data.results;
	} else {
		// Fallback object in case generic ads call fails
		return [
			{
				providerName: "ads-error",
				isEnabled: true,
				impressions: [
					{ isEnabled: true, tagName: "dashboard-billboard", isScript: false, template: '<img src="https://cdn.crmls.org/operations/files/RE Target/REcenterhub-RE-Target-Ads_1200x140.jpg" alt="Billboard Ad" />' },
					{ isEnabled: true, tagName: "spotlight-ad", isScript: false, template: '<img src="https://cdn.crmls.org/operations/files/RE Target/REcenterhub-RE-Target-Ads_350x350.jpg" alt="Billboard Ad" />' },
					{ isEnabled: true, tagName: "article-ad", isScript: false, template: '<img src="https://cdn.crmls.org/operations/files/RE Target/REcenterhub-RE-Target-Ads_350x350.jpg" alt="Billboard Ad" />' },
					{ isEnabled: true, tagName: "carousel-ad", isScript: false, template: '<img src="https://cdn.crmls.org/operations/files/RE Target/REcenterhub-RE-Target-Ads_350x110.jpg" alt="Billboard Ad" />' },
				],
			},
		];
	}
});

export const adsSlice = createSlice({
	name: "ads",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllAds.fulfilled, (state, action) => {
				state.status = "idle";
				AdsAdapter.setAll(state, action.payload);
			})
			.addMatcher(isPendingAction, (state, action) => {
				state.status = "loading";
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.status = "idle";
				state.error = "Ads - An error has occurred.";
				console.log(action);
			});
	},
});

export const { selectById: selectAdById, selectIds: selectAdIds, selectEntities: selectAdEntities, selectAll: selectAllAds } = AdsAdapter.getSelectors((state: RootState) => state.ads);
const { reducer } = adsSlice;
export default reducer;
