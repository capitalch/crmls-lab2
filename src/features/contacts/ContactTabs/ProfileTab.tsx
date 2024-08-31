import { StandardSelect } from "../../../components/StandardSelect/StandardSelect";
import { AstrixComp } from "../../../components/widgets/AstrixComp";
import { ErrorComp } from "../../../components/widgets/ErrorComp";
import { MembershipMessages } from "../../../util/MembershipMessages";
import _ from "lodash";
import clsx from "clsx";
import { TabTitle } from "../../../components/widgets/TabTitle";
import { useContext } from "react";
import { GlobalContext, GlobalContextType } from "../../../app/GlobalContext";

function ProfileTab({ formik }: { formik?: any }) {
    const { errors, getFieldProps, setFieldValue, touched, values } = formik
    const isFirstNameLastNameDisabled = !_.isEmpty(values['licenseIDs'])
    const className = 'border-1 h-8 border-gray-200 text-sm hover:border-gray-300 disabled:bg-gray-200'
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const isReadOnly = globalContext.contact.isReadOnly

    return (<div className="ml-4 mr-4 flex flex-col">

        <TabTitle title="Associate Profile" customError={((errors?.firstName) || (errors?.lastName)) ? MembershipMessages.firstNameOrLastNameMissing : ''} />
        <div className="mt-4 flex gap-8">
            {/* First name */}
            <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="firstName">First Name <AstrixComp /></label>
                <input disabled={isFirstNameLastNameDisabled || isReadOnly} type="text" className={className} placeholder='Enter First Name' {...getFieldProps('firstName')} value={values.firstName || ''} />
                {touched.firstName && errors.firstName ? <ErrorComp error={errors.firstName} /> : null}
            </div>
            {/* Middle name */}
            <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="middleName">Middle Name</label>
                <input disabled={isReadOnly} type="text" className={className} placeholder='Enter Middle Name' {...getFieldProps('middleName')} value={values.middleName || ''} />
            </div>
        </div>

        <div className="mt-4 flex gap-8">
            {/* Last name */}
            <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="lastName">Last Name <AstrixComp /></label>
                <input disabled={isFirstNameLastNameDisabled || isReadOnly} type="text" className={className} placeholder='Enter Last Name' {...getFieldProps('lastName')} value={values.lastName || ''} />
                {touched.lastName && errors.lastName ? <ErrorComp error={errors.lastName} /> : null}
            </div>
            {/* Display name */}
            <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="displayName">Display Name</label>
                <input disabled={isReadOnly} type="text" className={className} placeholder='Enter Display Name' {...getFieldProps('displayName')} value={values.displayName || ''} />
            </div>
        </div>

        <div className="mt-4 flex gap-8">
            {/* Title*/}
            <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="title">Title</label>
                <input disabled={isReadOnly} type="text" className={className} placeholder='Enter Title' {...getFieldProps('title')} value={values.title || ''} />
            </div>
            {/* Comments */}
            <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="comment">Comments</label>
                <input disabled={isReadOnly} type="text" className={className} placeholder='Enter Comments' {...getFieldProps('comment')} value={values.comment || ''} />
            </div>
        </div>

        <div className="mt-4 flex gap-8" >
            {/* Contact type */}
            <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="contactTypeID">Contact Type</label>
                <StandardSelect disabled={isReadOnly} 
                    className={className}
                    name='contactTypeID' formik={formik} resource="ContactTypeLookups" value={values.contactTypeID || ''} criteria={[{
                    field: 'id',
                    op: 6,
                    values: ['1']
                }]} />
            </div>
            {/* Profile image */}
            <div className="flex w-1/2 flex-wrap gap-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium" htmlFor='pictureUpload'>Picture Upload</label>
                    <input disabled={isReadOnly} className="cursor-pointer" type='file' name='pictureUpload' onChange={handleFileUpload} accept='image/*' />
                </div>
                <div className="">
                    <img className="text-sm text-gray-500" height={100} width={100} src={values['photoURL']} alt='No profile data' />
                </div>
            </div>
        </div>

    </div>
    )

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
}

export { ProfileTab }

