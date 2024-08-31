import React from "react";

import { useParams } from "react-router-dom";
import { FormikProps, useFormikContext } from "formik";
import { Team } from "../../TeamsInterface";
import PrimaryBrokerageFirmSelector from "./PrimaryBrokerageFirmSelector";
import useFetchData from "../../../../util/hooks/useFetchData";
import { OperationCriterias } from "../../../../Interfaces/Criteria";
import SimpleSFGrid from "../../../../util/grids/SimpleSyncGrid/SimpleSFGrid";

const TeamsBFReadOnly = () => {
	const formik: FormikProps<Team> = useFormikContext();
	const isReadOnly = formik?.values?.isReadOnly;

	const { data: brokerageFirms } = useFetchData({
		resource: "brokerageFirms",
		criteria: [
			{
				field: "id",
				op: OperationCriterias.Equal,
				values: formik?.values.brokerageFirmIDs || [],
			},
		],
	});
	return (
		<SimpleSFGrid
			data={brokerageFirms}
			columns={getBrokerageFirmsReadOnlyTabColumns()}
		/>
	);
};

export default TeamsBFReadOnly;

function getBrokerageFirmsReadOnlyTabColumns(): any[] {
	return [
		{
			field: "primaryBrokerageFirmID",
			headerText: "Primary",
			template: PrimaryBrokerageFirmSelector,
			// template:(props:any) => <PrimaryBrokerageFirmSelector {...props}/>,
			// isIgnoreInPanel:true,
			width: 80,
		},
		{
			field: "name",
			headerText: "Name",
			width: 80,
		},
		{
			field: "address1",
			headerText: "Address1",
			width: 80,
		},

		{
			field: "address2",
			headerText: "Address2",
			width: 80,
		},
		{
			field: "phone",
			headerText: "Phone",
			width: 80,
		},
		{
			field: "emailAddress",
			headerText: "Email",
			width: 80,
		},
		{
			field: "city",
			headerText: "City",
			width: 80,
		},

		{
			field: "zip",
			headerText: "Zip",
			width: 80,
		},
	];
}
