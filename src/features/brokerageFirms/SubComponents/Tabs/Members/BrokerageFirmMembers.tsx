import { useDispatch, useSelector } from "react-redux";
import { OperationCriterias } from "../../../../../Interfaces/Criteria";
import { BasicGrid } from "../../../../../components/BasicGrid/BasicGrid";
import { FilterOptionsType } from "../../../../../components/BasicGrid/BasicGridFilters";
import { BasicGridQueryPanel } from "../../../../../components/BasicGrid/BasicGridQueryPanel";
import { QueryLoader } from "../../../../../components/QueryLoader/QueryLoader";
import { SelectableGrid } from "../../../../../components/SelectableGrid/SelectableGrid";
import Loader from "../../../../../components/widgets/Loader"
import { ClaimButton } from "../../OtherBrokerageFirms/OtherBrokerageFirms";
import { formattedProfile } from "../../../../user/selectors";
import { useEffect } from "react";
import useGrid from "../../../../../util/useClearGrid";
import { bf_resource_name } from "../../MyBrokerageFirms/MyBrokerageFirms";
import { setShowSelectedRows } from "../../../../../components/SelectableGrid/SelectableGridSlice";
import { TabTitle } from "../../../../../components/widgets/TabTitle";
import { useParams } from "react-router";



export const resource = 'contacts'
export const bf_members_gridName = 'brokerageFirm_memberIDs'
export const bf_contacts_gridName = 'brokerageFirm_contactIDs'


function BFMembersTab({formik, showOnlyMembers}:{formik:any, showOnlyMembers?:boolean}) {
    const memberType = showOnlyMembers ? 'member' : 'contact'
    const gridName = showOnlyMembers ? bf_members_gridName : bf_contacts_gridName
    const fieldName = `${memberType}IDs`
    const { id }:any = useParams()
    const systemOfRecordIsManual = formik.values && formik.values.systemOfRecordID == 1
    const isReadOnly = !systemOfRecordIsManual && id
    // const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
    const selectedIds: any = useSelector((state: any) => state?.selectableGrid[gridName]?.selectedIDs)

    // The selectable grid is tightly coupled with the query helper
    // It is not showing the correct data the first time it loads
    // this hook is updating the redux store with the currenty fetched data
    // also clears the redux store when 
    // useGrid({gridName, fieldName, resource: bf_resource_name})
    // const dispatch = useDispatch()
    // const reloadGrid = () => {
    //     const args2: any = { name: gridName }
    //     dispatch(setShowSelectedRows(args2))
    // }
    
    // useEffect(()=>{
    // },[])
    
    useEffect(()=>{
        // reloadGrid()
        formik.setFieldValue(fieldName, selectedIds ?? [])
    }, [selectedIds])

    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <div className="mx-4"><TabTitle title={`Associate  ${showOnlyMembers ? 'Members' : 'Contacts'}`}/></div>
            <SelectableGrid 
                name={gridName} 
                fieldName={fieldName} 
                columns={getFirmMemberColumns(showOnlyMembers)} 
                resource={resource} 
                className="m-4" 
                preSelectedIDs={formik.values?.[fieldName]} 
                orderBy={[{field: 'firstName', direction: 'Asc' }]}
                criteria={[
                    {
                        field: "contactTypeID",
                        op: showOnlyMembers ? OperationCriterias.Equal : OperationCriterias.NotEqual,
                        values: ["1"]
                    }
                ]}
                isReadOnlyFn={() => isReadOnly}
                // link={`${resource}/view`}
            />
        </div>
    )
}
   
export const getFirmMemberColumns = (showOnlyMembers:boolean | undefined) => [
    {
        field: 'firstName',
        headerText: 'First Name',
        width: 100,
    },
    {
        field: 'lastName',
        headerText: 'Last Name',
        width: 100,
    },
    ...(showOnlyMembers ? [{
        field: 'memberTypeName',
        entityField: 'memberType.Name',
        headerText: 'Member Type',
        width: 60,
    },
    {
        field: 'memberStatus',
        entityField: 'memberStatusEntity.Name',
        headerText: 'Status',
        width: 70,
    }] : []),
    {
        field: 'loginId',
        headerText: 'Login Id',
        width: 80,
    },
    {
        field: 'email',
        entityField: 'emails.EmailAddress',
        headerText: 'Email',
        width: 80,
    },
    {
        field: 'officeCode',
        entityField: 'contactOffices.office.officeCode',
        headerText: 'Office Code',
        width: 70
    },
    {
        field: 'mainOfficeCode',
        entityField: 'contactOffices.office.mainOfficeCode',
        headerText: 'Main Office Code',
        width: 70
    },
]

export const  BFListfilters:  FilterOptionsType[] = [
    {
        controlType: 'text',
        name: 'zip',
        filterFieldName: 'zip',
        displayName: 'Zip'
    },
    {
        controlType: 'text',
        name: 'city',
        filterFieldName: 'city',
        displayName: 'City'
    },
    {
        controlType: 'editableSelect',
        name: 'brokerageFirm',
        resource: 'BrokerageFirms',
        displayName: 'Brokerage Firm',
        filterFieldName: 'brokerageFirmID'
    },
]

export default BFMembersTab