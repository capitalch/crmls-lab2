import { useDispatch, useSelector } from "react-redux";
import { GenericHeader } from "../../components/GenericHeader/GenericHeader";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import { fetchDataOnId } from "../../components/QueryHelper/QueryHelperSlice";
import { bf_resource_name } from "./SubComponents/MyBrokerageFirms/MyBrokerageFirms";
import BrokerageFirmDetailsTab from "./SubComponents/Tabs/Details/BrokerageFirmDetails";
import BFDesignatedOfficersTab from "./SubComponents/Tabs/LicensedOfficers/BrokerageFirmDesignatedOfficers";
import BFOfficesSelectableTab from "./SubComponents/Tabs/Offices/temp/BrokerageFirmOfficesSelectable";
import BFLicensesTab from "./SubComponents/Tabs/Licenses/BrokerageFirmLicenses";
import useBrokerageFirms from "./BrokerageFirmHook";
import BFDbasTab from "./SubComponents/Tabs/Dba/BrokerageFirmDBAsSelectable";
import BrokerageFirmActionBar from "./SubComponents/BrokerageFirmActionBar";
import Loader from "../../components/widgets/Loader";
import BFDBAsSimpleTab from "./SubComponents/Tabs/Dba/BrokerageFirmDBAsSimple";
import BFOfficesSimpleTab from "./SubComponents/Tabs/Offices/BrokerageFirmOfficesSimple";
import BFDesignatedOfficersSimpleTab from "./SubComponents/Tabs/LicensedOfficers/BrokerageFirmDesignatedOfficersSimple";
import Tabs from "../../util/controls/tabs";
import BFMembersTab from "./SubComponents/Tabs/Members/BrokerageFirmMembers";
import BrokerageFirmMembersView from "./SubComponents/Tabs/Members/BrokerageFirmMembersView";
import BFOfficesTab from "./SubComponents/Tabs/Offices/BrokerageFirmOfficesSelectable";
import BFLicensesSelectable from "./SubComponents/Tabs/Licenses/BrokerageFirmLicensesSelectable";
import { MembershipMessages } from "../../util/MembershipMessages";
import BrokerageFirmBrands from "./SubComponents/Tabs/Brands/BrokerageFirmBrands";
import BFBrandsSimpleTab from "./SubComponents/Tabs/Brands/BrokerageFirmBrandSimple";

// import { OfficeOtherOfficesTab } from "./to-be-removed-OfficeOtherOfficesTab"

function BrokerageFirm() {
	const dispatch = useDispatch();
	const { id }: any = useParams();
	const isNew = !id;
	const { formik, loading, title } = useBrokerageFirms();
	const systemOfRecordIsManual =
		formik.values && formik.values.systemOfRecordID == "1";
	const isReadOnly = !systemOfRecordIsManual && id;
	const { values: brokerageFirm } = formik;
	const aorID = useSelector((state: any) => state?.user?.profile?.aor?.id);
	const isOwnBrokerageFirm = [
		brokerageFirm.primaryAorID,
		brokerageFirm.billableAorID,
		...brokerageFirm.secondaryAorIDs,
	].includes(aorID);
	const history = useHistory();
	const { errors } = formik;

	const errorsInDetailsPage =
		Object.keys(errors).filter((key) => !["licensesIDs"].includes(key)).length >
		0;

	//     dispatch(fetchDataOnId({ id: id, name: resource, resource }))
	// }, [id])

	// if(loading || !brokerageFirm?.dbaIDs)
	//     return <div className="fixed z-10 top-1/2 left-1/2 "><Loader /></div>

	console.log("formik errors", formik.errors);

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			{formik.isSubmitting && (
				<div className="fixed z-10 top-1/2 left-1/2 pl-20">
					<Loader />
				</div>
			)}
			<GenericHeader
				title={title}
				subTitle="CRMLS Brokerage Firms"
				formik={formik}
				toShowGlobalValidationMessage={true}
				sideTitle={
					isReadOnly
						? MembershipMessages.updatesNotPermittedBrokerageFirms
						: undefined
				}
				ControlSet={() => (
					<BrokerageFirmActionBar
						formik={formik}
						isValid={formik.isValid}
						handleOnActionSave={() => formik.handleSubmit()}
						hideSaveButton={!isOwnBrokerageFirm && !isNew}
						hideSaveAndCloseButton={!isOwnBrokerageFirm && !isNew}
						hideSaveAndNewButton={!isOwnBrokerageFirm && !isNew}
						resource={bf_resource_name}
					/>
				)}
			/>
			{!loading ? (
				<div className="mx-4">
					<Tabs
						tabs={getTabDetails()}
						formik={formik}
						errorFields={[errorsInDetailsPage ? "details" : ""]}
					>
						<BrokerageFirmDetailsTab />
						{isOwnBrokerageFirm || isNew ? (
							<BFDbasTab formik={formik} />
						) : (
							<BFDBAsSimpleTab />
						)}
						{isOwnBrokerageFirm || isNew ? (
							<BFOfficesTab formik={formik} />
						) : (
							<BFOfficesSimpleTab />
						)}
						{isOwnBrokerageFirm || isNew ? (
							<BFLicensesSelectable formik={formik} />
						) : (
							<BFLicensesTab />
						)}
						{isNew ? (
							<></>
						) : isOwnBrokerageFirm ? (
							<BFDesignatedOfficersTab formik={formik} />
						) : (
							<BFDesignatedOfficersSimpleTab />
						)}
						{isOwnBrokerageFirm || isNew ? (
							<BFMembersTab formik={formik} showOnlyMembers={true} />
						) : (
							<BrokerageFirmMembersView showOnlyMembers={true} />
						)}
						{isOwnBrokerageFirm || isNew ? (
							<BFMembersTab formik={formik} />
						) : (
							<BrokerageFirmMembersView />
						)}
						{isNew ? (
							<></>
						) : isOwnBrokerageFirm ? (
							<BrokerageFirmBrands />
						) : (
							<BFBrandsSimpleTab brands={formik.values?.brands} />
						)}
					</Tabs>
				</div>
			) : (
				<div className="fixed z-10 top-1/2 left-1/2 pl-20">
					<Loader />
				</div>
			)}
		</div>
	);

	function getTabDetails() {
		return [
			{ name: "Details", id: "details", keepMounted: true },
			{ name: "DBAs" },
			{ name: "Offices" },
			{ name: "Licenses", id: "licensesIDs" },
			!isNew ? { name: "Licensed Officers" } : null,
			{ name: "Members" },
			{ name: "Contacts" },
			!isNew ? { name: "Brands" } : null,
		];
	}
}
export default BrokerageFirm;
