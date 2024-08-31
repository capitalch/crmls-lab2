import React, { Dispatch, SetStateAction, useState, useMemo, useCallback } from "react";
import _ from "underscore";
import { XCircleIcon } from "@heroicons/react/solid";

export type filterProps = {
	filter: string;
	setFilter: Dispatch<SetStateAction<string>>;
};

const Filter = (props: filterProps) => {
	const [filterValue, setFilterValue] = useState(props.filter);
	const debouncedSearch = useMemo(
		() =>
			_.debounce((val: string) => {
				props.setFilter(val);
			}, 750),
		[props]
	);

	const filterCallback = useCallback(
		(value: string) => {
			debouncedSearch(value);
		},
		[debouncedSearch]
	);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterValue(e.target.value);
		filterCallback(e.target.value);
	};

	return (
		<>
			<input id="filter" name="filter" type="text" value={filterValue} onChange={onChange} className="w-48 ml-2 p-2 placeholder-secondary focus:ring-blue-500 focus:border-blue-500 border-default rounded-md bg-secondary text-secondary" placeholder="Search / Filter" />
			{filterValue.length > 0 && (
				<div className="absolute inset-y-1 right-2 flex items-center">
					<span
						className="z-10 h-full leading-snug font-normal absolute text-center text-blue-300 hover:text-blue-500 absolute bg-transparent rounded text-secondary items-center justify-center w-8 right-0 pr-3 py-3 "
						onClick={() => {
							setFilterValue("");
							props.setFilter("");
						}}
					>
						<XCircleIcon className="fill-current" />
					</span>
				</div>
			)}
		</>
	);
};

export default Filter;
