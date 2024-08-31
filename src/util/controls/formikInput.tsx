import React from 'react'
import { ErrorComp } from '../../components/widgets/ErrorComp'
import { AstrixComp } from '../../components/widgets/AstrixComp'
import { FormikProps, useFormikContext } from 'formik'

export const defaultInputClassName = 'w-full text-sm mt-2 h-8 border-1 border-gray-200 hover:border-gray-300 block w-20 p-3 py-4'
const FormikInput = (props:FormInputProps) => {
    const {fieldName, label, className, inputClassName, formik:propFormik, required=false,type, disabled=false, ...restOfProps} = props
    const contextFormik:FormikProps<any> = useFormikContext();
    const formik = propFormik || contextFormik

    return (<div className={className || 'w-1/2 p-2'}>
        <label className="font-medium text-sm" htmlFor={fieldName}>{label} {required ? <AstrixComp /> : null}</label>
        <input 
            id={fieldName}
            type={type}
            className={`${inputClassName || defaultInputClassName} ${disabled ? 'bg-gray-200' : ''}`} 
            style={{ minheight: '380px' }}
            value={formik?.values?.[fieldName] || ''} 
            {...formik?.getFieldProps(fieldName)}
            disabled={disabled}
            // placeholder={`Type a ${label}`}
            {...restOfProps}
        />
        <div className='mt-1'>
            {formik?.touched?.[fieldName] && formik?.errors?.[fieldName] ? <ErrorComp error={formik?.errors?.[fieldName]} /> : null}
        </div>
    </div>
  )
}

export default FormikInput

interface FormInputProps{
    formik?:any
    fieldName:string
    label:string
    type:string
    value?:string
    onChange?:(e:any)=>void
    className?:string
    inputClassName?:string
    required?:boolean
    disabled?:boolean
}