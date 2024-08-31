import React, { useEffect, useState } from "react";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { FormikProps, useFormikContext } from "formik";
import { Team } from "../../TeamsInterface";
import useTeamMembersRemovedWarning from "./TeamMembersRemovedHandler/useTeamMembersRemovedWarning";

export const teams_primary_bf_fieldname = "primaryBrokerageFirmID";

const PrimaryBrokerageFirmSelector = (props: any) => {
	const [checked, setChecked] = useState(false);
	const teamFormik: FormikProps<Team> = useFormikContext();
	const isReadOnly = teamFormik?.values?.isReadOnly;
	const primaryBrokerageFirmID =
		teamFormik.values?.[teams_primary_bf_fieldname];

	const { openPrimaryBrokerageFirmChangeAlert } =
		useTeamMembersRemovedWarning();

	useEffect(() => {
		if (!primaryBrokerageFirmID) {
			setChecked(false);
			return;
		}
		setChecked(props.id === primaryBrokerageFirmID);
	}, [primaryBrokerageFirmID]);

	const setPrimaryBrokerageFirm = async (
		newPrimaryFirmID?: string,
		e?: any
	) => {
		e.stopPropagation();
		openPrimaryBrokerageFirmChangeAlert({
			formik: teamFormik,
			newPrimaryFirmID: e.target.checked ? newPrimaryFirmID : "",
		});
	};

	return (
		<input
			type="checkbox"
			checked={checked}
			onChange={(e: any) => setPrimaryBrokerageFirm(props.id, e)}
			className="cursor-pointer disabled:pointer-events-none disabled:opacity-30"
			disabled={isReadOnly}
		/>
		// <CheckBoxComponent checked={checked} onChange={(e:any) => setPrimaryBrokerageFirm(props.id, e)} key={props.id}/>
	);
};

export default PrimaryBrokerageFirmSelector;
