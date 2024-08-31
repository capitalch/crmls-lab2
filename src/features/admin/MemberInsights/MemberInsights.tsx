import "react-sliding-pane/dist/react-sliding-pane.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { columnType } from "../../../components/widgets/sortableTable/SortableTable";
import compStyles from "./memberinsights.module.css";
import { getAllTickets, ticketTypeahead } from "../../../adapters";
import { ColumnDirective, ColumnsDirective, DataStateChangeEventArgs, GridComponent } from "@syncfusion/ej2-react-grids";
import { Inject, Page, Sort } from "@syncfusion/ej2-react-grids";
import ReactSlidingPane from "react-sliding-pane";
import dayjs from "dayjs";
import { getValue } from "@syncfusion/ej2-base";
import MemberInsight from "./MemberInsight";
import Loader from "../../../components/widgets/Loader";
import { BeatLoader } from "react-spinners";
import { debounce, isArray } from "lodash";
import { emit } from "../../../util/ibuki";
import { TableLoader } from "../../../components/widgets/SkeletonScreens";
import { PlusCircleIcon, ChatIcon } from "@heroicons/react/solid";

export const TicketColumns: columnType[] = [
	{
		field: "title",
		label: "Title",
		sortable: true,
		justify: "left",
		hideMobile: false,
	},
	{
		field: "createdOn",
		label: "Created",
		sortable: true,
		formatAs: "datetime",
		justify: "left",
		hideMobile: true,
	},
];

const placeholder = "Search by title or body text";
interface IWorkItemQ {
	data: { results: { title: string; createdOn: string }; totalResults: string };
}

const MemberInsights = () => {
	const styles = { ...compStyles };
	const [showSidePanel, setShowSidePanel] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [firstLoad, setFirstLoad] = useState(true);
	const [workItemId, setWorkItemId] = useState("");
	const [activePage, setActivePage] = useState(0);
	const [data, setData] = useState<{ result: IWorkItemQ["data"]["results"]; count: string }>();
	const [sortParams, setSortParams] = useState<any[]>([]);
	const gridControl = useRef<any>("");

	useEffect(() => {
		fetchData();
	}, [activePage, sortParams]);

	const fetchData = () => {
		getAllTickets({
			activePage: activePage,
			pageSize: 10,
			orderBy: sortParams,
		}).then((response: IWorkItemQ) => {
			if (gridControl.current) {
				gridControl.current.hideSpinner();
			}
			setData({
				result: response.data.results,
				count: response.data.totalResults,
			});
			setFirstLoad(false);
		});
	};

	const dateFormatter = (field: string, data: any) => {
		return dayjs(data.createdOn).format("MM/DD/YYYY");
	};

	const handleStateChange = (state: DataStateChangeEventArgs) => {
		if (state.action) {
			if (state.action.requestType === "sorting") {
				if ("sorted" in state) {
					let sortOrder: any[] = [];
					state.sorted?.forEach((sort) => {
						sortOrder.push({
							field: sort.name,
							direction: sort.direction === "ascending" ? "Asc" : "Desc",
						});
					});
					setSortParams(sortOrder);
				} else {
					setSortParams([]);
				}
			} else if (state.action.requestType === "paging") {
				if ((state.action as any).currentPage - 1 !== activePage) {
					setActivePage((state.action as any).currentPage - 1);
				}
			}
		} else {
			state.skip = 1;
		}
	};

	const handleSearch = (searchTerm: string) => {
		debounceSearch.cancel();
		ticketTypeahead(searchTerm).then((response) => {
			setActivePage(1);
			setData({
				result: response.data.results,
				count: response.data.totalResults,
			});
			setIsLoading(false);
		});
	};
	const debounceSearch = debounce(handleSearch, 500);
	const debouncedHandleSearch = useCallback(debounceSearch, []);

	const nameTemplate = (props: any) => {
		let field = props.column.field; // this will be the actual column
		let tag = props[field] ?? "No Name";
		if (isArray(tag)) {
			tag = tag.join(", ");
		}
		return (
			<div className="cursor-pointer" onClick={() => handleViewInsight(props.id)}>
				{tag}
			</div>
		);
	};

	const handleViewInsight = (insightId: string) => {
		setWorkItemId(insightId);
		setShowSidePanel(true);
	};

	return firstLoad ? (
		<TableLoader />
	) : (
		<>
			<div className="crmls-table-main-actions">
				<div className="crmls-actions-left w-full lg:w-3/4">
					<button type="button" className="action-button bg-green-600 w-full sm:w-auto" onClick={() => emit("openSupportTicket")}>
						<PlusCircleIcon className="h-4 w-4 mr-1" /> New Support Ticket
					</button>

					<button type="button" className="action-button bg-header w-full sm:w-auto" onClick={() => emit("openSupportChat")}>
						<ChatIcon className="h-4 w-4 mr-1" /> Message Support Now
					</button>
				</div>
				<div className="crmls-actions-right w-full lg:w-1/4">
					{isLoading && (
						<span className="">
							<BeatLoader size={5} />
						</span>
					)}

					<input
						type="text"
						className="w-full placeholder-secondary focus:ring-none focus:border-divider border-default rounded-md bg-secondary text-secondary"
						placeholder={placeholder}
						onChange={(e) => {
							setIsLoading(true);

							debouncedHandleSearch(e.target.value);
						}}
					></input>
				</div>
			</div>
			<div className="syncfusion-grid w-full">
				<GridComponent
					ref={gridControl}
					dataStateChange={handleStateChange}
					dataSource={data}
					allowPaging={true}
					pageSettings={{ pageCount: 10, pageSize: 10 }}
					allowSorting={true}
					resizeSettings={{ mode: "Auto" }}
					dataBound={() => {
						gridControl.current.autoFitColumns([]);
					}}
				>
					<ColumnsDirective>
						<ColumnDirective field="title" headerText="Title" template={nameTemplate} isPrimaryKey={true} />
						<ColumnDirective field="createdOn" headerText="Created On" valueAccessor={dateFormatter} width="140" />
					</ColumnsDirective>
					<Inject services={[Page, Sort]} />
				</GridComponent>
			</div>

			<ReactSlidingPane
				isOpen={showSidePanel}
				width={"85%"}
				title={"Insight Detail"}
				onRequestClose={() => {
					setShowSidePanel(false);
				}}
			>
				<MemberInsight id={workItemId} />
			</ReactSlidingPane>
		</>
	);
};

export default MemberInsights;
