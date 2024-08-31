import { BasicGridSelectOptionType, SelectableGridSelectFilter } from './SelectableGridSelectFilter'
import ResetIcon from '../../widgets/icons/ResetIcon';
import { useSelector } from 'react-redux';
import { SelectableGridTextFilter } from './SelectableGridTextFilter';
import { SelectableGridEditableSelectFilter } from './SelectableGridEditableSelectFilter';

function SelectableGridFilters({ name, resource, filters, className, execQuery, resetQueryFilters }: SelectableGridFiltersType) {

    const isAnySelectedValue = useSelector((state: any) => {
        const selectableGridState = state.selectableGrid[name]
        const isAnySelected = filters.find((filter: FilterOptionsType) => selectableGridState?.[filter.name]?.selectedValue)
        return (isAnySelected)
    })

    const areFiltersVisible = useSelector((state: any) => {
        const ret = state?.selectableGrid[name]?.areFiltersVisible
        return (ret)
    })

    const clsName = areFiltersVisible ? 'flex' : 'hidden'

    return (
        <div className={`${className} ${clsName} flex-wrap gap-2  items-center mt-4 justify-center md:justify-between`}>
            {<button disabled={!isAnySelectedValue} onClick={resetQueryFilters} className='
                    disabled:opacity-0 order-0 h-8 inline-flex items-center px-3 border border-transparent shadow-sm text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-4'>
                <ResetIcon />
                Reset Filters</button>}
            <div className='flex gap-2 flex-wrap'>
                {getControls()}
            </div>
        </div>
    );

    function getControls() {
        const controls = filters.map((filter: FilterOptionsType, index: number) => {
            let Ctrl: any = <></>
            if (filter.controlType === 'select') {
                Ctrl = <SelectableGridSelectFilter key={index} name={name} displayName={filter.displayName} filterName={filter.name} resource={filter.resource || ''} execQuery={execQuery} selectOptionsArray={filter.selectOptionsArray} />
            } else if (filter.controlType === 'text') {
                Ctrl = <SelectableGridTextFilter key={index} name={name} displayName={filter.displayName} filterName={filter.name} execQuery={execQuery} />
            } else if (filter.controlType === 'editableSelect') {
                Ctrl = <SelectableGridEditableSelectFilter key={index} name={name} displayName={filter.displayName} filterName={filter.name} resource={filter.resource || ''} execQuery={execQuery} />
            }
            return (Ctrl)
        })
        return (controls)
    }
}

export { SelectableGridFilters }

export type FilterOptionsType = {
    controlType: 'select' | 'text' | 'editableSelect'
    name: string
    displayName?: string
    resource?: string
    filterFieldName: string
    entityFieldName?: string
    selectOptionsArray?: BasicGridSelectOptionType[]
}

export type SelectableGridFiltersType = {
    name: string
    resource: string
    filters: FilterOptionsType[]
    className?: any
    execQuery: () => void
    resetQueryFilters: () => void
}