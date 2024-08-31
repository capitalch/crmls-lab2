import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllSystemNotifications, selectAllSystemNotifications } from "../../systemNotification/systemNotificationsSlice";
import { TableLoader } from "../../../components/widgets/SkeletonScreens";
import { SystemNotificationEntity } from "../../notification/notificationTypes";
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Sort } from "@syncfusion/ej2-react-grids";
import dayjs from "dayjs";
import ReactSlidingPane from "react-sliding-pane";
import Message from "./Message";
import { isArray } from "lodash";
import { selectReadSystemNotifications } from "../../user/selectors";
import { useAppDispatch } from "../../../app/hooks";
import { setUserPrefs } from "../../user/userPrefsSlice";
import { show } from "../../notification/notificationSlice";
import { mace_url } from "../../../adapters";
import axios from "axios";
import { PencilIcon, PlusCircleIcon, ReplyIcon, TrashIcon } from "@heroicons/react/solid";

interface INotificationItemQ {
	data: { results: any[]; totalResults: string };
}

const Messages = () => {
	const dispatch = useAppDispatch();
	const readNotifications = useSelector(selectReadSystemNotifications);
	const gridControl = useRef<any>();
	const [showSidePanel, setShowSidePanel] = useState(false);
	const [messageId, setMessageId] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<{ result: INotificationItemQ["data"]["results"]; count: string }>();
	const systemNotifications = useSelector(selectAllSystemNotifications);

	const dateFormatter = (field: string, data: any) => {
		return dayjs(data.createdOn).format("MM/DD/YYYY");
	};

	const messageFormatter = (field: string, data: any) => {
		return data.message.replace(/(<([^>]+)>)/gi, "");
	};

	useEffect(() => {
		const notificationData = systemNotifications.filter((notification: SystemNotificationEntity) => notification.source === "AOR");
		setIsLoading(true);
		setData({ result: notificationData, count: notificationData.length.toString() });
	}, [systemNotifications]);

	useEffect(() => {
		setIsLoading(false);
	}, [data]);

	/*** Column Templates  ***/
	const nameTemplate = (props: any) => {
		let field = props.column.field; // this will be the actual column
		let tag = props[field] ?? "No Name";
		if (isArray(tag)) {
			tag = tag.join(", ");
		}
		return <div className="cursor-pointer" onClick={() => handleEditMessage(props.id)}>{tag}</div>;
	};

	const actionsTemplate = (props: any) => {
		return (
			<>
				<span className="relative z-0 inline-flex shadow-sm rounded-sm">
					<button title="Edit" type="button" className="relative inline-flex items-center px-2 py-2 rounded-l-sm border border-default bg-primary" onClick={() => handleEditMessage(props.id)}>
						<span className="sr-only">Edit</span>
						<PencilIcon className="w-4 h-4 text-header" aria-hidden="true" />
					</button>
					<button title="Delete" type="button" className="relative inline-flex items-center px-2 py-2 rounded-r-sm border border-default bg-primary" onClick={() => handleDeleteMessage(props.id)}>
						<span className="sr-only">Delete</span>
						<TrashIcon className="w-4 h-4 text-red-500" aria-hidden="true" />
					</button>
					<button title="Mark as Unread" type="button" className="relative inline-flex items-center px-2 py-2 rounded-r-sm border border-default bg-primary" onClick={() => handleMarkAsUnread(props.id)}>
						<span className="sr-only">Mark as Unread</span>
						<ReplyIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
					</button>
				</span>
			</>
		);
	};

	/*** Actions ***/
	const handleEditMessage = (messageId: string) => {
		setMessageId(messageId);
		setShowSidePanel(true);
	};

	const handleNewMessage = () => {
		setMessageId("");
		setShowSidePanel(true);
	};

	const handleMarkAsUnread = (messageId: string) => {
		if (messageId) {
			var index = readNotifications.indexOf(messageId);
			if (index !== -1) {
				const newReadNotifications = [...readNotifications].filter((notification) => notification !== messageId);
				dispatch(
					setUserPrefs({
						key: "systemNotifications.read",
						value: newReadNotifications,
					})
				);
			}
		}
	};

	const handleDeleteMessage = (messageId: string) => {
		if (window.confirm("Are you sure you wish to delete this message?")) {
			axios
				.delete(mace_url + "api/app/SystemNotification/" + messageId)
				.then(() => {
					dispatch(
						show({
							show: true,
							title: "Success",
							message: "Message deleted succesfully",
							status: "success",
							position: "popover",
							autoHide: 5000,
							confirm: false,
							notificationId: null,
						})
					);
					dispatch(fetchAllSystemNotifications());
				})
				.catch((e) => {
					dispatch(
						show({
							show: true,
							title: "Error",
							message: "There was a problem deleting the message. " + e.message,
							status: "error",
							position: "popover",
							autoHide: 5000,
							confirm: false,
							notificationId: null,
						})
					);
					console.error("Error deleting message", e);
				});
		}
	};

	const closeSlider = () => {
		setShowSidePanel(false);
	};

	return isLoading ? (
		<TableLoader />
	) : (
		<>
			<div className="crmls-table-main-actions">
				<div className="crmls-actions-left w-full lg:w-3/4">
					<button type="button" className="action-button bg-green-600 w-full sm:w-auto" onClick={handleNewMessage}>
						<PlusCircleIcon className="h-4 w-4 mr-1" /> New Message
					</button>
				</div>
			</div>
			<div className="syncfusion-grid w-full">
				<GridComponent
					ref={gridControl}
					dataSource={data}
					allowPaging={true}
					// pageSettings={{ pageCount: 10, pageSize: 1 }}
					allowSorting={true}
					enablePersistence={false}
					resizeSettings={{ mode: "Auto" }}
					dataBound={() => {
						gridControl.current.autoFitColumns([]);
					}}
				>
					<ColumnsDirective>
						<ColumnDirective field="title" headerText="Title" template={nameTemplate} isPrimaryKey={true} />
						<ColumnDirective field="message" valueAccessor={messageFormatter} headerText="Message" />
						<ColumnDirective field="systemNotificationStatus.name" headerText="Type" />
						<ColumnDirective field="createdOn" headerText="Created On" valueAccessor={dateFormatter} />
						<ColumnDirective field="modifiedOn" headerText="Last Modified" valueAccessor={dateFormatter} />
						<ColumnDirective field="expirationDate" headerText="Expires" valueAccessor={dateFormatter} />
						<ColumnDirective field="actions" headerText="Actions" template={actionsTemplate} textAlign="Right" allowSorting={false} />
					</ColumnsDirective>
					<Inject services={[Page, Sort]} />
				</GridComponent>
			</div>

			<ReactSlidingPane
				isOpen={showSidePanel}
				width={"85%"}
				title={messageId ? "Message Details" : "New Message"}
				onRequestClose={() => {
					setMessageId("");
					setShowSidePanel(false);
				}}
			>
				<Message id={messageId} closeSlider={closeSlider} />
			</ReactSlidingPane>
		</>
	);
};

export default Messages;
