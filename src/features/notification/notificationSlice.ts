<<<<<<< HEAD
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {isRejectedAction} from "../../adapters";

export interface NotificationState {
    show: boolean,
    status: 'info' | 'warn' | 'error' | 'success' | 'delete' | 'promote' | 'cancel',
    title: string,
    message: string,
    position: 'dash' | 'popover' | 'modal',
    autoHide: number | false,
    confirm: boolean, // TODO: maybe build option to track acknowledgement of message?
    notificationId: string | null
}

const initialState: NotificationState = {
    show: false,
    status: 'info',
    title: '',
    message: '',
    position: 'popover',
    autoHide: false,
    confirm: false,
    notificationId: null
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        show: (state, action: PayloadAction<NotificationState>) => {
            state.show = true;
            state.status = action.payload.status;
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.position = action.payload.position;
            state.autoHide = action.payload.autoHide;
            state.confirm = action.payload.confirm;
            state.notificationId = action.payload.notificationId;
        },
        hide: (state) => {
            state.show = false;
        },
        toggle: (state) => {
            state.show = !state.show;
        },
    },
    extraReducers: (builder) => {
        builder
            // hopefully this will apply to any failed request
            .addMatcher(isRejectedAction, (state, action) => {
                    state.show = true;
                    state.status = 'error';
                    state.title = 'Request Failed';
                    state.message = action.error.message;
                    state.position = 'popover';
                    state.autoHide = false;
                    state.confirm = false;
                    state.notificationId = null;
            })
    }
});

const { actions, reducer } = notificationSlice;
export const { show, hide, toggle } = actions;
export const selectNotification = (state: RootState) => state.notification;
=======
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { isRejectedAction } from "../../adapters";

export interface NotificationState {
	show: boolean;
	status: "info" | "warn" | "error" | "success" | "delete" | "promote" | "cancel";
	title: string;
	message: string;
	position: "dash" | "popover" | "modal" | "simpleModal";
	autoHide: number | false;
	confirm: boolean; // TODO: maybe build option to track acknowledgement of message?
	notificationId: string | null;
	viewEula?: boolean;
}

const initialState: NotificationState = {
	show: false,
	status: "info",
	title: "",
	message: "",
	position: "popover",
	autoHide: false,
	confirm: false,
	notificationId: null,
	viewEula: false,
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		show: (state, action: PayloadAction<NotificationState>) => {
			state.show = true;
			state.status = action.payload.status;
			state.title = action.payload.title;
			state.message = action.payload.message;
			state.position = action.payload.position;
			state.autoHide = action.payload.autoHide;
			state.confirm = action.payload.confirm;
			state.notificationId = action.payload.notificationId;
		},
		hide: (state) => {
			state.show = false;
		},
		toggle: (state) => {
			state.show = !state.show;
		},
		toggleViewEula: (state) => {
			state.viewEula = !state.viewEula;
		},
	},
	extraReducers: (builder) => {
		// this is causing unnecessary toast errors on system notification interval requests
		// commenting out until the back end consistently returns a 200
		// builder
		//     // hopefully this will apply to any failed request
		//     .addMatcher(isRejectedAction, (state, action) => {
		//             state.show = true;
		//             state.status = 'error';
		//             state.title = 'Request Failed';
		//             state.message = action.error.message;
		//             state.position = 'popover';
		//             state.autoHide = false;
		//             state.confirm = false;
		//             state.notificationId = null;
		//     })
	},
});

const { actions, reducer } = notificationSlice;
export const { show, hide, toggle, toggleViewEula } = actions;
export const selectNotification = (state: RootState) => state.notification;
export const selectViewEula = (state: RootState) => state.notification.viewEula;
>>>>>>> dev-1
export default reducer;
