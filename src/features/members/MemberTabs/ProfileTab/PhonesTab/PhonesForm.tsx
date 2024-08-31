import { useFormik } from "formik"
import * as Yup from 'yup'
import { MembershipMessages } from "../../../../../util/MembershipMessages"
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import clsx from "clsx"
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons"
import ResetIcon from "../../../../../components/widgets/icons/ResetIcon"
import { CheckIcon } from "@heroicons/react/solid"
import { AstrixComp } from "../../../../../components/widgets/AstrixComp"
import { ErrorComp } from "../../../../../components/widgets/ErrorComp"
import { PhoneNumber } from "../../../../../components/widgets/PhoneNumber"
import { StandardSelect } from "../../../../../components/StandardSelect/StandardSelect"
import { store } from "../../../../../app/store"
import { addRow, resetCurrentRow, setFieldValueForAllRows, updateRow } from "../../../../../components/StandardGrid/StandardGridSlice"
import { ToastError } from "../../../../../components/widgets/ToastError"
import { GlobalContext, GlobalContextType } from "../../../../../app/GlobalContext"

function PhonesForm({ className = '', name }: { className?: string, name: string }) {
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const isReadOnly = globalContext.member.isReadOnly
    const formikPhone = useFormik({
        initialValues: {
            phone: '',
            extension: '',
            phoneTypeID: '',
            phoneTypeName: '',
            isPrimary: false
        },
        validateOnMount: true,
        validationSchema: Yup.object({
            phone: Yup.string().required(MembershipMessages.required).matches(/\d{3}-\d{3}-\d{4}$/, MembershipMessages.phoneNoFormat).matches(/^[^01].*/, MembershipMessages.phoneFormatNotZeroOrOne),
            phoneTypeID: Yup.string().required(MembershipMessages.required),
        }),
        onSubmit: (values, actions) => {
        },
    })

    const dispatch = useDispatch()
    const { errors, getFieldProps, resetForm, setFieldValue, touched, values, setValues, }: any = formikPhone
    const btnClassName = 'h-7 pl-2 pr-4 py-1 align-middle font-medium inline-flex items-center border border-transparent shadow-md text-sm  rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1'

    const currentRow = useSelector((state: any) => {
        const row = state?.standardGrid?.[name]?.currentRow
        return (row)
    })

    useEffect(() => {
        const digitsOnlyPhone = (currentRow?.phone || '').replace(/\D/g, '')
        const formatted = digitsOnlyPhone.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3');
        setValues({
            phone: formatted, 
            extension: currentRow?.extension,
            phoneTypeID: currentRow?.phoneTypeID,
            phoneTypeName: currentRow?.phoneTypeName,
            isPrimary: currentRow?.isPrimary,
            id: currentRow?.id,
            index: currentRow?.index,
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
                        disabled={(!formikPhone.isValid) || isReadOnly}
                        type="button" className={clsx(btnClassName, 'disabled:opacity-40 disabled:pointer-events-none', 'bg-blue-400 hover:bg-blue-500 focus:ring-green-400 text-white')}
                        onClick={handleOnAddOrUpdate}><CheckIcon className="mr-2" />
                        {getIsAddMode() ? 'Add' : 'Update'}
                    </button>
                </div>
            </div>

            {/* phone */}
            <div className="flex flex-col gap-1 mt-8">
                <label htmlFor="phone" className="text-sm font-medium">Phone <AstrixComp /></label>
                <PhoneNumber disabled={isReadOnly} className="h-8 text-sm border-1 border-gray-200 disabled:bg-gray-200" placeholder="Enter phone" {...getFieldProps('phone')} setFieldValue={setFieldValue} value={values?.phone || ''} />                
                {touched.phone && errors.phone ? <ErrorComp error={errors.phone} /> : null}
            </div>

            {/* Extension */}
            <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="extension" className="text-sm font-medium">Extension</label>
                <input disabled={isReadOnly} type="text" className="h-8 text-sm border-1 border-gray-200 disabled:bg-gray-200" placeholder="Enter Extension" {...getFieldProps('extension')} value={values.extension || ''} />
            </div>

            {/* Phone type */}
            <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="phoneTypeID" className="text-sm font-medium">Phone Type <AstrixComp /></label>
                <StandardSelect disabled={isReadOnly} className="disabled:bg-gray-200" formik={formikPhone} name='phoneTypeID' resource="PhoneTypeLookups" value={values.phoneTypeID || ''} selectedTextFieldName='phoneTypeName' />
                {touched.phoneTypeID && errors.phoneTypeID ? <ErrorComp error={errors.phoneTypeID} /> : null}
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
        setFieldValue('phone', '')
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
        setFieldValue('phone', '')
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
            phone: values.phone,
            extension: values.extension,
            phoneTypeID: values.phoneTypeID,
            phoneTypeName: values.phoneTypeName,
            index: values.index,
            isPrimary: values.isPrimary
        }
        if (values.index) { //update
            if (isDuplicateWithDifferentIndex()) {
                ToastError.fire({ title: MembershipMessages.validationError, text: MembershipMessages.phoneExists })
            } else {
                doUpdation(row)
            }
        } else {
            if (isDuplicate()) {
                ToastError.fire({ title: MembershipMessages.validationError, text: MembershipMessages.phoneExists })
            } else {
                doAddition(row)
            }
        }
    }

    function handleOnReset() {
        resetForm()
        const args: any = { name: name }
        dispatch(resetCurrentRow(args))
        setFieldValue('phone', '') // This internally validates the form and sets isValid false. validateForm() method not working
    }

    function isDuplicate() {
        const phoneList = store.getState()?.standardGrid?.[name]?.allRows || []
        const found = phoneList.find((item: any) => item.phone === values.phone)
        return (found)
    }

    function isDuplicateWithDifferentIndex() {
        const phoneList = store.getState()?.standardGrid?.[name]?.allRows || []
        const currPhoneIndex = values.index
        const found = phoneList.find((item: any) => (item.phone === values.phone) && (currPhoneIndex !== item.index))
        return (found)
    }
}

export { PhonesForm }