import { useSelector } from "react-redux"
import { BasicSelect } from "../../../components/BasicSelect/BasicSelect"
import clsx from "clsx"
import { AstrixComp } from "../../../components/widgets/AstrixComp"
import { ErrorComp } from "../../../components/widgets/ErrorComp"
import { StandardSelect } from "../../../components/StandardSelect/StandardSelect"
import { ZipCode } from "../../../components/widgets/ZipCode"
import { PhoneNumber } from "../../../components/widgets/PhoneNumber"
import { TabTitle } from "../../../components/widgets/TabTitle"
import { MembershipMessages } from "../../../util/MembershipMessages"
import { GlobalContext, GlobalContextType } from "../../../app/GlobalContext"
import { useContext } from "react"

function OfficeDetailsTab({ formik, handleOnChangeBrokerageFirm, onChangeDbaid }: { formik?: any, handleOnChangeBrokerageFirm: any, onChangeDbaid: any }) {
    const { errors, getFieldProps, setFieldValue, touched, values } = formik
    const inputClassName = 'border-1 mt-2 block h-8 w-20 w-full border-gray-200 text-sm hover:border-gray-300 disabled:bg-gray-200'
    const globalContext: GlobalContextType = useContext(GlobalContext) // global store using context api
    const isReadOnly = globalContext.office.isReadOnly

    const brandsCriteria: any = [
        {
            "field": "brokerageFirmID",
            "op": 0,
            "values": [
                values.brokerageFirmID || '00000000-0000-0000-0000-000000000000'
            ]
        }
    ]

    const dbasCriteria: any = [
        {
            "field": "brokerageFirmID",
            "op": 0,
            "values": [
                values.brokerageFirmID || '00000000-0000-0000-0000-000000000000'
            ]
        }
    ]

    const detailsTabError = (errors['name']
        || errors['primaryAorID']
        || errors['officeCode']
        || errors['brokerageFirmID']
        || errors['address1']
        || errors['city']
        || errors['stateID']
        || errors['zip']
        || errors['officeCompEmail']
        || errors['officeTypeID']
        || errors['phone']) ? MembershipMessages.genericTabValidationError : ''
    return (
        <div className="my-2 flex flex-col gap-4">
            <TabTitle title="Associate Details" customError={detailsTabError || ''} />
            <div className="flex gap-8">
                {/* Name */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="name">Name <AstrixComp /></label>
                    <input disabled={isReadOnly} type="text" className={inputClassName} placeholder='Enter Name' {...getFieldProps('name')} value={values?.name || ''} />
                    {touched.name && errors.name ? <ErrorComp error={errors.name} /> : null}
                </div>
                {/* main office code */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="mainOfficeCode">Main Office Code</label>
                    <input disabled={isReadOnly} type="text" className={inputClassName} placeholder="Enter Main Office Code" {...getFieldProps('mainOfficeCode')} value={values.mainOfficeCode || ''} />
                </div>
            </div>

            <div className="flex gap-8">
                {/* office code */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="officeCode">Office Code <AstrixComp /></label>
                    <input disabled={isReadOnly} type="text" className={inputClassName} placeholder="Enter Office Code" {...getFieldProps('officeCode')} value={values.officeCode || ''} />
                    {touched.officeCode && errors.officeCode ? <ErrorComp error={errors.officeCode} /> : null}
                </div>

                {/* officeTypeID */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="officeTypeID">Office Type <AstrixComp /></label>
                    <StandardSelect disabled={isReadOnly} formik={formik} className="mt-2 disabled:bg-gray-300" name='officeTypeID' resource="OfficeTypeLookups" value={values.officeTypeID || ''} />
                    {touched.officeTypeID && errors.officeTypeID ? <ErrorComp error={errors.officeTypeID} /> : null}
                </div>
            </div>

            <div className="flex gap-8">
                {/* Brokerage firm */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="brokerageFirmID">Brokerage Firm <AstrixComp /></label>
                    <StandardSelect disabled={isReadOnly} className="mt-2 disabled:bg-gray-300" formik={formik} name='brokerageFirmID' resource="brokerageFirms" value={values.brokerageFirmID || ''}
                        onChangeParentCallback={handleOnChangeBrokerageFirm} />
                    {touched.brokerageFirmID && errors.brokerageFirmID ? <ErrorComp error={errors.brokerageFirmID} /> : null}
                </div>

                {/* Brand */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="brandID">Brand</label>
                    <StandardSelect disabled={isReadOnly} className="mt-2 disabled:bg-gray-300" formik={formik} name='brandID' resource="BrokerageFirmBrands" value={values.brandID || ''} criteria={brandsCriteria} />
                </div>
            </div>

            <div className="flex gap-8">
                {/*Dba  */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="dbaid">Dba</label>
                    <StandardSelect disabled={isReadOnly} className="mt-2 disabled:bg-gray-300" formik={formik} name='dbaid' resource="dbas" value={values.dbaid || ''} criteria={dbasCriteria} onChangeParentCallback={onChangeDbaid} isOnChangeParentCallbackPassOptionName={true} />
                </div>
                {/* Compliance Email  */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="officeCompEmail">Compliance Email <AstrixComp /></label>
                    <input disabled={isReadOnly} type="text" className={inputClassName} placeholder="Enter compliance email" {...getFieldProps('officeCompEmail')} value={values.officeCompEmail || ''} />
                    {touched.officeCompEmail && errors.officeCompEmail ? <ErrorComp error={errors.officeCompEmail} /> : null}
                </div>
            </div>

            <div className="flex gap-8">
                {/* Address1 */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="address1">Address 1 <AstrixComp /></label>
                    <input disabled={isReadOnly} type="text" className={inputClassName} placeholder="Enter Address 1" {...getFieldProps('address1')} value={values.address1 || ''} />
                    {touched.address1 && errors.address1 ? <ErrorComp error={errors.address1} /> : null}
                </div>

                {/* Address2 */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="address2">Address 2</label>
                    <input disabled={isReadOnly} type="text" className={inputClassName} placeholder="Enter Address 2" {...getFieldProps('address2')} value={values.address2 || ''} />
                </div>
            </div>

            <div className="flex gap-8">
                {/* City */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="city">City <AstrixComp /></label>
                    <input disabled={isReadOnly} type="text" className={inputClassName} placeholder="Enter City" {...getFieldProps('city')} value={values.city || ''} />
                    {touched.city && errors.city ? <ErrorComp error={errors.city} /> : null}
                </div>

                {/* State */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="stateID">State <AstrixComp /></label>
                    <StandardSelect disabled={isReadOnly} className="mt-2 disabled:bg-gray-300" formik={formik} name='stateID' resource="StateLookups" value={values.stateID || ''} />
                    {touched.stateID && errors.stateID ? <ErrorComp error={errors.stateID} /> : null}
                </div>
            </div>

            <div className="flex gap-8">
                {/* Zip */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="zip">Zip <AstrixComp /></label>
                    <ZipCode disabled={isReadOnly} className={inputClassName} placeholder="Enter Zip" setFieldValue={setFieldValue}  {...getFieldProps('zip')} value={values.zip || ''} />
                    {touched.zip && errors.zip ? <ErrorComp error={errors.zip} /> : null}
                </div>

                {/* Phone */}
                <div className="flex w-1/2 flex-col">
                    <label className="text-sm font-medium" htmlFor="phone">Phone <AstrixComp /></label>
                    <PhoneNumber disabled={isReadOnly} className={inputClassName} placeholder="Enter Phone" {...getFieldProps('phone')} setFieldValue={setFieldValue} value={values.phone || ''} />
                    {touched.phone && errors.phone ? <ErrorComp error={errors.phone} /> : null}
                </div>
            </div>
        </div>)
}
export { OfficeDetailsTab }
