import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {getDerivedSettings, getGeneralSettings, member_portal_url, post} from "../../adapters";
import {RootState, store} from "../../app/store";
import {DerivedSettingEntity} from "../../util/memberPortalTypes";
import {findTypeIdFromDerivedSetting} from "./settingsHelper";

export interface settingType {
    id: string,
    memberId: string,
    shortValue: string,
    typeId: number,
    actionRequired: number,
    createdOn: string,
    modifiedOn: string,
}

// this is the entity adapter for the slice, gives us default selectors / actions and init state
export const settingsAdapter = createEntityAdapter<DerivedSettingEntity>({
    selectId: findTypeIdFromDerivedSetting,
});
const initialState = settingsAdapter.getInitialState();

export const {
    selectById: selectSettingById,
    selectIds: selectSettingIds,
    selectEntities: selectSettingEntities,
    selectAll: selectAllSettings,
    selectTotal: selectTotalSettings,
} = settingsAdapter.getSelectors((state: RootState) => state.generalSettings)

export const saveGeneralSettings = createAsyncThunk(
    'generalSettings/saveGeneralSettings',
    async () => {
        const response = await getGeneralSettings();
        return response.data.results;
    })

export const createGeneralSettings = createAsyncThunk(
    'generalSettings/createGeneralSettings',
    async (payload: any, thunkAPI) => {
        try {
            const response = await post(member_portal_url + 'api/app/MemberSettings', payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    })

// this is derived member settings!!
export const fetchGeneralSettings = createAsyncThunk(
    'generalSettings/fetchGeneralSettings',
    async (memberMlsId: string, thunkAPI) => {
        const response = await getDerivedSettings('member', memberMlsId);
        return response.data.results ?? [];
    })

export const generalSettingsSlice = createSlice({
    name: 'generalSettings',
    initialState,
    reducers: {
        insertGeneralSetting: settingsAdapter.addOne,
        updateGeneralSetting: settingsAdapter.upsertOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeneralSettings.fulfilled, settingsAdapter.setAll)
    }
});

export default generalSettingsSlice.reducer;
export const { insertGeneralSetting, updateGeneralSetting } = generalSettingsSlice.actions;

export const getSettingByTypeId = (typeId: number): DerivedSettingEntity|undefined => {
    return selectAllSettings(store.getState()).find((entity: DerivedSettingEntity) => entity.settingValue?.typeId === typeId);
}