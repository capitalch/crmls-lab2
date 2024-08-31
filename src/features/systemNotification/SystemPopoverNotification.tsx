import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { ChevronRightIcon, ExclamationIcon, InformationCircleIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectReadSystemNotifications } from "../user/selectors";
import { selectAllSystemNotifications } from "./systemNotificationsSlice";
import { setUserPrefs } from "../user/userPrefsSlice";

const SystemPopoverNotification = () => {
	const dispatch = useAppDispatch();
	const allNotifications = useSelector(selectAllSystemNotifications);
	const readNotifications = useSelector(selectReadSystemNotifications);
	const [notifications, setNotifications] = useState<any[]>([]);

	useEffect(() => {
		const hasUnread = allNotifications.filter(({ id, position }) => position === "popover" && !readNotifications.includes(id));
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

	const getNotificationIcon = (notification: any) => {
		switch (notification.systemNotificationStatusId) {
			case 1:
				return <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />;
			case 2:
				return <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />;
			case 3:
				return <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;
			case 4:
			default:
				return <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;
		}
	};

	if (notifications.length > 0) {
		return (
			<div aria-live="assertive" className="z-10 fixed inset-0 flex flex-col items-start px-4 py-6 md:pt-20 pointer-events-none sm:p-6">
				{notifications.map((notification, i) => (
					<div key={i} className="w-full flex flex-col items-center space-y-4 sm:items-end mb-2">
						<Transition
							show={notification.show}
							as={Fragment}
							enter="transform ease-out duration-300 transition"
							enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
							enterTo="translate-y-0 opacity-100 sm:translate-x-0"
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
								<div className="p-4">
									<div className="flex items-start">
										<div className="flex-shrink-0">{getNotificationIcon(notification)}</div>
										<div className="ml-3 w-0 flex-1 pt-0.5">
											<p className="text-sm font-medium text-gray-900">{notification.title}</p>
											<div className="mt-1 text-sm text-gray-500">
												{Array.isArray(notification.message) && (
													<ul>
														{" "}
														{notification.message.map((message: any, i: number) => {
															return <li key={i} dangerouslySetInnerHTML={{ __html: notification.message ?? "" }}></li>;
														})}{" "}
													</ul>
												)}
												{typeof notification.message === "string" && <p dangerouslySetInnerHTML={{ __html: notification.message ?? "" }}></p>}
												{notification.notificationId && (
													<Link to={`/notifications?id=${notification.notificationId}`} onClick={() => handleMarkAsRead(notification.id)}>
														<button type="button" className="relative inline-flex items-center mt-4 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10">
															<ChevronRightIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
															<span>Read Notification</span>
														</button>
													</Link>
												)}
											</div>
										</div>
										<div className="ml-4 flex-shrink-0 flex">
											<button className="z-40 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => handleMarkAsRead(notification.id)}>
												<span className="sr-only">Close</span>
												<XIcon className="h-5 w-5" aria-hidden="true" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</Transition>
					</div>
				))}
			</div>
		);
	} else {
		return null;
	}
};

export default SystemPopoverNotification;
