import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/solid";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { userId } from "../../user/selectors";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { mace_url, profile_url } from "../../../adapters";
import axios from "axios";
import { FormLoader } from "../../../components/widgets/SkeletonScreens";
import { show } from "../../notification/notificationSlice";
import { formattedProfile } from "../../user/selectors";
import { useAppDispatch } from "../../../app/hooks";
import { SystemNotificationEntity } from "../../notification/notificationTypes";
import { ChangedEventArgs, DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { RequiredIndicator } from "../../registeredListing/RegisteredListingForm";
import Select from "react-select";
import { ThemeTooltip } from "../../../components/settings/theme/ThemeTooltip";

const Message = ({ id, closeSlider }: { id?: string; closeSlider?: () => void }) => {
	let userProfile = useSelector(formattedProfile);
	dayjs.extend(LocalizedFormat);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [disabled, setDisabled] = useState(true);
	const [message, setMessage] = useState<SystemNotificationEntity>();
	const [messageMemberTypes, setMessageMemberTypes] = useState<any[]>([]);
	const [memberTypes, setMemberTypes] = useState<any[]>([]);
	const [alertStatuses, setAlertStatuses] = useState<any[]>([]);

	const messageId = id ?? null;
	useEffect(() => {
		axios
			.post(profile_url + "api/app/memberTypeLookups/q", {
				pageId: 0,
				pageSize: 5000,
			})
			.then((response) => {
				let memberTypes = response.data.results.map((mt: any) => {
					return { value: mt.shortName, label: mt.displayName };
				});
				let userType = userProfile?.memberType?.shortName;
				if (userType && userType === "B") {
					// Filter list for brokers
					memberTypes = memberTypes.filter((mt: any) => ["B", "OM"].includes(mt.value));
				}
				setMemberTypes(memberTypes);
			})
			.catch((e) => {
				console.error("Error retrieving member types", e);
			});

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

	useEffect(() => {
		// When editing a message, we need to format the member type criteria to match the expected format in the multi-select default value
		// EXAMPLE DEFAULT VALUE: return [{value: "A", label: "Agent"}]
		if (message && memberTypes) {
			const messageMemberTypes = message?.criteria?.find((criteria) => criteria.field === "MemberType");
			const formattedMemberTypes: any[] = [];
			if (messageMemberTypes && messageMemberTypes?.values) {
				messageMemberTypes.values.forEach((type) => {
					let foundType = memberTypes.find((mt) => mt.value === type);
					if (foundType) {
						formattedMemberTypes.push(foundType);
					}
				});
				setMessageMemberTypes(formattedMemberTypes.map((ele) => ele));
			}
		}
	}, [message, memberTypes]);

	const setMemberTypeCriteria = (types: any) => {
		let memberTypeCriteria: any[] = [];

		types.map((type: { value: string; label: string }) => {
			return memberTypeCriteria.push(type.value);
		});

		return memberTypeCriteria;
	};

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
	return isLoading ? (
		<div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
			<FormLoader />
		</div>
	) : (
		<>
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
				})}
				initialValues={{
					systemNotificationStatusId: message?.systemNotificationStatusId ?? "",
					memberType: messageMemberTypes ?? [],
					message: message?.message ?? "",
					url: message?.url ?? "",
					expirationDate: message?.expirationDate ? dayjs(message.expirationDate).toDate() : dayjs().add(1, "day").toDate(),
				}}
				onSubmit={async (values, { resetForm }) => {
					let payload = {
						title: `A message from ${userProfile.aorFullName ? userProfile.aorFullName : userProfile.aorName ? userProfile.aorName : "your organization"}`,
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
						],
					};

					// If member type is selected, add it to the criteria
					if (values.memberType.length > 0) {
						payload.criteria.push({ field: "MemberType", op: "Equal", values: setMemberTypeCriteria(values.memberType) });
					}

					if (message) {
						// Updating an existing message
						payload = { ...message, ...payload };
						axios
							.put(mace_url + "api/app/SystemNotification/" + message.id, payload)
							.then((response) => {
								displayToast("success", "Success", "Message updated succesfully");
								resetForm();
								setDisabled(false);
								if (closeSlider) {
									closeSlider();
								}
							})
							.catch((e) => {
								displayToast("error", "Error", "There was a problem updating the message. " + e.message);
								console.error("Error updating message", e);
							});
					} else {
						// Creating a new message
						axios
							.post(mace_url + "api/app/SystemNotification/", payload)
							.then((response) => {
								displayToast("success", "Success", "Your message has been created succesfully");
								resetForm();
								setDisabled(false);
								if (closeSlider) {
									closeSlider();
								}
							})
							.catch((e) => {
								displayToast("error", "Error", "There was a problem creating the message. " + e.message);
								console.error("Error creating message", e);
							});
					}
				}}
			>
				{({ values, errors, touched, setFieldValue }) => (
					<Form>
						<div className="grid grid-cols-1 gap-6 w-full 2xl:w-2/3">
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
							<div className="crmls-field-wrap">
								<label htmlFor="message">Member Type <InformationCircleIcon className="w-5 h-5 text-header inline cursor-pointer" data-tip="You may select specific member types to send this message to. If no member types are selected, message will be sent to ALL member types in your association." /></label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div className="max-w-lg flex rounded-md shadow-sm" key={"key-" + messageMemberTypes}>
										<Select
											id="memberType"
											name="memberType"
											options={memberTypes}
											isClearable={true}
											onChange={(e) => {
												setFieldValue("memberType", e);
											}}
											classNamePrefix="custom-input"
											className="input-registered-required"
											isMulti
											isDisabled={disabled}
											defaultValue={messageMemberTypes}
										/>
									</div>
								</div>
								{touched.memberType && errors.memberType && <div className="text-sm text-red-600">{errors.memberType}</div>}
							</div>

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
										<DateTimePickerComponent id="expirationDate" value={values.expirationDate} min={new Date()} onChange={(e: ChangedEventArgs) => setFieldValue("expirationDate", e.value)} cssClass="px-3 py-1 bg-secondary text-secondary" />
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
					</Form>
				)}
			</Formik>
			<ThemeTooltip />
		</>
	);
};

export default Message;
