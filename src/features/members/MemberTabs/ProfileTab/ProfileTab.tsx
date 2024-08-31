import { StandardSelect } from "../../../../components/StandardSelect/StandardSelect";
import { TabTitle } from "../../../../components/widgets/TabTitle";
import { AstrixComp } from "../../../../components/widgets/AstrixComp";
import { ErrorComp } from "../../../../components/widgets/ErrorComp";
import { MembershipMessages } from "../../../../util/MembershipMessages";
import { MembersStore } from "../../MembersStore";
import { useContext, useEffect } from "react";
import _ from "lodash";
// import clsx from "clsx";
import { GlobalContext, GlobalContextType } from "../../../../app/GlobalContext";
import { MLONumber } from "../../../../components/widgets/MLONumber";
import { NicknamesTab } from "./NickNamesTab/NicknamesTab";
// import { NTab } from "../../../../components/ntabs/NTabs";
// import { useDispatch, useSelector } from "react-redux";
// import { StandardGrid } from "../../../components/StandardGrid/StandardGrid";
// import { loadAllRows } from "../../../components/StandardGrid/StandardGridSlice";

function ProfileTab({ formik, nicknamesTabName }: { formik?: any, nicknamesTabName: string }) {
    const { errors, getFieldProps, setFieldValue, touched, values } = formik
    const standardSelectMemberTypeInstanceName = 'memberTypeID'
    const isFirstNameLastNameDisabled = !_.isEmpty(values['licenseIDs'])
    const isMloNumberDisabled = values['memberTypeName'] !== 'Mortgage Loan Originator'
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const isReadOnly = globalContext.member.isReadOnly
    const className = 'border-1 h-8 border-gray-200 text-sm hover:border-gray-300 disabled:bg-gray-200'

    useEffect(() => {
        setMemberTypeForEdit()
    }, [values?.memberTypeID])


    return (<div className="flex flex-col ml-4 mr-4">
        <TabTitle title="Associate Profile" customError={((errors?.firstName) || (errors?.lastName) || (errors?.memberTypeID) || (errors?.mortgageLoanOriginatorNumber)) ? MembershipMessages.validationErrorsInTab : ''} />
        <div className="flex mt-4 gap-8">
            {/* First name */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="firstName">First Name <AstrixComp /></label>
                <input disabled={isFirstNameLastNameDisabled || isReadOnly} type="text" className={className} placeholder='Enter First Name' {...getFieldProps('firstName')} value={values.firstName || ''} />
                {touched.firstName && errors.firstName ? <ErrorComp error={errors.firstName} /> : null}
            </div>
            {/* Middle name */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="middleName">Middle Name</label>
                <input type="text" disabled={isReadOnly} className={className} placeholder='Enter Middle Name' {...getFieldProps('middleName')} value={values.middleName || ''} />
            </div>
        </div>

        <div className="flex mt-4 gap-8">
            {/* Last name */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="lastName">Last Name <AstrixComp /></label>
                <input disabled={isFirstNameLastNameDisabled || isReadOnly} className={className} type="text" placeholder='Enter Last Name' {...getFieldProps('lastName')} value={values.lastName || ''} />
                {touched.lastName && errors.lastName ? <ErrorComp error={errors.lastName} /> : null}
            </div>
            {/* Display name */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="displayName">Display Name</label>
                <input type="text" disabled={isReadOnly} className={className} placeholder='Enter Display Name' {...getFieldProps('displayName')} value={values.displayName || ''} />
            </div>
        </div>

        <div className="flex mt-4 gap-8">
            {/* Title*/}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="title">Title</label>
                <input type="text" disabled={isReadOnly} className={className} placeholder='Enter Title' {...getFieldProps('title')} value={values.title || ''} />
            </div>
            {/* Comments */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="comment">Comments</label>
                <input type="text" disabled={isReadOnly} className={className} placeholder='Enter Comments' {...getFieldProps('comment')} value={values.comment || ''} />
            </div>
        </div>

        <div className="flex mt-4 gap-8" >
            {/* Member type */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="memberTypeID">Member Type <AstrixComp /></label>
                <StandardSelect
                    className={className}
                    disabled={isReadOnly}
                    name={standardSelectMemberTypeInstanceName}
                    formik={formik}
                    onChangeParentCallback={onChangeMemberType}
                    resource="MemberTypeLookups"
                    value={values.memberTypeID || ''}
                    selectedTextFieldName="memberTypeName"
                />
                {touched.memberTypeID && errors.memberTypeID ? <ErrorComp error={errors.memberTypeID} /> : null}
            </div>
            {/* MLO Number */}
            <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium" htmlFor="mloNumber">MLO Number</label>
                <MLONumber disabled={isMloNumberDisabled} className={className} type='text' placeholder='Enter MLO Number' setFieldValue={setFieldValue} {...getFieldProps('mortgageLoanOriginatorNumber')} value={values.mortgageLoanOriginatorNumber || ''} />
                {errors.mortgageLoanOriginatorNumber ? <ErrorComp error={errors.mortgageLoanOriginatorNumber} /> : null}
            </div>

        </div>

        <div className="flex mt-4 gap-8">
            {/* Profile image */}
            <div className="flex  gap-2 w-1/2 flex-wrap">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium" htmlFor='pictureUpload'>Picture Upload</label>
                    <input disabled={isReadOnly} className="cursor-pointer" type='file' name='pictureUpload' onChange={handleFileUpload} accept='image/*' />
                </div>
                <div className="">
                    <img className="text-sm text-gray-500" height={100} width={100} src={values['photoURL']} alt='No profile data' />
                </div>
            </div>
        </div>
        <NicknamesTab formik={formik} name={nicknamesTabName} />
    </div>)

    function onChangeMemberType(value: any) {
        setFieldValue('mortgageLoanOriginatorNumber', undefined)
        setFieldValue('memberTypeID', value)
    }

    function convertToBase64String(file: any) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    async function handleFileUpload(e: any) {
        const file = e.target.files[0]
        if (file.size > 131072) { // 128 KB
            alert('You must upload a file smaller than 128 kb')
            return
        }
        const base64 = await convertToBase64String(file)
        setFieldValue('photoURL', base64)
        setFieldValue('profileImage', base64)
    }

    function setMemberTypeForEdit() {
        MembersStore.memberTypeName = values['memberTypeName']
        if (MembersStore.memberTypeName === 'Salesperson') {
            MembersStore.isMemberTypeSalesPerson = true
        } else {
            MembersStore.isMemberTypeSalesPerson = false
        }
    }
}

export { ProfileTab }

