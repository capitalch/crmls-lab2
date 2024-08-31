import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { Error } from "../widgets/Error"
import { fetchData } from "../QueryHelper/QueryHelperSlice"
import { setFilterValue } from "./BasicGridSlice"

function BasicGridSelectFilter({ name, filterName, displayName, resource, execQuery }: BasicGridSelectFilterOption) {
    const dispatch = useDispatch()

    const rows: any[] = useSelector((state: any) => {
        return (state?.queryHelper?.[name + filterName]?.contents)
    })

    const selectedValue: string = useSelector((state: any) => {
        const sv = state?.basicGrid?.[name]?.[filterName]?.selectedValue
        return (sv)
    })

    const error: Error = useSelector((state: any) => {
        return state?.queryHelper?.[name + filterName]?.error
    })

    let isLoading = useSelector((state: any) => state?.queryHelper[name + filterName]?.isLoading)
    isLoading = (isLoading === undefined ? true : isLoading)

    useEffect(() => {
        dispatch(fetchData({
            name: name + filterName,
            resource: resource
        }))
    }, [dispatch, name, filterName, resource])

    if (error) {
        return (<Error error={error} />)
    }

    if (isLoading) {
        return (<div className="text-sm font-medium">Loading...</div>)
    }

    return (
        <select className="text-sm pb-1 pt-1 pl-2 rounded-md border-gray-200" value={selectedValue || ''} onChange={handleSelectChange}>
            <option key={0} value=''>{`Select ${displayName || name}`}</option>
            {getOptions()}
        </select>)

    function getOptions() {
        let options: any[] = []
        if (!_.isEmpty(rows)) {
            options = rows.map((row: any, index: number) => {
                return (<option key={index + 1} value={row.id}>{row.name}</option>)
            })
        }
        return (options)
    }

    function handleSelectChange(e: any) {
        const args: any = {
            name: name,
            filterName: filterName,
            selectedValue: e.target.value
        }
        dispatch(setFilterValue(args))
        execQuery()
    }
}

export { BasicGridSelectFilter }

type BasicGridSelectFilterOption = {
    name: string
    filterName: string
    displayName?: string
    resource: string
    execQuery: () => void
}