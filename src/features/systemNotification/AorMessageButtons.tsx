import { useAppDispatch } from "../../app/hooks";
import { push } from "connected-react-router";
import { show } from "../notification/notificationSlice";
import axios from "axios";
import { mace_url } from "../../adapters";
import { fetchAllSystemNotifications } from "./systemNotificationsSlice";
import { selectReadSystemNotifications } from "../user/selectors";
import { useSelector } from "react-redux";
import { setUserPrefs } from "../user/userPrefsSlice";
import { PencilIcon, ReplyIcon, TrashIcon } from "@heroicons/react/solid";

const AorMessageButtons = ({ message }: any) => {
	const dispatch = useAppDispatch();
	const readNotifications = useSelector(selectReadSystemNotifications);

	const handleEdit = (alertId: string) => {
		dispatch(push(`/aor-messages/${alertId}`));
	};

	const handleMarkAsUnread = (alertId: string) => {
		if (alertId) {
			var index = readNotifications.indexOf(alertId);
			if (index !== -1) {
				const newReadNotifications = [...readNotifications].filter((notification) => notification !== alertId);
				dispatch(
					setUserPrefs({
						key: "systemNotifications.read",
						value: newReadNotifications,
					})
				);
			}
		}
	};

	const handleDeleteClick = () => {
		if (window.confirm("Are you sure you wish to delete this message?")) {
			axios
				.delete(mace_url + "api/app/SystemNotification/" + message.id)
				.then(() => {
					dispatch(
						show({
							show: true,
							title: "Success",
							message: "AOR message deleted succesfully",
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
							message: "There was a problem deleting the AOR message. " + e.message,
							status: "error",
							position: "popover",
							autoHide: 5000,
							confirm: false,
							notificationId: null,
						})
					);
					console.error("Error deleting AOR message", e);
				});
		}
	};

	return (
		<>
			<span className="relative z-0 inline-flex shadow-sm rounded-sm">
				<button title="Edit" type="button" className="relative inline-flex items-center px-2 py-2 rounded-l-sm border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary" onClick={() => handleEdit(message.id)}>
					<span className="sr-only">Edit</span>
					<PencilIcon className="w-5 h-5 text-header" aria-hidden="true" />
				</button>
				<button title="Delete" type="button" className="relative inline-flex items-center px-2 py-2 rounded-r-sm border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary" onClick={() => handleDeleteClick()}>
					<span className="sr-only">Delete</span>
					<TrashIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
				</button>
				<button title="Mark as Unread" type="button" className="relative inline-flex items-center px-2 py-2 rounded-r-sm border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary" onClick={() => handleMarkAsUnread(message.id)}>
					<span className="sr-only">Mark as Unread</span>
					<ReplyIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
				</button>
			</span>
		</>
	);
};

export default AorMessageButtons;
