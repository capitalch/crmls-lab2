import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { selectAllSystemNotifications } from "./systemNotificationsSlice";
import { selectReadSystemNotifications } from "../user/selectors";
import { setUserPrefs } from "../user/userPrefsSlice";
import { ModalAlert } from "../../components/widgets/alerts/AlertElements";

const SystemModalNotification = () => {
	const dispatch = useAppDispatch();
	const allNotifications = useSelector(selectAllSystemNotifications);
	const readNotifications = useSelector(selectReadSystemNotifications);
	const [notification, setNotification] = useState<any>();

	useEffect(() => {
		const hasUnread = allNotifications.filter(({ id, position }) => position === "modal" && !readNotifications.includes(id));
		if (hasUnread.length > 0) {
			setNotification(hasUnread[0]);
		} else {
			setNotification(null);
		}
	}, [allNotifications, readNotifications]);

	const handleMarkAsRead = (notificationId: string) => {
		const newReadNotifications = [...readNotifications, notificationId];
		dispatch(
			setUserPrefs({
				key: "systemNotifications.read",
				value: newReadNotifications,
			})
		);
	};

	if (notification) {
		return (
			<ModalAlert notification={notification} callback={() => handleMarkAsRead(notification.id)} />
		);
	} else {
		return null;
	}
};

export default SystemModalNotification;
