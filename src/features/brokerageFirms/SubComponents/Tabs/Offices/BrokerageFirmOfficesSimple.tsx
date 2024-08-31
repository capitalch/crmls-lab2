import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _, { template } from "lodash";
import { fetchData } from "../../../../../components/QueryHelper/QueryHelperSlice";
import { SimpleGrid } from "../../../../../components/simpleGrid/SimpleGrid";
import { bf_resource_name } from "../../MyBrokerageFirms/MyBrokerageFirms";
import BFMainOfficeSelector from "./BFMainOfficeSelector";
import { TabTitle } from "../../../../../components/widgets/TabTitle";
import MembershipLink, {
	addLinkToColumns,
} from "../../../../../util/controls/MembershipLink/MembershipLink";
import { defaultProps } from "react-select/src/stateManager";

const BFOfficesSimpleTab = () => {
	const dispatch = useDispatch();
	const NAME = "bf-Officer-tab";
	const brokerageFirm: any = useSelector(
		(state: any) => state?.queryHelper[bf_resource_name]?.contents
	);
	const data: any[] =
		useSelector((state: any) => state?.queryHelper[NAME]?.contents) || [];

	useEffect(() => {
		if (_.isEmpty(brokerageFirm?.officesIDs)) {
			return;
		}
		const gridPayload: any = {
			pageSize: 1000,
			orderBy: [{ field: "name", direction: "Asc" }],
			searchCriteria: [
				{
					field: "id",
					op: 0,
					values: brokerageFirm?.officesIDs || [],
				},
			],
		};
		dispatch(
			fetchData({
				name: NAME,
				resource: "offices",
				queryPayload: gridPayload,
			})
		);
	}, [brokerageFirm, dispatch]);

	return (
		<div>
			<div className="mx-4">
				<TabTitle title="Associate Offices" />
			</div>
			<SimpleGrid
				columns={addLinkToColumns(getOfficeColumns(), "offices")}
				data={data}
			/>
		</div>
	);
};
export default BFOfficesSimpleTab;

export function getOfficeColumns() {
	return [
		{
			field: "primaryBrokerageFirmID",
			headerText: "Main Office",
			customColumnTemplate: BFMainOfficeSelector,
			isIgnoreInPanel: true,
			isIgnoreInSearch: true,
			width: 50,
		},
		{
			field: "name",
			headerText: "Name",
			width: 100,
		},
		{
			field: "officeCode",
			headerText: "Office Code",
			width: 100,
		},
		{
			field: "mainOfficeCode",
			headerText: "Main Office Code",
			width: 100,
		},
		{
			field: "address1",
			headerText: "Address",
			width: 100,
		},
		{
			field: "city",
			headerText: "City",
			width: 100,
		},
		{
			field: "stateName",
			headerText: "State",
			width: 100,
		},
	];
}
