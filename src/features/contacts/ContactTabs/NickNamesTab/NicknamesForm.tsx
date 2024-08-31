import { useFormik } from "formik"
import * as Yup from 'yup'
import { MembershipMessages } from "../../../../util/MembershipMessages"
import { store, useAppDispatch } from "../../../../app/store"
import { useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import clsx from "clsx"
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons"
import ResetIcon from "../../../../components/widgets/icons/ResetIcon"
import { CheckIcon } from "../../../../components/widgets/icons/CheckIcon"
import { AstrixComp } from "../../../../components/widgets/AstrixComp"
import { ErrorComp } from "../../../../components/widgets/ErrorComp"
import { addRow, resetCurrentRow, setFieldValueForAllRows, updateRow } from "../../../../components/StandardGrid/StandardGridSlice"
import { ToastError } from "../../../../components/widgets/ToastError"
import { GlobalContext, GlobalContextType } from "../../../../app/GlobalContext"

export function NicknamesForm({ className = '', name }: { className?: string, name: string }) {
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const isReadOnly = globalContext.contact.isReadOnly
    const formikNickname = useFormik({
        initialValues: {
            nickname: ''
        },
        validateOnMount: true,
        validationSchema: Yup.object({
            nickname: Yup.string().trim().required(MembershipMessages.required),
        }),
        onSubmit: (values, actions) => {
        },
    })
    const dispatch = useAppDispatch()
    const { errors, getFieldProps, resetForm, setFieldValue, touched, values, setValues, }: any = formikNickname

    const btnClassName = 'h-7 pl-2 pr-4 py-1 align-middle font-medium inline-flex items-center border border-transparent shadow-md text-sm  rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1'

    const currentRow = useSelector((state: any) => {
        const row = state?.standardGrid?.[name]?.currentRow
        return (row)
    })

    useEffect(() => {
        setValues({
            nickname: currentRow?.nickname || '',
            index: currentRow?.index,
        })
    }, [currentRow])

    return (
        <div className={clsx(className, 'h-full items-center flex-col')}>

            {/* isPrimary reset and add / update buttons */}
            <div className="flex justify-between items-center flex-wrap">
                <CheckBoxComponent disabled label='Primary' {...getFieldProps('isPrimary')} checked={values.isPrimary || false} value={values.isPrimary || false} onChange={(e: any) => { setFieldValue('isPrimary', e.target.checked || false) }} />
                <div className="flex gap-2 flex-wrap row-gap-2">
                    <button type='button' className={clsx(btnClassName, 'bg-gray-400 hover:bg-gray-500 focus:ring-green-400 text-white text')}
                        onClick={handleOnReset}><ResetIcon /> Reset</button>
                    <button
                        disabled={(!formikNickname.isValid) || isReadOnly}
                        type="button" className={clsx(btnClassName, 'disabled:opacity-40 disabled:pointer-events-none', 'bg-blue-400 hover:bg-blue-500 focus:ring-green-400 text-white')}
                        onClick={handleOnAddOrUpdate}><CheckIcon className="mr-2" />
                        {getIsAddMode() ? 'Add' : 'Update'}
                    </button>
                </div>
            </div>

            {/* nickname */}
            <div className="flex flex-col gap-1 mt-8">
                <label htmlFor="nickname" className="text-sm font-medium">Nickname <AstrixComp /></label>
                <input disabled={isReadOnly} type="text" className="h-8 text-sm border-1 border-gray-200 disabled:bg-gray-200" placeholder="Enter nickname" {...getFieldProps('nickname')} value={values?.nickname || ''} />
                {touched.nickname && errors.nickname ? <ErrorComp error={errors.nickname} /> : null}
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
        setFieldValue('nickname', '')
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
        setFieldValue('nickname', '')
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
            nickname: values.nickname,
            index: values.index,
            isPrimary: values.isPrimary
        }
        if (values.index) { //update
            if (isDuplicateWithDifferentIndex()) {
                ToastError.fire({ title: MembershipMessages.validationError, text: MembershipMessages.nicknameExists })
            } else {
                doUpdation(row)
            }
        } else {
            if (isDuplicate()) {
                ToastError.fire({ title: MembershipMessages.validationError, text: MembershipMessages.nicknameExists })
            } else {
                doAddition(row)
            }
        }
    }

    function handleOnReset() {
        resetForm()
        const args: any = { name: name }
        dispatch(resetCurrentRow(args))
        setFieldValue('nickname', '') // This internally validates the form and sets isValid false. validateForm() method not working
    }

    function isDuplicate() {
        const nicknamesList = store.getState()?.standardGrid?.[name]?.allRows || []
        const found = nicknamesList.find((item: any) => item.nickname === values.nickname)
        return (found)
    }

    function isDuplicateWithDifferentIndex() {
        const nicknamesList = store.getState()?.standardGrid?.[name]?.allRows || []
        const currNicknameIndex = values.index
        const found = nicknamesList.find((item: any) => (item.nickname === values.nickname) && (currNicknameIndex !== item.index))
        return (found)
    }
}