import clsx from "clsx"
import { useHistory } from "react-router"

function NextButton({ resource, className = '', link = undefined }: NextButtonType) {
    const history = useHistory()
    const btnClassName = 'focus:outline-none inline-flex h-8 items-center rounded-md border border-transparent px-4 py-1 font-medium shadow-md focus:ring-2 focus:ring-offset-2 sm:order-1'
    return (<button onClick={handleOnClick} className={clsx(btnClassName, className, 'bg-blue-400  hover:bg-blue-500  focus:ring-blue-400 focus:bg-blue-500 focus:text-white text-white')}>Next</button>)

    function handleOnClick() {
        if(link){
            history.push(link)
        } else {
            history.push(`/${resource}/new`)
        }
    }
}

export { NextButton }

type NextButtonType = {
    resource: string
    className?: string
    link?: string
}