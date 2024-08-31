import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ReactModal from "react-modal";
import MediaManager from "./MediaManager";
import { isArray } from "lodash";

const TinyEditor = ({ disabled, value, change, mediaContainer, mediaAuthType, height = 500, enableUploads = true, useTokens = false }) => {
	const editorRef = useRef();
	const [show, setShow] = useState(false);
	const [showInsert, setShowInsert] = useState(false);
	const [selectedFilePaths, setSelectedFilePaths] = useState([]);

	const closeModal = () => {
		setSelectedFilePaths([]);
		setShow(false);
	};

	const renderMediaManager = () => {
		setShow(true);
	};

	const onFileSelect = (path, args, files) => {
		setShowInsert(files.length > 0);
		if (files.length > 0) {
			let selectedFiles = [];
			let subFolder = isArray(args.fileDetails) ? args.fileDetails[0].filterPath : args.fileDetails.filterPath;
			files.forEach((file) => {
				selectedFiles.push(`${path}${subFolder}${file}`);
			});
			setSelectedFilePaths(selectedFiles);
		} else {
			setSelectedFilePaths([]);
		}
	};

	const insertFile = () => {
		selectedFilePaths.forEach((file) => {
			editorRef.current.editor.insertContent(`<img src="${file}" alt="Image" />`);
		});
		closeModal();
	};

	return (
		<>
			<Editor
				ref={editorRef}
				apiKey="9gd8m4wrd3j8ie8z9dcvf217ju87opgjx2hlsz0z0vhbqz99"
				disabled={disabled}
				value={value}
				height={height}
				init={{
					images_upload_url: "/blobstorage",
					image_advtab: true,
					height: height,
					menubar: true,
					noneditable_regexp: /\{\{[^\}]+\}\}/g,
					toolbar: "undo redo | formatselect | bold italic forecolor backcolor | " + "alignleft aligncenter alignright alignjustify | " + `bullist numlist outdent indent | removeformat | ${enableUploads && "link image mediaManagerButton"} | code`,
					setup: function (editor) {
						if (mediaContainer && mediaAuthType) {
							editor.ui.registry.addButton("mediaManagerButton", {
								icon: "gallery",
								tooltip: "Media Manager",
								onAction: () => {
									renderMediaManager();
								},
							});
						}
					},
				}}
				onEditorChange={change}
			/>
			{mediaContainer && mediaAuthType && (
				<ReactModal
					isOpen={show}
					contentLabel={`Upload or Select files (${mediaContainer})`}
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
										Use the media manager below to select existing items, or to upload new items. To upload, you may use the "Upload" button, or drag and drop items into the desired folder. To copy the path to an existing file, find the desired file and right click the item. You
										will see a "Copy path" option.
									</p>
									<MediaManager resourceType={mediaContainer} authType={mediaAuthType} onFileSelect={onFileSelect} />
								</div>
								<div className="pt-4">
									{showInsert && selectedFilePaths.length > 0 && (
										<button onClick={insertFile} className="crmls-submit-btn mr-2">
											Insert Selected
										</button>
									)}
									<button onClick={closeModal} className="crmls-submit-btn">
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</ReactModal>
			)}
		</>
	);
};

export default TinyEditor;
