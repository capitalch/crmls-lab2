import React from "react";
import { XIcon } from "@heroicons/react/outline";
import "../../../assets/css/modal.css";
import DeleteModal from "../../../features/notification/DeleteModal";
import PromoteModal from "../../../features/notification/PromoteModal";
import GenericModal from "../../../features/notification/GenericModal";
import CancellationModal from "../../../features/notification/CancellationModal";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {hide, selectNotification} from "../../../features/notification/notificationSlice";
import WarnModal from "../../../features/notification/WarnModal";
import SystemModalNotification from "../../../features/systemNotification/SystemModalNotification";

const Modal = () => {
	const dispatch = useAppDispatch();
	const notification = useAppSelector(selectNotification);
	let doICare = notification && notification.position === "modal" && notification.show;

	const showHideClassName = doICare ? "fixed z-10 inset-0 overflow-y-auto modal display-block" : "fixed z-10 inset-0 overflow-y-auto modal display-none";

	const buildContent = () => {
		switch (notification.status) {
			case "delete":
				return <DeleteModal id={notification.title} />;
			case "promote":
				return <PromoteModal id={notification.title} />;
			case "cancel":
				return <CancellationModal id={notification.title} />;
			case 'warn':
				return <WarnModal notification={notification} />
			default:
				return <GenericModal id={notification.title} />;
		}
	};

	if (doICare) {
		return (
			<>
				<SystemModalNotification />
				<div className={showHideClassName} aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 bg-secondary bg-opacity-75 transition-opacity" aria-hidden="true" />
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
							&#8203;
						</span>
						<div className="inline-block align-bottom bg-secondary text-secondary rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
							<div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
								<button type="button" className="rounded-md hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => dispatch(hide())}>
									<span className="sr-only">Close</span>
									<XIcon className="h-6 w-6 text-red-600" />
								</button>
							</div>
							{buildContent()}
						</div>
					</div>
				</div>
			</>
		);
	}
	return <SystemModalNotification />;
};

export default Modal;
