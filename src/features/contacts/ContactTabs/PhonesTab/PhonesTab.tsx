import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import { ContactsStore } from "../../ContactsStore";
import { loadAllRows } from "../../../../components/StandardGrid/StandardGridSlice";
import { StandardGrid } from "../../../../components/StandardGrid/StandardGrid";
import { RefreshIcon } from "@heroicons/react/solid";
import { PhonesForm } from "./PhonesForm";
import { TabTitle } from "../../../../components/widgets/TabTitle";
import { GlobalContext, GlobalContextType } from "../../../../app/GlobalContext";

function PhonesTab({ formik, name }: { formik?: any, name: string }) {
    const { setFieldValue } = formik
    const dispatch = useDispatch()
    const {isSubmitting} = formik
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const allRows = useSelector((state: any) => {
        const rows = state?.standardGrid?.[name]?.allRows
        return (rows)
    })

    useEffect(() => {
        setFieldValue('phones', allRows)
    }, [allRows])


    return (<div className="flex flex-col ml-4 mr-4">
        <div className="flex justify-between items-center">
            <TabTitle title='Associate phones' formik={formik} errorFieldName="phones" />
            <button disabled={isSubmitting} onClick={handleRefresh} className="mb-4 items-center h-7 pl-2 pr-4 py-1 font-medium inline-flex  border border-transparent shadow-md text-sm  rounded-sm focus:outline-none hover:bg-gray-100 "><RefreshIcon className="mr-2" />Refresh</button>
        </div>
        <div className='flex gap-4' >
            <PhonesForm className="w-1/4 bg-gray-50" name={name} />
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
                field: 'phone',
                headerText: 'Phone',
                width: '90'
            },
            {
                field: 'extension',
                headerText: 'Ext',
                width: '90'
            },
            {
                field: 'phoneTypeName',
                headerText: 'Type',
                width: '60'
            },
            {
                type: 'boolean',
                field: 'isPrimary',
                headerText: 'Pr',
                width: '30',
                displayAsCheckBox: true
            }
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

export { PhonesTab }