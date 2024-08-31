import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import _ from 'lodash'
import { TabTitle } from "../../../../../components/widgets/TabTitle"
import RefreshIcon from "../../../../../components/widgets/icons/RefreshIcon"
import { loadAllRows } from "../../../../../components/StandardGrid/StandardGridSlice"
import { StandardGrid } from "../../../../../components/StandardGrid/StandardGrid"
import { NicknamesForm } from "./NicknamesForm"
import { MembersStore } from "../../../MembersStore"
import { GlobalContext, GlobalContextType } from "../../../../../app/GlobalContext"


export function NicknamesTab({ formik, name }: { formik: any, name: string }) {
    const { setFieldValue } = formik
    const dispatch = useDispatch()
    const { isSubmitting } = formik
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const allRows = useSelector((state: any) => {
        const rows = state?.standardGrid?.[name]?.allRows
        return (rows)
    })

    useEffect(() => {
        setFieldValue('nicknames', allRows)
        // gridRef dataSource setting is required to refresh the grid. Otherwise the gird will not refresh on first load
        const gridRef: any = MembersStore?.grids?.[name]?.gridRef
        if (gridRef) {
            gridRef.current.dataSource = allRows
        }
    }, [allRows])

    return (<div className="flex flex-col ">
        <div className="flex justify-between items-center">
            <TabTitle title='Associate Nicknames' formik={formik} errorFieldName="nicknames" />
            <button disabled={isSubmitting} onClick={handleRefresh} className="mb-4 items-center h-7 pl-2 pr-4 py-1 font-medium inline-flex  border border-transparent shadow-md text-sm  rounded-sm focus:outline-none hover:bg-gray-100 "><RefreshIcon className="mr-2" />Refresh</button>
        </div>
        <div className='flex gap-4' >
            <NicknamesForm className="w-1/4 bg-gray-50" name={name} />
            <div className="w-full">
                <StandardGrid
                    isReadOnlyFn={() => globalContext.member.isReadOnly}
                    name={name}
                    rows={allRows}
                    columns={getColumns()} className=""
                    formik={formik}
                />
            </div>
        </div>
    </div>)

    function getColumns() {
        return ([
            {
                field: 'index',
                headerText: '#',
                width: '15',
            },
            {
                field: 'nickname',
                headerText: 'Nickname',
                width: '90'
            },
        ])
    }

    function handleRefresh() {
        const args: any = {
            name: name,
            allRows: _.cloneDeep(MembersStore?.[name]?.origRows || [])
        }
        dispatch(loadAllRows(args))
    }
}