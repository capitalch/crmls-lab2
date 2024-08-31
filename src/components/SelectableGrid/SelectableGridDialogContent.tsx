import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Resize } from "@syncfusion/ej2-react-grids"
import { useEffect, } from "react"
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { QueryLoader } from "../QueryLoader/QueryLoader"
import ClearIcon from "../widgets/icons/ClearIcon"
import { setSelectedIDs } from "./SelectableGridSlice"
import { fetchData } from "../QueryHelper/QueryHelperSlice"
import { SelectableGridColumnType } from "./SelectableGrid"


function SelectableGridDialogContent({
    name
    , dialogName
    , columns
    , orderBy
    , resource
    , handleClearRowCallback
    , isReadOnlyFn = () => false
}: SelectableGridDialogContentType) {
    const dispatch = useDispatch()
    const contents: any[] = useSelector((state: any) => state?.queryHelper?.[dialogName]?.contents || [])
    const rows = contents.map((content: any, index: number) => { return ({ ...content, index: index + 1 }) })

    const selectedIDs = useSelector((state: any) => {
        return (state?.selectableGrid?.[name]?.selectedIDs)
    })

    useEffect(() => {
        doQueryModal()
    }, [selectedIDs.length])

    return (
        <div className="h-5/6" >
            <GridComponent
                gridLines="Both"
                dataSource={rows}
                className="mt-4"
                height='100%'>
                <ColumnsDirective>
                    <ColumnDirective field='index' headerText="#" width={15} />
                    {getColumnsDirective()}
                    <ColumnDirective field='clear' headerText='' width={15} template={clearRowTemplate} />
                </ColumnsDirective>
                <Inject services={[Resize, /*Sort, Selection */]} />
            </GridComponent>
            <QueryLoader name={dialogName} />
        </div>
    )

    function clearRowTemplate(props: any) {
        return (<span>
            <button disabled={isReadOnlyFn()} className="disabled:pointer-events-none" onClick={() => { handleOnClearRow(props) }}><ClearIcon className="text-red-500" /></button>
        </span>)
    }

    function doQueryModal() {
        const gridPayload: any = {
            pageSize: 1000,
            orderBy: _.isEmpty(orderBy) ? [{ field: 'name', direction: 'Asc' }] : orderBy,
            searchCriteria: [{
                field: 'id',
                op: 0,
                values: _.isEmpty(selectedIDs) ? ['5fb77ae9-f06c-4720-a915-7b57ab349e6b'] : selectedIDs // For blank values must give a GUID otherwise error occurs and data is not removed from Modal grid
            }]
        }
        dispatch(fetchData({
            name: dialogName,
            resource: resource,
            queryPayload: gridPayload
        }))
    }

    function columnTemplate(props: any) {
        const field = props.column.field
        let Ret = undefined;
        Ret = <span>{_.get(props, field) ?? '-'}</span> // Tricky isn't it? _.get converts dot notation to array notation to access nested property of an object programmatically
        return (Ret)
    }

    function getColumnsDirective() {
        let ret: any[] = columns.map((col: SelectableGridColumnType, index: number) => {
            const ct = col.templateFn || columnTemplate
            return <ColumnDirective key={index + 1} headerText={col.headerText} isPrimaryKey={!!col.isPrimaryKey} field={col.field} width={col.width} template={ct} />
        })
        return (ret)
    }

    function handleOnClearRow(props: any) {
        if (isReadOnlyFn()) {
            return
        }
        const id = props?.id
        const sIDs = _.cloneDeep(selectedIDs)
        _.remove(sIDs, (item: string) => (item === id))
        const args: any = { name: name, selectedIDs: sIDs }
        dispatch(setSelectedIDs(args))
        if (handleClearRowCallback) {
            handleClearRowCallback(id)
        }
    }

}
export { SelectableGridDialogContent }

type SelectableGridDialogContentType = {
    columns: SelectableGridColumnType[]
    dialogName: string
    name: string
    orderBy: any[]
    resource: string
    handleClearRowCallback?: (id: string) => void
    isReadOnlyFn?: () => boolean
}