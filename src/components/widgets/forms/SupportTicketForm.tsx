import BaseModal from "../modal/BaseModal";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { RequiredIndicator } from "../../../features/registeredListing/RegisteredListingForm";
import { useSelector } from "react-redux";
import { formattedProfile } from "../../../features/user/selectors";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../../../app/hooks";
import { show } from "../../../features/notification/notificationSlice";
import axios from "axios";
import { workflow_url } from "../../../adapters";

const SupportTicketForm = (props: any) => {
	const dispatch = useAppDispatch();
	let userProfile = useSelector(formattedProfile);

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

	return (
		<BaseModal {...props}>
			<div className="space-y-12 bg-primary text-primary">
				<div className="py-6">
					<h2 className="font-semibold leading-7">{props.title ?? "Create Support Ticket"}</h2>
					<p className="mt-1 text-sm leading-6">Please complete the form below to create a support ticket.</p>
					<Formik
						validationSchema={Yup.object().shape({
							subject: Yup.string().required("Subject Required"),
							description: Yup.string()
								.min(5)
								.max(200)
								.matches(/^(?!(?:.|[\n\r])*<[a-z][a-z0-9]*\b[^>]*>)/i, "HTML is not allowed")
								.required("Description Required"),
						})}
						initialValues={{
							subject: "",
							description: "",
						}}
						onSubmit={(values, { resetForm }) => {
							let payload = {
								workItemDefinitionId: "c33695d9-1341-4f14-64b2-08db8218dd7f", // hard-coded for CCD
								title: values.subject, // subject
								fields: {
									CaseOrigin: "webform", // hard-coded
									Body: values.description, // description
									ContactName: userProfile.memberId, // logged in user's GUID here
								},
							};

							// Creating a new support ticket
							axios
								.post(workflow_url + "api/app/WorkItem/", payload)
								.then((response) => {
									displayToast("success", "Success", "Your support ticket has been created succesfully");
									props.setOpen(false);
								})
								.catch((e) => {
									displayToast("error", "Error", "There was a problem creating the support ticket." + e.message);
									console.error("Error creating support ticket", e);
								})
								.then(() => {
									resetForm();
								});
						}}
					>
							{({ values, errors, touched, setFieldValue, isSubmitting, handleSubmit }) => (
								<Form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4" onSubmit={handleSubmit}>
								<div className="sm:col-span-4">
									<label htmlFor="subject" className="block text-sm font-medium leading-6">
										Subject: {RequiredIndicator}
									</label>
									<div className="mt-2">
										<div className="flex rounded-md shadow-sm sm:max-w-md">
											<input
												type="text"
												id="subject"
												name="subject"
												className="input-registered"
												onChange={(e) => {
													setFieldValue("subject", e.target.value);
												}}
												defaultValue={values.subject ?? ""}
											/>
										</div>
									</div>
									{touched.subject && errors.subject && <div className="text-sm text-red-600">{errors.subject}</div>}
								</div>
								<div className="col-span-full">
									<label htmlFor="description" className="block text-sm font-medium leading-6">
										Description: {RequiredIndicator}
									</label>
									<div className="mt-2">
										<Field as="textarea" id="description" name="description" className="input-registered-required" value={values.description ?? ""} />
									</div>
									{touched.description && errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
									<p className="mt-3 text-sm leading-6">Please tell us what you need assistance with.</p>
								</div>
								<div className="col-span-full text-right">
									<button type="submit" className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-header sm:w-auto ${isSubmitting ? "bg-opacity-50" : "bg-opacity-80 hover:bg-opacity-100"}`} disabled={isSubmitting}>
										<CheckCircleIcon className="w-6 pr-2" />
										{isSubmitting ? "Submitting..." : "Create Ticket"}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</BaseModal>
	);
};

export default SupportTicketForm;
