import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid"
import { useDispatch, useSelector } from "react-redux"
import {
    setFiltersVisible,
} from "./BasicGridSlice"
// import _ from 'lodash'

function BasicGridToggleFilter({ name, className = '', resetQueryFilters }: { name: string, className?: string, resetQueryFilters: () => void }) {
    const dispatch = useDispatch()
    const areFiltersVisible = useSelector((state: any) => Boolean(state?.basicGrid[name]?.areFiltersVisible))

    const upIconClass = areFiltersVisible ? 'block' : 'hidden'
    const downIconClass = areFiltersVisible ? 'hidden' : 'block'

    return (<div className="flex items-center mr-3 font-medium text-md text-blue-400 cursor-pointer hover:text-blue-600 rounded-md px-2" onClick={handleToggle} >
        <ChevronUpIcon className={`${upIconClass} h-6 w-6 `} />
        <ChevronDownIcon className={`${downIconClass} h-6 w-6 `} />
        <span>Filters</span>
    </div>)

    function handleToggle() {
        // Clear the filters when filter panel is made invisible
        if (areFiltersVisible) {
            resetQueryFilters();
        }
        const args: any = {
            name: name,
            areFiltersVisible: !areFiltersVisible
        }
        dispatch(setFiltersVisible(args))
    }
}

export { BasicGridToggleFilter }