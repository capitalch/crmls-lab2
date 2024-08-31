import { useParams } from "react-router"
import { ActionBar } from "../../components/ActionBar/ActionBar"
import { GenericHeader } from "../../components/GenericHeader/GenericHeader"
import { useOffice } from "./OfficeHook"
import { NTab, NTabs } from "../../components/ntabs/NTabs"
import { nTabsStore } from "../../components/ntabs/NTabsStore"
import { OfficeDetailsTab } from "./OfficeTabs/OfficeDetailsTab"
import { DivisionBranchManagersTab } from "./OfficeTabs/DivisionBranchManagersTab"
import { LicensesTab } from "./OfficeTabs/LicensesTab"
import { MembersTab } from "./OfficeTabs/MembersTab"
import { ContactsTab } from "./OfficeTabs/ContactsTab"
import { MembershipMessages } from "../../util/MembershipMessages"
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext"
import { useContext } from "react"

export function Office() {
    const {
        branchManagerIDs
        , branchManagersTabName
        , formik
        , handleOnChangeBrokerageFirm
        , licenseIDs
        , licensesTabName
        , contactIDs
        , contactsTabName
        , memberIDs
        , membersTabName
        , officeData
        , onChangeDbaid
    } = useOffice()
    const { id }: any = useParams()
    const { errors } = formik
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
        || errors['phone'])
    const globalContext: GlobalContextType = useContext(GlobalContext)

    return (<div className="flex flex-col w-full mb-32 sm:mb-16">
        <div className="flex bg-secondary justify-between pr-4">
            <GenericHeader toShowGlobalValidationMessage={true} title={id ? 'Update Office' : 'New Office'} formik={formik}
                subTitle={officeData?.name || '-'} sideTitle={globalContext.office.isReadOnly ? MembershipMessages.updatesNotPermittedOffice : undefined} />
            <ActionBar formik={formik} resource="offices" />
        </div>
        <NTabs selectedTabIndex={nTabsStore.office.selectedTabIndex} className="mx-4" storePropName="office" persistTabIndex={false}>
            <NTab label="Details" tabIndex={0} className={detailsTabError ? 'text-red-400' : ''}>
                <OfficeDetailsTab formik={formik} onChangeDbaid={onChangeDbaid}
                    handleOnChangeBrokerageFirm={handleOnChangeBrokerageFirm} />
            </NTab>
            <NTab label="Contacts" tabIndex={1} className={errors['contactIDs'] ? 'text-red-400' : ''}>
                <ContactsTab formik={formik} name={contactsTabName}
                    selectedIDs={contactIDs}
                />
            </NTab>
            <NTab label="Members" tabIndex={2} className={errors['memberIDs'] ? 'text-red-400' : ''}>
                <MembersTab formik={formik} name={membersTabName}
                    selectedIDs={memberIDs}
                />
            </NTab>
            <NTab label="Division / Branch Managers" tabIndex={3} className={errors['branchManagerIDs'] ? 'text-red-400' : ''}>
                <DivisionBranchManagersTab formik={formik} name={branchManagersTabName}
                    selectedIDs={branchManagerIDs}
                />
            </NTab>
            <NTab label="Licenses" tabIndex={4} className={errors['licenseIDs'] ? 'text-red-400' : ''}>
                <LicensesTab formik={formik} name={licensesTabName}
                    selectedIDs={licenseIDs}
                />
            </NTab>
        </NTabs>
    </div>)
}
