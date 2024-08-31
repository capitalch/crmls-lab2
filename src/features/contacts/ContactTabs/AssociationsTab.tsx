import { StandardSelect } from "../../../components/StandardSelect/StandardSelect";
import { TabTitle } from "../../../components/widgets/TabTitle";

function AssociationsTab({ formik }: { formik?: any }) {
    const { values } = formik

    return (<div className="flex flex-col ml-4 mr-4">
        <TabTitle title='Select Associations' />

        <div className="flex mt-4 gap-8">
            {/* Primary AOR */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="primaryAorID">Primary AOR</label>
                <StandardSelect name='primaryAorID' formik={formik} resource="Aors" value={values.primaryAorID || ''} />
            </div>
            {/* Billable AOR */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="billableAorID">Billable AOR</label>
                <StandardSelect name='billableAorID' formik={formik} resource="Aors" value={values.billableAorID || ''} />
            </div>
        </div>
    </div>)
}

export { AssociationsTab }