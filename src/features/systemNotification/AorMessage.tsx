import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { CheckCircleIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { userId } from "../user/selectors";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import ContentContainer from "../../components/content/ContentContainer";
import { mace_url } from "../../adapters";
import axios from "axios";
import { FormLoader } from "../../components/widgets/SkeletonScreens";
import { show } from "../notification/notificationSlice";
import { formattedProfile } from "../user/selectors";
import { useAppDispatch } from "../../app/hooks";
import { SystemNotificationEntity } from "../notification/notificationTypes";
import { useHistory } from "react-router";
import { ChangedEventArgs, DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { RequiredIndicator } from "../registeredListing/RegisteredListingForm";

const AorMessage = (props: any) => {
	let userProfile = useSelector(formattedProfile);
	dayjs.extend(LocalizedFormat);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [disabled, setDisabled] = useState(true);
	const [message, setMessage] = useState<SystemNotificationEntity>();
	// const [messageMemberTypes, setMessageMemberTypes] = useState<any[]>([]);
	// const [memberTypes, setMemberTypes] = useState<any[]>([]);
	const [alertStatuses, setAlertStatuses] = useState<any[]>([]);
	const history = useHistory();

	const messageId = props.location.pathname.includes("new") ? false : props.match.params.messageId;
	useEffect(() => {
		// @todo: vk - member types will be possible in a future release - for now, messages will be applied to entire AOR
		// all commented out member types code will be applied when this is possible
		// axios
		// 	.post(profile_url + "api/app/memberTypeLookups/q", {
		// 		pageId: 0,
		// 		pageSize: 5000,
		// 	})
		// 	.then((response) => {
		// 		setMemberTypes(
		// 			response.data.results.map((mt: any) => {
		// 				return { value: mt.shortName, label: mt.displayName };
		// 			})
		// 		);
		// 	})
		// 	.catch((e) => {
		// 		console.error("Error retrieving member types", e);
		// 	});

		axios.post(`${mace_url}api/app/SystemNotificationStatus/q`, { pageId: 0, pageSize: 1000, orderBy: [{ field: "name", direction: 0 }] }).then((response) => {
			let results = response.data.results
				.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
				.map((r: any) => {
					return { id: r.id, name: r.description ?? r.name };
				});
			results.unshift({ id: "", name: "Select One" });
			setAlertStatuses(results);
		});

		if (messageId) {
			axios
				.get(mace_url + "api/app/SystemNotification/" + messageId)
				.then((response) => {
					setMessage(response.data.results[0]);
				})
				.then(() => {
					setIsLoading(false);
					setDisabled(false);
				});
		} else {
			setIsLoading(false);
			setDisabled(false);
		}
	}, []);

	// useEffect(() => {
	// 	// When editing a message, we need to format the member type criteria to match the expected format in the multi-select default value
	// 	// EXAMPLE DEFAULT VALUE: return [{value: "A", label: "Agent"}]
	// 	if (message && memberTypes) {
	// 		const messageMemberTypes = message?.criteria?.find((criteria) => criteria.field === "MemberType");
	// 		const formattedMemberTypes: any[] = [];
	// 		if (messageMemberTypes && messageMemberTypes?.values) {
	// 			messageMemberTypes.values.forEach((type) => {
	// 				let foundType = memberTypes.find((mt) => mt.value === type);
	// 				if (foundType) {
	// 					formattedMemberTypes.push(foundType);
	// 				}
	// 			});
	// 			setMessageMemberTypes(formattedMemberTypes.map((ele) => ele));
	// 		}
	// 	}
	// }, [message, memberTypes]);

	// const setMemberTypeCriteria = (types: any) => {
	// 	let memberTypeCriteria: any[] = [];

	// 	types.map((type: { value: string; label: string }) => {
	// 		return memberTypeCriteria.push(type.value);
	// 	});

	// 	return memberTypeCriteria;
	// };

	const displayToast = (status: any, title: string, message: string) => {
		dispatch(
			show({
				show: true,
				title,
				message,
				status,
				position: "popover",
				autoHide: 5000,
				confirm: false,
				notificationId: null,
			})
		);
	};

	let memberId = useSelector(userId);
	return (
		// <ContentContainer actions={null} title={message ? "Update AOR Message" : "New AOR Message"} subTitle="Use the form below to send a message out to all of your AOR members." cssClass="aor-message">
			<div className="relative overflow-hidden">
				<button className="bg-header text-inverse text-xs font-medium py-2 px-4 pl-0 rounded relative xl:absolute top-4 sm:top-6 left-4 sm:left-6 mb-2 inline-flex items-center z-10" onClick={() => history.goBack()}>
					<ChevronLeftIcon className="h-6 w-6" /> Go Back
				</button>
				<div className="min-h-screen relative max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 lg:py-12">
					<div className="hidden lg:block bg-secondary bg-opacity-50 absolute top-0 bottom-0 left-3/4 w-screen" />
					<div className="lg:grid lg:grid-cols-2">
						<div className="relative lg:row-start-1 lg:col-start-2">
							<svg className="hidden xl:block absolute top-0 right-0 -mt-24 opacity-50" width={404} height={384} fill="none" viewBox="0 0 404 384" aria-hidden="true">
								<defs>
									<pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
										<rect x={0} y={0} width={4} height={4} className="text-primary" fill="currentColor" />
									</pattern>
								</defs>
								<rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
							</svg>
						</div>
						<div>
							{isLoading && (
								<div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
									<FormLoader />
								</div>
							)}
							{!isLoading && (
								<Formik
									validationSchema={Yup.object().shape({
										message: Yup.string()
											.min(5)
											.max(200)
											.matches(/^(?!(?:.|[\n\r])*<[a-z][a-z0-9]*\b[^>]*>)/i, "HTML is not allowed")
											.required("Message Required"),
										expirationDate: Yup.string().nullable().required("Expiration Date Required"),
										systemNotificationStatusId: Yup.number().nullable().required("Message Type Required"),
										url: Yup.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/gim, "Please enter a valid url, including protocol (http, https)"),
										// memberType: Yup.array().min(1).required("Member type required"),
									})}
									initialValues={{
										systemNotificationStatusId: message?.systemNotificationStatusId ?? "",
										// memberType: messageMemberTypes,
										message: message?.message ?? "",
										url: message?.url ?? "",
										expirationDate: message?.expirationDate ? dayjs(message.expirationDate).toDate() : dayjs().add(1, "day").toDate(),
									}}
									onSubmit={async (values, { resetForm }) => {
										let payload = {
											title: "AOR Message from " + userProfile.aorName,
											show: true,
											position: "dash",
											source: "AOR",
											message: values.message,
											url: values.url,
											expirationDate: dayjs(values.expirationDate).toISOString(),
											memberId: memberId,
											systemNotificationStatusId: values.systemNotificationStatusId ?? 1,
											criteria: [
												{ field: "AorShortName", op: "Equal", values: [userProfile.aorName] }, // get this from the member data
												// { field: "MemberType", op: "Equal", values: setMemberTypeCriteria(values.memberType) },
											],
										};

										if (message) {
											// Updating an existing AOR message
											payload = { ...message, ...payload };
											axios
												.put(mace_url + "api/app/SystemNotification/" + message.id, payload)
												.then((response) => {
													displayToast("success", "Success", "AOR message updated succesfully");
													history.push("/aor-messages");
												})
												.catch((e) => {
													displayToast("error", "Error", "There was a problem updating the AOR message. " + e.message);
													console.error("Error updating AOR message", e);
												})
												.then(() => {
													resetForm();
													setDisabled(false);
												});
										} else {
											// Creating a new AOR message
											axios
												.post(mace_url + "api/app/SystemNotification/", payload)
												.then((response) => {
													displayToast("success", "Success", "Your AOR message has been created succesfully");
													history.push("/aor-messages");
												})
												.catch((e) => {
													displayToast("error", "Error", "There was a problem creating the AOR message. " + e.message);
													console.error("Error creating AOR message", e);
												})
												.then(() => {
													resetForm();
													setDisabled(false);
												});
										}
									}}
								>
									{({ values, errors, touched, setFieldValue }) => (
										<Form>
											<div className="grid grid-cols-4">
												<div className="col-span-4">
													<div className="grid grid-cols-12 gap-6">
														<div className="mt-6 sm:mt-5 crmls-fields-wrap">
															<div className="crmls-field-wrap">
																<label htmlFor="message">Message Type {RequiredIndicator}</label>
																<div className="mt-1 sm:mt-0 sm:col-span-2">
																	<div className="max-w-lg flex rounded-md shadow-sm">
																		<Field id="systemNotificationStatusId" name="systemNotificationStatusId" as="select" className="input-registered-required">
																			{alertStatuses.map((status, i) => {
																				return (
																					<option key={i} value={status.id}>
																						{status.description ?? status.name}
																					</option>
																				);
																			})}
																		</Field>
																	</div>
																</div>
																{touched.systemNotificationStatusId && errors.systemNotificationStatusId && <div className="text-sm text-red-600">{errors.systemNotificationStatusId}</div>}
															</div>
															{/* <div className="crmls-field-wrap">
																<label htmlFor="message">Member Type {RequiredIndicator}</label>
																<div className="mt-1 sm:mt-0 sm:col-span-2">
																	<div className="max-w-lg flex rounded-md shadow-sm" key={"key-" + messageMemberTypes}>
																		<Select
																			id="memberType"
																			name="memberType"
																			options={memberTypes}
																			isClearable={true}
																			onChange={(e) => setFieldValue("memberType", e)}
																			classNamePrefix="custom-input"
																			className="input-registered-required"
																			isMulti
																			isDisabled={disabled}
																			defaultValue={messageMemberTypes}
																		/>
																	</div>
																</div>
																{touched.memberType && errors.memberType && <div className="text-sm text-red-600">{errors.memberType}</div>}
															</div> */}

															<div className="crmls-field-wrap">
																<label htmlFor="message">
																	Message {RequiredIndicator} <span className="block text-xs opacity-80">(5-200 Characters, No HTML)</span>
																</label>
																<div className="mt-1 sm:mt-0 sm:col-span-2">
																	<div className="max-w-lg flex rounded-md shadow-sm">
																		<Field as="textarea" id="message" name="message" className="input-registered-required" disabled={disabled} />
																	</div>
																</div>
																{touched.message && errors.message && <div className="text-sm text-red-600">{errors.message}</div>}
															</div>
															<div className="crmls-field-wrap">
																<label htmlFor="url">More Information URL</label>
																<div className="mt-1 sm:mt-0 sm:col-span-2">
																	<div className="max-w-lg flex rounded-md shadow-sm">
																		<input
																			type="text"
																			id="url"
																			name="url"
																			className="input-registered"
																			disabled={disabled}
																			onChange={(e) => {
																				setFieldValue("url", e.target.value);
																			}}
																			defaultValue={values.url ?? ""}
																		/>
																	</div>
																</div>
																{touched.url && errors.url && <div className="text-sm text-red-600">{errors.url}</div>}
															</div>
															<div className="crmls-field-wrap">
																<label htmlFor="message">Expiration Date {RequiredIndicator}</label>
																<div className="mt-1 sm:mt-0 sm:col-span-2">
																	<div className="max-w-lg flex rounded-md shadow-sm">
																		<DateTimePickerComponent id="expirationDate" value={values.expirationDate} min={new Date()} onChange={(e: ChangedEventArgs) => setFieldValue("expirationDate", e.value)} />
																	</div>
																</div>
																{touched.expirationDate && errors.expirationDate && <div className="text-sm text-red-600">{errors.expirationDate}</div>}
															</div>
															<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:py-5">
																<button type="submit" className={`crmls-submit-btn ${disabled ? "bg-opacity-20" : ""}`} disabled={disabled}>
																	<CheckCircleIcon className="w-6 pr-2" />
																	{message ? "Update Message" : "Create Message"}
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</Form>
									)}
								</Formik>
							)}
						</div>
					</div>
				</div>
			</div>
		// </ContentContainer>
	);
};

export default AorMessage;
