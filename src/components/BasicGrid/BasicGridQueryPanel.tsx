import { useDispatch } from "react-redux";
import { store } from "../../app/store";
import { BasicGridFilters } from "./BasicGridFilters";
import { BasicGridSearch } from "./BasicGridSearch";
import { fetchData } from "../QueryHelper/QueryHelperSlice";
import { resetAllFilters } from "./BasicGridSlice";
import _ from "lodash";
import clsx from "clsx";
import { useEffect } from "react";
import Criteria from "../../Interfaces/Criteria";

function BasicGridQueryPanel({
	name,
	columns,
	filters,
	resource,
	orderBy = [],
	className = "",
	criteria: propsCriteria,
}: BasicGridQueryPanelType) {
	const dispatch = useDispatch();

	useEffect(() => {
		execQuery();

		// return resetQueryFilters;
	}, []);

	return (
		<div>
			<BasicGridSearch
				name={name}
				columns={columns}
				resource={resource}
				execQuery={execQuery}
				className={clsx(className, "ml-4")}
				resetQueryFilters={resetQueryFilters}
				orderBy={orderBy}
				filters={filters}
			/>
			<BasicGridFilters
				name={name}
				resource={resource}
				filters={filters}
				execQuery={execQuery}
				resetQueryFilters={resetQueryFilters}
			/>
		</div>
	);

	function execQuery() {
		const criteria: Criteria[] = [...(propsCriteria || [])] || [];
		const searchCriteria: any[] = [];
		const storeState: any = store.getState();
		const basicGridState: any = storeState?.basicGrid?.[name];

		filters.forEach((filter: FilterOptionsType) => {
			const selectedValue = basicGridState?.[filter.name]?.selectedValue;
			if (selectedValue) {
				if (
					filter.controlType === "select" ||
					filter.controlType === "editableSelect"
				) {
					criteria.push({
						field: filter.filterFieldName,
						op: 0,
						values: [selectedValue],
					});
				} else if (filter.controlType === "text") {
					criteria.push({
						field: filter.filterFieldName,
						op: 10,
						values: [selectedValue],
					});
				}
			}
		});

		if (basicGridState?.searchTextValue) {
			columns.forEach((column: any) => {
				if (!column.isIgnoreInSearch) {
					searchCriteria.push({
						field: column.entityField || column.field,
						op: 10,
						values: [basicGridState.searchTextValue],
					});
				}
			});
		}

		const queryPayload = {
			pageId: 0,
			pageSize: 50,
			orderBy: _.isEmpty(orderBy)
				? [{ field: "name", direction: "Asc" }]
				: orderBy,
			criteria: criteria,
			searchCriteria: searchCriteria,
		};

		dispatch(
			fetchData({
				queryPayload: queryPayload,
				name: name,
				resource: resource,
			})
		);
	}

	function resetQueryFilters() {
		const state: any = store.getState();
		const searchCriteria: any[] =
			state?.basicGrid?.[name]?.payload?.searchCriteria || [];
		const queryPayload = {
			pageId: 0,
			pageSize: 50,
			orderBy: _.isEmpty(orderBy)
				? [{ field: "name", direction: "Asc" }]
				: orderBy,
			criteria: [],
			searchCriteria: searchCriteria,
		};
		dispatch(
			fetchData({
				queryPayload: queryPayload,
				name: name,
				resource: resource,
			})
		);
		const args: any = {
			name: name,
			filterNames: filters.map((filter) => filter.name),
		};
		dispatch(resetAllFilters(args));
	}
}
export { BasicGridQueryPanel };

type BasicGridQueryPanelType = {
	columns: any[];
	className?: string;
	filters: any[];
	name: string;
	orderBy?: any[];
	resource: string;
	criteria?: Criteria[];
};

type FilterOptionsType = {
	controlType: "select" | "text" | "editableSelect";
	name: string;
	displayName?: string;
	resource?: string;
	filterFieldName: string;
};
