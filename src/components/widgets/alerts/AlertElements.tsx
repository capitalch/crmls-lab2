import { CheckCircleIcon, ChevronRightIcon, ExclamationIcon, InformationCircleIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../../../app/hooks";
import { SystemNotificationStatusEntity } from "../../../features/notification/notificationTypes";
import { classNames } from "../../../util/helpers";
import { hide } from "../../../features/notification/notificationSlice";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userProfile } from "../../../features/user/selectors";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

export const AlertIcon = ({ color }: { color: any }) => {
	switch (color) {
		case "blue":
		default:
			return <InformationCircleIcon className={`h-5 w-5 text-${color}-400`} aria-hidden="true" />;
		case "yellow":
			return <ExclamationIcon className={`h-5 w-5 text-${color}-400`} aria-hidden="true" />;
		case "red":
			return <XCircleIcon className={`h-5 w-5 text-${color}-400`} aria-hidden="true" />;
		case "green":
			return <CheckCircleIcon className={`h-5 w-5 text-${color}-400`} aria-hidden="true" />;
	}
};

export const AlertPing = ({ color = "red", customCss = "absolute -top-1 -right-1 h-2 w-2", title = "" }: { color?: string; customCss?: string; title?: string }) => {
	return (
		<span className={customCss} title={title}>
			<span className={`animate-ping absolute h-full w-full rounded-full bg-${color}-400 opacity-100`}></span>
			<span className={`absolute h-full w-full rounded-full h-3 w-3 bg-${color}-500`}></span>
		</span>
	);
};

export const DashAlert = ({ notification, callback, canClose = true }: { notification: any; callback?: () => void; canClose?: boolean }) => {
	const dispatch = useAppDispatch();
	const statusColor = notification.systemNotificationStatus?.color || "gray";
	const statusIcon = <AlertIcon color={notification.systemNotificationStatus?.color || "gray"} />;

	return (
		<div className={classNames("rounded-md p-4 mb-4", `bg-${statusColor}-50`)}>
			<div className="flex">
				<div className="flex-shrink-0">{statusIcon}</div>
				<div className="ml-3">
					<h3 className={classNames("text-sm font-medium", `text-${statusColor}-800`)}>{notification.title}</h3>
					<p className={classNames("mt-2 text-sm", `text-${statusColor}-800`)} dangerouslySetInnerHTML={{ __html: notification.message ?? "" }}></p>
					{notification.notificationId || notification.url ? (
						<div className="flex justify-start items-center space-x-2">
							{notification.notificationId && (
								<Link to={`/notifications?id=${notification.notificationId}`} onClick={() => dispatch(hide())}>
									<button type="button" className={classNames("relative inline-flex items-center mt-4 px-2 py-1 rounded-md border text-sm font-medium focus:z-10", `border-${statusColor}-200 bg-${statusColor}-100 text-${statusColor}-500`)}>
										<span>Related Notification</span>
									</button>
								</Link>
							)}
							{notification.url && (
								<Link to={{ pathname: notification.url }} target="_blank">
									<button type="button" className={classNames("relative inline-flex items-center mt-4 px-2 py-1 rounded-md border text-sm font-medium focus:z-10", `border-${statusColor}-200 bg-${statusColor}-100 text-${statusColor}-500`)}>
										<span>More Information</span>
									</button>
								</Link>
							)}
						</div>
					) : (
						""
					)}
				</div>
				{canClose && (
					<div className="ml-auto pl-3">
						<div className="-mx-1.5 -my-1.5">
							<button onClick={callback ? callback : () => dispatch(hide())} type="button" className={classNames("inline-flex rounded-md p-1.5 focus:outline-none", `text-${statusColor}-500`)}>
								<span className="sr-only">Dismiss</span>
								<XIcon className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export const ModalAlert = ({ notification, callback }: { notification: any; callback?: () => void }) => {
	const statusColor = notification.systemNotificationStatus?.color ?? "blue";
	const statusIcon = <AlertIcon color={notification.systemNotificationStatus?.color || "blue"} />;
	let profile = useSelector(userProfile);

	const handleClose = () => {
		if (callback) {
			callback();
		}
	};

	const handleMustAcknowledge = () => {
		if (profile?.member?.id) {
			const acknowledgeData = {
				notificationId: notification.id,
				memberId: profile.member.id,
			};

			//@todo - vk - add acknowledgment endpoint call here
			console.log("Send acknowledgment --->", acknowledgeData);
		}

		// Execute callback function if exists
		if (callback) {
			callback();
		}
	};

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto article-details display-block" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 bg-secondary bg-opacity-75 transition-opacity" aria-hidden="true" />
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
					&#8203;
				</span>
				<div className="inline-block align-bottom bg-primary rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
					{notification.position === "simpleModal" && (
						<div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
							<button type="button" className="rounded-md hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleClose}>
								<span className="sr-only">Close</span>
								<XIcon className="h-6 w-6 text-header" />
							</button>
						</div>
					)}
					<div className="relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:mt-4 sm:align-middle w-full">
						<div className="p-0">
							<div className="sm:flex sm:items-start">
								<div className={classNames("mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10", `bg-${statusColor}-100`)}>{statusIcon}</div>
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3 className="text-lg leading-6 font-medium text-primary">{notification.title}</h3>
									<div className="mt-2">
										<p className="text-sm text-primary" dangerouslySetInnerHTML={{ __html: notification.message ?? "" }}></p>
									</div>
								</div>
							</div>
						</div>
						{(notification.notificationId || notification.url) && (
							<div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mt-2 space-x-2">
								{notification.notificationId && (
									<Link to={`/notifications?id=${notification.notificationId}`} onClick={callback}>
										<button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
											<ChevronRightIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
											<span>Related Notification</span>
										</button>
									</Link>
								)}
								{notification.url && (
									<Link to={{ pathname: notification.url }} target="_blank">
										<button type="button" className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-2 py-1 bg-crmls-blue text-base font-medium text-white hover:bg-opacity-80 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
											<span>More Information</span>
										</button>
									</Link>
								)}
							</div>
						)}
						{notification.position === "modal" && (
							<div className="bg-secondary text-secondary p-4 sm:flex sm:flex-row-reverse items-center mt-4">
								<input type="checkbox" className="mx-2 cursor-pointer border border-header bg-primary" id="acknowledge" name="acknowledge" onClick={handleMustAcknowledge} />
								<label htmlFor="acknowledge">I acknowledge this message</label>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const AlertBadge = ({ status }: { status?: SystemNotificationStatusEntity }) => {
	return (
		<span data-tip={status?.description ?? status?.name ?? "No Status"} className={classNames("inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-white", `bg-${status?.color ?? "blue"}-500`)}>
			{status?.name ?? "No Status"}
		</span>
	);
};

export const AlertIndicator = ({ status }: { status?: SystemNotificationStatusEntity }) => {
	return <span className={classNames("absolute top-2 right-2 rounded-full h-2 w-2", `bg-${status?.color ?? "blue"}-500`)}></span>;
};

export const PasswordResetAlert = () => {
	const location = useLocation();
	const profile = useSelector(userProfile);
	const [showModal, setShowModal] = useState<boolean>(false);

	const checkResetRequired = () => {
		if (profile && profile.requiredPasswordUpdate) {
			setShowModal(true);
		}
		if (location && (location.pathname === "/password-change" || location.pathname === "/logout")) {
			setShowModal(false);
		}
	};

	useEffect(() => {
		checkResetRequired();
	}, [profile, location]);

	return location.pathname !== "/password-change" ? (
		<ReactModal
			isOpen={showModal}
			contentLabel="Password Reset Required"
			appElement={document.getElementById("root") ?? undefined}
			style={{
				overlay: {
					backgroundColor: "transparent",
					inset: "unset",
					zIndex: 10,
				},
			}}
		>
			<div className="fixed z-10 inset-0 overflow-y-auto article-details display-block" aria-labelledby="modal-title" role="dialog" aria-modal="true">
				<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
					<div className="fixed inset-0 bg-secondary bg-opacity-75 transition-opacity" aria-hidden="true" />
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<div className="inline-block w-full align-bottom bg-primary rounded-lg p-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:p-6">
						<div className="relative inline-block align-bottom overflow-hidden transform transition-all sm:mt-4 sm:align-middle w-full">
							<div className="p-0">
								<div className="sm:flex sm:items-start">
									<div className={classNames("mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10", `bg-red-100`)}>
										<AlertIcon color="red" />
									</div>
									<div className="mt-3 sm:mt-0 sm:ml-4 w-full">
										<h3 className="text-lg leading-6 font-medium text-primary text-capitalize">Password Reset Required</h3>
										<p className="text-sm">Your current password has expired. You will need to change your password to continue. Please click the button below to change your password.</p>
										<Link to="/password-change">
											<button type="button" className="cta-button">
												Change Password
											</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ReactModal>
	) : (
		<></>
	);
};

export const GenericBadge = ({ title, className = "" }: { title: string; className?: string; }) => {
	return (
		<span data-tip={title ?? ""} className={classNames("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white", className)}>
			{title ?? ""}
		</span>
	);
};
