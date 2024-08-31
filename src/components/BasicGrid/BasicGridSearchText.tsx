import { useDispatch, useSelector } from "react-redux"
import ClearIcon from "../widgets/icons/ClearIcon"
import SearchIcon from "../widgets/icons/SearchIcon"
import { setSearchTextValue } from "./BasicGridSlice"
import { useEffect } from "react"
import { debounceEmit, debounceFilterOn } from "../../util/ibuki"
import { IbukiMessages } from "../../util/ibukiMessages"

function BasicGridSearchText({ name, className = '', execQuery }: { name: string, className?: string, execQuery: () => void }) {
    const dispatch = useDispatch()
    const searchTextValue: string = useSelector((state: any) => state?.basicGrid[name]?.searchTextValue)

    useEffect(() => {
        const subs1 = debounceFilterOn(IbukiMessages['DebounceSearchTextChanged:BasicGridSearchText:BasicGridSearchText'] + name, 1200).subscribe(execQuery)
        return (() => {
            subs1.unsubscribe()
        })
    }, [])

    return (
        <div className={`${className} flex items-center`}>
            <input type='search' value={searchTextValue || ''} onChange={handleOnSearchTextChanged}
                className="text-sm h-8 rounded-md font-medium border-gray-200 w-64 pr-6" placeholder="Search" />
            <button className="cursor-default -ml-6" disabled><SearchIcon /></button>
            {/* <button className="-ml-9"><ClearIcon className="text-gray-400" onClick={handleClear} /></button> */}
        </div>)

    // function handleClear() {
    //     const args: any = {
    //         name: name,
    //         searchTextValue: ''
    //     }
    //     dispatch(setSearchTextValue(args))
    //     execQuery()
    // }

    function handleOnSearchTextChanged(e: any) {
        const args: any = { name: name, searchTextValue: e.target.value }
        dispatch(setSearchTextValue(args))
        debounceEmit(IbukiMessages['DebounceSearchTextChanged:BasicGridSearchText:BasicGridSearchText'] + name, undefined)
    }
}

export { BasicGridSearchText }