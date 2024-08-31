import React from "react";
import { FormikProps, useFormikContext } from "formik";
import { Team } from "../../TeamsInterface";
import UpdateDeleteGrid, {
	UpdateDeleteGridColumnType,
} from "../../../../util/grids/UpdateDeleteGrid/UpdateDeleteGrid";
import TeamsEmailForm from "./TeamsEmailForm";
import { TabTitle } from "../../../../components/widgets/TabTitle";

const TeamsEmail = () => {
	const teamFormik: FormikProps<Team> = useFormikContext();
	const isReadOnly = teamFormik?.values?.isReadOnly;

	const { touched, errors } = teamFormik;
	return (
		<div className="px-4">
			<TabTitle
				title="Associate Emails"
				customError={teamFormik.errors.teamMemberWithRoles}
			/>
			<UpdateDeleteGrid
				fieldName="emails"
				Form={TeamsEmailForm}
				columns={columns}
				id="id"
				isReadOnly={isReadOnly}
			/>
		</div>
	);
};

export default TeamsEmail;

const columns: UpdateDeleteGridColumnType[] = [
	{
		field: "emailAddress",
		headerText: "Email Address",
		width: 80,
	},
	{
		field: "emailTypeName",
		headerText: "Email Type",
		width: 80,
	},
];
