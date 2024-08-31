import { OperationCriterias } from "../../../../Interfaces/Criteria"
import { BFListColumns, BrokerageFirmListProps, fieldName, bf_resource_name } from "../MyBrokerageFirms/MyBrokerageFirms"
import useOtherBrokerageFirms, { BF_OTHER_NAME } from "./useOtherBrokerageFirms"
import Loader from "../../../../components/widgets/Loader"
import { SelectableGrid } from "../../../../components/SelectableGrid/SelectableGrid"
import { useSelector } from "react-redux"
import { formattedProfile } from "../../../user/selectors"


function OtherBrokerageFirms(props:BrokerageFirmListProps) {


    const {formik, loading, error} = useOtherBrokerageFirms(props.reloadGrid)
    const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin

    if(props.isReloading)
        return <div className="fixed z-10 top-1/2 left-1/2 "><Loader /></div>

    return (
    <div>
        <SelectableGrid 
            formik={formik} 
            name={BF_OTHER_NAME} 
            fieldName={fieldName} 
            columns={BFListColumns} 
            resource={bf_resource_name} 
            className="m-4" 
            preSelectedIDs={[]} 
            UserControl={() => <ClaimButton 
                onClick={formik.handleSubmit} 
                disabled={formik.values.brokerageFirmIds.length == 0 || !isAorAdmin}
                text='Claim'
            />}
            criteria={[{
                field:"aorId",
                op:OperationCriterias.NotEqual,
                values:[props.aorID]
            }]}
            link={`${bf_resource_name}/view`}
        />
    </div>)
}

export default OtherBrokerageFirms 

export const ClaimButton = ({onClick, disabled, text}:{onClick:()=>void, disabled:boolean, text:string}) => {
    return <button 
                className="border-2 px-2 shadow-sm h-7 text-sm font-medium rounded-md bg-red-400 hover:bg-red-600 hover:border-red-700 border-red-600 focus:outline-none focus:ring-1 text-white disabled:opacity-40 disabled:pointer-events-none disabled:cursor-default" 
                disabled={disabled}
                onClick={() => onClick()}
            >
                {text}
            </button>
}
