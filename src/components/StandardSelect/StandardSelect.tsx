import { useContext, useEffect } from "react"
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "../QueryHelper/QueryHelperSlice"
import { QueryPayloadType } from "../../Interfaces/QueryPayloadType"
import { Error } from "../widgets/Error"
import clsx from "clsx"
import { standardSelectOnChange } from "./StandardSelectSlice"
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext"

function StandardSelect({
    formik
    , name
    , payload = {}
    , resource
    , value
    , disabled
    , selectedTextFieldName
    , criteria = []
    , className = ''
    , onChangeParentCallback = undefined
    , isOnChangeParentCallbackPassOptionName = false
}: StandardSelectType) {
    const dispatch = useDispatch()
    const { getFieldProps, setFieldValue, touched, } = formik
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const isLoading = useSelector((state: any) => {
        const isLoading = state?.queryHelper?.[name]?.isLoading
        return ((isLoading === undefined) ? true : isLoading)
    })
    const data = useSelector((state: any) => {
        return (state?.queryHelper?.[name]?.contents)
    })
    const error = useSelector((state: any) => {
        return (state?.queryHelper?.[name]?.error)
    })

    useEffect(() => {
        dispatchData()
    }, [dispatch, name, resource,])

    useEffect(() => {
        globalContext.office.standardSelect[name] = dispatchData
    }, [])

    if (error) {
        return (<Error error={error} />)
    }

    if (isLoading) {
        return (<div className="text-sm font-medium">Loading...</div>)
    }

    return (<select {...getFieldProps()} name={name} className={clsx(className, "h-8 py-1 text-sm border-1 border-gray-200 hover:border-gray-300")} onChange={handleOnChange} value={value} disabled={disabled}  >
        {getOptions()}
    </select>)

    function dispatchData(crit?: any) {
        const defaultPayload: QueryPayloadType = {
            pageSize: 500,
            criteria: crit || criteria,
            orderBy: [{ field: 'name', direction: 'asc' }]
        }
        dispatch(fetchData({
            name: name,
            resource: resource,
            queryPayload: defaultPayload
        }))
    }

    function handleOnChange(e: any) {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const optionName = selectedOption?.text

        if (selectedTextFieldName) {
            setFieldValue(selectedTextFieldName, (optionName === 'Choose option') ? '' : optionName);
        }
        setFieldValue(name, e.target.value)
        touched[name] = true

        if (onChangeParentCallback) {
            if (isOnChangeParentCallbackPassOptionName) {
                onChangeParentCallback((optionName === 'Choose option') ? '' : optionName)
            } else {
                onChangeParentCallback(e.target.value)
            }
        }

        const args: any = {
            name: name,
            selectedId: e.target.value,
            selectedName: optionName
        }
        dispatch(standardSelectOnChange(args))
    }

    function getOptions() {
        let options: any[] = []
        if (!(_.isEmpty(data)) && data.length > 0) {

            options = data.map((item: any, index: number) => {
                return (<option key={index + 1} value={item.id}>{item.name}</option>)
            })
        }

        options.unshift(<option key={0} value=''>Choose option</option>)
        return (options)
    }

}
export { StandardSelect }

type StandardSelectType = {
    formik: any
    name: string
    payload?: any
    resource: string
    value?: string
    disabled?: boolean
    selectedTextFieldName?: string
    criteria?: any
    className?: string

    onChangeParentCallback?: (value: any) => void
    , isOnChangeParentCallbackPassOptionName?: boolean
}