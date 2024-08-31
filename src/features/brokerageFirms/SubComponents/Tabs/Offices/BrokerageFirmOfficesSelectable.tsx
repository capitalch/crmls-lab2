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
import { setSelectedIDs, setShowSelectedRows } from "../../../../../components/SelectableGrid/SelectableGridSlice";
import { getOfficeColumns } from "./BrokerageFirmOfficesSimple";
import { bf_main_office_fieldname } from "./BFMainOfficeSelector";
import { TabTitle } from "../../../../../components/widgets/TabTitle";
import { useParams } from "react-router";



export const bf_offices_resource_name = 'offices'
export const bf_offices_gridName = `brokerageFirm_officesIDs`

function BFOfficesTab({ formik }: { formik: any }) {
    const fieldName = `officesIDs`

    // const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
    const selectedIds: any = useSelector((state: any) => state?.selectableGrid[bf_offices_gridName]?.selectedIDs)
    const mainOfficeID: string = formik.values?.[bf_main_office_fieldname]
    const { id }:any = useParams()
    const systemOfRecordIsManual = formik.values && formik.values.systemOfRecordID == 1
    const isReadOnly = !systemOfRecordIsManual && id

    const dispatch = useDispatch()

    const updateGrid = (selectedIDs:any[]) =>{
        const args: any = { name: bf_offices_gridName, selectedIDs }
        dispatch(setSelectedIDs(args))
    }

    const reloadGrid = () => {
        const args2: any = { name: bf_offices_gridName }
        dispatch(setShowSelectedRows(args2))
    }

    useEffect(() => {
        formik.setFieldValue(fieldName, selectedIds ?? [])
        selectedIds && onChangeOfficeIDs_removeMainOffice_ifNotInNewOfficeIDs(selectedIds)
    }, [selectedIds])


    const onChangeOfficeIDs_removeMainOffice_ifNotInNewOfficeIDs = (newOfficeIDs: string[]) => {
        if (newOfficeIDs && !newOfficeIDs.includes(formik.values?.[bf_main_office_fieldname])) {
            formik.setFieldValue(bf_main_office_fieldname, "")
        }
    }

    const onChangeMainOfficeID_addMainOfficeIds_fromOfficesList = (newMainOfficeID: string) => {
        const officesAlreadyIncluesNewMainOffice = selectedIds?.includes(newMainOfficeID)
        if (selectedIds && !officesAlreadyIncluesNewMainOffice) {
            formik.setFieldValue(fieldName, [...selectedIds, newMainOfficeID])
            updateGrid([...selectedIds, newMainOfficeID])
            reloadGrid()
        }
    }

    useEffect(() => {
        //syncing main office along with office IDs
        mainOfficeID && onChangeMainOfficeID_addMainOfficeIds_fromOfficesList(mainOfficeID)
    }, [mainOfficeID])

    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <div className="mx-4"><TabTitle title="Associate Offices" /></div>
            <SelectableGrid
                name={bf_offices_gridName}
                fieldName={fieldName}
                columns={getOfficeColumns()}
                resource={bf_offices_resource_name}
                className="m-4"
                preSelectedIDs={formik.values?.[fieldName]}
                isReadOnlyFn={() => isReadOnly}
                link={`${bf_offices_resource_name}/edit`}
            />
        </div>
    )
}

export default BFOfficesTab