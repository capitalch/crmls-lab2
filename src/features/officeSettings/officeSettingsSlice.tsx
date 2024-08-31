import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {getDerivedSettings} from "../../adapters";
import {RootState, store} from "../../app/store";
import {DerivedSettingEntity} from "../../util/memberPortalTypes";
import {findTypeIdFromDerivedSetting} from "../generalSettings/settingsHelper";

// this is the entity adapter for the slice, gives us default selectors / actions and init state
export const officeSettingsAdapter = createEntityAdapter<DerivedSettingEntity>({
    selectId: findTypeIdFromDerivedSetting,
});
const initialState = officeSettingsAdapter.getInitialState();

export const {
    selectById: selectOfficeSettingById,
    selectIds: selectOfficeSettingIds,
    selectEntities: selectOfficeSettingEntities,
    selectAll: selectAllOfficeSettings,
    selectTotal: selectTotalOfficeSettings,
} = officeSettingsAdapter.getSelectors((state: RootState) => state.officeSettings)

export const fetchOfficeSettings = createAsyncThunk(
    'officeSettings/fetchOfficeSettings',
    async (officeMlsId: string, thunkAPI) => {
        const response = await getDerivedSettings('office', officeMlsId);
        return response.data.results ?? [];
    })

export const officeSettingsSlice = createSlice({
    name: 'officeSettings',
    initialState,
    reducers: {
        insertOfficeSetting: officeSettingsAdapter.addOne,
        updateOfficeSetting: officeSettingsAdapter.upsertOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOfficeSettings.fulfilled, officeSettingsAdapter.setAll)
    }
});

export default officeSettingsSlice.reducer;
export const { insertOfficeSetting, updateOfficeSetting } = officeSettingsSlice.actions;

export const getOfficeSettingByTypeId = (typeId: number): DerivedSettingEntity|undefined => {
    return selectAllOfficeSettings(store.getState()).find((entity: DerivedSettingEntity) => entity.settingValue?.typeId === typeId);
}