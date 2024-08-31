import { useDispatch } from "react-redux";
import { store } from "../../app/store";
import RefreshIcon from "../widgets/icons/RefreshIcon";
import { BasicGridSearchText } from "./BasicGridSearchText";
import { BasicGridToggleFilter } from "./BasicGridToggleFilter";
import { fetchData } from "../QueryHelper/QueryHelperSlice";
import _ from 'lodash'
import { setSearchTextValue } from "./BasicGridSlice";

function BasicGridSearch({ name, columns, resource, className, execQuery, resetQueryFilters, orderBy = [], filters }: BasicGridSearchType) {
    const dispatch = useDispatch()

    return (
        <div className={`${className} flex items-center gap-2 mr-10 justify-between flex-wrap`}>
            <button onClick={handleRefresh} className='order-0 h-8 inline-flex items-center px-3 border border-transparent shadow-sm text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400'>
                <RefreshIcon className='mr-1' />
                Refresh</button>
            <div className="flex items-center">
                {filters?.length ? <BasicGridToggleFilter name={name} resetQueryFilters={resetQueryFilters} /> : <></>}
                <BasicGridSearchText name={name} execQuery={execQuery} />
            </div>
        </div>
    )

    function handleRefresh() {
        const state: any = store.getState();
        const gridcriteria: any[] = state?.queryHelper?.[name].queryPayload.criteria
        const queryPayload = {
            pageId: 0,
            pageSize: 50,
            orderBy: _.isEmpty(orderBy) ? [{ field: 'name', direction: 'Asc' }] : orderBy,
            criteria: gridcriteria || undefined
        }
        const args: any = { name: name }
        dispatch(setSearchTextValue(args))
        dispatch(fetchData({
            queryPayload: queryPayload,
            name: name,
            resource: resource,
        }))
    }
}
export { BasicGridSearch }

type BasicGridSearchType = {
    name: string
    resource: string
    className?: any
    columns: any[]
    execQuery: () => void
    resetQueryFilters: () => void
    orderBy?: any[]
    filters?:any[]
}