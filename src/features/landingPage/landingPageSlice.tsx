import {createSlice} from "@reduxjs/toolkit";

export interface notice {
    id: string,
    title: string,
    message: string,
    acknowledged: boolean,
}

export interface appPrefs {
    id: string,
    appId: string,
    order: number,
    show: boolean,
}

export interface landingPageSettings {
    notices: notice[],
    appPrefs: appPrefs[],
}

const initialState: landingPageSettings = {
    notices: [],
    appPrefs: [],
};

export const landingPageSlice = createSlice({
    name: 'landingPage',
    initialState,
    reducers: {
        ackNotification: (state, action) => {
            let notification = state.notices.find((n) => n.id === action.payload.id);
            if (notification) {
                notification.acknowledged = true;
            }
        }
    },
    extraReducers: (builder) => {

    }
});

export default landingPageSlice.reducer;