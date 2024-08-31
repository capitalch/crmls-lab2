import { useDispatch, useSelector } from "react-redux"
import ClearIcon from "../widgets/icons/ClearIcon"
import { debounceEmit, debounceFilterOn } from "../../util/ibuki"
import { useEffect } from "react"
import { IbukiMessages } from "../../util/ibukiMessages"
import { setFilterValue } from "./BasicGridSlice"

function BasicGridTextFilter({ name, filterName, displayName, execQuery }: BasicGridTextFilterOption) {
    const dispatch = useDispatch()
    const selectedValue: string = useSelector((state: any) => {
        return (state?.basicGrid?.[name]?.[filterName]?.selectedValue)
    })

    useEffect(() => {
        const subs1 = debounceFilterOn(IbukiMessages["DebounceTextFilterTextChanged:BasicGrid:BasicGrid"] + name + filterName, 1200).subscribe(execQuery)
        return (() => {
            subs1.unsubscribe()
        })
    }, [filterName, name,])

    return (
        <div className="flex items-center">
            <input type="text" className="rounded-md h-8 text-sm pr-5 border-gray-200" placeholder={displayName || name} value={(selectedValue) || ''} onChange={handleTextChanged} />
            {selectedValue && <button tabIndex={-1} className="h-5 -ml-5 focus:outline-none text-gray-400 tab-in" onClick={handleClear}><ClearIcon /></button>}
        </div>
    )

    function handleClear() {
        const args: any = {
            name: name,
            filterName: filterName,
            selectedValue: ''
        }
        dispatch(setFilterValue(args))
        execQuery()
    }

    function handleTextChanged(e: any) {
        const args: any = {
            name: name,
            filterName: filterName,
            selectedValue: e.target.value
        }
        dispatch(setFilterValue(args))
        debounceEmit(IbukiMessages["DebounceTextFilterTextChanged:BasicGrid:BasicGrid"] + name + filterName, undefined)
    }
}

export { BasicGridTextFilter }

type BasicGridTextFilterOption = {
    name: string
    filterName: string
    displayName?: string
    execQuery: () => void
}

