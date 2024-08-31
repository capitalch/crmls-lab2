
import { FormikTouched, FormikValues } from "formik";

export interface AOR {
  shortName: string
  name: string
  phone: string
  address1: string
  stateAssociation: string
  primaryContactId: string
  logoUrl: string
  optOut: boolean
  city: string
  zip: string
  mlsID: string
  state: string
  createdOn: string
  id: string
  modifiedOn: string
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
  disabled?:boolean
}

export interface ContactOption {
  value: string
  label: string
  details?: string
}

export interface AorFormComponentProps extends FormCustomComponentProps {
  values: AOR
  disabled?:boolean
}

export interface ContactAorsFetchResult {
  contact: any
  aor: AOR
  contactId: string
  aorId: string
  createdOn: string
  modifiedOn: string
}

