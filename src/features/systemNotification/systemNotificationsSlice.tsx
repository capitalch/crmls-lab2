import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { isPendingAction, isRejectedAction, mace_url } from "../../adapters";

export const SystemNotificationsAdapter = createEntityAdapter<any>({
	selectId: (notification) => notification.id,
	sortComparer: (a, b) => a.isRead - b.isRead
});
const initialState = SystemNotificationsAdapter.getInitialState({
	status: "idle",
	error: "",
	entities: {},
});

export const fetchAllSystemNotifications = createAsyncThunk("notifications/fetchAllSystemNotifications", async (thunkAPI) => {
	const response = await axios.get(mace_url + "api/app/SystemNotifications");
	return response.data;
});

export const systemNotificationsSlice = createSlice({
	name: "systemNotifications",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllSystemNotifications.fulfilled, (state, action) => {
				state.status = "idle";
                SystemNotificationsAdapter.setAll(state, action.payload.results);
			})
			.addMatcher(isPendingAction, (state, action) => {
				state.status = "loading";
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.status = "idle";
				state.error = "System Notifications - An error has occurred.";
				console.log(action);
			});
	},
});

export const { selectById: selectSystemNotificationById, selectIds: selectSystemNotificationIds, selectEntities: selectSystemNotificationEntities, selectAll: selectAllSystemNotifications } = SystemNotificationsAdapter.getSelectors((state: RootState) => state.systemNotifications);
const { reducer } = systemNotificationsSlice;
export default reducer;
