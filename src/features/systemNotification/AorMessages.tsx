import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllSystemNotifications } from "./systemNotificationsSlice";
import SortableTableContainer from "../../components/widgets/sortableTable/SortableTableContainer";
import { columnType } from "../../components/widgets/sortableTable/SortableTable";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import ContentContainer from "../../components/content/ContentContainer";
import { TableLoader } from "../../components/widgets/SkeletonScreens";
import { SystemNotificationEntity } from "../notification/notificationTypes";
import AorMessageButtons from "./AorMessageButtons";
import Tabs from "../../components/tabs/Tabs";

export const AORColumns: columnType[] = [
	{
		field: "title",
		label: "Title",
		sortable: true,
		justify: "left",
		hideMobile: false,
	},
	{
		field: "message",
		label: "Message",
		sortable: true,
		justify: "left",
		hideMobile: false,
	},
	{
		field: "systemNotificationStatusId",
		label: "Type",
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
	{
		field: "modifiedOn",
		label: "Modified",
		sortable: true,
		formatAs: "datetime",
		justify: "left",
		hideMobile: false,
	},
	{
		field: "expirationDate",
		label: "Expires",
		sortable: true,
		formatAs: "datetime",
		justify: "left",
		hideMobile: false,
	},
	{
		field: "actions",
		label: "Actions",
		sortable: false,
		justify: "center",
	},
];

const AddButton = (
	<Link className="my-2 overflow-x-auto" to={"/aor-messages/new"}>
		<button type="button" className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3">
			<PlusCircleIcon className="text-white w-6 pr-2" />
			New
		</button>
	</Link>
);

const AorMessages = () => {
	const title = "AOR Center";
	const systemNotifications = useSelector(selectAllSystemNotifications);
	const [aorNotifications, setAorNotifications] = useState<SystemNotificationEntity[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	
	useEffect(() => {
		setIsLoading(true);
		setAorNotifications(systemNotifications.filter((notification: SystemNotificationEntity) => notification.source === "AOR"));
	}, [systemNotifications]);
	
	useEffect(() => {
		setIsLoading(false);
	}, [aorNotifications]);
	
	const buildTabContent = () => {
		let tabs = [
			<div key="messages" data-label="Messages/Alerts">
				<div className="mt-4">
					<SortableTableContainer
						allData={aorNotifications.map((d: SystemNotificationEntity) => {
							let r: any[] = [];
							r.push(
								<Link to={`/aor-messages/${d.id}`} className="crmls-link">
									{d.title ?? "Message Title Not Defined"}
								</Link>
							);
							r.push(d.message.replace(/(<([^>]+)>)/gi, ""));
							r.push(d.systemNotificationStatus?.name);
							r.push(d.createdOn);
							r.push(d.modifiedOn);
							r.push(d.expirationDate);
							r.push(<AorMessageButtons message={d} />);
							return r;
						})}
						columns={AORColumns}
						defaultSort="createdOn"
						showFilter={false}
						addButton={AddButton}
						selector={{
							column: "systemNotificationStatusId",
							selected: "",
							label: "Filter by type",
						}}
					/>
				</div>
			</div>
		];
		return tabs;
	}

	return (
		<>
			{isLoading && <TableLoader />}
			{!isLoading && (
				buildTabContent()
			)}
		</>
	);
};

export default AorMessages;
