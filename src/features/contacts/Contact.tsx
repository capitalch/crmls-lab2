import { useSelector } from "react-redux"
import { ActionBar } from "../../components/ActionBar/ActionBar"
import { GenericHeader } from "../../components/GenericHeader/GenericHeader"
import { QueryLoader } from "../../components/QueryLoader/QueryLoader"
import { NTab, NTabs } from "../../components/ntabs/NTabs"
import { nTabsStore } from "../../components/ntabs/NTabsStore"
import { useContact } from "./ContactHook"
import { AddressesTab } from "./ContactTabs/AddressesTab/AddressesTab"
import { BrokerageFirmsTab } from "./ContactTabs/BrokerageFirmsTab"
import { EmailsTab } from "./ContactTabs/EmailsTab/EmailsTab"
import { LicensesTab } from "./ContactTabs/LicensesTab"
import { OfficesTab } from "./ContactTabs/OfficesTab"
import { PhonesTab } from "./ContactTabs/PhonesTab/PhonesTab"
import { ProfileTab } from "./ContactTabs/ProfileTab"
import { Error } from "../../components/widgets/Error"
import { useHistory, useParams } from "react-router"
import { NicknamesTab } from "./ContactTabs/NickNamesTab/NicknamesTab"
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext"
import { useContext, useEffect } from "react"
import { MembershipMessages } from "../../util/MembershipMessages"

function Contact() {
    const { formik, name, addressesTabName, phonesTabName, emailsTabName, nicknamesTabName, contactData, licensesTabName, officesTabName, brokerageFirmsTabName } = useContact()
    const { errors } = formik
    const { id }: any = useParams()
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const history = useHistory();

    useEffect(() => {
        // If the contact is a member, redirect to the member edit page
        if (contactData && contactData.contactTypeID === 1) {
            history.push(`/members/edit/${contactData.id}`)
        }
    }, [contactData]);

    const error = useSelector((state: any) => {
        return (state?.queryHelper?.[name]?.error)
    })

    if (error) {
        return (<Error error={error} className="flex justify-center mt-10 text-lg" />)
    }

    return (<div className="flex flex-col w-full mb-32 sm:mb-16">
        <div className="flex bg-secondary justify-between pr-4">
            <GenericHeader
                toShowGlobalValidationMessage={true} title={id ? 'Update Contact' : 'New Contact'}
                formik={formik} subTitle={contactData?.firstName || ''}
                sideTitle={globalContext.contact.isReadOnly ? MembershipMessages.updatesNotPermittedContactMember : undefined} />
            <ActionBar formik={formik} resource="contacts" />
        </div>
        <NTabs selectedTabIndex={nTabsStore.contact.selectedTabIndex} className="ml-2" storePropName="contact" persistTabIndex={false}>
            <NTab label="Profile" tabIndex={0} className={(errors.firstName || errors.lastName) ? 'text-red-400' : ''}>
                <ProfileTab formik={formik} />
            </NTab>
            <NTab label="Licenses" tabIndex={1}>
                <LicensesTab formik={formik} name={licensesTabName} />
            </NTab>
            <NTab label="Addresses" tabIndex={2} className={errors['addresses'] ? 'text-red-400' : ''}>
                <AddressesTab formik={formik} name={addressesTabName} />
            </NTab>
            <NTab label="Phones" tabIndex={3} className={errors['phones'] ? 'text-red-400' : ''}>
                <PhonesTab formik={formik} name={phonesTabName} />
            </NTab>
            <NTab label="Emails" tabIndex={4} className={errors['emails'] ? 'text-red-400' : ''}>
                <EmailsTab formik={formik} name={emailsTabName} />
            </NTab>
            <NTab label="Nicknames" tabIndex={5}>
                <NicknamesTab formik={formik} name={nicknamesTabName} />
            </NTab>
            <NTab label="Offices" tabIndex={6} className={errors['officesIDs'] ? 'text-red-400' : ''}>
                <OfficesTab formik={formik} name={officesTabName} />
            </NTab>
            <NTab label="Brokerage Firms" tabIndex={7}>
                <BrokerageFirmsTab formik={formik} name={brokerageFirmsTabName} />
            </NTab>
        </NTabs>
        <QueryLoader name={name} />
    </div>)
}
export { Contact }