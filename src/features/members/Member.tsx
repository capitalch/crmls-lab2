import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Error } from "../../components/widgets/Error";
import { GenericHeader } from "../../components/GenericHeader/GenericHeader";
import { ActionBar } from "../../components/ActionBar/ActionBar";
import { NTab, NTabs } from "../../components/ntabs/NTabs";
import { nTabsStore } from "../../components/ntabs/NTabsStore";
import { ProfileTab } from "./MemberTabs/ProfileTab/ProfileTab";
import { LicensesTab } from "./MemberTabs/LicensesTab";
import { AddressesTab } from "./MemberTabs/ProfileTab/AddressesTab/AddressesTab";
import { PhonesTab } from "./MemberTabs/ProfileTab/PhonesTab/PhonesTab";
import { EmailsTab } from "./MemberTabs/ProfileTab/EmailsTab/EmailsTab";
import { OfficesTab } from "./MemberTabs/OfficesTab";
import { BrokerageFirmsTab } from "./MemberTabs/BrokerageFirmsTab";
import { QueryLoader } from "../../components/QueryLoader/QueryLoader";
import { useMember } from "./MemberHook";
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext";
import { useContext } from "react";
import { MembershipMessages } from "../../util/MembershipMessages";
import MemberTeamsTab from "./MemberTabs/TeamsTab/MemberTeamsTab";
import { ComplianceTab } from "./MemberTabs/ComplianceTab/ComplianceTab";
import UserAccountsTab from "./MemberTabs/UserAccountsTab/UserAccountsTab";
import { ListingsTab } from "./MemberTabs/ListingsTab/ListingsTab";

function Member() {
	const {
		formik,
		name,
		addressesTabName,
		phonesTabName,
		emailsTabName,
		nicknamesTabName,
		memberData,
		licensesTabName,
		officesTabName,
		brokerageFirmsTabName,
		listingsTabName,
		complianceTabName
	} = useMember();
	const { errors } = formik;
	const { id }: any = useParams();
	const globalContext: GlobalContextType = useContext(GlobalContext);
	const error = useSelector((state: any) => {
		return state?.queryHelper?.[name]?.error;
	});

	if (error) {
		return (
			<Error error={error} className="flex justify-center mt-10 text-lg" />
		);
	}

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16">
			<div className="flex bg-secondary justify-between pr-4">
				<GenericHeader
					toShowGlobalValidationMessage={true}
					title={id ? "Update Member" : "New Member"}
					formik={formik}
					sideTitle={
						globalContext.member.isReadOnly
							? MembershipMessages.updatesNotPermittedContactMember
							: undefined
					}
					subTitle={memberData?.firstName || ""}
				/>
				<ActionBar formik={formik} resource="members" />
			</div>
			<NTabs
				selectedTabIndex={nTabsStore.member.selectedTabIndex}
				className="ml-2"
				storePropName="member"
				persistTabIndex={false}
			>
				<NTab
					label="Profile"
					tabIndex={0}
					className={
						errors.firstName ||
							errors.lastName ||
							errors.memberTypeID ||
							errors?.mortgageLoanOriginatorNumber
							? "text-red-400"
							: ""
					}
				>
					<ProfileTab formik={formik} nicknamesTabName={nicknamesTabName} />
				</NTab>
				<NTab label="User Accounts"
					tabIndex={1}>
					<UserAccountsTab />
				</NTab>
				<NTab
					label="Licenses"
					tabIndex={2}
					className={errors["licenseIDs"] ? "text-red-400" : ""} >
					<LicensesTab formik={formik} name={licensesTabName} />
				</NTab>

				<NTab
					label="Contact Methods"
					tabIndex={3}
					className={
						errors.addresses ||
							errors.phones ||
							errors.memberTypeID ||
							errors.emails
							? "text-red-400"
							: ""
					}
				>
					<NTabs
						selectedTabIndex={0}
						persistTabIndex={false}
						className="ml-6 mr-4 -mt-1 bg-gray-50 pb-4"
					>
						<NTab
							label="Addresses"
							tabIndex={0}
							className={errors.addresses ? "text-red-400" : ""}
						>
							<AddressesTab formik={formik} name={addressesTabName} />
						</NTab>
						<NTab
							label="Phones"
							tabIndex={1}
							className={errors.phones ? "text-red-400" : ""}
						>
							<PhonesTab formik={formik} name={phonesTabName} />
						</NTab>
						<NTab
							label="Emails"
							tabIndex={2}
							className={errors.emails ? "text-red-400" : ""}
						>
							<EmailsTab formik={formik} name={emailsTabName} />
						</NTab>
					</NTabs>
				</NTab>

				<NTab label="Compliance"
					tabIndex={4}>
					<ComplianceTab name={complianceTabName} />
				</NTab>
				<NTab
					label="Offices"
					tabIndex={5}
					className={errors["officesIDs"] ? "text-red-400" : ""} >
					<OfficesTab formik={formik} name={officesTabName} />
				</NTab>
				<NTab
					label="Brokerage Firms"
					tabIndex={6}
					className={errors["brokerageFirmsIDs"] ? "text-red-400" : ""} >
					<BrokerageFirmsTab formik={formik} name={brokerageFirmsTabName} />
				</NTab>
				<NTab label="Teams" tabIndex={7}>
					<MemberTeamsTab />
				</NTab>
				<NTab label="Listings" tabIndex={8} className="">
					<ListingsTab loginId={memberData?.['loginId'] || 'loginIdNotFound'} name={listingsTabName} />
				</NTab>
			</NTabs>
			<QueryLoader name={name} />
		</div>
	);
}
export { Member };

// {/* <NTab
// 					label="Addresses"
// 					tabIndex={3}
// 					className={errors["addresses"] ? "text-red-400" : ""}
// 				>
// 					<AddressesTab formik={formik} name={addressesTabName} />
// 				</NTab>
// 				<NTab
// 					label="Phones"
// 					tabIndex={4}
// 					className={errors["phones"] ? "text-red-400" : ""}
// 				>
// 					<PhonesTab formik={formik} name={phonesTabName} />
// 				</NTab>
// 				<NTab
// 					label="Emails"
// 					tabIndex={5}
// 					className={errors["emails"] ? "text-red-400" : ""}
// 				>
// 					<EmailsTab formik={formik} name={emailsTabName} />
// 				</NTab> */}
// 				{/* <NTab label="Nicknames" tabIndex={6}>
// 					<NicknamesTab formik={formik} name={nicknamesTabName} />
// 				</NTab> */}
