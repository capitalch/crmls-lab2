import { useDispatch, useSelector } from "react-redux";
import { OperationCriterias } from "../../../../../../Interfaces/Criteria";
import { FilterOptionsType } from "../../../../../../components/BasicGrid/BasicGridFilters";
import { SelectableGrid } from "../../../../../../components/SelectableGrid/SelectableGrid";
import { bf_resource_name as brokerageFirmResourceName} from "../../../MyBrokerageFirms/MyBrokerageFirms"
import { useEffect } from "react";
import { setSelectedIDs, setShowSelectedRows } from "../../../../../../components/SelectableGrid/SelectableGridSlice";
import useGrid from "../../../../../../util/useClearGrid";

export const resource = 'offices', fieldName = 'mainOfficeID'
export const gridName = 'brokerageFirmOffices'

function BFOfficesSelectableTab({formik}:{formik:any}) {
    
    // const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
    const selectedIds: any = useSelector((state: any) => state?.selectableGrid[gridName]?.selectedIDs)
    const brokerageFirm: any = useSelector((state: any) => state?.queryHelper[brokerageFirmResourceName]?.contents)
    const dispatch = useDispatch()

    const reloadGrid = () => {
        const args2: any = { name: gridName }
        dispatch(setShowSelectedRows(args2))
    }

    const setLastSelectionAsMainOffice = () =>{
        const args: any = { name: gridName, selectedIDs: [selectedIds?.[selectedIds.length-1]] }
        dispatch(setSelectedIDs(args))
    }

    useGrid({gridName})

    useEffect(()=>{
        addTextToCheckboxHeaderElement("bf_offices","Main Office")//Can remove this line once an argument for selectable grid is provisioned for setting the checkbox title 
    })

    useEffect(()=>{
        if(selectedIds && selectedIds.length >0){
            setLastSelectionAsMainOffice()
            // reloadGrid()
            formik.setFieldValue(fieldName, selectedIds?.[selectedIds.length-1] ?? "")
        }else{
            formik.setFieldValue(fieldName, "")
        }

    }, [selectedIds])

    return (
        <div className="bf_offices">
             {brokerageFirm?.officesIDs?.length ? <SelectableGrid 
                name={gridName} 
                fieldName={fieldName} 
                columns={columns} 
                resource={resource} 
                className="m-4" 
                preSelectedIDs={formik.values[fieldName]} 
                // link={`${resource}/view`}
                criteria={[{
                    field: 'id',
                    op: OperationCriterias.Equal,
                    values: brokerageFirm?.officesIDs || []
                }]}
            /> : <div className="m-5">Firm has no offices associated with it</div>}
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

export const addTextToCheckboxHeaderElement = (css:string, text:string) => {
    const checkBoxHeaderElement = document.querySelector(`.${css} .e-headercell`)
    if(checkBoxHeaderElement) checkBoxHeaderElement.innerHTML = text
}


export default BFOfficesSelectableTab