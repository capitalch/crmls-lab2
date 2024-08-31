import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { isPendingAction, isRejectedAction, notifications_url } from "../../adapters";
import { NotificationChangesPayload } from "./notificationTypes";

export const NotificationsAdapter = createEntityAdapter<any>({
	selectId: (notification) => notification.id,
	sortComparer: (a, b) => a.isRead - b.isRead,
});
const initialState = NotificationsAdapter.getInitialState({
	status: "idle",
	error: "",
	entities: {},
});

export const fetchAllNotifications = createAsyncThunk("notifications/fetchAllNotifications", async (memberId: string, thunkAPI) => {
	// memberId = "0a8393c1-39f4-4c93-a6ba-6f7291bf5035";
	// memberId = "5897a712-824d-401e-872b-0ee96b79809b"
	const response = await axios.post(notifications_url + "api/app/EmailRequestMessage/q", {
		pageId: 0,
		pageSize: 9999,
		criteria: [
			{
				field: "memberId",
				op: "Equal",
				values: [memberId],
			},
		],
	});
	return response.data;
});

export const markAsRead = createAsyncThunk("notifications/markAsRead", async (notificationId: any, thunkAPI) => {
	await axios.patch(notifications_url + "api/app/profileNotification/" + notificationId, { isRead: true });
	return { id: notificationId, changes: { isRead: true } };
});

export const markAsUnRead = createAsyncThunk("notifications/markAsUnRead", async (notificationId: any, thunkAPI) => {
	await axios.patch(notifications_url + "api/app/profileNotification/" + notificationId, { isRead: false });
	return { id: notificationId, changes: { isRead: false } };
});

export const deleteNotification = createAsyncThunk("notifications/deleteNotification", async (notificationId: any, thunkAPI) => {
	await axios.delete(notifications_url + "api/app/profileNotification/" + notificationId);
	return notificationId;
});

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllNotifications.fulfilled, (state, action) => {
				state.status = "idle";
				NotificationsAdapter.setAll(state, action.payload.results);
			})
			.addCase(markAsRead.fulfilled, (state, { payload }: { payload: NotificationChangesPayload }) => {
				state.status = "idle";
				NotificationsAdapter.updateOne(state, {
					id: payload.id,
					changes: payload.changes,
				});
			})
			.addCase(markAsUnRead.fulfilled, (state, { payload }: { payload: NotificationChangesPayload }) => {
				state.status = "idle";
				NotificationsAdapter.updateOne(state, {
					id: payload.id,
					changes: payload.changes,
				});
			})
			.addCase(deleteNotification.fulfilled, (state, { payload: id }) => {
				state.status = "idle";
				NotificationsAdapter.removeOne(state, id);
			})
			.addMatcher(isPendingAction, (state, action) => {
				state.status = "loading";
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.status = "idle";
				state.error = "An error has occurred.";
				console.log(action);
			});
	},
});

export const { selectById: selectNotificationById, selectIds: selectNotificationIds, selectEntities: selectNotificationEntities, selectAll: selectAllNotifications } = NotificationsAdapter.getSelectors((state: RootState) => state.notifications);

const { reducer } = notificationsSlice;
export default reducer;
