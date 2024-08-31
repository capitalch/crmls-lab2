import React, { useEffect } from "react";
import { hide, selectNotification } from "./notificationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CheckCircleIcon, ExclamationIcon, InformationCircleIcon, XCircleIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const DeleteModal = ({ id }: { id: string }) => {
	const dispatch = useAppDispatch();
	const notification = useAppSelector(selectNotification);
	let doICare = notification && notification.position === "modal" && notification.show;
	let icon, iconBg;

	useEffect(() => {
		if (notification.autoHide && doICare) {
			setTimeout(() => {
				dispatch(hide());
			}, notification.autoHide);
		}
	}, [dispatch, notification.autoHide, doICare]);

	switch (notification.status) {
		case "info":
			icon = <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />;
			iconBg = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
			break;
		case "warn":
			icon = <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />;
			iconBg = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10";
			break;
		case "error":
			icon = <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;
			iconBg = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
			break;
		case "success":
		default:
			icon = <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;
			iconBg = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10";
			break;
	}

	if (doICare) {
		return (
			<>
				<div className="relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:mt-4 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className={iconBg}>{icon}</div>
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3 className="text-lg leading-6 font-medium text-gray-900">{notification.title}</h3>
								<div className="mt-2">
									<p className="text-sm text-gray-500">{notification.message}</p>
								</div>
							</div>
						</div>
					</div>
					{notification.notificationId && (
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<Link to={`/notifications?id=${notification.notificationId}`} onClick={() => dispatch(hide())}>
								<button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
									<ChevronRightIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
									<span>Read Notification</span>
								</button>
							</Link>
						</div>
					)}
				</div>
			</>
		);
	} else {
		return null;
	}
};

export default DeleteModal;
