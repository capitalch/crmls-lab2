import clsx from "clsx";
import { useHistory } from "react-router";
import { SaveTypesEnum } from "../../../util/helpers";

function BrokerageFirmActionBar({ resource, handleOnActionSave: onSave, formik, isValid, hideSaveButton = false, hideSaveAndCloseButton = false, hideSaveAndNewButton = false }: ActionBarTypes) {
    const { values, isSubmitting } = formik
    const className = 'h-8 inline-flex items-center px-4 py-1 border border-transparent shadow-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1'

    const history = useHistory();
    return (<div className="flex gap-1  items-center ml-auto">
        <button type="button" disabled={(!isValid) || (isSubmitting)}
            onClick={handleOnActionSave}
            className={clsx(className,'disabled:opacity-40 disabled:pointer-events-none', 'bg-green-400 hover:bg-green-500  focus:ring-green-400 text-white', hideSaveButton ? 'hidden' : '')}
        >
            Save
        </button>
        <button type="button" disabled={(!isValid) || (isSubmitting)}
            onClick={handleOnActionSaveAndNew}
            className={clsx(className,'disabled:opacity-40 disabled:pointer-events-none', 'bg-blue-400 hover:bg-blue-500 focus:ring-green-400 text-white', hideSaveAndNewButton ? 'hidden' : '')}>
            Save & New
        </button>
        <button type="button" disabled={(!isValid) || (isSubmitting)}
            onClick={handleOnActionSaveAndClose}
            className={clsx(className,'disabled:opacity-40 disabled:pointer-events-none', 'bg-yellow-400 hover:bg-yellow-500 focus:ring-green-400 text-white', hideSaveAndCloseButton ? 'hidden' : '')}>
            Save & Close
        </button>
        <button type="button"
            onClick={handleOnActionClose}
            className={`${className} bg-red-400 hover:bg-red-500 focus:ring-green-400 text-white`} >
            Close
        </button>
    </div>)

    function handleOnActionClose() {
        history.push(`/${resource}`)
    }

    function handleOnActionSave() {
        formik.setFieldValue("saveType", SaveTypesEnum.SaveOnly)
        onSave()
    }
    function handleOnActionSaveAndNew() {
        formik.setFieldValue("saveType", SaveTypesEnum.SaveAndNew)
        onSave()
    }

    function handleOnActionSaveAndClose() {
        formik.setFieldValue("saveType", SaveTypesEnum.SaveAndClose)
        onSave()
    }


}

export default BrokerageFirmActionBar

type ActionBarTypes = {
    resource: string
    handleOnActionSave: () => void
    formik:any
    isValid:any
    hideSaveButton?: boolean
    hideSaveAndNewButton?: boolean
    hideSaveAndCloseButton?: boolean
}