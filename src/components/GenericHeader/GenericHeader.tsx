import { FC } from "react"
import { MembershipMessages } from "../../util/MembershipMessages"
import { StarIcon } from "@heroicons/react/solid"

function GenericHeader({ title, subTitle, ControlSet, toShowGlobalValidationMessage = false, formik = {}, sideTitle = undefined }: GenericHeaderOptions) {
    const { isValid } = formik
    return (<div >
        <div className="items-center border-b border-divider bg-secondary p-2 align-middle sm:flex sm:p-4">
            <div className="flex flex-col">
                <h1 className="text-xl font-medium leading-6 text-header">{title}</h1>
                {subTitle && <span className="mt-1 text-sm text-secondary">{subTitle}</span>}
            </div>
            {(toShowGlobalValidationMessage && (!isValid)) && <label className="ml-10 flex items-center rounded-sm bg-yellow-50 px-2 py-1 text-sm text-red-400"><StarIcon className="mr-1 h-3 w-4" /> {MembershipMessages.tabValidationErrors}</label>}
            {sideTitle && <label className="ml-10 flex items-center rounded-sm bg-yellow-50 px-2 py-1 text-sm text-blue-500"><StarIcon className="mr-1 h-3 w-4 text-blue-500" /> {sideTitle} </label>}
            {ControlSet && <ControlSet />}
        </div>
    </div>)
}
export { GenericHeader }

type GenericHeaderOptions = {
    title: string
    subTitle?: string
    ControlSet?: FC
    toShowGlobalValidationMessage?: boolean
    formik?: any
    sideTitle?: string
}