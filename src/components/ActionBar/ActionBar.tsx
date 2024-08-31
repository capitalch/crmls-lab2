import clsx from "clsx";
import { useHistory } from "react-router";
import { SaveTypesEnum } from "../../util/helpers";

function ActionBar({ formik = {}, resource, hideSaveButton = false, hideSaveAndCloseButton = false, hideSaveAndNewButton = false }: ActionBarTypes) {
    const { handleSubmit, actions, values, isValid, isSubmitting } = formik
    const clName = 'h-8 px-4 py-1 border border-transparent shadow-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'
    const history = useHistory();
    
    return (<div className="flex items-center gap-1">
        <button type="button" disabled={(!isValid) || (isSubmitting)}
            onClick={handleOnActionSave}
            className={clsx(clName, 'disabled:opacity-40 disabled:pointer-events-none', 'bg-green-400 hover:bg-green-500  focus:ring-green-400 text-white', hideSaveButton ? 'hidden' : '')}>
            Save
        </button>
        <button type="button" disabled={(!isValid) || (isSubmitting)}
            onClick={handleOnActionSaveAndNew}
            className={clsx(clName, ' disabled:opacity-40 disabled:pointer-events-none', 'bg-blue-400 hover:bg-blue-500 focus:ring-green-400 text-white', hideSaveAndNewButton ? 'hidden' : '')}>
            Save & New
        </button>
        <button type="button" disabled={(!isValid) || (isSubmitting)}
            onClick={handleOnActionSaveAndClose}
            className={clsx(clName, 'disabled:opacity-40 disabled:pointer-events-none', 'bg-yellow-400 hover:bg-yellow-500 focus:ring-green-400 text-white', hideSaveAndCloseButton ? 'hidden' : '')}>
            Save & Close
        </button>
        <button type="button"
            onClick={handleOnActionClose}
            className={`${clName} bg-red-400 hover:bg-red-500 focus:ring-green-400 text-white`} >
            Close
        </button>
    </div>)

    function handleOnActionClose() {
        history.push(`/${resource}`)
    }

    async function handleOnActionSave() {
        values.saveType = SaveTypesEnum.SaveOnly
        await handleSubmit(values, actions)
    }

    async function handleOnActionSaveAndClose() {
        values.saveType = SaveTypesEnum.SaveAndClose
        await handleSubmit(values, actions)
    }

    async function handleOnActionSaveAndNew() {
        values.saveType = SaveTypesEnum.SaveAndNew
        await handleSubmit(values, actions)
    }
}

export { ActionBar }

type ActionBarTypes = {
    formik?: any
    resource?: string
    hideSaveButton?: boolean
    hideSaveAndNewButton?: boolean
    hideSaveAndCloseButton?: boolean
}