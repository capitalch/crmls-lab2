import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Select from "react-select";
import { Error } from "../widgets/Error";
import _ from "lodash";
import { fetchData } from "../QueryHelper/QueryHelperSlice";
import { setFilterValue } from "./BasicGridSlice";

function BasicGridEditableSelectFilter({
	name,
	filterName,
	displayName,
	resource,
	execQuery,
}: BasicGridSearchFieldsSelectType) {
	const dispatch = useDispatch();
	const selectRef: any = useRef({});
	const defaultLabel = `Select ${displayName}`;

	const rows: any[] = useSelector((state: any) => {
		return state?.queryHelper?.[name + filterName]?.contents;
	});

	const selectedValue: string = useSelector((state: any) => {
		return state?.basicGrid?.[name]?.[filterName]?.selectedValue;
	});

	const error: Error = useSelector((state: any) => {
		return state?.queryHelper?.[name + filterName]?.error;
	});

	let isLoading = useSelector(
		(state: any) => state?.queryHelper[name + filterName]?.isLoading
	);
	isLoading = isLoading === undefined ? true : isLoading;

	if (selectedValue === "") {
		if (!_.isEmpty(selectRef.current)) {
			selectRef.current.setValue({ value: "", label: defaultLabel });
		}
	}
	useEffect(() => {
		dispatch(
			fetchData({
				name: name + filterName,
				resource: resource,
			})
		);
	}, [dispatch, filterName, name, resource]);

	if (error) {
		return <Error error={error} />;
	}

	if (isLoading) {
		return <div className="text-sm font-medium">Loading...</div>;
	}

	const getCurrentValue = () => {
		if (!selectedValue) {
			return { value: "", label: defaultLabel };
		}
		if (selectRef.current?.props?.options) {
			return selectRef.current?.props?.options?.find(
				(option: any) => option.value === selectedValue
			);
		}
		return getOptions()?.find((option: any) => option.value === selectedValue);
	};

	return (
		<Select
			ref={selectRef}
			options={getOptions()}
			placeholder={defaultLabel}
			onChange={handleSelectChange}
			value={getCurrentValue()}
			classNames={{
				control: () => "w-80",
			}}
			styles={{
				input: (base) => ({
					...base,
					"input:focus": {
						boxShadow: "none",
					},
				}),
				option: (defaultStyles: any, state: any) => ({
					...defaultStyles,
					paddingTop: "2px",
					paddingBottom: "2px",
					fontSize: "14px",
				}),
				valueContainer: (defaultStyles: any, state: any) => ({
					...defaultStyles,
					fontSize: "14px",
				}),
			}}
		/>
	);

	function getOptions() {
		let options: any[] = [];
		if (!_.isEmpty(rows)) {
			options = rows.map((row: any, index: number) => {
				return { label: row.name, value: row.id };
			});
		}
		options.unshift({ label: defaultLabel, value: "" });
		return options;
	}

	function handleSelectChange(e: any) {
		const args: any = {
			name: name,
			filterName: filterName,
			selectedValue: e.value,
		};
		dispatch(setFilterValue(args));
		execQuery();
	}
}
export { BasicGridEditableSelectFilter };
type BasicGridSearchFieldsSelectType = {
	name: string;
	filterName: string;
	displayName?: string;
	resource: string;
	execQuery: () => void;
};
