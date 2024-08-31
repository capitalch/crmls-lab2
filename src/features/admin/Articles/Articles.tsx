import { useEffect, useRef, useState } from "react";
import { fetchDataWithCriteria, mace_url } from "../../../adapters";
import { ColumnDirective, ColumnsDirective, DataStateChangeEventArgs, GridComponent } from "@syncfusion/ej2-react-grids";
import { Inject, Page, Sort } from "@syncfusion/ej2-react-grids";
import ReactSlidingPane from "react-sliding-pane";
import Article from "./Article";
import dayjs from "dayjs";
import { TableLoader } from "../../../components/widgets/SkeletonScreens";
import { isArray } from "lodash";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../../../app/hooks";
import { show } from "../../notification/notificationSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { userProfile } from "../../user/selectors";

interface IArticleItemQ {
	data: { results: any[]; totalResults: string };
}

const Articles = () => {
	const profile = useSelector(userProfile);
	const dispatch = useAppDispatch();
	const [showSidePanel, setShowSidePanel] = useState(false);
	const [firstLoad, setFirstLoad] = useState(true);
	const [articleId, setArticleId] = useState("");
	const [activePage, setActivePage] = useState(0);
	const [data, setData] = useState<{ result: IArticleItemQ["data"]["results"]; count: string }>();
	const [sortParams, setSortParams] = useState<any[]>([]);
	const gridControl = useRef<any>("");

	useEffect(() => {
		if (profile) {
			fetchData();
		}
	}, [profile, activePage, sortParams]);

	const fetchData = () => {
		if (mace_url) {
			fetchDataWithCriteria(mace_url, "article", {
				pageId: activePage,
				pageSize: 10,
				criteria: [{ field: "sourceId", op: "Equal", values: [profile?.aor?.id] }],
				orderBy: sortParams,
			}).then((response: IArticleItemQ) => {
				if (gridControl.current) {
					gridControl.current.hideSpinner();
				}
				setData({
					result: response.data.results,
					count: response.data.totalResults,
				});
				setFirstLoad(false);
			});
		}
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

	/*** Column Templates  ***/
	const dateFormatter = (field: string, data: any) => {
		return dayjs(data.createdOn).format("MM/DD/YYYY");
	};

	const nameTemplate = (props: any) => {
		let field = props.column.field; // this will be the actual column
		let tag = props[field] ?? "No Name";
		if (isArray(tag)) {
			tag = tag.join(", ");
		}
		return (
			<div className="cursor-pointer" onClick={() => handleEditArticle(props.id)}>
				{tag}
			</div>
		);
	};

	const actionsTemplate = (props: any) => {
		return (
			<span className="relative z-0 inline-flex shadow-sm rounded-sm">
				<button title="Edit" type="button" className="relative inline-flex items-center px-2 py-2 rounded-l-sm border border-default bg-primary" onClick={() => handleEditArticle(props.id)}>
					<span className="sr-only">Edit</span>
					<PencilIcon className="w-4 h-4 text-header" aria-hidden="true" />
				</button>
				<button title="Delete" type="button" className="relative inline-flex items-center px-2 py-2 rounded-r-sm border border-default bg-primary" onClick={() => handleDeleteArticle(props.id)}>
					<span className="sr-only">Delete</span>
					<TrashIcon className="w-4 h-4 text-red-500" aria-hidden="true" />
				</button>
			</span>
		);
	};

	/*** Actions ***/
	const handleEditArticle = (articleId: string) => {
		setArticleId(articleId);
		setShowSidePanel(true);
	};

	const handleNewArticle = () => {
		setArticleId("");
		setShowSidePanel(true);
	};

	const handleDeleteArticle = (articleId: string) => {
		if (window.confirm("Are you sure you wish to delete this article?")) {
			axios
				.delete(mace_url + "api/app/Article/" + articleId)
				.then(() => {
					dispatch(
						show({
							show: true,
							title: "Success",
							message: "Article deleted succesfully",
							status: "success",
							position: "popover",
							autoHide: 5000,
							confirm: false,
							notificationId: null,
						})
					);
					fetchData();
				})
				.catch((e) => {
					dispatch(
						show({
							show: true,
							title: "Error",
							message: "There was a problem deleting the article. " + e.message,
							status: "error",
							position: "popover",
							autoHide: 5000,
							confirm: false,
							notificationId: null,
						})
					);
					console.error("Error deleting article", e);
				});
		}
	};

	const closeSlider = () => {
		setShowSidePanel(false);
		fetchData();
	};

	return firstLoad ? (
		<TableLoader />
	) : (
		<>
			<div className="crmls-table-main-actions">
				<div className="crmls-actions-left w-full lg:w-3/4">
					<button type="button" className="action-button bg-green-600 w-full sm:w-auto" onClick={handleNewArticle}>
						<PlusCircleIcon className="h-4 w-4 mr-1" /> New Article
					</button>
				</div>
			</div>
			<div className="syncfusion-grid w-full">
				<GridComponent
					ref={gridControl}
					dataStateChange={handleStateChange}
					dataSource={data}
					allowPaging={true}
					// pageSettings={{ pageCount: 10, pageSize: 1 }}
					allowSorting={true}
					resizeSettings={{ mode: "Auto" }}
					dataBound={() => {
						gridControl.current.autoFitColumns([]);
					}}
				>
					<ColumnsDirective>
						<ColumnDirective field="title" headerText="Title" template={nameTemplate} isPrimaryKey={true} />
						<ColumnDirective field="status" headerText="Status" />
						<ColumnDirective field="articleCategory.name" headerText="Category" />
						<ColumnDirective field="createdOn" headerText="Created On" valueAccessor={dateFormatter} />
						<ColumnDirective field="actions" headerText="Actions" template={actionsTemplate} textAlign="Right" allowSorting={false} />
					</ColumnsDirective>
					<Inject services={[Page, Sort]} />
				</GridComponent>
			</div>

			<ReactSlidingPane
				className="slider-pane"
				overlayClassName="slider-pane-overlay"
				isOpen={showSidePanel}
				width={"85%"}
				title={"Article Detail"}
				onRequestClose={() => {
					setArticleId("");
					setShowSidePanel(false);
				}}
			>
				<Article id={articleId} closeSlider={closeSlider} />
			</ReactSlidingPane>
		</>
	);
};

export default Articles;
