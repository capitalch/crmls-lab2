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



export const resource = 'dbas', fieldName = 'dbaIDs'
export const bf_dba_gridName = 'brokerageFirmDBAIds'

function BFDbasTab({formik}:{formik:any}) {
    
    // const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
    const selectedIds: any = useSelector((state: any) => state?.selectableGrid[bf_dba_gridName]?.selectedIDs)
    
    useEffect(()=>{
        formik.setFieldValue(fieldName, selectedIds ?? [])
    }, [selectedIds])

    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <div className="mx-4"><TabTitle title="Associate DBAs" /></div>
            <SelectableGrid 
                name={bf_dba_gridName} 
                fieldName={fieldName} 
                columns={columns} 
                resource={resource} 
                className="m-4" 
                preSelectedIDs={formik.values?.[fieldName]} 
                // link={`${resource}/view`}
            />
        </div>
    )
}
   
export const columns = [
    {
        field: 'name',
        headerText: 'Name',
        width: 100,
    },
    {
        field: 'address1',
        headerText: 'Address',
        width: 100,
    },
    {
        field: 'city',
        headerText: 'City',
        width: 100,
    },
    {
        field: 'zip',
        headerText: 'ZIP',
        width: 100,
    }
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

export default BFDbasTab