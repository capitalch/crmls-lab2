/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar } from "@syncfusion/ej2-react-filemanager";
import axios from "axios";
import { media_url } from "../../../adapters";
import { FormLoader } from "../../../components/widgets/SkeletonScreens";
import { useAppDispatch } from "../../../app/hooks";
import { show } from "../../notification/notificationSlice";
import { useSelector } from "react-redux";
import { formattedProfile } from "../../user/selectors";
import ErrorMessage from "../../../components/widgets/ErrorMessage";

const MediaManager = ({ onFileSelect, isDisabled = false }: { onFileSelect?: (path: string, args: any, files: any) => void; isDisabled?: boolean }) => {
	const dispatch = useAppDispatch();
	const mediaManagerControl = useRef<any>("");
	const [error, setError] = useState<string | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [authToken, setAuthToken] = useState<string>("");
	const [queryToken, setQueryToken] = useState<any>("");
	const [mediaManagerUrl, setMediaManagerUrl] = useState<any>("");
	const [rootFolder, setRootFolder] = useState<string>("");
	const cdnRoot = "https://cdn.crmls.org/";
	let userProfile = useSelector(formattedProfile);

	useEffect(() => {
		if (userProfile) {
			setRootFolder(`articles/${userProfile?.aorId}`);
			setAuthToken(axios.defaults.headers.common["Authorization"]);
			configureMediaManager();
		}
	}, [userProfile]);

	const configureMediaManager = () => {
		setMediaManagerUrl(media_url);
		getQueryToken(media_url);
	};

	const getQueryToken = (mediaManagerUrl: any) => {
		axios
			.get(mediaManagerUrl + "api/app/Token", {
				headers: {
					Authorization: axios.defaults.headers.common["Authorization"],
				},
			})
			.then((response) => {
				setIsLoaded(true);
				setQueryToken(response.data.token);
			})
			.catch((error) => {
				console.error("Failed to get media manager query token", error);
				setError(error.toString());
			});
	};

	const beforeSend = async (args: any) => {
		// Set auth header before any requests
		args.ajaxSettings.beforeSend = function (args: any) {
			args.httpRequest.setRequestHeader("Authorization", authToken);
		};

		// Define the media manager container
		const data = JSON.parse(args.ajaxSettings.data);
		data["Container"] = rootFolder;
		args.ajaxSettings.data = JSON.stringify(data);

		if (args.action === "Upload") {
			// Allow custom data for upload operations
			data.push({ Container: rootFolder });
			args.ajaxSettings.data = JSON.stringify(data);
		}
	};

	const beforeimageLoad = (args: any) => {
		// Add token and container parameters in image URL
		args.imageUrl = `${args.imageUrl}&token=${queryToken}&Container=${rootFolder}`;
	};

	const beforeDownload = (args: any) => {
		// Add token and container parameters to download attributes
		const includeCustomAttribute = args.data;
		includeCustomAttribute.token = queryToken;
		includeCustomAttribute.Container = rootFolder;
		args.data = includeCustomAttribute;
	};

	// Custom context menu actions
	const contextMenuClick = (args: any) => {
		if (args.item.text === "Copy Path") {
			let filePath = `${cdnRoot}${rootFolder}`;
			for (const i in args.fileDetails) {
				filePath += args.fileDetails[i].filterPath + args.fileDetails[i].name;
			}
			navigator.clipboard.writeText(filePath);
			dispatch(
				show({
					show: true,
					title: "Success",
					message: "File Path Copied",
					status: "success",
					position: "popover",
					autoHide: 5000,
					confirm: false,
					notificationId: null,
				})
			);
		}
	};

	const contextMenuOpen = (args: any) => {
		for (const i in args.items) {
			if (args.items[i].text === "Copy Path") {
				args.items[i].iconCss = "e-icons e-description";
			}
		}
	};

	const fileSelect = (args: any) => {
		if (mediaManagerControl.current && onFileSelect) {
			const selectedFiles = mediaManagerControl.current.selectedItems;
			let fullPath = `${cdnRoot}${rootFolder}`;
			onFileSelect(fullPath, args, selectedFiles);
		}
	};

	if (error) {
		return <ErrorMessage message={error} />;
	} else if (!isLoaded) {
		return <FormLoader />;
	} else {
		return (
			<FileManagerComponent
				id="overview_file"
				ref={mediaManagerControl}
				ajaxSettings={{
					url: `${mediaManagerUrl}api/app/FileOperations`,
					getImageUrl: `${mediaManagerUrl}api/app/FileGetImage`,
					uploadUrl: `${mediaManagerUrl}api/app/FileUpload`,
					downloadUrl: `${mediaManagerUrl}api/app/FileDownload`,
				}}
				contextMenuSettings={{
					file: ["Open", "|", "Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details", "Copy Path"],
				}}
				view={"Details"}
				beforeSend={beforeSend}
				beforeImageLoad={beforeimageLoad}
				beforeDownload={beforeDownload}
				menuClick={contextMenuClick}
				menuOpen={contextMenuOpen}
				fileSelect={fileSelect}
				disabled={isDisabled}
			>
				<Inject services={[NavigationPane, DetailsView, Toolbar]} />
			</FileManagerComponent>
		);
	}
};

export default MediaManager;
