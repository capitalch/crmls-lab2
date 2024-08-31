import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {getGeneralSettingsTypes} from "../../adapters";
import {RootState} from "../../app/store";

export interface settingTypeType {
    id: number,
    name: string,
    description: string,
    actionRequired: number,
    accessLevel: number,
    settingInputTypeId: number,
    createdBy: string,
    createdOn: string,
    modifiedBy: string,
    modifiedOn: string,
}

// this is the entity adapter for the slice, gives us default selectors / actions and init state
export const settingTypeAdapter = createEntityAdapter<settingTypeType>();
const initialState = settingTypeAdapter.getInitialState();

export const {
    selectById: selectSettingTypeById,
    selectIds: selectSettingTypeIds,
    selectEntities: selectSettingTypeEntities,
    selectAll: selectAllSettingTypes,
    selectTotal: selectTotalSettingTypes,
} = settingTypeAdapter.getSelectors((state: RootState) => state.settingsTypes)

export const fetchAllTypes = createAsyncThunk(
    'settingTypeType/fetchAllTypes',
    async () => {
        const response = await getGeneralSettingsTypes();
        return response.data.results;
    })

export const settingTypeSlice = createSlice({
    name: 'settingType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTypes.fulfilled, settingTypeAdapter.upsertMany)
    }
});

export default settingTypeSlice.reducer;