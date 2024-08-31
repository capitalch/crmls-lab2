import clsx from "clsx"
import { useHistory } from "react-router"

function BackButton({ className = '', link = undefined, callback=undefined }: BackButtonType) {
    const history = useHistory()
    const btnClassName = 'focus:outline-none inline-flex h-8 items-center rounded-md border border-transparent px-4 py-1 font-medium shadow-md focus:ring-2 focus:ring-offset-2 sm:order-1'
    return (<button onClick={handleOnClick} className={clsx(btnClassName, className, 'bg-yellow-400  hover:bg-yellow-500  focus:ring-yellow-400 focus:bg-yellow-500 focus:text-white text-white')}>Back</button>)

    function handleOnClick() {
        if (link) {
            history.push(link)
        }
        if(callback && typeof callback === 'function') {
            callback()
        }
    }
}

export { BackButton }

type BackButtonType = {
    className?: string
    link?: string
    callback?: () => void
}