import { useEffect, useRef } from "react"
import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids"
import _ from 'lodash'
import clsx from "clsx"
import ClearIcon from "../widgets/icons/ClearIcon"
import { EditIcon1 } from "../widgets/icons/EditIcon1"
import { deleteRowOnIndex, setCurrentRow } from "./StandardGridSlice"
import { useDispatch } from "react-redux"
import { MembersStore } from "../../features/members/MembersStore"

function StandardGrid({ name
    , columns
    , rows
    , formik
    , className = ''
    , isReadOnlyFn = () => false
}: StandardGridType) {
    const gridRef: any = useRef({})
    const dispatch = useDispatch()

    useEffect(() => {
        if(gridRef){
            MembersStore.grids = {}
            MembersStore.grids[name] = {}
            MembersStore.grids[name].gridRef = gridRef
        }
    },)

    return (<div>
        <GridComponent
            className={clsx(className, 'w-auto')}
            allowTextWrap={true}
            allowSorting={true}
            dataSource={rows}
            gridLines="Both"
            ref={gridRef}
            rowDataBound={handleRowDataBound}
        >
            <ColumnsDirective>
                {getColumnsDirective()}
            </ColumnsDirective>
        </GridComponent>
    </div>)

    function addUpdateDeleteButtons() {
        const found = columns.find(c => (c.field === 'deleteUpdate'))
        if (!found) { // Adding delete and update buttons
            columns.push
                ({
                    field: 'deleteUpdate',
                    headerText: '',
                    width: '80',
                    template: updateDeleteTemplate,
                    textAlign: 'right'
                })
        }
    }

    function getColumnsDirective() {
        let ret: any[] = []
        addUpdateDeleteButtons()
        ret = columns.map((column: any, index: number) => {
            return (
                <ColumnDirective key={index} field={column.field} headerText={column.headerText || ''} width={column.width} template={column.template} type={column.type} displayAsCheckBox={column.displayAsCheckBox} />
            )
        })
        return (ret)
    }

    function handleRowDataBound(args: any) {
        const rowData = args.data
        if (!rowData.isNewRow) {
            args.row.style.backgroundColor = '#F1F1F1'
        }
    }

    function updateDeleteTemplate(props: any) {
        return (<div className="flex align-middle">
            <button disabled={isReadOnlyFn()} className="disabled:pointer-events-none disabled:opacity-30" type='button' onClick={() => handleOnUpdateRow(props)}><EditIcon1 className="h-6 w-6 text-green-400 hover:text-green-500" /></button>
            <button disabled={isReadOnlyFn()} className="disabled:pointer-events-none disabled:opacity-30" type='button' onClick={() => handleOnDeleteRow(props)}><ClearIcon className="ml-6 h-6 w-6 text-red-400 hover:text-red-500" /></button>
        </div>)
    }

    function handleOnUpdateRow(props: any) {
        const args: any = {
            name: name,
            currentRow: _.cloneDeep(props)
        }
        if (args.currentRow.column) {
            args.currentRow.column = undefined
        }
        dispatch(setCurrentRow(args))
    }

    function handleOnDeleteRow(props: any) {
        const args: any = {
            name: name,
            index: props.index
        }
        dispatch(deleteRowOnIndex(args))
    }
}
export { StandardGrid }

type StandardGridType = {
    columns: any[]
    rows: any[]
    name: string
    getColumns?: () => any[]
    formik: any
    className?: string
    isReadOnlyFn?: () => boolean
}