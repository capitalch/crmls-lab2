import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { fetchAllNotifications, selectAllNotifications } from "./notificationsSlice";
import { MailIcon } from "@heroicons/react/outline";
import { selectReadNotifications, userProfile } from "../user/selectors";

const NotificationIcon = ({ size }: { size: number }) => {
	const dispatch = useAppDispatch();
	const profile = useSelector(userProfile);
	const allNotifications = useSelector(selectAllNotifications);
	const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
	const readNotifications = useSelector(selectReadNotifications);

	useEffect(() => {
		if (profile && profile.member?.id) {
			dispatch(fetchAllNotifications(profile.member.id));
		}
	}, [profile]);

	useEffect(() => {
<<<<<<< HEAD
		if (readNotifications && readNotifications.length) {
=======
		if (allNotifications.length > 0 && readNotifications && readNotifications.length) {
>>>>>>> dev-1
			const hasUnread = allNotifications.filter(({ id }) => !readNotifications.includes(id));
			setUnreadNotificationsCount(hasUnread.length);
		} else {
			setUnreadNotificationsCount(allNotifications.length);
		}
	}, [allNotifications, readNotifications]);

	return (
		<Link to="/notifications">
			<div className="relative p-1 rounded-full text-secondary hover:text-primary cursor-pointer">
				<MailIcon className={`h-${size} w-${size}`} aria-hidden="true" />
				{unreadNotificationsCount > 0 && (
					<span className={`absolute -top-1 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full ${unreadNotificationsCount > 99 ? "-right-2" : unreadNotificationsCount < 10 ? "w-5 right-0" : "-right-1"}`}>
						{unreadNotificationsCount > 99 ? "99+" : unreadNotificationsCount}
					</span>
				)}
			</div>
		</Link>
	);
};

export default NotificationIcon;
