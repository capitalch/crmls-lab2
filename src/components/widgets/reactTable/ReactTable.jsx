import React, { useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { useTable, useSortBy, usePagination } from "react-table";
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";
import { ThemeTooltip } from "../../settings/theme/ThemeTooltip";
import { useWindowSize } from "../../../app/hooks";

export default function ReactTable({ columns, data, onSort, fetchData, loading, pageCount: controlledPageCount, fetchResults, fetchCriteria, fetchOrder, resetPage }) {
	const windowSize = useWindowSize();
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		pageOptions,
		gotoPage,
		setPageSize,
		// Get the state from the instance
		state: { pageIndex, pageSize, sortBy },
		setHiddenColumns,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, hiddenColumns: columns[0].columns.filter((col) => col.hidden).map((col) => col.id || col.accessor) },
			manualPagination: true,
			manualSortBy: true,
			pageCount: controlledPageCount,
			autoResetPage: false,
			autoResetSortBy: false,
		},
		useSortBy,
		usePagination
	);

	useEffect(() => {
		const hiddenColumns = columns[0].columns.filter((col) => col.hidden).map((col) => col.id || col.accessor);
		const hideAtColumns = columns[0].columns.filter((col) => col.hideAt && col.hideAt >= windowSize.width).map((col) => col.id || col.accessor);
		setHiddenColumns([...hiddenColumns, ...hideAtColumns]);
	}, [windowSize]);

	// Listen for changes in pagination and use the state to fetch our new data
	useEffect(() => {
		fetchData({ pageIndex, pageSize, searchCriteria: fetchCriteria, orderCriteria: fetchOrder });
	}, [fetchData, pageIndex, pageSize]);

	useEffect(() => {
		if (sortBy.length > 0) {
			onSort({ sortBy });
		}
	}, [sortBy]);

	useEffect(() => {
		if (resetPage) {
			gotoPage(0);
		}
	}, [resetPage]);

	// Page jump filter debounce and cleanup
	const handlePageChange = (e) => {
		const page = e.target.value ? Number(e.target.value) - 1 : 0;
		gotoPage(parseInt(page, 10));
	};

	const debouncedJumpPage = useMemo(() => {
		return debounce(handlePageChange, 500);
	}, []);

	useEffect(() => {
		return () => {
			debouncedJumpPage.cancel();
		};
	});

	return (
		<>
			<div className="crmls-table-main-container">
				<div className="crmls-table-wrapper">
					<table className="crmls-table" {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers
										.filter((h) => !h.hidden)
										.map((column) => {
											return column.HideHeader === true ? null : (
												<th data-tip={column.tooltip ?? ""} className={column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : ""} {...column.getHeaderProps()} {...column.getHeaderProps(column.getSortByToggleProps())}>
													<div className="flex justify-center align-center">
														<span>{column.render("Header")}</span>
														<span>{column.isSorted ? column.isSortedDesc ? <ChevronDoubleDownIcon className="ml-2 text-blue-200 w-4" /> : <ChevronDoubleUpIcon className="ml-2 text-blue-200 w-4" /> : ""}</span>
													</div>
												</th>
											);
										})}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{loading ? (
								<tr className="bg-secondary text-secondary">
									<td colSpan={columns[0].columns.length} className="text-center">
										Loading results...
									</td>
								</tr>
							) : page.length > 0 ? (
								page.map((row, i) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return (
													<td {...cell.getCellProps()}>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									);
								})
							) : (
								<tr className="bg-secondary text-secondary">
									<td colSpan={columns[0].columns.length} className="text-center">
										No Results
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{pageOptions.length > 0 && (
				<div className="px-4 py-3 flex items-center justify-between sm:px-6">
					<div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
						<div className="flex items-center hidden md:flex space-x-2">
							<div className="text-primary text-sm">Page size</div>
							<select
								id="pageSize"
								name="pageSize"
								autoComplete="pageSize"
								value={pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
								className="max-w-xl block focus:ring-crmls-blue focus:border-divider shadow-sm sm:max-w-xs sm:text-sm bg-primary border-default rounded-md"
							>
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
							<input type="number" placeholder="Jump to page" min="1" max={pageOptions.length} onChange={debouncedJumpPage} className="max-w-xl w-36 block focus:ring-crmls-blue focus:border-divider shadow-sm sm:max-w-xs sm:text-sm bg-primary border-default rounded-md" />
						</div>
						<div className="hidden lg:block">
							<p className="text-sm text-primary">
								{!loading && (
									<span className="font-medium px-1">
										Showing {(pageIndex * pageSize) + 1} to {pageIndex * pageSize + pageSize} of {fetchResults} results
									</span>
								)}
							</p>
						</div>
						<div>
							<ReactPaginate
								onPageChange={(e) => gotoPage(e.selected)}
								pageCount={pageOptions.length}
								forcePage={pageIndex}
								pageRangeDisplayed={3}
								marginPagesDisplayed={2}
								activeClassName="z-10 text-tertiary"
								breakLinkClassName="bg-primary border-default text-secondary hover:bg-secondary hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
								containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
								pageClassName="bg-primary border-default text-secondary hover:bg-secondary relative inline-flex items-center border text-sm font-medium"
								previousClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary"
								nextClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary"
								pageLinkClassName="px-4 py-2 "
							/>
						</div>
					</div>
				</div>
			)}
			<ThemeTooltip />
		</>
	);
}
