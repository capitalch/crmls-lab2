import { useDispatch, useSelector } from "react-redux"
import { deselectPrimaryOffice, selectPrimaryOffice } from "./PrimaryOfficeSlice"
import { setSelectedIDs, setShowSelectedRows } from "../SelectableGrid/SelectableGridSlice"

function PrimaryOfficeCheckBox({ props
    , officesIDs
    , selectableGridName
    , primaryOfficeName
    , formik
    , validationFieldName
    , isReadOnlyFn = () => false
}: PrimaryOfficeCheckBoxType) {
    const { validateField } = formik
    const primaryOfficeIdSelector = useSelector((state: any) => state?.primaryOffice?.[primaryOfficeName]?.primaryOfficeId)
    const dispatch = useDispatch()

    return (
        <input type="checkbox" disabled={isReadOnlyFn()} checked={isChecked()} className="cursor-pointer disabled:pointer-events-none disabled:opacity-30"
            onChange={(e: any) => handlePrimaryOfficeOnChange(e, props)} />
    )

    function isChecked() {
        // Checked only when id is same as primaryOfficeId (got as selector from redux store)
        const ret: boolean = (props.id === primaryOfficeIdSelector)
        return (ret)
    }

    function handlePrimaryOfficeOnChange(e: any, props: any) {
        if (isReadOnlyFn()) {
            return
        }
        e.stopPropagation(); // To stop the row checkbox from being selected
        const args: any = {
            name: primaryOfficeName,
            id: props.id
        }
        if (e.target.checked) {
            if (!officesIDs.includes(args.id)) {
                const ofIDs = [...officesIDs, args.id]
                const args1: any = {
                    name: selectableGridName,
                    selectedIDs: ofIDs
                }
                // Below both lines are required to show updated data
                dispatch(setSelectedIDs(args1))
                dispatch(setShowSelectedRows(args1))
            }
            dispatch(selectPrimaryOffice(args))
        } else {
            dispatch(deselectPrimaryOffice(args))
        }
        validateField(validationFieldName)
    }
}
export { PrimaryOfficeCheckBox }

type PrimaryOfficeCheckBoxType = {
    props: any
    officesIDs: string[]
    selectableGridName: string
    primaryOfficeName: string
    formik: any
    validationFieldName?: string
    isReadOnlyFn?: () => boolean
}