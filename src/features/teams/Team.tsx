import { useParams } from "react-router";
import { GenericHeader } from "../../components/GenericHeader/GenericHeader";
import Loader from "../../components/widgets/Loader";
import Toast from "../../components/widgets/Toast";
import Tabs, { Tab } from "../../util/controls/tabs";
import ActionBar from "../brokerageFirms/SubComponents/BrokerageFirmActionBar";
import { Labels } from "../dba/DbaInterface";
import TeamBrokerageFirm from "./Tabs/BrokerageFirm/TeamBrokerageFirms";
import TeamsEmail from "./Tabs/Emails/TeamsEmail";
import TeamHistory from "./Tabs/History/TeamHistory";
import TeamLicenses from "./Tabs/Licenses/TeamLicenses";
import TeamMembers from "./Tabs/Members/TeamMembers";
import TeamDetails from "./Tabs/TeamDetails";
import useTeam from "./TeamHook";
import { teams_resource_name } from "./Teams";

function Team({ id, isReadOnly }: { id?: string; isReadOnly?: boolean }) {
	const {
		formik,
		loading,
		title,
		isNew,
		updateBFRefreshToken,
		brokerageFirmTabRefreshToken,
	} = useTeam({ id, isReadOnly });
	const { errors } = formik;
	const errorsInDetailsPage =
		Object.keys(errors).filter(
			(key) => !["teamMemberWithRoles", "emails"].includes(key)
		).length > 0;

	if (loading)
		return (
			<div className="fixed z-10 top-1/2 left-1/2 pl-20">
				<Loader />
			</div>
		);

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			{/* {(formik.isSubmitting || loading) && <div className="fixed z-10 top-1/2 left-1/2 pl-20"><Loader /></div>} */}
			{!isReadOnly && (
				<GenericHeader
					title={isNew ? "New Team" : title}
					subTitle="Update CRMLS Team"
					toShowGlobalValidationMessage={true}
					formik={formik}
					ControlSet={() => (
						<ActionBar
							formik={formik}
							isValid={formik.isValid}
							handleOnActionSave={async () => {
								showValidationIssue(formik);
								formik.handleSubmit();
							}}
							resource={teams_resource_name}
						/>
					)}
				/>
			)}
			<div>
				<Tabs
					tabs={getTabDetails()}
					formik={formik}
					errorFields={[errorsInDetailsPage ? "details" : ""]}
				>
					<TeamDetails updateBFRefreshToken={updateBFRefreshToken} />
					<TeamBrokerageFirm
						brokerageFirmTabRefreshToken={brokerageFirmTabRefreshToken.toString()}
					/>
					<TeamMembers />
					<TeamsEmail />
					{/* <div className="m-10">WIP</div> */}
					<TeamLicenses />
					{!isNew ? <TeamHistory /> : <></>}
				</Tabs>
			</div>
		</div>
	);

	function getTabDetails(): (Tab | null)[] {
		return [
			{ name: "Details", id: "details", keepMounted: true },
			{ name: "Brokerage Firms", id: "brokerageFirmIDs", required: true },
			{ name: "Team Members", id: "teamMemberWithRoles", required: true },
			{ name: "Email Addresses", id: "emails", required: true },
			// {name:'Phone Numbers', id:'phones' ,required:true},
			{ name: "Licenses", id: "licenseIDs", required: true },
			!isNew ? { name: "History", id: "history", required: true } : null,
		];
	}
}
export default Team;

const showValidationIssue = (formik: any) => {
	if (Object.keys(formik.errors).length > 0) {
		const errorhtml = Object.keys(formik.errors).map((key: string) => {
			return `<p><strong>${Labels[key]}: </strong>${formik.errors?.[key]}</p>`;
		});
		Toast.fire({
			icon: "error",
			title: "Some fields are not valid",
			html: errorhtml.join(""),
		});
	}
};
