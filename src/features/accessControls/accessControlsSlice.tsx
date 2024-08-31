import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {getAccessControls} from "../../adapters";
import {RootState} from "../../app/store";

export type accessControlType = {
    id: string, // the DB guid for the record
    type: 'routing'|'menu'|'both',
    name: string, // this is the route / component / content ID
    key: string, // this should be an attribute of the user profile payload. making it work with dot notation would be a nice enhancement
    value: string | string[],
    action: 'show'|'hide',
    operator: 'equal'|'notEqual'|'contains'|'notContains', // add more as needed-- MAKING ASSUMPTION WE'RE ONLY DEALING WITH STRINGS
    createdOn: string,
    modifiedOn: string,
}

export const accessControlAdapter = createEntityAdapter<accessControlType>({
    selectId: (acl) => acl.name
});
const initialState = accessControlAdapter.getInitialState();

export const {
    selectById: selectAccessControlById,
    selectIds: selectAccessControlIds,
    selectEntities: selectAccessControlEntities,
    selectAll: selectAllAccessControls,
} = accessControlAdapter.getSelectors((state: RootState) => state.accessControls)

export const fetchAccessControls = createAsyncThunk(
    'accessControls/fetchAccessControls',
    async () => {
        const response = await getAccessControls();
        return response.data.results ?? [];
    })

export const accessControlsSlice = createSlice({
    name: 'accessControls',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccessControls.fulfilled, accessControlAdapter.setAll)
    }
});

export default accessControlsSlice.reducer;