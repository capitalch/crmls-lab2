import React from "react";
import TeamMembersForm from "./TeamMemembersForm";
import { FormikProps, useFormikContext } from "formik";
import { Team } from "../../TeamsInterface";
import UpdateDeleteGrid, {
	UpdateDeleteGridColumnType,
} from "../../../../util/grids/UpdateDeleteGrid/UpdateDeleteGrid";
import LabelWarning from "../../../../util/controls/labelWarning";
import Modal from "react-modal";
import { ExclamationIcon } from "@heroicons/react/solid";
import { TabTitle } from "../../../../components/widgets/TabTitle";

const teamMemberIdentityKey = "contactID";
export const team_members_fieldname = "teamMemberWithRoles";

const TeamsMembers = () => {
	const teamFormik: FormikProps<Team> = useFormikContext();
	const isReadOnly = teamFormik?.values?.isReadOnly;

	return (
		<div className="px-4 relative">
			<>
				<TabTitle
					title="Associate Members"
					customError={teamFormik.errors.teamMemberWithRoles}
				/>
				<UpdateDeleteGrid
					fieldName={team_members_fieldname}
					Form={TeamMembersForm}
					columns={team_members_columns}
					//if id is not provided "id" field would be used as primary identifier
					id={teamMemberIdentityKey}
					isReadOnly={isReadOnly}
				/>
			</>

			{!teamFormik.values.primaryBrokerageFirmID && (
				<NoPrimaryBrokerageFirmModal />
			)}
		</div>
	);
};

export default TeamsMembers;

export const team_members_columns: UpdateDeleteGridColumnType[] = [
	{
		field: "firstName",
		headerText: "First Name",
		width: 80,
	},
	{
		field: "lastName",
		headerText: "Last Name",
		width: 80,
	},
	{
		field: "concatenatedRoleNames",
		headerText: "Roles",
		width: 80,
	},
	{
		field: "contactLicenseNumber",
		headerText: "License Number",
		width: 80,
	},
	{
		field: "contactLicenseType",
		headerText: "License Type",
		width: 80,
	},
];

const NoPrimaryBrokerageFirmModal = () => (
	<div
		className="w-full h-full absolute top-0 left-0 flex justify-center bg-white"
		style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
	>
		<div
			className="bg-white p-6 rounded-lg shadow-xl drop-shadow-2xl w-1/3 mr-20 mt-36 min-h-content"
			style={{ opacity: "100% !important", height: "fit-content" }}
		>
			<div className="flex justify-center">
				<ExclamationIcon width={"1.5rem"} />
				<h2
					className="text-xl font-semibold mb-4 ml-4"
					style={{ margin: "0px 0px 5px 5px" }}
				>
					Select a primary brokerage firm
				</h2>
			</div>
			<p className="mt-4">
				Please select a primary brokerage firm from <strong>details tab</strong>{" "}
				to continue editing the team members
			</p>
		</div>
	</div>
);
