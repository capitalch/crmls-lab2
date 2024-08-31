import { useDispatch, useSelector } from "react-redux";
import { TabTitle } from "../../../components/widgets/TabTitle";
import { SelectableGrid, SelectableGridColumnType } from "../../../components/SelectableGrid/SelectableGrid";
import { useContext, useEffect } from "react";
import { MembersStore } from "../MembersStore";
import { store } from "../../../app/store";
import { deselectPrimaryOffice, selectPrimaryOffice } from "../../../components/PrimaryOffice/PrimaryOfficeSlice";
import { PrimaryOfficeCheckBox } from "../../../components/PrimaryOffice/PrimaryOfficeCheckBox";
import { GlobalContext, GlobalContextType } from "../../../app/GlobalContext";

function OfficesTab({ formik, name }: { formik?: any, name: string }) {
    const { errors, setFieldValue } = formik
    const dispatch = useDispatch()
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const officesIDs = useSelector((state: any) => {
        const officesIDs: string[] = state?.selectableGrid[name]?.selectedIDs
        return (officesIDs)
    })

    useEffect(() => {
        setFieldValue('officesIDs', officesIDs)
    }, [officesIDs])

    return (<div className="flex flex-col ml-4 mr-4">
        <TabTitle title="Associate Offices" customError={(errors?.officesIDs) ? errors?.officesIDs : ''} />
        <SelectableGrid
            isReadOnlyFn={() => globalContext.member.isReadOnly}
            className="-mx-2 mt-4"
            name={name}
            resource="Offices"
            columns={getColumns()}
            fieldName="officesIDs"
            preSelectedIDs={officesIDs}
            isSingleRowSelectable={MembersStore.isMemberTypeSalesPerson}
            handleRowDeselectedCallback={handleRowDeselectedCallback} // callback when an office is deselected in Offices tab
            handleRowSelectedCallback={handleRowSelectedCallback}
            handleResetCallback={handleResetCallback}
            handleClearRowCallback={handleClearRowCallback}
        />
    </div>)

    function handleRowDeselectedCallback(id: string | undefined) {
        const state = store.getState()
        const primaryOfficeId: any = state?.primaryOffice?.member?.primaryOfficeId
        if (id === primaryOfficeId) {
            const args: any = { name: 'member', }
            dispatch(deselectPrimaryOffice(args)) // Redux action to deselect the primary office
        }
    }

    function handleRowSelectedCallback(id: string | undefined) {
        const state = store.getState()
        const offIDs = state?.selectableGrid[name]?.selectedIDs
        if (offIDs.length === 1) {
            const args: any = { name: 'member', id: id }
            dispatch(selectPrimaryOffice(args))
        }
    }

    function handleResetCallback() {
        const args: any = { name: 'member', }
        dispatch(deselectPrimaryOffice(args))
    }

    function handleClearRowCallback(id: string) {
        const state = store.getState()
        const primaryOfficeId: any = state?.primaryOffice?.member?.primaryOfficeId
        const args: any = { name: 'member', }
        if (id === primaryOfficeId) {
            dispatch(deselectPrimaryOffice(args))
        }
    }

    function getColumns(): SelectableGridColumnType[] {
        return (
            [
                {
                    field: 'primaryOfficeId',
                    headerText: 'Primary',
                    width: 40,
                    // The primaryOfficeId checkbox is implemented as custom template
                    templateFn: (props: any) => <PrimaryOfficeCheckBox isReadOnlyFn={() => globalContext.member.isReadOnly} officesIDs={officesIDs} props={props} selectableGridName={name} primaryOfficeName="member" formik={formik} validationFieldName="officesIDs" />,
                },
                {
                    field: 'name',
                    headerText: 'Name',
                    width: 80,
                },
                {
                    field: 'officeCode',
                    headerText: 'Office Code',
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

export { OfficesTab }