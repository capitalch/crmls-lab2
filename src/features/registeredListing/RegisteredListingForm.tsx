import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Formik, FormikValues } from "formik";
import { agentFields, emptyRegisteredListingObject, getForm, getValidation, infoFields, locationFields, parseAzureMapResult } from "../../util/registeredListings";
import { getTaxRecord } from "../../adapters";
import NextButton from "../../components/tabs/NextButton";
import AzureMapInstance from "../../components/widgets/azureMaps/AzureMapInstance";
import AzureAutoComplete from "../../components/widgets/azureMaps/AzureAutoComplete";
import Confirmation from "./tabs/Confirmation";
import { RegisteredListingPayload } from "./selectors";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { userProfile } from "../user/selectors";
import { createRegisteredListing, updateRegisteredListing } from "./registeredListingSlice";
import { propTypeLookupLabel } from "../../util/helpers";
import { hide, show } from "../notification/notificationSlice";
import { push } from "connected-react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import Stepper from "../../components/widgets/stepper/Stepper";
import { UseContextProvider } from "../../components/widgets/stepper/StepperContext";

type regListingFormProps = {
	listing: RegisteredListingPayload | undefined;
};

export const RequiredIndicator = <span className="text-red-800 pl-1">*</span>;

const RegisteredListingForm = ({ listing }: regListingFormProps) => {
	const [currentStep, setCurrentStep] = useState(1);
	const isNew = !listing;
	const dispatch = useAppDispatch();
	const user = useSelector(userProfile);
	const [addressSelected, setAddressSelected] = useState({});
	const [initialValues, setInitialValues] = useState<RegisteredListingPayload>(listing ? listing : emptyRegisteredListingObject());

	const localizedFormat = require("dayjs/plugin/localizedFormat");
	dayjs.extend(localizedFormat);

	useEffect(() => {
		if (Object.keys(addressSelected).length !== 0) {
			let initValues = { ...initialValues, ...parseAzureMapResult(addressSelected) };
			initValues.listAgentMlsId = user.userid;
			setInitialValues(initValues);

			// try grabbing the CRS data
			getTaxRecord("taxapi/PropertyReport/" + initValues.postalCode, encodeURIComponent(initValues.streetNumber + " " + initValues.streetName)).then((response) => {
				if (response.data.propertiesFound === 1) {
					// we got a CRS response with one property
					let prop = response.data.property;
					initValues.countyOrParish = prop.county;
					initValues.stateOrProvince = prop.state;
					initValues.postalCodePlus4 = prop.address.zip4;
					initValues.streetSuffix = prop.address.streetSuffix;
					initValues.unparsedAddress = prop.address.full;
					initValues.universalPropertyId = prop.upi;

					if (prop.coordinates.length) {
						initValues.latitude = prop.coordinates[0];
						initValues.longitude = prop.coordinates[1];
					}
					if (propTypeLookupLabel(prop.propertyType)) {
						initValues.propertyType = propTypeLookupLabel(prop.propertyType);
					}

					setInitialValues(initValues);
				} else {
					console.log("No CRS record");
				}
			});
		}
	}, [addressSelected, user]);

	useEffect(() => {
		if (listing) {
			let localListing = { ...listing };
			localListing.expirationDate = dayjs(listing.expirationDate).format("YYYY-MM-DD");
			localListing.listingContractDate = dayjs(listing.listingContractDate).format("YYYY-MM-DD");
			localListing.startShowingDate = listing.startShowingDate ? dayjs(listing.startShowingDate).format("YYYY-MM-DD") : "";
			localListing.no_marketing = !listing.startShowingDate;

			// localListing.unparsedAddress = buildFormattedAddress(listing);
			setInitialValues(localListing);
		}
	}, [listing]);

	const steps = ["Location", "Listing Info", "List/Co-list Agent", "Confirmation"];
	const displayStep = (step: number, { values, errors, touched, handleChange, handleBlur, isValid, setFieldValue }: any) => {
		switch (step) {
			case 1:
				return (
					<div className="grid grid-cols-12 gap-6">
						<div className="crmls-fields-wrap sm:col-span-6">
							<AzureAutoComplete setAddressSelected={setAddressSelected} handleChange={handleChange} handleBlur={handleBlur} errors={errors} values={values} touched={touched} setFieldValue={setFieldValue} className="crmls-field-wrap compact" />
							{getForm(handleChange, handleBlur, errors, values, touched, setFieldValue, locationFields())}
						</div>
						<div className="crmls-fields-wrap sm:col-span-6">
							<AzureMapInstance values={values} />
						</div>
					</div>
				);
			case 2:
				return <div className="crmls-fields-wrap">{getForm(handleChange, handleBlur, errors, values, touched, setFieldValue, infoFields())}</div>;
			case 3:
				return <div className="crmls-fields-wrap">{getForm(handleChange, handleBlur, errors, values, touched, setFieldValue, agentFields())}</div>;
			case 4:
				return <Confirmation isValid={isValid} values={values} isEditable={true} />;
			default:
		}
	};

	const handleClick = (direction: string) => {
		let newStep = currentStep;

		direction === "next" ? newStep++ : newStep--;
		// check if steps are within bounds
		newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
	};

	return listing && (listing.cancellationDate || listing.promotedMlsId || dayjs(listing.expirationDate).add(7, "days") < dayjs()) ? (
		<Confirmation isValid={true} values={listing} isEditable={false} />
	) : (
		<Formik
			validateOnMount={true}
			enableReinitialize={true}
			initialValues={initialValues}
			validate={(values: FormikValues) => {
				const errors: any = {};
				if (values.listingContractDate && values.expirationDate && dayjs(values.expirationDate).startOf("day") < dayjs(values.listingContractDate).startOf("day").add(1, "day")) {
					errors.expirationDate = "Expiration Date must be at least one day after Listing Contract Date.";
				}

				if (values.startShowingDate && values.expirationDate && dayjs(values.expirationDate).startOf("day") < dayjs(values.startShowingDate).startOf("day")) {
					if (!values.no_marketing) {
						errors.expirationDate = "Expiration Date must be after Start Marketing Date.";
					}
				}

				if (values.startShowingDate && values.listingContractDate) {
					if (dayjs(values.startShowingDate).startOf("day") < dayjs(values.listingContractDate).startOf("day")) {
						errors.startShowingDate = "Start Marketing Date must be after Listing Contract Date.";
					}
				}

				if (!values.startShowingDate && !values.no_marketing) {
					errors.startShowingDate = "Start Marketing Date (or No Start Marketing checkbox) required.";
				}

				return errors;
			}}
			validationSchema={() => getValidation(listing)}
			onSubmit={(values, { setSubmitting }) => {
				let augmentedValues = { ...values };
				augmentedValues.expirationDate = dayjs(augmentedValues.expirationDate).toISOString();
				augmentedValues.modifiedOn = dayjs().toISOString();
				augmentedValues.modifiedBy = user.userid;
				augmentedValues.standardStatus = augmentedValues.standardStatus.length ? augmentedValues.standardStatus : "A";
				augmentedValues.registeredYN = true;
				// remove this one since it's just for handling marketing date
				delete augmentedValues.no_marketing;

				if (!listing) {
					augmentedValues.createdOn = dayjs().toISOString();
					augmentedValues.createdBy = user.userid;
					// remove the ID key if this is a new reg listing
					delete augmentedValues.id;
					dispatch(createRegisteredListing(augmentedValues))
						.then(unwrapResult)
						.then((response) => {
							dispatch(hide());
							dispatch(push("/registered/"));
							dispatch(
								show({
									show: true,
									title: "Registered listing created!",
									message: "Your new Registered ID is " + response.listingId,
									status: "success",
									position: "dash",
									autoHide: false,
									confirm: false,
									notificationId: null,
								})
							);
							return response.id;
						})
						// .then((id) => dispatch(push(`/registered/${id}`)))
						.catch((rejectedValue) => {
							dispatch(hide());
							dispatch(
								show({
									show: true,
									title: "Save Failed!",
									message: rejectedValue,
									status: "error",
									position: "popover",
									autoHide: 5500,
									confirm: false,
									notificationId: null,
								})
							);
						});
				} else {
					dispatch(updateRegisteredListing(augmentedValues))
						.then(unwrapResult)
						.then(() => {
							dispatch(hide());
							dispatch(
								show({
									show: true,
									title: "Updated",
									message: "Registered listing updated!",
									status: "success",
									position: "popover",
									autoHide: 2500,
									confirm: false,
									notificationId: null,
								})
							);
						})
						.catch((rejectedValue) => {
							dispatch(hide());
							dispatch(
								show({
									show: true,
									title: "Save Failed!",
									message: rejectedValue,
									status: "error",
									position: "popover",
									autoHide: 5500,
									confirm: false,
									notificationId: null,
								})
							);
						});
				}
			}}
		>
			{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty, validateForm, setFieldValue, setTouched }) => (
				<form onSubmit={handleSubmit}>
					<div className="space-y-8 divide-y divide-default sm:space-y-5 text-primary mb-8">
						<div>
							{listing && (
								<div className="pb-2">
									<h2 className="text-lg leading-6 font-medium text-primary">
										<span className="font-semibold">Listing ID:</span> {listing.listingId}
									</h2>
									<h3 className="mt-1 text-md leading-6 font-medium pb-2">
										{listing.streetNumber} {listing.streetName}, {listing.city}, {listing.stateOrProvince} {listing.postalCode}
									</h3>
									<div className="mt-2 flex flex-wrap space-x-0 sm:space-x-4">
										<div className="w-full sm:w-auto">
											<p className="mt-1 max-w-2xl">
												<span className="font-semibold text-header">Created On:</span> <span>{dayjs(values.createdOn).format("LLL")}</span>
											</p>
											<p className="mt-1 max-w-2xl">
												<span className="font-semibold text-header">Created By:</span> <span>{values.createdBy}</span>
											</p>
										</div>
										<div className="w-full sm:w-auto">
											<p className="mt-1 max-w-2xl">
												<span className="font-semibold text-header">Last Modified:</span> <span>{dayjs(values.modifiedOn).format("LLL")}</span>
											</p>
											<p className="mt-1 max-w-2xl">
												<span className="font-semibold text-header">Modified By:</span> <span>{values.modifiedBy}</span>
											</p>
										</div>
									</div>
								</div>
							)}

							<div className="horizontal mt-5 ">
								<Stepper steps={steps} currentStep={currentStep} />
								<div className="mt-4 p-4">
									<UseContextProvider>{displayStep(currentStep, { values, errors, touched, handleChange, handleBlur, isValid, setFieldValue })}</UseContextProvider>
								</div>
							</div>

							<NextButton handleClick={handleClick} currentStep={currentStep} steps={steps} isValid={isValid} validateForm={validateForm} setTouched={setTouched} isNew={isNew} isDirty={dirty} isSubmitting={isSubmitting} />
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default RegisteredListingForm;
