import clsx from "clsx"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "../QueryHelper/QueryHelperSlice"

function BasicSelect({ className, name, resource, value = '', disabled = false, criteria = [], orderBy = [{ field: 'name', direction: 'Asc' }], displayFieldName = 'name' }: BasicSelectType) {
    const dispatch = useDispatch()
    const items: any[] = useSelector((state: any) => state?.queryHelper[name]?.contents) || []

    useEffect(() => {
        dispatch(fetchData({
            name: name,
            resource: resource,
            queryPayload: {
                pageId: 0,
                pageSize: 10000,
                orderBy: orderBy,
                criteria: criteria
            }
        }))
    }, [dispatch, name, resource])

    return (<select onChange={() => { }} disabled={disabled} className={clsx(className)} value={value}>{getOptions()}</select>)

    function getOptions() {
        const options: any[] = items.map((item: any, index: number) =>
            <option key={index} value={item?.id}>{item?.[displayFieldName]}</option>
        )
        options.unshift(<option value='' key='xxx'>Choose option</option>)
        return (options)
    }
}
export { BasicSelect }

type BasicSelectType = {
    className?: string
    name: string
    resource: string
    value?: string
    disabled?: boolean
    criteria?: any
    orderBy?: any
    displayFieldName?: string
}