import { useSelector } from "react-redux";
import { SelectableGrid } from "../../../components/SelectableGrid/SelectableGrid";
import { TabTitle } from "../../../components/widgets/TabTitle";
import { useEffect } from "react";

export function DivisionBranchManagersTab({ formik, name, selectedIDs }: { formik: any, name: string, selectedIDs?: string[] }) {
    const { errors, setFieldValue } = formik
    const branchManagerIDs = useSelector((state: any) => {
        const branchManagerIDs: string[] = state?.selectableGrid[name]?.selectedIDs
        return (branchManagerIDs)
    })

    useEffect(() => {
        setFieldValue('branchManagerIDs', branchManagerIDs)
    }, [branchManagerIDs])

    return (<div className="flex flex-col ml-4 mr-4">
        <TabTitle title="Associate Division / Branch Managers" customError={errors?.branchManagerIDs ? errors?.branchManagerIDs : ''} />
        <SelectableGrid
            className="-mx-2 mt-4"
            name={name}
            resource="Contacts"
            columns={getBranchManagersTabColumns()}
            fieldName="branchManagerIDs"
            orderBy={[{ field: 'firstName', direction: 'Asc' }]}
            queryString="hasActiveLicense=true"
            preSelectedIDs={selectedIDs}
        />
    </div>)

    function getBranchManagersTabColumns(): any[] {
        return (
            [
                {
                    field: 'firstName',
                    headerText: 'First Name',
                    width: 80,
                },
                {
                    field: 'lastName',
                    headerText: 'Last Name',
                    width: 80,
                },
                {
                    field: 'loginId',
                    headerText: 'Login ID',
                    width: 80
                },
                {
                    field: 'memberTypeName',
                    entityField: 'memberType.name',
                    headerText: 'Member Type',
                    width: 80
                },
                {
                    field: 'officeCode',
                    entityField: 'contactOffices.office.officeCode',
                    headerText: 'Office Code',
                    width: 80,
                },
            ]
        )
    }
}