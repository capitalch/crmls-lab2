import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {getGeneralSettingsInputTypes} from "../../adapters";
import {RootState} from "../../app/store";

export interface settingsInputTypeEntity {
    id: number,
    inputStyle: string,
    dataType: string,
    description: string,
    createdBy: string,
    createdOn: string,
    modifiedBy: string,
    modifiedOn: string,
}

// this is the entity adapter for the slice, gives us default selectors / actions and init state
export const settingInputTypeAdapter = createEntityAdapter<settingsInputTypeEntity>();
const initialState = settingInputTypeAdapter.getInitialState();

export const {
    selectById: selectSettingInputTypeById,
    selectIds: selectSettingInputTypeIds,
    selectEntities: selectSettingInputTypeEntities,
    selectAll: selectAllSettingInputTypes,
    selectTotal: selectTotalSettingInputTypes,
} = settingInputTypeAdapter.getSelectors((state: RootState) => state.inputTypes)

export const fetchAllInputTypes = createAsyncThunk(
    'settingInputType/fetchAllInputTypes',
    async () => {
        const response = await getGeneralSettingsInputTypes();
        return response.data.results;
    })

export const settingInputTypeSlice = createSlice({
    name: 'settingInputType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllInputTypes.fulfilled, settingInputTypeAdapter.upsertMany)
    }
});

export default settingInputTypeSlice.reducer;