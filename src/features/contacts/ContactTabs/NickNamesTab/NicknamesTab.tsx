import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../../app/store"
import { useContext, useEffect } from "react"
import _ from 'lodash'
import { TabTitle } from "../../../../components/widgets/TabTitle"
import RefreshIcon from "../../../../components/widgets/icons/RefreshIcon"
import { ContactsStore } from "../../ContactsStore"
import { loadAllRows } from "../../../../components/StandardGrid/StandardGridSlice"
import { StandardGrid } from "../../../../components/StandardGrid/StandardGrid"
import { NicknamesForm } from "./NicknamesForm"
import { GlobalContext, GlobalContextType } from "../../../../app/GlobalContext"


export function NicknamesTab({ formik, name }: { formik: any, name: string }) {
    const { setFieldValue } = formik
    const dispatch = useAppDispatch()
    const { isSubmitting } = formik
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const allRows = useSelector((state: any) => {
        const rows = state?.standardGrid?.[name]?.allRows
        return (rows)
    })

    useEffect(() => {
        setFieldValue('nicknames', allRows)
    }, [allRows])

    return (<div className="ml-4 mr-4 flex flex-col">
        <div className="flex items-center justify-between">
            <TabTitle title='Associate Nicknames' formik={formik} errorFieldName="nicknames" />
            <button disabled={isSubmitting} onClick={handleRefresh} className="focus:outline-none mb-4 inline-flex h-7 items-center rounded-sm border border-transparent py-1 pl-2 pr-4 text-sm font-medium shadow-md hover:bg-gray-100 disabled:bg-gray-300"><RefreshIcon className="mr-2" />Refresh</button>
        </div>
        <div className='flex gap-4' >
            <NicknamesForm className="w-1/4 bg-gray-50" name={name} />
            <div className="w-full">
                <StandardGrid
                    isReadOnlyFn={() => globalContext.contact.isReadOnly}
                    name={name}
                    rows={allRows}
                    columns={getColumns()} className=""
                    formik={formik} />
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
            allRows: _.cloneDeep(ContactsStore?.[name]?.origRows || [])
        }
        dispatch(loadAllRows(args))
    }
}