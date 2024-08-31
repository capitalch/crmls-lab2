import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { useAppDispatch } from "../../app/hooks";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { RequiredIndicator } from "../registeredListing/RegisteredListingForm";
import * as Yup from "yup";
import { show } from "../notification/notificationSlice";
import { ChangedEventArgs, DatePickerComponent, DateTimePickerComponent, RenderDayCellEventArgs } from "@syncfusion/ej2-react-calendars";
import { useSelector } from "react-redux";
import { userId } from "../user/selectors";
import dayjs from "dayjs";
import { requestTrainingClass } from "./trainingClassRequestSlice";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

const TrainingCourseRequest = ({ topics }: { topics: { id: string; name: string }[] }) => {
	dayjs.extend(LocalizedFormat);
	const [minDate, setMinDate] = useState<Date>();
	const [maxDate, setMaxDate] = useState<Date>();

	let id = useSelector(userId);
	const dispatch = useAppDispatch();

	const disabledDate = (args: RenderDayCellEventArgs): void => {
		// disable the weekends-- syncfusion does not support disabling specific hours yet
		if (args.date && (args.date.getDay() === 0 || args.date.getDay() === 6)) {
			args.isDisabled = true;
		}
	};

	const isToday = (someDate: Date) => {
		const today = new Date();
		return someDate.getDate() === today.getDate() && someDate.getMonth() === today.getMonth() && someDate.getFullYear() === today.getFullYear();
	};

	const dateTimeChange = (e: ChangedEventArgs, setFieldValue: any) => {
		const toDate = dayjs(e.value).toDate();

		// This is hacky, but the only way to handle the hour range in the dateTimePickerComponent
		if (e.value) {
			const currentTime = new Date();

			// This handles the "Today" click which returns 00:00:00 for the time value
			if (toDate.getHours() === 0) {
				toDate.setHours(currentTime.getHours());
				toDate.setMinutes(currentTime.getMinutes());
			}

			const minDate = new Date(toDate);
			if (isToday(minDate)) {
				// Today - minimum hours should be set to the next available time slot
				minDate.setHours(currentTime.getHours());
				if (currentTime.getMinutes() > 30) {
					minDate.setHours(currentTime.getHours() + 1);
					minDate.setMinutes(0);
				} else {
					minDate.setMinutes(30);
				}
			} else {
				// Not today - so allow time selection to be from 8:30 am
				minDate.setHours(8);
				minDate.setMinutes(30);
			}

			const maxDate = new Date(toDate);
			maxDate.setHours(16);
			maxDate.setMinutes(0);

			// Set the dateTimePicker min and max hours to be within business hours
			setMinDate(minDate);
			setMaxDate(maxDate);

			// If hours are not within business hours (8:30am - 5pm), correct the date to be within range
			if (toDate.getHours() <= 8) {
				toDate.setHours(8);
				if (toDate.getMinutes() < 30) {
					toDate.setMinutes(30);
				}
			} else if (toDate.getHours() >= 16) {
				toDate.setHours(16);
				if (toDate.getMinutes() > 0) {
					toDate.setMinutes(0);
				}
			} else {
				// set the selected date to the nearest next time increment if not on the hour or half hour
				if (toDate.getMinutes() !== 0 && toDate.getMinutes() !== 30) {
					if (toDate.getMinutes() > 30) {
						toDate.setHours(toDate.getHours() + 1);
						toDate.setMinutes(0);
					} else {
						toDate.setMinutes(30);
					}
				}
			}
			toDate.setSeconds(0);
		} else {
			setMinDate(dayjs().toDate());
			setMaxDate(dayjs().add(1, "year").toDate());
		}
		setFieldValue("dateTime", toDate);
	};

	return (
		<div className="space-y-6 sm:space-y-5 max-w-4xl">
			<div className="border-b border-default py-6 pt-0 sm:flex sm:items-center sm:justify-between text-secondary">
				<div className="flex-1 min-w-0">
					<h1 className="text-lg font-medium leading-6 sm:truncate">Request a Training Course</h1>
					<span className="text-sm">
						Sometimes you might want a class tailored to the needs of your association or brokerage. Or maybe you want one of our knowledgeable and experienced instructors to come to your facility to deliver a series of classes. Complete the form below to start the conversation.
					</span>
				</div>
			</div>
			<Formik
				validationSchema={Yup.object().shape({
					topic: Yup.string().min(5).max(125).required("Topic Required"),
					comments: Yup.string().max(1000).required("Request Details Required"),
					dateTime: Yup.date().typeError("Please enter a valid date").required("Date Required"),
				})}
				initialValues={{
					topic: "",
					comments: "",
					dateTime: "",
				}}
				onSubmit={async (values, { resetForm }) => {
					dispatch(
						requestTrainingClass({
							topic: topics.find(topic => topic.id === values.topic),
							comments: values.comments,
							dateTime: values.dateTime,
							requestedBy: id,
						})
					)
						.then(() => {
							dispatch(
								show({
									show: true,
									title: "Thank you!",
									message: "Your course request has been received. You should hear from CRMLS training soon.",
									status: "success",
									position: "popover",
									autoHide: 5000,
									confirm: false,
									notificationId: null,
								})
							);
							setMinDate(dayjs().toDate());
							setMaxDate(dayjs().add(1, "year").toDate());
							resetForm();
						})
						.catch((error) => {
							dispatch(
								show({
									show: true,
									title: "Error",
									message: error.message,
									status: "error",
									position: "popover",
									autoHide: 6000,
									confirm: false,
									notificationId: null,
								})
							);
						});
				}}
			>
				{({ values, errors, touched, setFieldValue }) => (
					<Form>
						<div className="grid grid-cols-4">
							<div className="col-span-4">
								<div className="grid grid-cols-12 gap-6">
									<div className="mt-6 sm:mt-5 crmls-fields-wrap">
										<div className="crmls-field-wrap">
											<label htmlFor="topic">Requested Course Topic {RequiredIndicator}</label>
											<div className="mt-1 sm:mt-0 sm:col-span-2">
												<div className="max-w-lg flex rounded-md shadow-sm">
													<Field id="topic" name="topic" as="select" className="input-registered-required">
														{topics.map((topic) => {
															return (
																<option key={topic.id} value={topic.id}>
																	{topic.name}
																</option>
															);
														})}
													</Field>
												</div>
											</div>
											{touched.topic && errors.topic && <div className="text-sm text-red-600">{errors.topic}</div>}
										</div>
										<div className="crmls-field-wrap">
											<label htmlFor="comments">Requested Date / Time {RequiredIndicator}</label>
											<div className="mt-1 sm:mt-0 sm:col-span-2">
												<div className="max-w-lg flex rounded-md shadow-sm">
													<DateTimePickerComponent id="dateTime" value={dayjs(values.dateTime).toDate()} renderDayCell={disabledDate} min={minDate} max={maxDate} onChange={(e: ChangedEventArgs) => dateTimeChange(e, setFieldValue)} cssClass="px-3 py-1 bg-secondary text-secondary" />
												</div>
											</div>
											{touched.dateTime && errors.dateTime && <div className="text-sm text-red-600">{errors.dateTime}</div>}
										</div>
										<div className="crmls-field-wrap">
											<label htmlFor="comments">
												Request Details {RequiredIndicator}
												<br />
												(Please let us know if this is virtual, live or hybrid)
											</label>
											<div className="mt-1 sm:mt-0 sm:col-span-2">
												<div className="max-w-lg flex rounded-md shadow-sm">
													<Field as="textarea" id="comments" name="comments" placeholder="Details / Comments" className="input-registered-required" />
												</div>
											</div>
											{touched.comments && errors.comments && <div className="text-sm text-red-600">{errors.comments}</div>}
										</div>
										<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:py-5">
											<button type="submit" className="crmls-submit-btn">
												<CheckCircleIcon className="w-6 pr-2" />
												Submit Request
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default TrainingCourseRequest;
