import { BasicGridQueryPanel } from "../../../../components/BasicGrid/BasicGridQueryPanel";
import { BasicGrid } from "../../../../components/BasicGrid/BasicGrid";
import { QueryLoader } from "../../../../components/QueryLoader/QueryLoader";
import { useParams } from "react-router";
import { OperationCriterias } from "../../../../Interfaces/Criteria";
import ForgotPasswordLink from "./ForgotPasswordLink";

const memberteams_simple_grid_name = "memberteams-basic-grid-view";

const MemberUserAccountTab = () => {
	const memberUserAccounts_resource_name = "AccountContact/MatchingLogins";
	const { id }: any = useParams();
	const isNew = !id;

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			{!isNew ? (
				<div>
					<BasicGridQueryPanel {...gridConfig()} className="mt-4" />
					<BasicGrid {...gridConfig()} className="mt-4 ml-4 mr-4" />
					<QueryLoader name={memberteams_simple_grid_name} />
				</div>
			) : (
				<div className="m-4 ml-8">Save member to see user accounts.</div>
			)}
		</div>
	);

	function gridConfig() {
		return {
			name: memberteams_simple_grid_name,
			columns: getColumns(),
			filters: [],
			orderBy: [{ field: "loginId", direction: "Asc" }],
			criteria: [
				{
					field: "contactID",
					op: OperationCriterias.Equal,
					values: [id],
				},
			],
			resource: memberUserAccounts_resource_name,
		};
	}

	function getColumns() {
		const columns = [
			{
				field: "aorName",
				headerText: "Association",
				width: 80,
				isIgnoreInSearch: true,
			},
			{
				field: "loginId",
				headerText: "Login ID",
				width: 80,
			},
			{
				field: "resetPassword",
				headerText: "Reset Password",
				customColumnTemplate: (props: any) => (
					<ForgotPasswordLink loginId={props.loginId} />
				),
				width: 80,
				isIgnoreInSearch: true,
			},
		];
		return columns;
	}
};
export default MemberUserAccountTab;
