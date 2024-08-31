import { useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Error } from "../widgets/Error"
import clsx from 'clsx'
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Resize, Selection, Sort, TextAlign } from "@syncfusion/ej2-react-grids"
import { store } from "../../app/store"
import _ from 'lodash'
import { setSelectedIDs } from "./SelectableGridSlice"
import { Link } from "react-router-dom"
import { SelectableGridColumnType } from "./SelectableGrid"

function SelectableGridBody({ name
    , columns
    , doQuery
    , gridRef
    , className = ''
    , orderBy = []
    , link = undefined
    , linkParamsName1
    , isSingleRowSelectable = false
    , handleRowDeselectedCallback, handleRowSelectedCallback
    , rowDataBoundCallback = undefined
    , allowSelection = true
    , isReadOnlyFn = () => false
}: SelectableGridBodyType) {

    const dispatch = useDispatch()

    const rows = useSelector((state: any) => {
        return (state?.queryHelper[name]?.contents)
    })

    const page = useSelector((state: any) => {
        return (state?.queryHelper[name]?.page)
    })

    const selectedIDs = useSelector((state: any) => {
        const sIDs = state?.selectableGrid?.[name]?.selectedIDs
        return (sIDs)
    })

    const error: Error = useSelector((state: any) => state?.queryHelper[name]?.error)

    const showSelectedRowsFlag: any = useSelector((state: any) => {
        const flag = state?.selectableGrid?.[name]?.showSelectedRowsFlag
        return (flag)
    })

    useEffect(() => {
        showSelectedRows()
    }, [showSelectedRowsFlag])


    if (error) {
        return (<Error error={error} />);
    }

    return (<div className={clsx(className, 'flex border-l-1')}>
        <GridComponent ref={gridRef}
            queryCellInfo={handleQueryCellInfo}
            className={clsx(className, 'mb-12')}
            allowPaging={true}
            allowSorting={true}
            allowSelection={allowSelection}
            gridLines="Both"
            dataSource={rows}
            allowResizing={true}
            dataBound={onDataBound}
            actionBegin={onActionBegin}
            rowSelected={handleRowSelected}
            rowDeselected={handleRowDeSelected}

            rowSelecting={handleRowSelecting}
            rowDeselecting={handleRowDeSelecting}

            headerCellInfo={handleHeaderCellInfo}
            selectionSettings={{ checkboxMode: "Default", persistSelection: true }}

            rowDataBound={rowDataBound}

            pageSettings={{
                currentPage: 1,
                pageSize: 20,
                pageSizes: ['5', '10', '20', '50', '100'],
            }}>
            <ColumnsDirective>
                {allowSelection && <ColumnDirective type='checkbox' width='20' />}
                {getColumnsDirective()}
            </ColumnsDirective>
            <Inject services={[Page, Resize, Sort, Selection]} />
        </GridComponent>
    </div>)

    function handleQueryCellInfo(args: any) {
        if (args.column.type === 'checkbox') {
            if (isReadOnlyFn()) {
                // args.cell.classList.add('disabled')
                args.cell.classList.add('opacity-30')
                args.cell.classList.add('pointer-events-none')
            }
        }
    }

    function handleRowSelecting(row: any) {
        // isInteracted is true when user manually selects a row
        if (row.isInteracted) {
            if (isReadOnlyFn()) {
                row.cancel = true
            }
        }
    }

    function handleRowDeSelecting(row: any) {
        if (row.isInteracted) {
            if (isReadOnlyFn()) {
                row.cancel = true
            }
        }
    }

    function rowDataBound(args: any) {
        if (rowDataBoundCallback) {
            rowDataBoundCallback(args)
        }
    }

    function handleHeaderCellInfo(e: any) {
        e.node.getElementsByClassName("e-checkbox-wrapper")[0]
            && e.node.getElementsByClassName("e-checkbox-wrapper")[0].remove();
    }

    function showSelectedRows() {
        const state: any = store.getState()
        const rows: any[] = state?.queryHelper?.[name]?.contents
        if (_.isEmpty(gridRef?.current) || _.isEmpty(rows)) {
            return
        }
        const ids: number[] = []
        rows.forEach((row: any, index: number) => {
            if (_.includes(selectedIDs, row.id)) {
                ids.push(index)
            }
        })
        if ((!_.isEmpty(gridRef?.current)) && (ids.length >= 0)) {
            if (gridRef.current.currentViewData.length > 0) {
                gridRef.current.selectRows([]) // This line is intentional and necessary. Otherwise Checkbox header click issue appears
                gridRef.current.selectRows(ids)
            }
        }
    }

    function handleRowSelected(row: any) {
        let ids: string[] = _.cloneDeep(selectedIDs) || []
        if (row.isInteracted) {
            if (isSingleRowSelectable) {
                if (ids) {
                    ids.length = 0
                }
            }
            ids.push(row?.data?.id)
            const args: any = { name: name, selectedIDs: ids }
            dispatch(setSelectedIDs(args))
            if (handleRowSelectedCallback) {
                handleRowSelectedCallback(row?.data?.id)
            }
            gridRef.current.refresh()
        }
    }

    function handleRowDeSelected(row: any) {
        let ids: string[] = _.cloneDeep(selectedIDs)
        if (row.isInteracted) { //If deselection is done through user interection then only do deselection otherwise don't do
            _.remove(ids, (id: string) => id === row?.data?.id)
            const args: any = { name: name, selectedIDs: ids }
            dispatch(setSelectedIDs(args))
            if (handleRowDeselectedCallback) {
                handleRowDeselectedCallback(row?.data?.id)
            }
        }
    }

    function onActionBegin(e: any) {
        const gridStore: any = store.getState()?.queryHelper
        const gridPayloadStore: any = gridStore[name]?.queryPayload
        const oldPageSize = gridRef?.current?.pageSettings?.oldProperties.pageSize
        const absoluteUrl = gridStore[name]?.absoluteUrl
        // If user changes the page size and new page size is greater than old page size then a retrieve from api is required to get the additional records. Otherwise the grid adjusts.
        if (((e?.currentPage !== e?.previousPage) || (e?.pageSize > oldPageSize)) && (e?.requestType === 'paging')) {
            const criteria = gridPayloadStore?.criteria
            const queryPayload = {
                pageId: e.currentPage - 1,
                pageSize: e.pageSize,
                orderBy: _.isEmpty(orderBy) ? [{ field: 'name', direction: 'Asc' }] : orderBy,
                criteria: _.isEmpty(criteria) ? [] : criteria
            }
            doQuery(queryPayload, absoluteUrl)
        }
    }

    function onDataBound(e: any) {
        if (gridRef?.current?.pageSettings) {
            gridRef.current.pageSettings.currentPage = (page?.pageId || 0) + 1
            gridRef.current.pageSettings.totalRecordsCount = page?.totalResults || 0
        }
        if (rows && (rows.length > 0)) {
            showSelectedRows()
        }
    }

    function columnTemplate(props: any, childComp?: any) {
        const field = props.column.field
        let Ret = undefined;
        const col: any = props.column
        let fieldValue = props[field]
        if(col.valueAccessor){
            fieldValue = col.valueAccessor(col.field, props)
        }
        if (link) {
            let suffix: string = ''
            if(linkParamsName1){
                suffix = `?${linkParamsName1}=${props[linkParamsName1] || ''}`
            }
            const lnk = `/${link}/${props.id}${suffix}`
            Ret = <Link to={lnk} className="hover:text-blue-500">{childComp || (fieldValue || '-')}</Link>
        } else {
            // Ret = <span>{childComp || (_.get(props, field) ?? '-')}</span> //  _.get converts dot notation to array notation to access nested property of an object programmatically
            Ret = <span>{childComp || (fieldValue || '-')}</span>
        }
        return (Ret)
    }

    function getColumnsDirective() {
        let ret: any[] = columns.map((col: SelectableGridColumnType, index: number) => {
            return <ColumnDirective
                textAlign={col.textAlign}
                clipMode='EllipsisWithTooltip'
                key={index + 1}
                headerText={col.headerText}
                isPrimaryKey={!!col.isPrimaryKey}
                field={col.field}
                width={col.width}
                valueAccessor={col.valueAccessor}
                template={(props: any) => {
                    let childComp = undefined
                    let ret = undefined
                    if (col.templateFn) {
                        childComp = col.templateFn(props)
                    }
                    ret = columnTemplate(props, childComp)
                    return (ret)
                }}
            />
        })
        return (ret)
    }
}
export { SelectableGridBody }

type SelectableGridBodyType = {
    className?: string
    columns: SelectableGridColumnType[]
    doQuery: (payload: any, absoluteUrl: string | undefined) => void
    gridRef: any
    isSingleRowSelectable?: boolean
    link?: string
    linkParamsName1?: string
    name: string
    orderBy?: any[]
    handleRowDeselectedCallback?: (id: string | undefined) => void
    handleRowSelectedCallback?: (id: string | undefined) => void
    allowSelection?: boolean
    rowDataBoundCallback?: (args: any) => void
    isReadOnlyFn?: () => boolean
}

