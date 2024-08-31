import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {getDynamicMenus} from "../../adapters";
import {RootState} from "../../app/store";

export type dynamicMenuType = {
    id: string, // the DB guid for the record
    audience: object,
    audienceId: string,
    color?: string,
    component?: React.FC | null,
    icon?: React.FunctionComponent<{ className: string, ariaHidden?: boolean }> | null,
    exact?: boolean,
    menu: string,
    menuType: string,
    path: string,
    status: string,
    target?: string,
    title: string,
    viewOrder: number | 0,
    createdBy: string,
    createdOn: string,
    modifiedOn: string,
    modifiedBy: string,
<<<<<<< HEAD
	children?: dynamicMenuType[]
=======
>>>>>>> dev-1
}

export const dynamicMenuAdapter = createEntityAdapter<dynamicMenuType>();
const initialState = dynamicMenuAdapter.getInitialState();

export const {
    selectById: selectDynamicMenuById,
    selectIds: selectDynamicMenuIds,
    selectEntities: selectDynamicMenuEntities,
    selectAll: selectAllDynamicMenus,
} = dynamicMenuAdapter.getSelectors((state: RootState) => state.dynamicMenu)

export const fetchDynamicMenu = createAsyncThunk(
    'dynamicMenu/fetchDynamicMenu',
    async () => {
        const response = await getDynamicMenus();
<<<<<<< HEAD

        const results:any[] = response.data.results ?? [];
        return(results)
=======
        return response.data.results ?? [];
>>>>>>> dev-1
    })

export const dynamicMenuSlice = createSlice({
    name: 'dynamicMenu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDynamicMenu.fulfilled, dynamicMenuAdapter.setAll)
    }
});

export default dynamicMenuSlice.reducer;