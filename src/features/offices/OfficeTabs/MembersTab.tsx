import { useSelector } from "react-redux";
import { SelectableGrid } from "../../../components/SelectableGrid/SelectableGrid";
import { TabTitle } from "../../../components/widgets/TabTitle";
import { useContext, useEffect } from "react";
import { GlobalContext, GlobalContextType } from "../../../app/GlobalContext";

export function MembersTab({ formik, name, selectedIDs }: { formik: any, name: string, selectedIDs?: string[] }) {
    const { errors, setFieldValue } = formik
    const membersCriteria = [{ field: 'contactTypeID', op: 0, values: ['1'] }]
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const memberIDs = useSelector((state: any) => {
        const memberIDs: string[] = state?.selectableGrid[name]?.selectedIDs
        return (memberIDs)
    })

    useEffect(() => {
        setFieldValue('memberIDs', memberIDs)
    }, [memberIDs])

    return (<div className="flex flex-col ml-4 mr-4">
        <TabTitle title="Associate Members" customError={errors['memberIDs'] ? errors['memberIDs'] : ''} />
        <SelectableGrid
            isReadOnlyFn={() => globalContext.office.isReadOnly}
            className="-mx-2 mt-4"
            name={name}
            resource="Contacts"
            criteria={membersCriteria}
            columns={getColumns()}
            fieldName="memberIDs"
            orderBy={[{ field: 'firstName', direction: 'Asc' }]}
            preSelectedIDs={selectedIDs}
        />
    </div>)

    function getColumns(): any[] {
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
                    entityField: 'contactOffices.office.officeCode',
                    field: 'officeCode',
                    headerText: 'Office Code',
                    width: 80,
                },
            ]
        )
    }
}