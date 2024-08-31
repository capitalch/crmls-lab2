import { useFormik } from "formik"
import * as Yup from 'yup'
import { MembershipMessages } from "../../../../util/MembershipMessages"
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import clsx from "clsx"
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons"
import ResetIcon from "../../../../components/widgets/icons/ResetIcon"
import { CheckIcon } from "@heroicons/react/solid"
import { AstrixComp } from "../../../../components/widgets/AstrixComp"
import { ErrorComp } from "../../../../components/widgets/ErrorComp"
import { StandardSelect } from "../../../../components/StandardSelect/StandardSelect"
import { store } from "../../../../app/store"
import { addRow, resetCurrentRow, setFieldValueForAllRows, updateRow } from "../../../../components/StandardGrid/StandardGridSlice"
import { ToastError } from "../../../../components/widgets/ToastError"
import { GlobalContext, GlobalContextType } from "../../../../app/GlobalContext"

function EmailsForm({ className = '', name }: { className?: string, name: string }) {
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const isReadOnly = globalContext.contact.isReadOnly

    const formikEmail = useFormik({
        initialValues: {
            emailAddress: '',
            emailClassID: '',
            emailClassName: '',
            isPreferred: false
        },
        validateOnMount: true,
        validationSchema: Yup.object({
            emailAddress: Yup.string().required(MembershipMessages.required).matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, MembershipMessages.emailInvalid),
            emailClassID: Yup.string().required(MembershipMessages.required),
        }),
        onSubmit: (values, actions) => {
        },
    })

    const dispatch = useDispatch()
    const { errors, getFieldProps, handleReset, resetForm, setFieldValue, touched, values, setValues, }: any = formikEmail
    const btnClassName = 'h-7 pl-2 pr-4 py-1 align-middle font-medium inline-flex items-center border border-transparent shadow-md text-sm  rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1'

    const currentRow = useSelector((state: any) => {
        const row = state?.standardGrid?.[name]?.currentRow
        return (row)
    })

    useEffect(() => {
        setValues({
            emailAddress: currentRow?.emailAddress,
            emailClassID: currentRow?.emailClassID,
            emailClassName: currentRow?.emailClassName,
            isPreferred: currentRow?.isPreferred,
            id: currentRow?.id,
            index: currentRow?.index,
        })
    }, [currentRow])

    return (
        <div className={clsx(className, 'h-full items-center flex-col')}>

            {/* isPreferred reset and add / update buttons */}
            <div className="flex justify-between items-center flex-wrap">
                <CheckBoxComponent disabled={isReadOnly} label='Preferred' {...getFieldProps('isPreferred')} checked={values.isPreferred || false} value={values.isPreferred || false} onChange={(e: any) => { setFieldValue('isPreferred', e.target.checked || false) }} />
                <div className="flex gap-2 flex-wrap row-gap-2">
                    <button type='button' className={clsx(btnClassName, 'bg-gray-400 hover:bg-gray-500 focus:ring-green-400 text-white text')}
                        onClick={handleOnReset}><ResetIcon /> Reset</button>
                    <button
                        disabled={(!formikEmail.isValid) || isReadOnly}
                        type="button" className={clsx(btnClassName, 'disabled:opacity-40 disabled:pointer-events-none', 'bg-blue-400 hover:bg-blue-500 focus:ring-green-400 text-white')}
                        onClick={handleOnAddOrUpdate}><CheckIcon className="mr-2" />
                        {getIsAddMode() ? 'Add' : 'Update'}
                    </button>
                </div>
            </div>

            {/* email */}
            <div className="flex flex-col gap-1 mt-8">
                <label htmlFor="emailAddress" className="text-sm font-medium">Email <AstrixComp /></label>                
                <input disabled={isReadOnly} type="text" className="h-8 text-sm border-1 border-gray-200 disabled:bg-gray-200" placeholder="Enter email" {...getFieldProps('emailAddress')} value={values?.emailAddress || ''} />
                {touched.emailAddress && errors.emailAddress ? <ErrorComp error={errors.emailAddress} /> : null}
            </div>

            {/* Email class */}
            <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="emailClassID" className="text-sm font-medium">Email Class <AstrixComp /></label>
                <StandardSelect disabled={isReadOnly} className="disabled:bg-gray-200" formik={formikEmail} name='emailClassID' resource="EmailClassLookups" value={values.emailClassID || ''} selectedTextFieldName='emailClassName' />
                {touched.emailClassID && errors.emailClassID ? <ErrorComp error={errors.emailClassID} /> : null}
            </div>

        </div>
    )

    function doAddition(row: any) {
        handleIfPreferred()
        const index = (store.getState().standardGrid[name]?.allRows?.length) || 0
        row.index = index + 1
        const args: any = {
            name: name,
            row: row
        }
        dispatch(addRow(args))
        resetForm()
        setFieldValue('emailAddress', '')
    }

    function doUpdation(row: any) {
        handleIfPreferred()
        const args: any = {
            name: name,
            row: row
        }
        dispatch(updateRow(args))
        dispatch(resetCurrentRow(args)) // necessary
        resetForm()
        setFieldValue('emailAddress', '')
    }

    function getIsAddMode() {
        let ret = true
        if (values?.index) {
            ret = false
        }
        return (ret)
    }

    function handleIfPreferred() {
        if (values['isPreferred']) {
            const args: any = {
                name: name,
                fieldName: 'isPreferred',
                fieldValue: false
            }
            dispatch(setFieldValueForAllRows(args))
        }
    }

    function handleOnAddOrUpdate() {
        const row = {
            emailAddress: values.emailAddress,
            emailClassID: values.emailClassID,
            emailClassName: values.emailClassName,
            index: values.index,
            isPreferred: values.isPreferred
        }
        if (values.index) { //update
            if (isDuplicateWithDifferentIndex()) {
                ToastError.fire({ title: MembershipMessages.validationError, text: MembershipMessages.emailExists })
            } else {
                doUpdation(row)
            }
        } else {
            if (isDuplicate()) {
                ToastError.fire({ title: MembershipMessages.validationError, text: MembershipMessages.emailExists })
            } else {
                doAddition(row)
            }
        }
    }

    function handleOnReset() {
        resetForm()
        const args: any = { name: name }
        dispatch(resetCurrentRow(args))
        setFieldValue('emailAddress', '') // This internally validates the form and sets isValid false. validateForm() method not working
    }

    function isDuplicate() {
        const emailList = store.getState()?.standardGrid?.[name]?.allRows || []
        const found = emailList.find((item: any) => item.emailAddress === values.emailAddress)
        return (found)
    }

    function isDuplicateWithDifferentIndex() {
        const emailList = store.getState()?.standardGrid?.[name]?.allRows || []
        const currEmailIndex = values.index
        const found = emailList.find((item: any) => (item.emailAddress === values.emailAddress) && (currEmailIndex !== item.index))
        return (found)
    }

}
export { EmailsForm }