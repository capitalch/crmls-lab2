import { useFormik } from "formik"
import * as Yup from 'yup'
import { MembershipMessages } from "../../../../util/MembershipMessages"
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons"
import clsx from "clsx"
import { AstrixComp } from "../../../../components/widgets/AstrixComp"
import { ErrorComp } from "../../../../components/widgets/ErrorComp"
import { StandardSelect } from "../../../../components/StandardSelect/StandardSelect"
import { ZipCode } from "../../../../components/widgets/ZipCode"
import { CheckIcon } from "../../../../components/widgets/icons/CheckIcon"
import ResetIcon from "../../../../components/widgets/icons/ResetIcon"
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import { addRow, resetCurrentRow, setFieldValueForAllRows, updateRow } from "../../../../components/StandardGrid/StandardGridSlice"
import { store } from "../../../../app/store"
import { ToastError } from "../../../../components/widgets/ToastError"
import { GlobalContext, GlobalContextType } from "../../../../app/GlobalContext"

function AddressesForm({ className = '', name }: { className?: string, name: string }) {
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const isReadOnly = globalContext.contact.isReadOnly
    const formikAddr = useFormik({
        initialValues: {
            address1: '',
            address2: '',
            city: '',
            stateID: '',
            stateName: '',
            zipcode: '',
            addressTypeID: '',
            addressTypeName: '',
            isPrimary: false
        },
        validateOnMount: true,
        validationSchema: Yup.object({
            address1: Yup.string().required(MembershipMessages.required),
            city: Yup.string().required(MembershipMessages.required),
            stateID: Yup.string().required(MembershipMessages.required),
            zipcode: Yup.string().required(MembershipMessages.required).matches(/\b\d{5}\b/, MembershipMessages.zip5Digit),
            addressTypeID: Yup.string().required(MembershipMessages.required)
        }),
        onSubmit: (values, actions) => {
        },
    })

    const dispatch = useDispatch()
    const { errors, getFieldProps, resetForm, setFieldValue, touched, values, setValues, }: any = formikAddr
    const btnClassName = 'h-7 pl-2 pr-4 py-1 align-middle font-medium inline-flex items-center border border-transparent shadow-md text-sm  rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1'

    const currentRow = useSelector((state: any) => {
        const row = state?.standardGrid?.[name]?.currentRow
        return (row)
    })

    useEffect(() => {
        setValues({
            address1: currentRow?.address1,
            address2: currentRow?.address2,
            city: currentRow?.city,
            stateID: currentRow?.stateID,
            stateName: currentRow?.stateName,
            zipcode: currentRow?.zipcode,
            isPrimary: currentRow?.isPrimary,
            addressTypeID: currentRow?.addressTypeID,
            addressTypeName: currentRow?.addressTypeName,
            id: currentRow?.id,
            index: currentRow?.index
        })
    }, [currentRow])

    return (
        <div className={clsx(className, 'h-full items-center flex-col')}>

            {/* isPrimary reset and add / update buttons */}
            <div className="flex justify-between items-center flex-wrap">
                <CheckBoxComponent disabled={isReadOnly} label='Primary' {...getFieldProps('isPrimary')} checked={values.isPrimary || false} value={values.isPrimary || false} onChange={(e: any) => { setFieldValue('isPrimary', e.target.checked || false) }} />
                <div className="flex gap-2 flex-wrap row-gap-2">
                    <button type='button' className={clsx(btnClassName, 'bg-gray-400 hover:bg-gray-500 focus:ring-green-400 text-white text')}
                        onClick={handleOnReset}><ResetIcon /> Reset</button>
                    <button
                        disabled={(!formikAddr.isValid) || isReadOnly}
                        type="button" className={clsx(btnClassName, 'disabled:opacity-40 disabled:pointer-events-none', 'bg-blue-400 hover:bg-blue-500 focus:ring-green-400 text-white')}
                        onClick={handleOnAddOrUpdate}><CheckIcon className="mr-2" />
                        {getIsAddMode() ? 'Add' : 'Update'}
                    </button>
                </div>
            </div>

            {/* Address1 */}
            <div className="flex flex-col gap-1 mt-8">
                <label htmlFor="address1" className="text-sm font-medium">Address 1 <AstrixComp /></label>
                <input disabled={isReadOnly} type="text" className="h-8 text-sm border-1 border-gray-200 disabled:bg-gray-200" placeholder="Enter Address1" {...getFieldProps('address1')} value={values?.address1 || ''} />
                {touched.address1 && errors.address1 ? <ErrorComp error={errors.address1} /> : null}
            </div>

            {/* Address2 */}
            <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="address2" className="text-sm font-medium">Address 2</label>
                <input disabled={isReadOnly} type="text" className="h-8 text-sm border-1 border-gray-200 disabled:bg-gray-200" placeholder="Enter Address2" {...getFieldProps('address2')} value={values.address2 || ''} />
            </div>

            {/* City */}
            <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="city" className="text-sm font-medium">City <AstrixComp /></label>
                <input disabled={isReadOnly} type="text" className="h-8 text-sm border-1 border-gray-200 disabled:bg-gray-200" placeholder="Enter City" {...getFieldProps('city')} value={values.city || ''} />
                {touched.city && errors.city ? <ErrorComp error={errors.city} /> : null}
            </div>

            {/* state  */}
            <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="stateID" className="text-sm font-medium">State <AstrixComp /></label>
                <StandardSelect disabled={isReadOnly} className="disabled:bg-gray-200" formik={formikAddr} name='stateID' resource="StateLookups" value={values.stateID || ''} selectedTextFieldName='stateName' />
                {touched.stateID && errors.stateID ? <ErrorComp error={errors.stateID} /> : null}
            </div>

            {/* zipcode  */}
            <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="zipcode" className="text-sm font-medium">Zip <AstrixComp /></label>
                <ZipCode disabled={isReadOnly} className="h-8 text-sm border-1 border-gray-200 disabled:bg-gray-200" placeholder="Enter Zip" setFieldValue={setFieldValue}  {...getFieldProps('zipcode')} value={values.zipcode || ''} />
                {touched.zipcode && errors.zipcode ? <ErrorComp error={errors.zipcode} /> : null}
            </div>

            {/* Address type */}
            <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="addressTypeID" className="text-sm font-medium">Address Type <AstrixComp /></label>
                <StandardSelect disabled={isReadOnly} className="disabled:bg-gray-200" formik={formikAddr} name='addressTypeID' resource="AddressTypeLookups" value={values.addressTypeID || ''} selectedTextFieldName='addressTypeName' />
                {touched.addressTypeID && errors.addressTypeID ? <ErrorComp error={errors.addressTypeID} /> : null}
            </div>

        </div>
    )

    function doAddition(row: any) {
        handleIfPrimary()
        const index = (store.getState().standardGrid[name]?.allRows?.length) || 0
        row.index = index + 1
        const args: any = {
            name: name,
            row: row
        }
        dispatch(addRow(args))
        resetForm()
        setFieldValue('address1', '')
    }

    function doUpdation(row: any) {
        handleIfPrimary()
        const args: any = {
            name: name,
            row: row
        }
        dispatch(updateRow(args))
        dispatch(resetCurrentRow(args)) // necessary
        resetForm()
        setFieldValue('address1', '')
    }

    function getIsAddMode() {
        let ret = true
        if (values?.index) {
            ret = false
        }
        return (ret)
    }

    function handleIfPrimary() {
        if (values['isPrimary']) {
            const args: any = {
                name: name,
                fieldName: 'isPrimary',
                fieldValue: false
            }
            dispatch(setFieldValueForAllRows(args))
        }
    }

    function handleOnAddOrUpdate() {
        const row = {
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            stateID: values.stateID,
            stateName: values.stateName,
            zipcode: values.zipcode,
            addressTypeID: values.addressTypeID,
            addressTypeName: values.addressTypeName,
            index: values.index,
            isPrimary: values.isPrimary
        }
        if (values.index) { //update
            if (isisDuplicateWithDifferentIndex()) {
                ToastError.fire({ title: MembershipMessages.validationError, text: MembershipMessages.addressExists })
            } else {
                doUpdation(row)
            }
        } else {
            if (isDuplicate()) {
                ToastError.fire({ title: MembershipMessages.validationError, text: MembershipMessages.addressExists })
            } else {
                doAddition(row)
            }
        }
    }

    function handleOnReset() {
        resetForm()
        const args: any = { name: name }
        dispatch(resetCurrentRow(args))
        setFieldValue('address1', '') // This internally validates the form and sets isValid false. validateForm() method not working
    }

    function isDuplicate() {
        const currAddress = `${(values.address1 || '').trim()}${(values.address2 || '').trim()}${(values.city || '').trim()}${values.stateName}${values.zipcode}${values.addresstypeName}`
        const addressList = store.getState()?.standardGrid?.[name]?.allRows || []
        const found = addressList.find((item: any) => {
            const addr = `${(item.address1 || '').trim()}${(item.address2 || '').trim()}${(item.city || '').trim()}${item.stateName}${item.zipcode}${item.addresstypeName}`
            return (addr.toLowerCase() === currAddress.toLowerCase())
        })
        return (found)
    }

    function isisDuplicateWithDifferentIndex() {
        const currAddress = `${(values.address1 || '').trim()}${(values.address2 || '').trim()}${(values.city || '').trim()}${values.stateName}${values.zipcode}${values.addresstypeName}`
        const addressList = store.getState()?.standardGrid?.[name]?.allRows || []
        const currAddressIndex = values.index
        const found = addressList.find((item: any) => {
            const addr = `${(item.address1 || '').trim()}${(item.address2 || '').trim()}${(item.city || '').trim()}${item.stateName}${item.zipcode}${item.addresstypeName}`
            return ((addr.toLowerCase() === currAddress.toLowerCase()) && (currAddressIndex !== item.index))
        })
        return (found)
    }
}
export { AddressesForm }