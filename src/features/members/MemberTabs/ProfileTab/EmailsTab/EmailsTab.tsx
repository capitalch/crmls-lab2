import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { TabTitle } from "../../../../../components/widgets/TabTitle";
import { RefreshIcon } from "@heroicons/react/solid";
import { EmailsForm } from "./EmailsForm";
import { StandardGrid } from "../../../../../components/StandardGrid/StandardGrid";
import { MembersStore } from "../../../MembersStore";
import { loadAllRows } from "../../../../../components/StandardGrid/StandardGridSlice";
import { GlobalContext, GlobalContextType } from "../../../../../app/GlobalContext";

function EmailsTab({ formik, name }: { formik?: any, name: string }) {
    const { setFieldValue } = formik
    const dispatch = useDispatch()
    const { isSubmitting } = formik
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const allRows = useSelector((state: any) => {
        const rows = state?.standardGrid?.[name]?.allRows
        return (rows)
    })

    useEffect(() => {
        setFieldValue('emails', allRows)
    }, [allRows])

    return (<div className="flex flex-col ml-4 mr-4">
        <div className="flex justify-between items-center">
            <TabTitle title='Associate Emails' formik={formik} errorFieldName="emails" />
            <button disabled={isSubmitting} onClick={handleRefresh} className="mb-4 items-center h-7 pl-2 pr-4 py-1 font-medium inline-flex  border border-transparent shadow-md text-sm  rounded-sm focus:outline-none hover:bg-gray-100 "><RefreshIcon className="mr-2" />Refresh</button>
        </div>
        <div className='flex gap-4' >
            <EmailsForm className="w-1/4" name={name} />
            <div className="w-full">
                <StandardGrid
                    isReadOnlyFn={() => globalContext.member.isReadOnly}
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
                field: 'emailAddress',
                headerText: 'Email',
                width: '160'
            },
            {
                field: 'emailClassName',
                headerText: 'Class',
                width: '80'
            },
            {
                type: 'boolean',
                field: 'isPreferred',
                headerText: 'Preferred',
                width: '60',
                displayAsCheckBox: true
            }
        ])
    }

    function handleRefresh() {
        const args: any = {
            name: name,
            allRows: _.cloneDeep(MembersStore?.[name]?.origRows)
        }
        dispatch(loadAllRows(args))
    }
}

export { EmailsTab }