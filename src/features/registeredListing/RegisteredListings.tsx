import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import ContentContainer from "../../components/content/ContentContainer";
import RegListingsButtons from "./RegListingsButtons";
import { propTypeLookupCode } from "../../util/helpers";
import dayjs from "dayjs";
import ReactTable from "../../components/widgets/reactTable/ReactTable";
import { debounce } from "lodash";
import { searchRegisteredListings } from "./registeredListingSlice";
import { useAppDispatch } from "../../app/hooks";

export const registeredStatuses = ["Sent to MLS", "Expired", "Incomplete"];
const RegisteredListings = () => {
	const dispatch = useAppDispatch();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pageCount, setPageCount] = useState(0);
	const [totalResults, setTotalResults] = useState(0);
	const [statusFilter, setStatusFilter] = useState("");
	const [searchFilter, setSearchFilter] = useState("");
	const [sortBy, setSortBy] = useState("");
	const [sortDirection, setSortDirection] = useState("");
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const [currentPageSize, setCurrentPageSize] = useState(10);
	const [fetchCriteria, setFetchCriteria] = useState<any[]>();
	const [fetchOrder, setFetchOrder] = useState<any[]>();
	const fetchIdRef = useRef(0);
	const sortIdRef = React.useRef(0);

	const columns = useMemo(
		() => [
			{
				Header: "Registered Listings",
				HideHeader: true,
				columns: [
					{
						Header: "Registered ID",
						accessor: "listingId",
						hideAt: 860,
					},
					{
						Header: "Registration Status",
						accessor: "registeredStatus",
						hideAt: 1200,
						disableSortBy: true,
					},
					{
						Header: "Status Date",
						accessor: "endDate",
						Cell: ({ row }: { row: any }) => {
							const rowData = row.original;
							if (rowData.registeredStatus === "Sent to MLS") {
								return dayjs(rowData.promotedDate).format("MM-DD-YYYY");
							} else if (rowData.registeredStatus === "Expired") {
								return dayjs(rowData.expirationDate).format("MM-DD-YYYY");
							} else if (rowData.registeredStatus === "Cancelled") {
								return dayjs(rowData.cancellationDate).format("MM-DD-YYYY");
							} else {
								return dayjs(rowData.createdOn).format("MM-DD-YYYY");
							}
						},
						hideAt: 640,
						disableSortBy: true,
					},
					{
						Header: "Listing ID",
						accessor: "promotedMlsId",
						hideAt: 1550,
					},
					{
						Header: "Property Address",
						accessor: "propertyAddress",
					},
					{
						Header: "Property Type",
						accessor: "propertyType",
						Cell: ({ row }: { row: any }) => {
							const rowData = row.original;
							return propTypeLookupCode(rowData.propertyType);
						},
						hideAt: 640,
					},
					{
						Header: "List Price",
						accessor: "listPrice",
						Cell: ({ row }: { row: any }) => {
							const rowData = row.original;
							let formatter = new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
								maximumFractionDigits: 0,
							});
							return formatter.format(parseInt(rowData.listPrice));
						},
						hideAt: 640,
					},
					{
						Header: "Start Marketing Date",
						accessor: "startShowingDate",
						Cell: ({ row }: { row: any }) => {
							const rowData = row.original;
							if (!rowData.hasOwnProperty("startShowingDate")) {
								return "DO NOT MARKET";
							} else {
								return dayjs(rowData.startShowingDate).format("MM-DD-YYYY");
							}
						},
						hideAt: 1275,
					},
					{
						Header: "Actions",
						id: "actions",
						Cell: ({ row }: { row: any }) => {
							return <RegListingsButtons listing={row.original} />;
						},
					},
					{
						accessor: "shadowSortStatus",
						hidden: true,
					},
				],
			},
		],
		[]
	);

	const fetchData = useCallback(({ pageSize, pageIndex, searchCriteria, orderCriteria }: { pageSize: number; pageIndex: number; searchCriteria?: any[]; orderCriteria?: any }) => {
		const fetchId = ++fetchIdRef.current;
		setCurrentPageIndex(pageIndex);
		setCurrentPageSize(pageSize);

		setIsLoading(true);
		const fetchCriteria = searchCriteria?.length ? searchCriteria : [];

		const defaultOrder = [
			{
				field: "registeredStatus",
				direction: "ASC",
			},
		];
		const fetchOrder = orderCriteria?.length ? orderCriteria : defaultOrder;

		// Only update the data if this is the latest fetch
		if (fetchId === fetchIdRef.current) {
			dispatch(
				searchRegisteredListings({
					pageId: pageIndex,
					pageSize: pageSize,
					criteria: fetchCriteria,
					orderBy: fetchOrder,
				})
			).then((response: any) => {
				if (response.payload) {
					setData(response.payload.results);
					setPageCount(response.payload.totalPages);
					setTotalResults(response.payload.totalResults);
				} else {
					setData([]);
					setPageCount(0);
					setTotalResults(0);
				}
				setIsLoading(false);
				setFetchCriteria(fetchCriteria);
				setFetchOrder(fetchOrder);
			});
		}
	}, []);

	// Search filter handling
	const getSearchCriteria = () => {
		const searchCriteria: any[] = [
			{
				field: "standardStatus",
				op: "notEqual",
				values: ["Z"],
			},
		];
		if (statusFilter) {
			searchCriteria.push({
				field: "registeredStatus",
				op: "Equal",
				values: [statusFilter],
			});
		}
		if (searchFilter) {
			// Array of fields we want to search
			["listingId", "propertyAddress"].forEach((field) => {
				searchCriteria.push({
					field: field,
					op: "Contains",
					values: [searchFilter],
				});
			});
		}
		return searchCriteria;
	};

	const getOrderCriteria = () => {
		const sortId = ++sortIdRef.current;
		if (sortId === sortIdRef.current && sortBy) {
			return [
				{
					field: sortBy,
					direction: sortDirection,
				},
			];
		}
		return false;
	};

	useEffect(() => {
		const searchCriteria = getSearchCriteria();
		const orderCriteria = getOrderCriteria();
		fetchData({ pageSize: currentPageSize, pageIndex: currentPageIndex, searchCriteria: searchCriteria, orderCriteria: orderCriteria });
	}, [statusFilter, searchFilter, sortBy, sortDirection]);

	// Handle search/sort filters
	const handleStatusFilter = (value: string) => {
		setCurrentPageIndex(0);
		setStatusFilter(value);
	};

	const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentPageIndex(0);
		setSearchFilter(e.target.value);
	};
	const handleSortBy = (sort: any) => {
		setSortBy(sort.sortBy[0].id);
		setSortDirection(sort.sortBy[0].desc ? "Asc" : "Desc");
	};

	// Search keyword filter debounce and cleanup
	const debouncedResults = useMemo(() => {
		return debounce(handleSearchFilter, 750);
	}, []);

	useEffect(() => {
		return () => {
			debouncedResults.cancel();
		};
	});

	return (
		<ContentContainer title="Registered Listing Agreements" actions={null}>
			<div className="mt-4">
				<div className="flex flex-col">
					<div className="overflow-x-auto">
						<div className="crmls-table-main-actions">
							<div className="crmls-actions-left">
								<Link className="my-2 overflow-x-auto" to={"/registered/new"}>
									<button type="button" className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3">
										<PlusCircleIcon className="text-white w-6 pr-2" />
										New
									</button>
								</Link>
							</div>
							<div className="crmls-actions-right">
								<input id="filter" name="filter" type="text" onChange={debouncedResults} className="w-48 ml-2 placeholder-secondary focus:ring-none focus:border-divider border-default rounded-md bg-secondary text-secondary" placeholder="Search / Filter" />
								<select id="status" name="status" onChange={(e) => handleStatusFilter(e?.target.value)} value={statusFilter} className="w-48 ml-2 placeholder-secondary focus:ring-none focus:border-divider border-default rounded-md bg-secondary text-secondary">
									<option value="">Select Status</option>
									{registeredStatuses.map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
						</div>
						<ReactTable columns={columns} data={data} onSort={handleSortBy} fetchData={fetchData} loading={isLoading} pageCount={pageCount} fetchResults={totalResults} fetchCriteria={fetchCriteria} fetchOrder={fetchOrder} resetPage={currentPageIndex === 0} />
					</div>
				</div>
			</div>
		</ContentContainer>
	);
};

export default RegisteredListings;
