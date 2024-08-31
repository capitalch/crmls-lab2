import React from 'react'
import { AstrixComp } from '../../../../components/widgets/AstrixComp'
import { ErrorComp } from '../../../../components/widgets/ErrorComp'
import { PhoneNumber } from '../../../../components/widgets/PhoneNumber'
import AorContactSelector from './PrimaryContactInput/AorContactSelector'
import {SwitchComponent} from "@syncfusion/ej2-react-buttons";
import Select from '../../../../components/widgets/select/MemebersipSelect'
import { ZipCode } from '../../../../components/widgets/ZipCode'
import AORStateAssosiationInput from './AORStateAssosiation'
import { useSelector } from 'react-redux'
import { formattedProfile, userState } from '../../../user/selectors'
import ImageUploader from '../../../../components/widgets/imageUploader/ImageUploader'
import { RegionInput } from '../../../../components/widgets/RegionInput'

type Props = {
    formik?:any
    handleSubmit:(values: any) => Promise<void>
}

function AorDetails({formik, handleSubmit}: Props) {
  const {touched, errors, setFieldValue, getFieldProps, values } = formik
  const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin


  return (
    <div className="flex flex-row m-8 mb-40">
        <div className="crmls-fields-wrap mr-12 min-w-[33rem]">
            <div className="crmls-field-wrap compact" data-name="name">
                    <label htmlFor={'name'}>
                        Name <AstrixComp />
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                            <input
                                id='name'
                                type="text"
                                disabled={!isAorAdmin}
                                className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.name && errors.name ? "input-registered-invalid" : "input-registered-required" }`}
                                {...getFieldProps('name')}
                            />
                            {touched.name && errors.name &&
                            <div className="text-sm text-red-600">{errors.name}</div>}
                        </div>
                    </div>
                    
            </div>
            <div className="crmls-field-wrap compact" data-name="Description">
                <label htmlFor={'Description'}>
                    Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='Description'
                            type="text"
                                disabled={!isAorAdmin}
                                className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.description && errors.description ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('description')}
                        />
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="Phone">
                <label htmlFor={'Phone'}>
                    Phone <AstrixComp />
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <PhoneNumber
                            id='phone'
                            type="text"
                            setFieldValue={setFieldValue}
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.phone && errors.phone ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('phone')}
                        />
                        {touched.phone && errors.phone &&
                            <div className="text-sm text-red-600">{errors.phone}</div>}
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="address2">
                <label htmlFor={'address2'}>
                    Address 2
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='address2'
                            type="text"
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.address2 && errors.address2 ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('address2')}
                        />
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="State">
                <label htmlFor={'State'}>
                    State <AstrixComp />
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <Select 
                            resource='StateLookups'
                            label='State'
                            keyField='value'
                            valueField='displayName'
                            disabled={!isAorAdmin}
                            id={formik.values.id}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.state && errors.state ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('state')}
                        />
                        {touched.state && errors.state &&
                                    <div className="text-sm text-red-600">{errors.state}</div>}
                    </div>
                </div>
                
            </div>
            <div className="crmls-field-wrap compact" data-name="stateAssociation">
                <label htmlFor={'stateAssociation'}>
                    State Association
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm gray-400">
                        <AORStateAssosiationInput 
                            setFieldValue={setFieldValue}
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""}` }
                            {...getFieldProps('stateAssociation')}
                            values={values}
                            id={'stateAssociation'}
                        />
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="webAddress">
                <label htmlFor={'webAddress'}>
                    Web Address
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='webAddress'
                            type="text"
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.webAddress && errors.webAddress ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('webAddress')}
                        />
                    </div>
                    {touched.webAddress && errors.webAddress &&
                                    <div className="text-sm text-red-600 w-64">{errors.webAddress}</div>}
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="marketingEmail">
                <label htmlFor={'marketingEmail'}>
                    Marketing Email
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='marketingEmail'
                            type="text"
                            disabled
                            className={`bg-gray-300 ${touched.marketingEmail && errors.marketingEmail ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('marketingEmail')}
                        />
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="optOut">
                <label htmlFor={'optOut'}>
                    Communications Opt Out
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm  ml-4 mt-4">
                        <SwitchComponent
                            id="optOut"
                            disabled={!isAorAdmin}
                            checked={values.optOut}
                            onChange={(e:any) => setFieldValue('optOut', e.target.checked)}
                        />
                    </div>
                </div>
                
            </div>
            
            
        </div>
        <div className="crmls-fields-wrap w-128">
            <div className="crmls-field-wrap compact" data-name="shortName">
                <label htmlFor={'shortName'}>
                    Short Name <AstrixComp />
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='shortName'
                            type="text"
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.shortName && errors.shortName ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('shortName')}
                        />
                        {touched.shortName && errors.shortName &&
                            <div className="text-sm text-red-600">{errors.shortName}</div>}
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="Primary Contact">
                <label htmlFor={'Primary Contact'}>
                    Primary Contact <AstrixComp />
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <AorContactSelector
                            id='Primary Contact'
                            type="text"
                            setFieldValue={setFieldValue}
                            disabled={!isAorAdmin}
                            values={formik.values}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.primaryContactId && errors.primaryContactId ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('primaryContactId')}
                        />
                        {touched.primaryContactId && errors.primaryContactId &&
                            <div className="text-sm text-red-600">{errors.primaryContactId}</div>}
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="address1">
                <label htmlFor={'address1'}>
                    Address 1 <AstrixComp />
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='address1'
                            type="text"
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.address1 && errors.address1 ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('address1')}
                        />
                        {touched.address1 && errors.address1 &&
                            <div className="text-sm text-red-600">{errors.address1}</div>}
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="city">
                <label htmlFor={'city'}>
                    City <AstrixComp />
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='city'
                            type="text"
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.city && errors.city ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('city')}
                        />
                         {touched.city && errors.city &&
                            <div className="text-sm text-red-600">{errors.city}</div>}
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="zip">
                <label htmlFor={'zip'}>
                    ZIP <AstrixComp />
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <ZipCode
                            id='zip'
                            type="text"
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.zip && errors.zip ? "input-registered-invalid" : "input-registered-required"}` }
                            setFieldValue ={setFieldValue }
                            {...getFieldProps('zip')}
                        />
                         {touched.zip && errors.zip &&
                            <div className="text-sm text-red-600">{errors.zip}</div>}
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="logoUrl">
                <label htmlFor={'logoUrl'}>
                    Logo
                </label>
                <ImageUploader 
                    id='logoImageContent'
                    existingImageURL={values.logoUrl}
                    disabled={!isAorAdmin}
                    placeHolder="Upload AOR Logo"
                    formik={formik}
                />
            </div>
            <div className="crmls-field-wrap compact" data-name="complianceEmail">
                <label htmlFor={'complianceEmail'}>
                    Compliance Email
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='complianceEmail'
                            type="text"
                            disabled
                            className={`bg-gray-300 ${touched.complianceEmail && errors.complianceEmail ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('complianceEmail')}
                        />
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="alertEmail">
                <label htmlFor={'alertEmail'}>
                    Alert Email
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <input
                            id='alertEmail'
                            type="text"
                            disabled
                            className={`bg-gray-300 ${touched.alertEmail && errors.alertEmail ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('alertEmail')}
                        />
                    </div>
                </div>
            </div>
            <div className="crmls-field-wrap compact" data-name="region">
                <label htmlFor={'region'}>
                    Region
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <RegionInput
                            id='region'
                            setFieldValue={setFieldValue}
                            disabled={!isAorAdmin}
                            className={`${!isAorAdmin ? "bg-gray-300" : ""} ${touched.region && errors.region ? "input-registered-invalid" : "input-registered-required"}` }
                            {...getFieldProps('region')}
                        />
                        {touched.region && errors.region &&
                                    <div className="text-sm text-red-600">{errors.region}</div>}
                    </div>
                </div>
            </div>
            {isAorAdmin && <div className="crmls-field-wrap compact flex justify-end" data-name="submit button">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                        <button
                            onClick={() => handleSubmit(formik.values)}
                            type="submit"
                            className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-tertiary disabled:pointer-events-none disabled:cursor-not-allowed w-20"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default AorDetails