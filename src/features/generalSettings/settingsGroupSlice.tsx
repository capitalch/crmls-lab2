import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {getSettingsGroups} from "../../adapters";
import {RootState} from "../../app/store";

export interface settingGroup {
    id: number,
    name: string,
    description: string,
    order: number,
    settingTypeGroupings: any
}

// this is the entity adapter for the slice, gives us default selectors / actions and init state
export const settingGroupAdapter = createEntityAdapter<settingGroup>();
const initialState = settingGroupAdapter.getInitialState();

export const {
    selectById: selectSettingGroupById,
    selectIds: selectSettingGroupIds,
    selectEntities: selectSettingGroupEntities,
    selectAll: selectAllSettingGroups,
    selectTotal: selectTotalSettingGroups,
} = settingGroupAdapter.getSelectors((state: RootState) => state.settingsGroups)

export const fetchAllGroups = createAsyncThunk(
    'settingGroups/fetchAllGroups',
    async () => {
        const response = await getSettingsGroups();
        return response.data.results;
    })

export const settingGroupSlice = createSlice({
    name: 'settingGroup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllGroups.fulfilled, settingGroupAdapter.addMany)
    }
});

export default settingGroupSlice.reducer;