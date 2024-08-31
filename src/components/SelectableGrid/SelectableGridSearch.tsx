import SearchIcon from "../widgets/icons/SearchIcon"
import clsx from "clsx"
import ClearIcon from "../widgets/icons/ClearIcon"
import { useDispatch, useSelector } from "react-redux"
import { setSearchText } from "./SelectableGridSlice"
import { debounceEmit, debounceFilterOn } from "../../util/ibuki"
import { IbukiMessages } from "../../util/ibukiMessages"
import { useEffect } from "react"

function SelectableGridSearch({ name, doQuery, className = '' }: SelectableGridSearchType) {
    const dispatch = useDispatch()
    const searchText: string = useSelector((state: any) => state?.selectableGrid[name]?.searchText)

    useEffect(() => {
        const subs1 = debounceFilterOn(IbukiMessages['DebounceSearchTextChanged:SelectableGridSearchText:SelectableGridSearchText'] + name, 1200).subscribe(() => doQuery())
        return (() => { subs1.unsubscribe() })
    }, [name, doQuery])

    return (<div className={clsx(className, 'flex items-center ')}>
        <input type='search' value={searchText || ''} onChange={handleOnSearchTextChanged}
            className="text-sm h-8 rounded-md font-medium border-gray-200 w-72 pr-5" placeholder="Search" />
        <button className="cursor-default -ml-5"><SearchIcon /></button>        
    </div>)

    function handleOnSearchTextChanged(e: any) {
        const args: any = { name: name, searchText: e.target.value }
        dispatch(setSearchText(args))
        debounceEmit(IbukiMessages['DebounceSearchTextChanged:SelectableGridSearchText:SelectableGridSearchText'] + name, undefined)
    }
}

export { SelectableGridSearch }

type SelectableGridSearchType = {
    className?: string
    name: string
    doQuery: () => void
}
