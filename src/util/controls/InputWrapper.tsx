import { FormikProps, useFormikContext } from 'formik';
import React, { ReactElement } from 'react'
import { AstrixComp } from '../../components/widgets/AstrixComp';
import { ErrorComp } from '../../components/widgets/ErrorComp';

const InputWrapper = ({fieldName, children, className, label, required, formik:propFormik}:InputWrapperProps) => {
const contextFormik:FormikProps<any> = useFormikContext();
const formik = propFormik || contextFormik
  return (<div className={className || 'w-1/2 p-2'}>
  <label className="font-medium text-sm" htmlFor={fieldName}>{label} {required ? <AstrixComp /> : null}</label>
  {children}
  <div className='mt-1'>
      {formik?.touched?.[fieldName] && formik?.errors?.[fieldName] ? <ErrorComp error={formik?.errors?.[fieldName]} /> : null}
  </div>
</div>)
}

export default InputWrapper

interface InputWrapperProps{
    fieldName:string
    label:string
    children:any
    formik?:any
    className?:string
    required?:boolean
}