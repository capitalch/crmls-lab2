import React from "react";
import { BasicGridQueryPanel } from "../../../../components/BasicGrid/BasicGridQueryPanel";
import Criteria, { OperationCriterias } from "../../../../Interfaces/Criteria";
import { BasicGrid } from "../../../../components/BasicGrid/BasicGrid";
import { QueryLoader } from "../../../../components/QueryLoader/QueryLoader";
import { useParams } from "react-router";
import { FormikProps, useFormikContext } from "formik";
import { Team } from "../../TeamsInterface";
import LicenseName from "../../../licenses/SubComponent/LicenseName";
import dayjs from "dayjs";

const teams_licenses_grid_name = "teams_licenses_grid";
const teams_licenses_resource_name = "Licenses/available/brokerTeam";

const TeamLicenses = () => {
	const teamFormik: FormikProps<Team> = useFormikContext();
	const isReadOnly = teamFormik.values.isReadOnly;
	const getNewTeamLicenseCriterias = (): Criteria[] | [] => {
		const teamMemberIds: string[] =
			teamFormik?.values?.teamMemberWithRoles?.map(
				(member) => member.contactID || ""
			) || [];
		const teamMemberCriteria =
			teamMemberIds && teamMemberIds.length
				? [
						{
							field: "contactIds",
							op: OperationCriterias.Equal,
							values: [...teamMemberIds],
						},
				  ]
				: [];
		const teamBrokerageFirmCriteria =
			(teamFormik?.values.brokerageFirmIDs &&
				teamFormik?.values.brokerageFirmIDs.length) ||
			teamFormik?.values?.primaryBrokerageFirmID
				? [
						{
							field: "brokerageFirmIds",
							op: OperationCriterias.Equal,
							values: [
								...(teamFormik?.values.brokerageFirmIDs ?? []),
								teamFormik?.values?.primaryBrokerageFirmID || "",
							],
						},
				  ]
				: [];
		return [...teamMemberCriteria, ...teamBrokerageFirmCriteria];
	};
	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			<BasicGridQueryPanel
				name={teams_licenses_grid_name}
				columns={getColumns()}
				filters={[]}
				resource={teams_licenses_resource_name}
				orderBy={[{ field: "licenseNumber", direction: "Asc" }]}
				criteria={getNewTeamLicenseCriterias()}
				className="mt-4"
			/>
			<BasicGrid
				name={teams_licenses_grid_name}
				columns={getColumns()}
				resource={teams_licenses_resource_name}
				link={!isReadOnly ? `licenses/edit` : ""}
				orderBy={[{ field: "licenseNumber", direction: "Asc" }]}
				criteria={getNewTeamLicenseCriterias()}
				className="mt-4 ml-4 mr-4"
			/>
			<QueryLoader name={teams_licenses_grid_name} />
		</div>
	);
};

export default TeamLicenses;

function getColumns() {
	return [
		{
			field: "licenseNumber",
			headerText: "License Number",
		},
		{
			field: "authorityName",
			headerText: "Authority",
			selectResource: "Licenses",
			isIgnoreInSearch: true,
			allowSorting: false,
		},
		{
			field: "licenseType.name",
			headerText: "License Type",
			selectResource: "LicenseTypeLookups",
		},
		{
			field: "licenseStatus.name",
			headerText: "License Status",
			selectResource: "LicenseStatusLookups",
		},
		{
			field: "expirationDate",
			headerText: "Expiration Date",
			customColumnTemplate: (props: any) => (
				<span>{dayjs(props?.expirationDate).format("MM-DD-YYYY h:mmA")}</span>
			),
			isIgnoreInSearch: true,
		},
		{
			field: "firstName",
			headerText: "First Name",
			customColumnTemplate: LicenseName,
		},
		{
			field: "lastName",
			headerText: "Last Name",
			customColumnTemplate: LicenseName,
		},
		{
			field: "corporationName",
			headerText: "Corporation Name",
			customColumnTemplate: LicenseName,
			allowSorting: false,
			isIgnoreInSearch: true,
		},
		{
			field: "officeNameName",
			headerText: "Office",
			allowSorting: false,
			isIgnoreInSearch: true,
		},
		{
			field: "brokerageFirmName",
			headerText: "Brokerage Firm",
			selectResource: "brokerageFirms",
			isIgnoreInSearch: true,
			allowSorting: false,
		},
	];
}
