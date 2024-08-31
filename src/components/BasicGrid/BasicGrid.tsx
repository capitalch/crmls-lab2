import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Resize, Sort, } from "@syncfusion/ej2-react-grids"
import { useEffect, useRef, } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { store } from "../../app/store"
import { Error } from "../widgets/Error"
import { Link } from "react-router-dom"
import { fetchData } from "../QueryHelper/QueryHelperSlice"
import Criteria from "../../Interfaces/Criteria"
import LinkTagsSyncFusion from "./Utils/LinkTagsBasicGrid"

function BasicGrid({ name, columns, resource, className,link=undefined, allowPaging = true, orderBy = [], criteria = [] }: BasicGridType) {
    const dispatch = useDispatch()
    const gridRef: any = useRef({})

    const rows = useSelector((state: any) => {
        return (state?.queryHelper[name]?.contents)
    })

    const page = useSelector((state: any) => {
        return (state?.queryHelper[name]?.page)
    })

    const error: Error = useSelector((state: any) => state?.queryHelper[name]?.error)

    // This useEffect is required. Otherwise the total number of pages i.e totalRecordsCount does not update in grid
    useEffect(() => {
        if (gridRef?.current) {
            gridRef.current.dataSource = rows
        }
    })

    if (error) {
        return (<Error error={error} />);
    }

    function columnTemplateWithLink(props: any) {
        return <LinkTagsSyncFusion details={props} link={link} />
    }

    const getColumnTemplate = (column:BasicGridColumnType) => {
        return column.customColumnTemplate || columnTemplateWithLink
    }

    return (
        <div className={`${className} border-l-1`}>
            <GridComponent
                allowPaging={allowPaging}
                allowSorting={true}
                gridLines="Both"
                allowResizing={true}
                dataBound={onDataBound}
                actionBegin={onActionBegin}
                pageSettings={{
                    currentPage: 1,
                    pageSize: 50,
                    pageSizes: ['5', '10', '20', '50', '100'],
                }}
                ref={gridRef}>
                <ColumnsDirective>
                    {getColumnsDirective()}
                </ColumnsDirective>
                <Inject services={[Page, Resize, Sort]} />
            </GridComponent>
        </div>
    )

    function getColumnsDirective() {
        return columns.map((column: BasicGridColumnType, index: number) => {
            return <ColumnDirective 
                    key={index + 1} 
                    headerText={column.headerText} 
                    field={column.field} 
                    width={column.width} 
                    template={getColumnTemplate(column)} 
            />
        })
    }

    function onActionBegin(e: any) {
        const basicGridStore: any = store.getState()?.queryHelper //basicGrid
        const gridPayloadStore: any = basicGridStore[name]?.queryPayload //gridPayload
        const oldPageSize = gridRef?.current?.pageSettings?.oldProperties.pageSize
        // If user changes the page size and new page size is greater than old page size then a retrieve from api is required to get the additional records. Otherwise the grid adjusts.
        if (((e?.currentPage !== e?.previousPage) || (e?.pageSize > oldPageSize)) && (e?.requestType === 'paging')) {
            const criteria = gridPayloadStore?.criteria
            const queryPayload = {
                pageId: e.currentPage - 1,
                pageSize: e.pageSize,
                orderBy: _.isEmpty(orderBy) ? [{ field: 'name', direction: 'Asc' }] : orderBy,
                criteria: _.isEmpty(criteria) ? [] : criteria
            }
            dispatch(fetchData(
                {
                    name: name,
                    resource: resource,
                    queryPayload: queryPayload
                }))
        }
    }

    function onDataBound(e: any) {
        if (gridRef?.current?.pageSettings) {
            gridRef.current.pageSettings.currentPage = (page?.pageId || 0) + 1
            gridRef.current.pageSettings.totalRecordsCount = page?.totalResults || 0
        }
    }
}
export { BasicGrid }

export type BasicGridType = {
    allowPaging?: boolean
    className?: any
    columns: BasicGridColumnType[]
    name: string
    orderBy?: any[]
    criteria?: Criteria[]
    resource: string
    link?: string
}

export type BasicGridColumnType = {
    field: string
    entityField?: string
    headerText?: string
    width?: number
    textAlign?: string
    isPrimaryKey?: boolean
    visible?: boolean
    valueAccessor?: (field: string, data: any, column: any) => any
    customColumnTemplate?: (props: any) => any
    isIgnoreInSearch?: boolean
    isIgnoreInPanel?: boolean
}