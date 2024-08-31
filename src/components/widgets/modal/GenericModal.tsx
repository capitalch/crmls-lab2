import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/solid";
import React from "react";

export type modalType = "info" | "warning" | "error";

const GenericModal = ({ title, type, content, actions, allowClose = true }: { title: string; type: modalType; content: any; actions: any[]; allowClose?: boolean }) => {
	const [showModal, setShowModal] = React.useState(true);

	const getModalIcon = () => {
		switch (type) {
			case "error":
				return (
					<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
						<ExclamationCircleIcon className="h-6 w-6 text-red-600" />
					</div>
				);
			case "warning":
				return (
					<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
						<ExclamationCircleIcon className="h-6 w-6 text-yellow-600" />
					</div>
				);
			case "info":
			default:
				return (
					<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
						<InformationCircleIcon className="h-6 w-6 text-blue-600" />
					</div>
				);
		}
	};
	return showModal ? (
		<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-tertiary bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-10 overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-primary text-primary text-left border border-divider shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start">
								{getModalIcon()}
								<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
									<h3 className="font-semibold leading-6" id="modal-title">
										{title}
									</h3>
									<div className="mt-2">{content}</div>
								</div>
							</div>
						</div>
						<div className="bg-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							{actions.map((action, i) => (
								<div key={i}>{action}</div>
							))}
							{allowClose && (
								<button type="button" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-gray-200 sm:ml-3 sm:w-auto" onClick={() => setShowModal(false)}>
									Close
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default GenericModal;
