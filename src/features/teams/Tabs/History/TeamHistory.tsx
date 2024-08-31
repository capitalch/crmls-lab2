import React from "react";
import { BasicGridQueryPanel } from "../../../../components/BasicGrid/BasicGridQueryPanel";
import {
	BasicGrid,
	BasicGridColumnType,
} from "../../../../components/BasicGrid/BasicGrid";
import { QueryLoader } from "../../../../components/QueryLoader/QueryLoader";
import { FilterOptionsType } from "../../../../components/BasicGrid/BasicGridFilters";
import dayjs from "dayjs";
import { OperationCriterias } from "../../../../Interfaces/Criteria";
import { useParams } from "react-router";
import { EditIcon1 } from "../../../../components/widgets/icons/EditIcon1";
import { PlusIcon, MinusIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { FormikProps, useFormikContext } from "formik";
import { Team } from "../../TeamsInterface";

const teams_history_grid_name = "teams_history_grid";
const teams_history_resource_name = "BrokerTeamRevisions";
const TeamHistory = () => {
	const teamFormik: FormikProps<Team> = useFormikContext();
	const id: string = teamFormik?.values.id || "";

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			<BasicGridQueryPanel
				name={teams_history_grid_name}
				columns={getColumns()}
				filters={[]}
				resource={teams_history_resource_name}
				orderBy={[
					{
						field: "changedDateTime",
						direction: "Desc",
					},
				]}
				criteria={[
					{
						field: "brokerTeamRevisionSet.brokerTeamID",
						op: OperationCriterias.Equal,
						values: [id],
					},
				]}
				className="mt-4"
			/>
			<BasicGrid
				name={teams_history_grid_name}
				columns={getColumns()}
				resource={teams_history_resource_name}
				// link={`${teams_resource_name}/edit`}
				orderBy={[
					{
						field: "changedDateTime",
						direction: "Desc",
					},
				]}
				criteria={[
					{
						field: "brokerTeamRevisionSet.brokerTeamID",
						op: OperationCriterias.Equal,
						values: [id],
					},
				]}
				className="mt-4 ml-4 mr-4"
			/>
			<QueryLoader name={teams_history_grid_name} />
		</div>
	);

	function getColumns() {
		return [
			{
				field: "changedDateTime",
				headerText: "Change Time",
				customColumnTemplate: (props: any) => (
					<span>
						{dayjs(props?.changedDateTime).format("MM-DD-YYYY h:mmA")}
					</span>
				),
				isIgnoreInSearch: true,
			},
			{
				field: "changedByName",
				headerText: "Changed By",
				isIgnoreInSearch: true,
			},
			{
				field: "description",
				headerText: "Description",
				//   isIgnoreInSearch:true
			},
			{
				field: "revisionType",
				headerText: "Change Type",
				customColumnTemplate: (props: any) => (
					<div className="flex items-center">
						<div className="mr-1">
							{props?.revisionType === "Added" ? (
								<PlusIcon width={"1.25rem"} color="green" />
							) : props?.revisionType === "Removed" ? (
								<MinusIcon width={"1.25rem"} color="red" />
							) : (
								<ChevronUpIcon width={"1.5rem"} color="blue" />
							)}
						</div>
						{props?.revisionType}
					</div>
				),
				//   isIgnoreInSearch:true
			},
		];
	}

	function getFilters(): FilterOptionsType[] {
		const filters: FilterOptionsType[] = [
			{
				controlType: "text",
				name: "description",
				filterFieldName: "description",
				displayName: "Description",
			},
			// {
			//     controlType: 'text',
			//     name: 'city',
			//     filterFieldName: 'city',
			//     displayName: 'City'
			// },
			// {
			//     controlType: 'editableSelect',
			//     name: 'brokerageFirm',
			//     resource: 'BrokerageFirms',
			//     displayName: 'Brokerage Firm',
			//     filterFieldName: 'brokerageFirmID'
			// },
		];
		return filters;
	}
};

export default TeamHistory;
