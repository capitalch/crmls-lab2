import { useEffect, useState } from "react"
import { useDispatch, useSelector, } from "react-redux"
import Modal from 'react-modal'
import clsx from "clsx"
import { SelectableGridSearch } from "./SelectableGridSearch"
import { SelectableGridDialogContent } from "./SelectableGridDialogContent"
import ClearIcon from "../widgets/icons/ClearIcon"
import { resetAllFilters, setSelectedIDs, setShowSelectedRows, } from "./SelectableGridSlice"
import ResetIcon from "../widgets/icons/ResetIcon"
import { filterOn } from "../../util/ibuki"
import { FilterOptionsType, SelectableGridFilters } from "./filters/SelectableGridFilters"
import { store } from "../../app/store"
import _ from 'lodash'
import { SelectableGridToggleFilter } from "./filters/SelectableGridToggleFilter"
import { SelectableGridColumnType } from "./SelectableGrid"

function SelectableGridPanel({ name
    , resource
    , filters = []
    , doQuery
    , columns
    , orderBy = []
    , className = ''
    , UserControl
    , ibukiMessageForQueryAndReset = undefined
    , handleResetCallback
    , handleClearRowCallback
    , loadDataOnInit = true
    , isReadOnlyFn = () => false
    , allowSelection = true
    , allowSearch = true
}: SelectableGridPanelType) {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const totalResults = useSelector((state: any) => state?.queryHelper?.[name]?.page?.totalResults)
    const dialogName = name + 'Dialog'

    const selectedIDs = useSelector((state: any) => {
        const sIDs = state?.selectableGrid?.[name]?.selectedIDs
        return (sIDs)
    })

    Modal.setAppElement('#crmlsMain')

    useEffect(() => {
        if (loadDataOnInit) {
            doQuery()
        }
    }, [])

    useEffect(() => {
        let subs1: any = undefined
        if (ibukiMessageForQueryAndReset) {
            subs1 = filterOn(ibukiMessageForQueryAndReset).subscribe(() => {
                doQuery()
                handleReset()
            })
        }
        return (() => {
            subs1 && subs1.unsubscribe()
        })
    }, [])

    return (
        <div className={clsx(className, 'flex flex-col')}>
            <div className="flex justify-between">
                {allowSelection && <div className="flex items-center gap-5">
                    <button disabled={isReadOnlyFn()} className="focus:outline-none flex h-7 items-center rounded-md border-2 border-blue-600 bg-blue-400 pl-1 pr-2 text-sm font-medium text-white shadow-sm hover:border-blue-700 hover:bg-blue-600 focus:ring-1 disabled:opacity-40 disabled:pointer-events-none" onClick={handleReset}><ResetIcon /> Reset Selection</button>
                    <span className="cursor-pointer rounded-md px-2 py-1 text-blue-400 hover:bg-gray-300 hover:text-blue-600" onClick={handleSummary}>{`${selectedIDs?.length || 0} item(s) selected`}</span>
                </div>}
                <div className="flex items-center gap-4 ml-auto">
                    {(filters.length > 0) ? <SelectableGridToggleFilter name={name} resetQueryFilters={resetQueryFilters} /> : <></>}
                    {UserControl && <UserControl />}
                    <span className='text-grey-500 font-normal'>{`Count: ${Number(totalResults ? totalResults : 0).toLocaleString()}`}</span>
                    {allowSearch && <SelectableGridSearch name={name} doQuery={doQuery} />}
                </div>
            </div>
            <SelectableGridFilters
                name={name}
                resource={resource}
                execQuery={doQuery}
                filters={filters}
                resetQueryFilters={resetQueryFilters} />
            <Modal isOpen={modalVisible} contentLabel="Selected items" className='ml-auto mr-auto mt-20 h-5/6 border-2 border-gray-400 bg-gray-100 p-4 md:w-3/4'  >
                <div className="flex justify-between">
                    <div className="font-medium text-gray-500">Following items are selected</div>
                    <button onClick={handleCloseModal}><ClearIcon className="text-gray-600" /></button>
                </div>
                <SelectableGridDialogContent name={name} dialogName={dialogName} columns={columns} orderBy={orderBy} resource={resource} handleClearRowCallback={handleClearRowCallback} isReadOnlyFn={isReadOnlyFn} />
                <div className="mt-4 flex justify-between font-medium">
                    <span>Count: {selectedIDs?.length || 0}</span>
                    <button disabled={isReadOnlyFn()} onClick={handleReset} className="cursor-pointer rounded-md px-2 py-1 text-blue-400 hover:bg-gray-300 hover:text-blue-600">Remove All</button>
                </div>
            </Modal>
        </div>)

    function hasFiltersGotAnyValue() {
        const storeState: any = store.getState()
        const selectableGridState: any = storeState?.selectableGrid?.[name]

        const val = filters.find((filter: FilterOptionsType) => selectableGridState?.[filter.name]?.selectedValue)
        const ret: boolean = _.isEmpty(val) ? false : true
        return (ret)
    }

    function resetQueryFilters() {
        const args: any = {
            name: name,
            filterNames: filters.map(filter => filter.name)
        }
        const hasAnyValue: boolean = hasFiltersGotAnyValue()
        dispatch(resetAllFilters(args))
        if (hasAnyValue) {
            doQuery()
        }
    }

    function showSelectedRowsDispatch() {
        const args1: any = { name: name }
        dispatch(setShowSelectedRows(args1))
    }

    function handleCloseModal() {
        setModalVisible(false)
        showSelectedRowsDispatch()
    }

    function handleReset() {
        const args: any = { name: name, selectedIDs: [] }
        dispatch(setSelectedIDs(args))
        showSelectedRowsDispatch()
        if (handleResetCallback) {
            handleResetCallback()
        }
    }

    function handleSummary() {
        setModalVisible(true)
    }
}
export { SelectableGridPanel }

type SelectableGridPanelType = {
    className?: string
    columns: SelectableGridColumnType[]
    doQuery: () => void
    filters?: any[]
    formik: any
    fieldName: string
    name: string
    orderBy?: any[]
    resource: string
    UserControl?: any
    ibukiMessageForQueryAndReset?: string
    handleResetCallback?: () => void
    handleClearRowCallback?: (id: string) => void
    loadDataOnInit?: boolean
    isReadOnlyFn?: () => boolean
    allowSelection?: boolean
    allowSearch?: boolean
}