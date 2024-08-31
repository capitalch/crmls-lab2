import clsx from "clsx";
import { useHistory } from "react-router";

function NewButton({ resource }: NewButtonProp) {
    const isValid = true, isSubmitting = false
    const className = 'h-8 inline-flex items-center px-4 py-1 mr-2 border border-transparent shadow-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1'
    const history = useHistory();
    return (<div className="flex gap-1  items-center ml-auto">
        <button type="button" disabled={(!isValid) || (isSubmitting)}
            onClick={goToEdit}
            className={clsx(className, ' bg-green-400 hover:bg-green-500 focus:ring-green-400 text-white')}>
            New
        </button>
    </div>)

    function goToEdit() {
        history.push(`/${resource}/new`)
    }
}

export default NewButton

type NewButtonProp = {
    resource: string
}