import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { fetchData } from "../../../../../components/QueryHelper/QueryHelperSlice";
import { SimpleGrid } from "../../../../../components/simpleGrid/SimpleGrid";
import { bf_resource_name } from "../../MyBrokerageFirms/MyBrokerageFirms";
import { columns } from "../Dba/BrokerageFirmDBAsSelectable";

const BFBrandsSimpleTab = ({ brands }: { brands: Brand[] }) => {
	const data = brands?.map((brand: any, i: any) => ({
		...brand,
		index: i + 1,
	}));
	return (
		<div>
			<SimpleGrid columns={getBrandsColumns()} data={data} />
		</div>
	);
};
export default BFBrandsSimpleTab;

export interface Brand {
	name: string;
	index: string | null;
	id?: string;
}

export function getBrandsColumns() {
	return [
		{
			field: "index",
			headerText: "#",
			width: 15,
		},
		{
			field: "name",
			headerText: "Name",
			width: 130,
		},
	];
}
