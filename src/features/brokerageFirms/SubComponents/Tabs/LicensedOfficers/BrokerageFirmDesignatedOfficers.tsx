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
import { useParams } from "react-router-dom";
import { addTextToCheckboxHeaderElement as addTextToHTMLCheckboxHeaderElement } from "../Offices/temp/BrokerageFirmOfficesSelectable";
import { setSelectedIDs, setShowSelectedRows } from "../../../../../components/SelectableGrid/SelectableGridSlice";
import useGrid from "../../../../../util/useClearGrid";
import { bf_resource_name } from "../../MyBrokerageFirms/MyBrokerageFirms"
import { TabTitle } from "../../../../../components/widgets/TabTitle";



export const fieldName = 'designatedOfficerIDs'
export const bf_designatedOfficers_gridName = 'brokerageFirmDesignatedOfficerIds'

function BFDesignatedOfficersTab({formik}:{formik:any}) {
    
    // const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
    const { id }:any = useParams()
    
    //RSTR(304) This will return contacts associated to a brokerage firm OR a licensed officer of the brokerage firm OR designated broker of the brokerage firm
    const resource=`Contacts/officers/available/${id}`
    const selectedIds: any = useSelector((state: any) => state?.selectableGrid[bf_designatedOfficers_gridName]?.selectedIDs)
    const brokerageFirm: any = useSelector((state: any) => state?.queryHelper[bf_resource_name]?.contents)
    
    
    
    // The selectable grid is tightly coupled with the query helper
    // It is not showing the correct data the first time it loads
    // this hook is updating the redux store with the currenty fetched data
    // also clears the redux store when 
    // useGrid({gridName, fieldName, resource: bf_resource_name})
    const dispatch = useDispatch()
    const reloadGrid = () => {
        const args2: any = { name: bf_designatedOfficers_gridName }
        dispatch(setShowSelectedRows(args2))
    }

    useEffect(()=>{
    },[])
    
    useEffect(()=>{
        // reloadGrid()
        addTextToHTMLCheckboxHeaderElement("bf_officers","Designated Officers")//Can remove this line once an argument for selectable grid is provisioned for setting the checkbox title 
        formik.setFieldValue(fieldName, selectedIds ?? [])
    }, [JSON.stringify(selectedIds)])

    // if(props.isReloading)
    //     return <div className="fixed z-10 top-1/2 left-1/2 "><Loader /></div>
   
    return (
        <div className="bf_officers">
            <div className="mx-4"><TabTitle title="Associate Officers" /></div>
            <SelectableGrid 
                name={bf_designatedOfficers_gridName} 
                fieldName={fieldName} 
                columns={columns} 
                resource={resource} 
                preSelectedIDs={formik.values[fieldName]} 
                className="m-4" 
                orderBy={[{field: 'firstName', direction: 'Asc' }]}
                link={`${resource}/view`}
            />
        </div>
    )
}
   
export const columns = [
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
        field: 'contactLicenseNumber',
        entityField:'licenseMembers.License.LicenseNumber',
        headerText: 'License Number',
        width: 80,
        isIgnoreInSearch:true
    }
]


export default BFDesignatedOfficersTab

