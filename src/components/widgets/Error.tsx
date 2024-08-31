import clsx from "clsx"
import { Messages } from "../../util/messages"

function Error({ error, className }: { error?: Error, className?: string }) {
    return (
        // <div className="ml-4 text-red-500">{`${Messages.errorMessage}. ${error?.message || ''}`}</div>
        <div className={clsx(className, "ml-4 text-sm text-red-500")}>{`${Messages.shortErrorMessage}. ${error?.message || ''}`}</div>
    )
}
export { Error }