import React, { Dispatch, FC, SetStateAction } from "react";
import ReactPaginate from "react-paginate";
import Filter from "./Filter";
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import { classNames } from "../../../util/helpers";
import { parseInt } from "lodash";
import Selector from "./Selector";
import { selectorSettings } from "./SortableTableContainer";
import { ThemeTooltip } from "../../settings/theme/ThemeTooltip";

export type columnType = {
	field: string;
	label: string;
	sortable: boolean;
	formatAs?: "currency" | "date" | "datetime"; // add additional as needed
	linkTo?: string;
	justify?: "right" | "left" | "center";
	tooltip?: string; // show this value as a tooltip on mouseover column header
	hideMobile?: boolean; // hide in the mobile view
	hidden?: boolean; // hide this column in all views
	hiddenSort?: string; // this is if you want to sort by a field other than the columnType.field value
};

export type rowValue = string | FC | JSX.Element | Date;

export type filterProps = {
	field: string;
	selected?: string;
};

export type tableProps = {
	columns: columnType[];
	data: rowValue[][];
	pageSize: number;
	setPageSize: Dispatch<SetStateAction<number>>;
	sort: string;
	setSort: Dispatch<SetStateAction<string>>;
	sortOrder: boolean;
	setSortOrder: Dispatch<SetStateAction<boolean>>;
	showFilter: boolean;
	filter: string;
	setFilter?: Dispatch<SetStateAction<string>>;
	selector?: selectorSettings;
	selected?: string;
	setSelector?: Dispatch<SetStateAction<string>>;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	totalPages: number;
	totalResults: number;
	newButton?: JSX.Element;
	filterOptions?: filterProps[];
};

const noDateStrings = ["DO NOT MARKET"];

const SortableTable = (props: tableProps) => {
	let formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	});

	const formattedRowValue = (v: rowValue, i: number) => {
		// don't try to format react components
		if (React.isValidElement(v)) {
			return v;
		}

		if (props.columns[i].formatAs && v) {
			// cast to string to shut up typescript
			v = v.toString();
			switch (props.columns[i].formatAs) {
				case "currency":
					v = formatter.format(parseInt(v));
					break;
				case "date":
					if (!noDateStrings.includes(v)) {
						v = dayjs(v).format("MM-DD-YYYY");
					}
					break;
				case "datetime":
					if (!noDateStrings.includes(v)) {
						v = dayjs(v).format("MM-DD-YYYY hh:mm A");
					}
					break;
				default:
			}
		}

		// if (props.columns[i].linkTo) {
		//     return (<Link to={props.columns[i].linkTo + '/'}>{v}</Link>);
		// }

		return v;
	};

	const sortClicked = (e: columnType) => {
		if (e.sortable) {
			if (e.field === props.sort) {
				if (!props.sortOrder) {
					// clear the sort
					props.setSortOrder(true);
					props.setSort("");
				} else {
					props.setSortOrder(false);
				}
			} else {
				// it's a new sort column
				props.setSortOrder(true);
				props.setSort(e.field);
			}
		}
	};

	const getPosition = (colPosition: string | undefined) => {
		let justify = "text-center";
		if (colPosition) {
			switch (colPosition) {
				case "left":
					justify = "text-left";
					break;
				case "right":
					justify = "text-right";
					break;
				case "center":
				default:
					justify = "text-center";
					break;
			}
		}
		return justify;
	};

	return (
		<>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="crmls-table-main-actions">
						<div className="crmls-actions-left">{props.newButton && props.newButton}</div>
						<div className="crmls-actions-right">
							{props.showFilter && props.setFilter && <Filter filter={props.filter} setFilter={props.setFilter} />}
							{props.selector && props.setSelector && <Selector props={props} setSelector={props.setSelector} />}
						</div>
					</div>
					<div className="crmls-table-main-container">
						<div className="crmls-table-wrapper">
							<table className="crmls-table">
								<thead>
									<tr>
										{props.columns
											.filter((h) => !h.hidden)
											.map((h) => {
												let hideMobile = h.hideMobile ? "hidden sm:table-cell" : "";
												return (
													<th key={h.field} scope="col" data-tip={h.tooltip ?? ""} className={classNames(getPosition(h.justify), hideMobile)}>
														<span onClick={() => sortClicked(h)} id={h.field}>
															{h.label}
															{h.sortable && props.sort === h.field && props.sortOrder && <ChevronDoubleUpIcon className="pl-1 text-blue-200 w-4 float-right" />}
															{h.sortable && props.sort === h.field && !props.sortOrder && <ChevronDoubleDownIcon className="pl-1 text-blue-200 w-4 float-right" />}
														</span>
													</th>
												);
											})}
									</tr>
								</thead>
								<tbody>
									{props.data.length > 0 &&
										props.data.map((r, i) => (
											<tr key={i} className={i % 2 === 0 ? "bg-primary" : "bg-secondary"}>
												{r.map((row, y) => {
													let hideMobile = props.columns[y].hideMobile ? "hidden sm:table-cell" : "";
													if (!props.columns[y].hidden) {
														return (
															<td key={y} className={classNames(getPosition(props.columns[y].justify), hideMobile)}>
																{formattedRowValue(row, y)}
															</td>
														);
													}
												})}
											</tr>
										))}
									{props.data.length <= 0 && (
										<tr className="bg-secondary text-secondary">
											<td colSpan={props.columns.length} className="text-center">
												No Results
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<div className="bg-primary px-4 py-3 flex items-center justify-between border-t border-default sm:px-6">
							<div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
								<div className="flex items-center hidden sm:flex">
									<div className="text-primary text-sm pr-2">Page size</div>
									<div>
										<select
											id="pageSize"
											name="pageSize"
											autoComplete="pageSize"
											onChange={(e) => {
												props.setPage(0);
												props.setPageSize(parseInt(e.target.value));
											}}
											className="max-w-lg block focus:ring-crmls-blue focus:border-divider w-full shadow-sm sm:max-w-xs sm:text-sm bg-primary border-default rounded-md"
										>
											<option value={10}>10</option>
											<option value={25}>25</option>
											<option value={50}>50</option>
											<option value={100}>100</option>
										</select>
									</div>
								</div>
								<div className="hidden sm:block">
									<p className="text-sm text-primary">
										Showing
										<span className="font-medium px-1">{props.page === 0 ? 1 : props.page * props.pageSize}</span>
										to
										<span className="font-medium px-1">{props.page + 1 === props.totalPages ? props.totalResults : (props.page + 1) * props.pageSize}</span>
										of
										<span className="font-medium px-1">{props.totalResults}</span>
										results
									</p>
								</div>
								<div>
									<ReactPaginate
										onPageChange={(e) => props.setPage(e.selected)}
										pageCount={props.totalPages}
										forcePage={props.page}
										pageRangeDisplayed={5}
										marginPagesDisplayed={2}
										activeClassName="z-10 text-tertiary"
										breakLinkClassName="bg-primary border-default text-secondary hover:bg-secondary hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
										containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
										pageClassName="bg-primary border-default text-secondary hover:bg-secondary relative inline-flex items-center px-4 py-2 border text-sm font-medium"
										previousClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary"
										nextClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ThemeTooltip />
		</>
	);
};

export default SortableTable;
