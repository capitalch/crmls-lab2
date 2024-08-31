import { FormikTouched, FormikValues } from "formik"

export interface Option {
    value: string
    label: string
    details?: string
  }

  export interface FormCustomComponentProps{
    id:string,
    value:any,
    onChange:(e: any) => any,
    onBlur:any,
    className:string,
    values:FormikValues,
    touched:FormikTouched<any>,
    setFieldValue:any
  }