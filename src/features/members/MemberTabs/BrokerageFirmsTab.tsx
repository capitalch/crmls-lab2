import { useSelector } from "react-redux";
import { TabTitle } from "../../../components/widgets/TabTitle";
import { SelectableGrid } from "../../../components/SelectableGrid/SelectableGrid";
import { useContext, useEffect } from "react";
import { MembersStore } from "../MembersStore";
import { GlobalContext, GlobalContextType } from "../../../app/GlobalContext";

function BrokerageFirmsTab({ formik, name }: { formik?: any, name: string }) {
    const { errors, setFieldValue } = formik
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const brokerageFirmsIDs = useSelector((state: any) => {
        const brokerageFirmsIDs: string[] = state?.selectableGrid[name]?.selectedIDs
        return (brokerageFirmsIDs)
    })

    useEffect(() => {
        setFieldValue('brokerageFirmsIDs', brokerageFirmsIDs)
    }, [brokerageFirmsIDs])

    return (<div className="flex flex-col ml-4 mr-4">
        <TabTitle title="Associate Brokerage Firms" customError={(errors?.brokerageFirmsIDs) ? errors?.brokerageFirmsIDs : ''} />
        <SelectableGrid
            isReadOnlyFn={() => globalContext.member.isReadOnly}
            className="-mx-2 mt-4"
            name={name}
            resource="BrokerageFirms"
            columns={getColumns()}
            fieldName="brokerageFirmsIDs"
            preSelectedIDs={brokerageFirmsIDs}
            isSingleRowSelectable={MembersStore.isMemberTypeSalesPerson}
        />
    </div>)

    function getColumns(): any[] {
        return (
            [
                {
                    field: 'name',
                    headerText: 'Name',
                    width: 80,
                },
                {
                    field: 'address1',
                    headerText: 'Address1',
                    width: 80,
                },

                {
                    field: 'address2',
                    headerText: 'Address2',
                    width: 80,
                },
                {
                    field: 'phone',
                    headerText: 'Phone',
                    width: 80,
                },
                {
                    field: 'emailAddress',
                    headerText: 'Email',
                    width: 80,
                },
                {
                    field: 'city',
                    headerText: 'City',
                    width: 80,
                },

                {
                    field: 'zip',
                    headerText: 'Zip',
                    width: 80,
                },
                // {
                //     field: 'id',
                //     isPrimaryKey: true,
                //     headerText: 'ID',
                //     visible: false,
                // },
            ]
        )
    }
}

export { BrokerageFirmsTab }