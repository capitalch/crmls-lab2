import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
    getAppSettings,
    changeAppSetting,
    isRejectedAction, getOfficeAppSettings
} from "../../adapters";
import {MemberAccessControlEntity} from "../../util/memberPortalTypes";

const initialState: {status: string, entities: MemberAccessControlEntity[], officeEntities: MemberAccessControlEntity[], error: Error | null} = {
    status: 'idle',
    entities: [],
    officeEntities: [],
    error: null,
};

export const fetchAllAppSettings = createAsyncThunk(
    'appSettings/fetchAllAppSettings',
    async (loginId: string, thunkAPI) => {
        const response = await getAppSettings(loginId);
        return response.data;
    }
)

export const fetchAllOfficeAppSettings = createAsyncThunk(
    'appSettings/fetchAllOfficeAppSettings',
    async (loginId: string, thunkAPI) => {
        const response = await getOfficeAppSettings(loginId);
        return response.data;
    }
)

/*
 * for the moment this is JUST handling booleans. We can adjust to accept string, lists, etc.
 */
export const updateAppSetting = createAsyncThunk(
    'appSettings/updateAppSetting',
    async ({officeId, id, value}: {officeId: string, id: string, value: boolean}, thunkAPI) => {
        const response = await changeAppSetting(officeId, id, value);
        return response.data;
    }
)

export const appSettingsSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAppSettings.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAllAppSettings.fulfilled, (state, action) => {
                state.status = 'idle';
                state.entities = action.payload.results;
            })
            .addCase(fetchAllOfficeAppSettings.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAllOfficeAppSettings.fulfilled, (state, action) => {
                state.status = 'idle';
                state.officeEntities = action.payload.results;
            })
            .addCase(updateAppSetting.fulfilled, (state, action) => {
                state.status = 'idle';
                let i = state.entities.findIndex((e: any) => e.id === action.payload.id);

                if (i) {
                    state.entities[i].accessLevel = action.payload.new_status;
                }
            })
            // hopefully this will apply to any failed / pending request
            .addMatcher(isRejectedAction, (state, action) => {
                state.error = action.error;
            })
    }
});

const { reducer } = appSettingsSlice;
export default reducer;
