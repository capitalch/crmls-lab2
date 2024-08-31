import clsx from "clsx"
import { useHistory } from "react-router"

function NewButton({ resource, className = '', link = undefined }: NewButtonType) {
    const history = useHistory()
    const btnClassName = 'focus:outline-none inline-flex h-8 items-center rounded-md border border-transparent px-4 py-1 font-medium shadow-md focus:ring-2 focus:ring-offset-2 sm:order-1'
    return (<button onClick={handleOnClick} className={clsx(btnClassName, className, 'bg-green-400  hover:bg-green-500  focus:ring-green-400 focus:bg-green-500 focus:text-white text-white')}>New</button>)

    function handleOnClick() {
        if(link){
            history.push(link)
        } else {
            history.push(`/${resource}/new`)
        }
    }
}

export { NewButton }

type NewButtonType = {
    resource: string
    className?: string
    link?: string
}