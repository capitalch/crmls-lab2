import React, { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { ChevronRightIcon, ExclamationIcon, InformationCircleIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";
import { hide, selectNotification } from "./notificationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import SystemPopoverNotification from "../systemNotification/SystemPopoverNotification";

const PopoverNotification = () => {
	const dispatch = useAppDispatch();
	const notification = useAppSelector(selectNotification);
	let doICare = notification && notification.position === "popover" && notification.show;
	let icon;

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
			break;
		case "warn":
			icon = <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />;
			break;
		case "error":
			icon = <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;
			break;
		case "success":
		default:
			icon = <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;
			break;
	}

	if (doICare) {
		return (
			<>
				<SystemPopoverNotification />
				<div aria-live="assertive" className="fixed inset-0 flex items-end px-4 py-6 md:pt-20 pointer-events-none sm:p-6 sm:items-start">
					<div className="w-full flex flex-col items-center space-y-4 sm:items-end">
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
										<div className="flex-shrink-0">{icon}</div>
										<div className="ml-3 w-0 flex-1 pt-0.5">
											<p className="text-sm font-medium text-gray-900">{notification.title}</p>
											<div className="mt-1 text-sm text-gray-500">
												{Array.isArray(notification.message) && (
													<ul>
														{" "}
														{notification.message.map((message, i) => {
															return <li key={i}>{message}</li>;
														})}{" "}
													</ul>
												)}
												{typeof notification.message === "string" && <p>{notification.message}</p>}
												{notification.notificationId && (
													<Link to={`/notifications?id=${notification.notificationId}`} onClick={() => dispatch(hide())}>
														<button type="button" className="relative inline-flex items-center mt-4 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10">
															<ChevronRightIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
															<span>Read Notification</span>
														</button>
													</Link>
												)}
											</div>
										</div>
										<div className="ml-4 flex-shrink-0 flex">
											<button className="z-40 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => dispatch(hide())}>
												<span className="sr-only">Close</span>
												<XIcon className="h-5 w-5" aria-hidden="true" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</Transition>
					</div>
				</div>
			</>
		);
	}

	return <SystemPopoverNotification />;
};

export default PopoverNotification;
