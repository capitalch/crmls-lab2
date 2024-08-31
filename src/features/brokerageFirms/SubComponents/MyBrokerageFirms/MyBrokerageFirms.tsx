import { useSelector } from "react-redux";
import { OperationCriterias } from "../../../../Interfaces/Criteria";
import { BasicGrid } from "../../../../components/BasicGrid/BasicGrid";
import { FilterOptionsType } from "../../../../components/BasicGrid/BasicGridFilters";
import { BasicGridQueryPanel } from "../../../../components/BasicGrid/BasicGridQueryPanel";
import { QueryLoader } from "../../../../components/QueryLoader/QueryLoader";
import { SelectableGrid } from "../../../../components/SelectableGrid/SelectableGrid";
import Loader from "../../../../components/widgets/Loader"
import { ClaimButton } from "../OtherBrokerageFirms/OtherBrokerageFirms";
import useMyBrokerageFirms, { BF_MY_NAME } from "./useMyBrokerageFirm";
import { formattedProfile } from "../../../user/selectors";

const NAME = 'brokerageFirm-basic-grid-view'

export interface BrokerageFirmListProps{
    aorID:string
    isReloading:boolean
    reloadGrid?:() => void
}
export const bf_resource_name = 'brokerageFirms', fieldName = 'brokerageFirmIds'

function MyBrokerageFirms(props:BrokerageFirmListProps) {
    
    const {formik, loading, error} = useMyBrokerageFirms(props.reloadGrid)
    const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
    const ibukiMessageForQueryAndReset = BF_MY_NAME + 'refresh'
    if(props.isReloading)
        return <div className="fixed z-10 top-1/2 left-1/2 "><Loader /></div>
   
    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <SelectableGrid 
                formik={formik} 
                name={BF_MY_NAME} 
                fieldName={fieldName} 
                columns={BFListColumns} 
                resource={bf_resource_name} 
                className="m-4" 
                preSelectedIDs={[]} 
                // ibukiMessageForQueryAndReset={ibukiMessageForQueryAndReset}
                UserControl={() => <ClaimButton 
                    onClick={formik.handleSubmit} 
                    disabled={formik.values.brokerageFirmIds.length == 0 || !isAorAdmin}
                    text='Release'
                />}
                criteria={[{
                    field:"aorId",
                    op:OperationCriterias.Equal,
                    values:[props.aorID]
                }]}
                link={`${bf_resource_name}/edit`}
            />
        </div>
    )
}
   
export const BFListColumns = [
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

export default MyBrokerageFirms