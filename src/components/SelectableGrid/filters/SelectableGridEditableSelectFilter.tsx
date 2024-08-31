import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import Select from 'react-select'
import { Error } from '../../widgets/Error'
import _ from 'lodash'
import { fetchData } from '../../QueryHelper/QueryHelperSlice'
import { setFilterValue } from '../SelectableGridSlice'

function SelectableGridEditableSelectFilter({ name, filterName, displayName, resource, execQuery }: SelectableGridSearchFieldsSelectType) {
  const dispatch = useDispatch()
  const selectRef: any = useRef({})
  const defaultLabel = `Select ${displayName}`

  const meta: any = useRef({
    selectOptions: undefined
  })
  const pre = meta.current

  const rows: any[] = useSelector((state: any) => {
    return (state?.queryHelper?.[name + filterName]?.contents)
  })

  const selectedValue: string = useSelector((state: any) => {
    return (state?.selectableGrid?.[name]?.[filterName]?.selectedValue)
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
  }, [dispatch, filterName, name, resource])

  if (error) {
    return (<Error error={error} />)
  }

  return (
    <Select
      ref={selectRef}
      options={getOptions()}
      placeholder={defaultLabel}
      onChange={handleSelectChange}
      isLoading={isLoading}
      isClearable={getValue() && getValue().value ? true : false}
      classNames={{
        control: () => 'w-80 font-normal',
      }}
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        option: (defaultStyles: any, state: any) => ({
          ...defaultStyles,
          paddingTop: '2px',
          paddingBottom: '2px',
          fontSize: '14px',
          fontWeight: 'normal'
        }),
        valueContainer: (defaultStyles: any, state: any) => ({
          ...defaultStyles,
          fontSize: '14px',
        }),
      }}
      value={getValue()}
    />
  )

  function getOptions() {
    let options: any[] = []
    if (!_.isEmpty(rows)) {
      options = rows.map((row: any, index: number) => {
        return ({ label: row.name, value: row.id })
      })
    }
    options.unshift({ label: defaultLabel, value: '' })
    pre.selectOptions = options
    return (options)
  }

  function handleSelectChange(e: any) {
    const newValue = e?.value || '';
    const args: any = {
      name: name,
      filterName: filterName,
      selectedValue: newValue
    }
    dispatch(setFilterValue(args))
    execQuery()
  }

  function getValue() {
    const val = selectedValue || ''
    let ret = undefined
    if (pre.selectOptions) {
      ret = pre.selectOptions.find((option: any) => option.value === val)
    }
    return (ret)
  }
}
export { SelectableGridEditableSelectFilter }

type SelectableGridSearchFieldsSelectType = {
  name: string
  filterName: string
  displayName?: string
  resource: string
  execQuery: () => void
}