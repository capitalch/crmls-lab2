import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons/src/check-box/checkbox.component";
import { FilterOptionsType } from "../../../../components/BasicGrid/BasicGridFilters";
import { BasicGridQueryPanel } from "../../../../components/BasicGrid/BasicGridQueryPanel";
import { BasicGrid } from "../../../../components/BasicGrid/BasicGrid";
import { QueryLoader } from "../../../../components/QueryLoader/QueryLoader";
import MembershipLink from "../../../../util/controls/MembershipLink/MembershipLink";
import DateTemplate from "../../../../util/controls/DateTemplate";
import ArrayFieldTemplate from "../../../../util/controls/ArrayFieldTemplate";
import { useParams } from "react-router";
import { OperationCriterias } from "../../../../Interfaces/Criteria";
import { is } from "@babel/types";
import { useState } from "react";
import useSlidePane from "../../../../util/controls/ReactSliderPane/useReactSliderPane";
import { MemberTeam } from "./MemberTeamsInterface";
import Team from "../../../teams/Team";
import ClickableRecord from "../../../../util/controls/ClickableGridField";

export const memberteams_resource_name = "BrokerTeamMembers";
const memberteams_simple_grid_name = "memberteams-basic-grid-view";

const MemberTeamsTab = () => {
	const { id }: any = useParams();
	const [selectedTeam, setSelectedTeam] = useState<string>("");
	const isNew = !id;
	const { SlidePane, handlePanelOpen } = useSlidePane();

	const handleTeamClick = (teamDetails: MemberTeam) => {
		setSelectedTeam(teamDetails.brokerTeamID);
		handlePanelOpen(`Team:   ${teamDetails.brokerTeamName}`);
	};

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			{!isNew ? (
				<div>
					<BasicGridQueryPanel {...gridConfig()} className="mt-4" />
					<BasicGrid {...gridConfig()} className="mt-4 ml-4 mr-4" />
					<QueryLoader name={memberteams_simple_grid_name} />
				</div>
			) : (
				<div className="m-4 ml-8">
					Save and assign member to a team to see teams list.
				</div>
			)}
			<SlidePane>
				<Team id={selectedTeam} isReadOnly={true} />
			</SlidePane>
		</div>
	);

	function gridConfig() {
		return {
			name: memberteams_simple_grid_name,
			columns: getColumns(),
			filters: [],
			orderBy: [{ field: "brokerTeamName", direction: "Asc" }],
			criteria: [
				{
					field: "contactID",
					op: OperationCriterias.Equal,
					values: [id],
				},
			],
			resource: memberteams_resource_name,
		};
	}

	function getColumns() {
		const columns = [
			{
				field: "brokerTeamName",
				headerText: "Name",
				entityField: "brokerTeam.name",
				// Using template Function instead of normal redirection because
				// 1) Normal redirection looks for "id" field but we need to use "brokerTeamID" here
				// 2) Normal redirection dose not work with templateFuntion (it the team roles would not work)
				customColumnTemplate: (props: any) => (
					<ClickableRecord details={props} onClick={handleTeamClick} />
				),
				width: 80,
			},
			{
				field: "brokerTeamPrimaryBrokerageFirmName",
				headerText: "Primary Brokerage Firm",
				entityField: "brokerTeamPrimaryBrokerageFirmName",
				customColumnTemplate: (props: any) => (
					<ClickableRecord details={props} onClick={handleTeamClick} />
				),
				isIgnoreInSearch: true,
				width: 80,
			},
			{
				field: "brokerTeamStatus",
				headerText: "Status",
				entityField: "brokerTeam.status.name",
				customColumnTemplate: (props: any) => (
					<ClickableRecord details={props} onClick={handleTeamClick} />
				),
				width: 80,
			},
			{
				field: "brokerTeamActiveDate",
				headerText: "Active Date",
				entityField: "brokerTeamActiveDate",
				// customColumnTemplate: DateTemplate,
				customColumnTemplate: (props: any) => (
					<ClickableRecord details={props} onClick={handleTeamClick}>
						<DateTemplate {...props} />
					</ClickableRecord>
				),
				isIgnoreInSearch: true,
				width: 80,
			},
			{
				field: "brokerTeamRoleNames",
				headerText: "Team Member Roles",
				entityField: "teamRoles.teamRole.name",
				customColumnTemplate: (props: any) => (
					<ClickableRecord details={props} onClick={handleTeamClick}>
						<ArrayFieldTemplate {...props} />
					</ClickableRecord>
				),
				width: 80,
			},
		];
		return columns;
	}
};
export default MemberTeamsTab;

// function getFilters(): FilterOptionsType[] {
// 	const filters: FilterOptionsType[] = [
// 		{
// 			controlType: "editableSelect",
// 			name: "Brokerage Firm",
// 			resource: "BrokerageFirms",
// 			displayName: "Brokerage Firm",
// 			filterFieldName: "brokerageFirms.brokerageFirmID",
// 		},
// 	];
// 	return filters;
// }
