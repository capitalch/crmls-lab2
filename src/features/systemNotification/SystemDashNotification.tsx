import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { fetchAllSystemNotifications, selectAllSystemNotifications } from "./systemNotificationsSlice";
import { selectPrefsProfile, selectReadSystemNotifications } from "../user/selectors";
import { setUserPrefs } from "../user/userPrefsSlice";
import { DashAlert } from "../../components/widgets/alerts/AlertElements";
import { fetchAllAds } from "../ads/adsSlice";

const SystemDashNotification = () => {
	const dispatch = useAppDispatch();
	const allNotifications = useSelector(selectAllSystemNotifications);
	const readNotifications = useSelector(selectReadSystemNotifications);
	const [notifications, setNotifications] = useState<any[]>([]);
	let profile = useSelector(selectPrefsProfile);

	useEffect(() => {
		let userPrefsInterval = setInterval(() => {
			if (profile.id) {
				dispatch(fetchAllSystemNotifications());
			}
		}, 60000);

		if (profile.id) {
			dispatch(fetchAllSystemNotifications());
			dispatch(fetchAllAds());
		}
		return () => clearInterval(userPrefsInterval);
	}, [profile]);

	useEffect(() => {
		const hasUnread = allNotifications.filter(({ id, position }) => position === "dash" && !readNotifications.includes(id));
		if (hasUnread.length > 0) {
			setNotifications(hasUnread);
		} else {
			setNotifications([]);
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

	if (notifications.length > 0) {
		return (
			<div className="p-4 pb-0 flex flex-col">
				{notifications.map((notification, i) => (
					<DashAlert key={i} notification={notification} callback={() => handleMarkAsRead(notification.id)} />
				))}
			</div>
		);
	} else {
		return null;
	}
};

export default SystemDashNotification;
