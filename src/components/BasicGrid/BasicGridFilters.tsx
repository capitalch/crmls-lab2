import { BasicGridSelectFilter } from "./BasicGridSelectFilter";
import ResetIcon from "../widgets/icons/ResetIcon";
import { useSelector } from "react-redux";
import { BasicGridTextFilter } from "./BasicGridTextFilter";
import { BasicGridEditableSelectFilter } from "./BasicGridEditableSelectFilter";

function BasicGridFilters({
	name,
	resource,
	filters,
	className,
	execQuery,
	resetQueryFilters,
}: BasicGridFiltersType) {
	const isAnySelectedValue = useSelector((state: any) => {
		const basicGridState = state.basicGrid[name];
		const isAnySelected = filters.find(
			(filter: FilterOptionsType) =>
				basicGridState?.[filter.name]?.selectedValue
		);
		return isAnySelected;
	});

	const areFiltersVisible = useSelector((state: any) => {
		const ret = state?.basicGrid[name]?.areFiltersVisible;
		return ret;
	});

	const clsName = areFiltersVisible ? "flex" : "hidden";

	return (
		<div
			className={`${className} ${clsName} flex-wrap gap-2 mr-4 items-center mt-4 justify-center md:justify-between`}
		>
			{
				<button
					disabled={!isAnySelectedValue}
					onClick={resetQueryFilters}
					className="
                    disabled:opacity-0 order-0 h-8 inline-flex items-center px-3 border border-transparent shadow-sm text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-4"
				>
					<ResetIcon />
					Reset Filters
				</button>
			}
			<div className="flex gap-2 flex-wrap">{getControls()}</div>
		</div>
	);

	function getControls() {
		const controls = filters.map((filter: FilterOptionsType, index: number) => {
			let Ctrl: any = <></>;
			if (filter.controlType === "select") {
				Ctrl = (
					<BasicGridSelectFilter
						key={index}
						name={name}
						displayName={filter.displayName}
						filterName={filter.name}
						resource={filter.resource || ""}
						execQuery={execQuery}
					/>
				);
			} else if (filter.controlType === "text") {
				Ctrl = (
					<BasicGridTextFilter
						key={index}
						name={name}
						displayName={filter.displayName}
						filterName={filter.name}
						execQuery={execQuery}
					/>
				);
			} else if (filter.controlType === "editableSelect") {
				Ctrl = (
					<BasicGridEditableSelectFilter
						key={index}
						name={name}
						displayName={filter.displayName}
						filterName={filter.name}
						resource={filter.resource || ""}
						execQuery={execQuery}
					/>
				);
			}
			return Ctrl;
		});
		return controls;
	}
}

export { BasicGridFilters };

export type FilterOptionsType = {
	controlType: "select" | "text" | "editableSelect";
	name: string;
	displayName?: string;
	resource?: string;
	filterFieldName: string;
};

export type BasicGridFiltersType = {
	name: string;
	resource: string;
	filters: FilterOptionsType[];
	className?: any;
	execQuery: () => void;
	resetQueryFilters: () => void;
};
