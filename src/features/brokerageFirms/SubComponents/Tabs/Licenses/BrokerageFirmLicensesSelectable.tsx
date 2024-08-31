import { useSelector } from "react-redux";
import { SelectableGrid } from "../../../../../components/SelectableGrid/SelectableGrid";
import { useEffect } from "react";
import { getLicensesColumns } from "./BrokerageFirmLicenses";
import { useParams } from "react-router";
import { TabTitle } from "../../../../../components/widgets/TabTitle";



export const fieldName = 'licensesIDs'
export const bf_licenses_gridName = 'brokerageFirmLicensesIDs'

function BFLicensesSelectable({formik}:{formik:any}) {
    const { id }:any = useParams()
    const resource = `Licenses/available/brokerageFirm/${id || null}`
    // const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
    const selectedIds: any = useSelector((state: any) => state?.selectableGrid[bf_licenses_gridName]?.selectedIDs)
    
    useEffect(()=>{
        formik.setFieldValue(fieldName, selectedIds ?? [])
    }, [selectedIds])

    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <div className="mx-4"><TabTitle title="Associate Licenses" customError={formik?.errors?.[fieldName]}/></div>
            <SelectableGrid 
                name={bf_licenses_gridName} 
                fieldName={fieldName} 
                columns={getLicensesColumns()} 
                resource={resource} 
                className="m-4" 
                preSelectedIDs={formik.values?.[fieldName]} 
                orderBy={[{field: 'firstName', direction: 'Asc' }]}
                // link={`${resource}/view`}
            />
        </div>
    )
}

export default BFLicensesSelectable