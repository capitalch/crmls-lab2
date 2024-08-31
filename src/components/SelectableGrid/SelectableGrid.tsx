import clsx from "clsx"
import { SelectableGridBody } from "./SelectableGridBody"
import { SelectableGridPanel } from "./SelectableGridPanel"
import { useEffect, useLayoutEffect, useRef } from "react"
import _ from 'lodash'
import { useDispatch } from "react-redux"
import { fetchData } from "../QueryHelper/QueryHelperSlice"
import { store } from "../../app/store"
import { QueryLoader } from "../QueryLoader/QueryLoader"
import { setSelectedIDs } from "./SelectableGridSlice"
import { FilterOptionsType } from "./filters/SelectableGridFilters"
import { TextAlign } from "@syncfusion/ej2-react-grids"

function SelectableGrid({ 
    columns
    , name
    , fieldName = ''
    , resource
    , filters = []
    , formik
    , className = ''
    , criteria = []
    , orderBy = []
    , preSelectedIDs = []
    , UserControl
    , ibukiMessageForQueryAndReset = undefined
    , link = undefined
    , linkParamsName1 = undefined
    , getCriteria
    , urlPart = ''
    , isSingleRowSelectable = false
    , handleRowDeselectedCallback
    , handleRowSelectedCallback
    , handleResetCallback
    , handleClearRowCallback
    , miscArgs
    , isPanelVisible = true
    , queryString = ''
    , rowDataBoundCallback = undefined
    , loadDataOnInit = true
    , allowSelection = true
    , allowSearch = true
    , isReadOnlyFn = () => false
    , apiNameType = 'membership'
}: SelectableGridType) {
    const gridRef: any = useRef({})
    const ordBy = _.isEmpty(orderBy) ? [] : orderBy
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const storeSelectedIDs = store.getState()?.selectableGrid?.[name]?.selectedIDs
        const selectedIDs = _.isEmpty(storeSelectedIDs) ? preSelectedIDs : storeSelectedIDs
        const args: any = { name: name, selectedIDs: selectedIDs }
        dispatch(setSelectedIDs(args))
    }, [])

    const defaultQueryPayload = {
        pageId: 0,
        pageSize: 20,
        criteria: [],
        orderBy: _.isEmpty(orderBy) ? [{ field: 'name', direction: 'Asc' }] : orderBy
    }

    useEffect(() => {
        if (miscArgs) {
            miscArgs.doQuery = doQuery
        }
    })

    return (
        <div className={clsx(className, 'mx-4')}>
            {isPanelVisible && <SelectableGridPanel name={name} columns={columns} filters={filters} fieldName={fieldName} resource={resource} formik={formik} orderBy={ordBy} className=" mb-4 ml-1 font-bold" doQuery={doQuery} UserControl={UserControl} ibukiMessageForQueryAndReset={ibukiMessageForQueryAndReset} handleResetCallback={handleResetCallback} handleClearRowCallback={handleClearRowCallback} loadDataOnInit={loadDataOnInit} isReadOnlyFn={isReadOnlyFn} allowSelection={allowSelection} allowSearch={allowSearch} />}
            <SelectableGridBody name={name} className="mb-4" columns={columns} gridRef={gridRef} orderBy={ordBy} doQuery={doQuery} link={link} linkParamsName1={linkParamsName1} isSingleRowSelectable={isSingleRowSelectable} handleRowDeselectedCallback={handleRowDeselectedCallback} handleRowSelectedCallback={handleRowSelectedCallback} rowDataBoundCallback={rowDataBoundCallback} allowSelection={allowSelection} isReadOnlyFn={isReadOnlyFn} />
            <QueryLoader name={name} />
        </div>
    )

    function doQuery(payload?: any, absoluteUrl?: string) {

        const searchCriteria: any[] = []
        const searchText: string = store.getState().selectableGrid?.[name]?.searchText
        const selectableGridState = store.getState()?.selectableGrid?.[name]

        const gridPayload: any = _.isEmpty(payload) ?
            _.cloneDeep(defaultQueryPayload) : payload

        let crit: any[] = []
        if (getCriteria) {
            crit = getCriteria()
        } else if (!_.isEmpty(criteria)) {
            crit = _.cloneDeep(criteria)
        }

        if (filters.length > 0) {
            filters.forEach((filter: FilterOptionsType) => {
                const selectedValue = selectableGridState?.[filter.name]?.selectedValue
                if (selectedValue) {
                    if ((filter.controlType === 'select') || filter.controlType === 'editableSelect') {
                        crit.push({
                            field: filter.entityFieldName || filter.filterFieldName,
                            op: 0,
                            values: [selectedValue]
                        })
                    } else if (filter.controlType === 'text') {
                        crit.push({
                            field: filter.entityFieldName || filter.filterFieldName,
                            op: 10,
                            values: [selectedValue]
                        })
                    }
                }
            })
        }

        if (searchText) {
            columns.forEach((column) => {
                if ((!column.isPrimaryKey) && (!column.isIgnoreInSearch) && (!column.templateFn)) {
                    searchCriteria.push({
                        field: column.entityField || column.field,
                        op: 10,
                        values: [searchText]
                    })
                }
            })
        } else {
            searchCriteria.length = 0
        }
        gridPayload.searchCriteria = searchCriteria
        gridPayload.criteria = crit // queryCriteria

        dispatch(fetchData({
            name: name,
            resource: resource,
            queryPayload: gridPayload,
            queryString: queryString,
            urlPart: urlPart,
            absoluteUrl: absoluteUrl,
            apiNameType: apiNameType
            // isCompliance: isCompliance
        }))
    }
}
export { SelectableGrid }

type SelectableGridType = {
    className?: string
    columns: SelectableGridColumnType[]
    fieldName?: string
    filters?: any[]
    formik?: any
    isSingleRowSelectable?: boolean
    name: string
    criteria?: any[]
    orderBy?: any[]
    resource: string
    preSelectedIDs?: string[]
    queryString?: string
    UserControl?: any
    ibukiMessageForQueryAndReset?: string
    link?: string
    linkParamsName1?: string
    getCriteria?: () => any

    urlPart?: string

    handleRowDeselectedCallback?: (id: string | undefined) => void
    handleRowSelectedCallback?: (id: string | undefined) => void
    handleResetCallback?: () => void
    handleClearRowCallback?: (id: string) => void // Callback when clear row button is clicked in modal window
    miscArgs?: MiscArgsType
    isPanelVisible?: boolean
    rowDataBoundCallback?: (args: any) => void
    loadDataOnInit?: boolean
    allowSelection?: boolean
    allowSearch?: boolean
    isReadOnlyFn?: () => boolean
    apiNameType?: 'membership' | 'compliance' | 'crib'
    // isCompliance?: boolean
    // apiUrl?: string
}

export type MiscArgsType = {
    doQuery: (payload?: any, absoluteUrl?: string | undefined) => void
}

export type SelectableGridColumnType = {
    entityField?: string
    field?: string
    headerText?: string
    width?: number
    textAlign?: TextAlign
    isPrimaryKey?: boolean
    visible?: boolean
    valueAccessor?: (field: string, data: any, column: any) => any
    isIgnoreInSearch?: boolean

    // customColumnTemplate?: (props: any) => any
    templateFn?: (props: any) => any
}