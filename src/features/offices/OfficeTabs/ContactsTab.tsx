import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { TabTitle } from "../../../components/widgets/TabTitle"
import { SelectableGrid } from "../../../components/SelectableGrid/SelectableGrid"
import { GlobalContext, GlobalContextType } from "../../../app/GlobalContext"

export function ContactsTab({ formik, name, selectedIDs }: { formik: any, name: string, selectedIDs?: string[] }) {
    const { errors, setFieldValue } = formik
    const contactsCriteria = [{ field: 'contactTypeID', op: 6, values: ['1'] }]
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const contactIDs = useSelector((state: any) => {
        const contactIDs: string[] = state?.selectableGrid[name]?.selectedIDs
        return (contactIDs)
    })

    useEffect(() => {
        setFieldValue('contactIDs', contactIDs)
    }, [contactIDs])

    return (<div className="flex flex-col ml-4 mr-4">
        <TabTitle title="Associate Contacts" customError={errors['contactIDs'] ? errors['contactIDs'] : ''} />
        <SelectableGrid
            isReadOnlyFn={() => globalContext.office.isReadOnly}
            className="-mx-2 mt-4"
            name={name}
            resource="Contacts"
            criteria={contactsCriteria}
            columns={getColumns()}
            fieldName="contactIDs"
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
                // {
                //     field: 'memberTypeName',
                //     entityField: 'memberType.name',
                //     headerText: 'Member Type',
                //     width: 80
                // },
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