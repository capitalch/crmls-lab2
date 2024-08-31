import { isArray } from "lodash";
import React, { useState } from "react";
import MediaManager from "./MediaManager";
import ReactModal from "react-modal";
import { UploadIcon } from "@heroicons/react/solid";

function MediaManagerModal({
	type,
	text,
	onInsert,
	buttonText = "Insert Selected",
	setFileAttachments = () => {},
}: {
	type: string;
	text?: string;
	onInsert?: (files: any[]) => void;
	buttonText?: string;
	setFileAttachments?: (attachments: any) => void;
}) {
	const [show, setShow] = useState(false);
	const [modalContent, setModalContent] = useState<any>();
	const [showInsert, setShowInsert] = useState(false);
	const [selectedFilePaths, setSelectedFilePaths] = useState<any[]>([]);

	const closeModal = () => {
		setShow(false);
		setModalContent("");
	};

	const onFileSelect = (path: string, args: any, files: any[]) => {
		setShowInsert(files.length > 0);
		if (files.length > 0) {
			let selectedFiles: any[] = [];
			let subFolder = isArray(args.fileDetails) ? args.fileDetails[0].filterPath : args.fileDetails.filterPath;
			files.forEach((file: any) => {
				selectedFiles.push(`${path}${subFolder}${file}`);
			});
			setSelectedFilePaths(selectedFiles);
			setFileAttachments(files);
		} else {
			setSelectedFilePaths([]);
			setFileAttachments([]);
		}
	};

	const insertFile = () => {
		if (onInsert) {
			const files: any[] = [];
			selectedFilePaths.forEach((file) => {
				files.push(file);
			});
			onInsert(files);
			setSelectedFilePaths([]);
			closeModal();
		}
	};

	const renderMediaManager = (e: any) => {
		e.preventDefault();
		setModalContent(<MediaManager onFileSelect={onFileSelect} />);
		setShow(true);
	};

	return (
		<>
			{type === "button" && (
				<div className="flex">
					<button onClick={renderMediaManager}>{text ?? `Open Media Manager`}</button>
				</div>
			)}
			{type === "append" && (
				<div className="absolute left-0">
						<button className="bg-primary hover:bg-opacity-70 py-2 px-4 border border-divider rounded" onClick={renderMediaManager}>
						<UploadIcon className="w-5 h-5" />
					</button>
				</div>
			)}

			<ReactModal
				isOpen={show}
				contentLabel={`Upload or Select files`}
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
						<div className="inline-block w-full align-bottom bg-primary rounded-lg pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:p-6 text-sm text-primary">
							<div>
								<p>
									Use the media manager below to select existing items, or to upload new items. To upload, you may use the "Upload" button, or drag and drop items into the desired folder. To copy the path to an existing file, find the desired file and right click the item. You will
									see a "Copy path" option.
								</p>
								{modalContent}
							</div>
							<div className="pt-4">
								{onInsert && showInsert && selectedFilePaths.length > 0 && <button onClick={insertFile} className="crmls-submit-btn mr-2">{buttonText}</button>}
								<button onClick={closeModal} className="crmls-submit-btn">Close</button>
							</div>
						</div>
					</div>
				</div>
			</ReactModal>
		</>
	);
}

export default MediaManagerModal;
