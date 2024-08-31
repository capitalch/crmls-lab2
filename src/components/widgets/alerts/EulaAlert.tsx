import { useEffect, useRef, useState } from "react";
import { AlertIcon } from "./AlertElements";
import { classNames } from "../../../util/helpers";
import axios from "axios";
import { useAppDispatch } from "../../../app/hooks";
<<<<<<< HEAD
import { show } from "../../../features/notification/notificationSlice";
=======
import { show, toggleViewEula } from "../../../features/notification/notificationSlice";
>>>>>>> dev-1
import Loader from "../../../components/widgets/Loader";
import { profile_url } from "../../../adapters";
import { push } from "connected-react-router";
import ReactModal from "react-modal";
<<<<<<< HEAD

export const EulaAlert = () => {
=======
import dayjs from "dayjs";
import { XCircleIcon } from "@heroicons/react/outline";

export const EulaAlert = ({ viewOnly }: { viewOnly?: boolean }) => {
	viewOnly = viewOnly || false;
>>>>>>> dev-1
	const dispatch = useAppDispatch();
	const usernameRef = useRef<any>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const [processing, setProcessing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [eula, setEula] = useState<any>();
	const [profile, setProfile] = useState<any>();
	const [userFullName, setUserFullName] = useState<string>("");

	useEffect(() => {
<<<<<<< HEAD
=======
		if (viewOnly) return;
>>>>>>> dev-1
		axios
			.get(`${profile_url}api/app/Profiles/Claims`)
			.then((response: any) => {
				setProfile(response.data);
			})
			.catch((e) => {
<<<<<<< HEAD
				console.error("Error loading claims:", error);
			});
	}, []);

	useEffect(() => {
		if (profile && profile.isEulaExpired === "true") {
			setShowModal(true);
			setIsLoading(true);
			setUserFullName(`${profile.memberFirstName} ${profile.memberLastName}`);

			axios
				.get(`${profile_url}api/app/Eula/Current`)
=======
				console.error("Error loading claims:", e);
			});
	}, [viewOnly]);

	useEffect(() => {
		if (viewOnly || (profile && profile.isEulaExpired === "true")) {
			setShowModal(true);
			setIsLoading(true);

			if (profile) {
				setUserFullName(`${profile.memberFirstName} ${profile.memberLastName}`);
			}

			const eulaEndpoint = viewOnly ? `${profile_url}api/app/Eula/GetUserEula` : `${profile_url}api/app/Eula/Current`;

			axios
				.get(eulaEndpoint)
>>>>>>> dev-1
				.then((response: any) => {
					setEula(response.data.results[0]);
					setIsLoading(false);
				})
				.catch((e) => {
					console.error("Error loading EULA:", error);
				});
		}
<<<<<<< HEAD
	}, [profile]);
=======
	}, [profile, viewOnly]);
>>>>>>> dev-1

	const declineEula = () => {
		setShowModal(false);
		dispatch(push("/logout"));
	};

<<<<<<< HEAD
=======
	const closeViewOnly = () => {
		setShowModal(false);
		dispatch(toggleViewEula());
	};

>>>>>>> dev-1
	const acceptEula = () => {
		if (!usernameRef.current.value || usernameRef.current.value.toLowerCase() !== userFullName.toLowerCase()) {
			setError("Please type your name as it appears");
			usernameRef.current.value = "";
			return;
		}

		setProcessing(true);
		const acknowledgeData = {
			loginId: profile.userid, // member user id
			name: usernameRef.current.value, // signature as the user enters it in the input
			licenseId: profile.memberStateLicense, // member license #
			notificationId: eula.id, // EULA id
			type: "eula",
		};

		axios
			.post(`${profile_url}api/app/NotificationAcknowledgement`, acknowledgeData)
			.then((response) => {
<<<<<<< HEAD
=======
				setProfile(null);
>>>>>>> dev-1
				setShowModal(false);
				setProcessing(false);
				dispatch(
					show({
						show: true,
						title: "EULA Accepted",
						message: "Thank you. We have received your EULA acknowledgement.",
						status: "success",
						position: "popover",
						autoHide: 5000,
						confirm: false,
						notificationId: null,
					})
				);
			})
			.catch((error) => {
				console.error(error?.message);
			});
	};

	return (
		<ReactModal
			isOpen={showModal}
			contentLabel="EULA Agreement"
<<<<<<< HEAD
			appElement={document.getElementById('root') ?? undefined}
=======
			appElement={document.getElementById("root") ?? undefined}
>>>>>>> dev-1
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
					<div className="inline-block w-full align-bottom bg-primary rounded-lg pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:p-6">
						{processing ? (
							<div className="h-64 flex justify-center items-center flex-wrap relative">
								<div className="absolute top-12 left-auto text-sm">
									<p className="ml-8 text-center">
										Processing EULA Acknowledgement
										<br />
										You will be redirected shortly. Thank you.
									</p>
								</div>
								<Loader />
							</div>
						) : isLoading ? (
							<div className="h-64 flex justify-center items-center flex-wrap relative">
								<div className="absolute top-12 left-auto text-sm">
									<p className="ml-8 text-center">Loading EULA Agreement</p>
								</div>
								<Loader />
							</div>
						) : eula ? (
							<div className="relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:mt-4 sm:align-middle w-full">
								<div className="p-0">
<<<<<<< HEAD
=======
									{viewOnly && (
										<div className="absolute top-0 right-0 pr-4">
											<XCircleIcon className="w-6 h-6 text-secondary text-opacity-80 hover:text-opacity-100 cursor-pointer" onClick={closeViewOnly} />
										</div>
									)}
>>>>>>> dev-1
									<div className="sm:flex sm:items-start border-b border-divider">
										<div className={classNames("mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10", `bg-red-100`)}>
											<AlertIcon color="red" />
										</div>
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
											<h3 className="text-lg leading-6 font-medium text-primary">{eula?.name}</h3>
<<<<<<< HEAD
											<p className="text-sm">To continue, please read and accept the following EULA agreement:</p>
=======
											{!viewOnly && <p className="text-sm">To continue, please read and accept the following EULA agreement:</p>}
>>>>>>> dev-1
										</div>
									</div>
									<div className="w-full p-4 bg-primary" dangerouslySetInnerHTML={{ __html: eula.content ?? "" }}></div>
								</div>
<<<<<<< HEAD
								<div className="p-4 text-sm border-t border-divider">
									<p>Please type your name as it appears and click the "Accept EULA Agreement" button.</p>
									<div className="flex flex-wrap flex-end justify-end items-center space-y-2 sm:space-y-0 space-x-2">
										<div className="text-sm">{userFullName}</div>
										<div>
											<input className="basic-form-field" style={{ borderColor: error ? "red" : "" }} type="text" ref={usernameRef} onClick={() => setError("")} />
										</div>
										<button type="button" className="w-full rounded-md shadow-sm px-4 py-2 bg-header text-base font-medium text-white hover:bg-opacity-80 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md focus:outline-none focus:ring-2 focus:ring-header focus:ring-opacity-50" onClick={acceptEula}>
											Accept EULA Agreement
										</button>
										<button type="button" className="w-full rounded-md shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-opacity-80 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={declineEula}>
											Decline & Log Out
										</button>
									</div>
								</div>
								<div className="text-right text-sm">{error && <p className="text-red-500 text-sm">{error}</p>}</div>
=======
								{!viewOnly && (
									<>
										<div className="p-4 text-sm border-t border-divider">
											<p>Please type your name as it appears and click the "Accept EULA Agreement" button.</p>
											<div className="flex flex-wrap flex-end justify-end items-center space-y-2 sm:space-y-0 space-x-2">
												<div className="text-sm">{userFullName}</div>
												<div>
													<input className="basic-form-field" style={{ borderColor: error ? "red" : "" }} type="text" ref={usernameRef} onClick={() => setError("")} />
												</div>
												<button
													type="button"
													className="w-full rounded-md shadow-sm px-4 py-2 bg-header text-base font-medium text-white hover:bg-opacity-80 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md focus:outline-none focus:ring-2 focus:ring-header focus:ring-opacity-50"
													onClick={acceptEula}
												>
													Accept EULA Agreement
												</button>
												<button
													type="button"
													className="w-full rounded-md shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-opacity-80 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
													onClick={declineEula}
												>
													Decline & Log Out
												</button>
											</div>
										</div>
										<div className="text-right text-sm">{error && <p className="text-red-500 text-sm">{error}</p>}</div>
									</>
								)}
								{viewOnly && (
									<div className="p-4 text-sm border-t border-divider">
										<div className="flex flex-wrap flex-end justify-end items-center space-y-2 sm:space-y-0 space-x-2">
											<div>
												<span className="font-medium">Signature:</span> {eula.signature} on {dayjs(eula.acknowledgementTime).format("MM/DD/YYYY hh:mm A")}
											</div>
											<div>
												<XCircleIcon className="w-6 h-6 text-secondary text-opacity-80 hover:text-opacity-100 cursor-pointer" onClick={closeViewOnly} />
											</div>
										</div>
									</div>
								)}
>>>>>>> dev-1
							</div>
						) : (
							<div className="h-64 flex justify-center items-center flex-wrap relative">
								<div className="absolute top-12 left-auto text-sm">
									<p className="ml-8 text-center">There was a problem loading the EULA Agreement. Please close this modal and contact support.</p>
								</div>
								<button
									type="button"
									className="w-full rounded-md shadow-sm px-4 py-2 bg-header text-base font-medium text-white hover:bg-opacity-80 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md focus:outline-none focus:ring-2 focus:ring-header focus:ring-opacity-50"
									onClick={() => {
										setShowModal(false);
									}}
								>
									Close
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</ReactModal>
	);
};
