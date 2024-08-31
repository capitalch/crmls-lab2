import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	MembershipMessages,
	MembershipRegEx,
} from "../../../../util/MembershipMessages";
import { UpdateDeleteFormProps } from "../../../../util/grids/UpdateDeleteGrid/UpdateDeleteGrid";
import { useParams } from "react-router";
import { GRID_ACTION_TYPES } from "../../../../util/grids/constants/UpdateDeleteGridConstant";
import FormControls from "../../../../util/grids/UpdateDeleteGrid/FormControls";
import { AstrixComp } from "../../../../components/widgets/AstrixComp";
import { ErrorComp } from "../../../../components/widgets/ErrorComp";
import FormikSelect from "../../../../util/controls/FormikInputSelect/FormikInputSelect";
import FormikInput from "../../../../util/controls/formikInput";

const TeamsEmailForm = ({
	currentRecord,
	setCurrentRecord,
	allRecords,
	onAddOrUpdate,
}: UpdateDeleteFormProps) => {
	const { id: teamGUID }: any = useParams();

	const formikTeamsEmail = useFormik({
		initialValues: {
			id: "",
			emailAddress: "",
			emailTypeID: "",
		},
		validateOnMount: true,
		validateOnChange: true,
		validationSchema: Yup.object({
			emailAddress: Yup.string()
				.required(MembershipMessages.required)
				.matches(/^[^\s].*$/, MembershipMessages.noStartWithSpace)
				.matches(MembershipRegEx.emailRegExp, MembershipMessages.emailInvalid)
				.test(
					"is-duplicate",
					MembershipMessages.emailExists,
					(emailAddress) => {
						const isDuplicate = allRecords.some(
							(email) =>
								email.emailAddress === emailAddress &&
								email.id !== currentRecord.id
						);
						return !isDuplicate;
					}
				)
				.nullable(false),
			emailTypeID: Yup.string().required(MembershipMessages.required),
		}),
		onSubmit: (values, actions) => {},
		onReset: (values, actions) => {
			setCurrentRecord({});
			formikTeamsEmail.setValues(formikTeamsEmail.initialValues);
		},
	});

	const {
		errors,
		getFieldProps,
		handleReset,
		touched,
		values,
		setValues,
	}: any = formikTeamsEmail;

	const { onChange: emailTypeIDOnChange, ...emailTypeIDProps } =
		getFieldProps("emailTypeID");

	useEffect(() => {
		if (!currentRecord.id) {
			formikTeamsEmail.resetForm();
			return;
		}
		setValues(currentRecord);
	}, [currentRecord.id]);

	useEffect(() => {
		formikTeamsEmail.resetForm();
	}, [teamGUID]);

	return (
		<div className="mr-5 mb-5" style={{ minWidth: "25rem" }}>
			<div className="flex justify-end items-center mb-1">
				<FormControls
					formik={formikTeamsEmail}
					onAddOrUpdate={onAddOrUpdate}
					currentRecord={currentRecord}
				/>
			</div>

			<div className="form-group">
				{/* <label htmlFor="emailAddress">Email Address <AstrixComp /></label> */}
				<FormikInput
					fieldName="emailAddress"
					type="text"
					className="form-control"
					label="Email Address"
					required={true}
					formik={formikTeamsEmail}
					// placeholder="Enter Email Address"
					// {...getFieldProps('emailAddress')}
					// value={values.emailAddress || ''}
				/>
				{/* <input 
                    
                />
                {touched.emailAddress && errors.emailAddress ? <ErrorComp error={errors.emailAddress} /> : null} */}
			</div>
			<div className="form-group">
				<FormikSelect
					formik={formikTeamsEmail}
					label="Email Type"
					fieldName={"emailTypeID"}
					resource={"BrokerTeamEmailTypeLookups"}
					onChange={(e: any) => {
						formikTeamsEmail.setFieldValue("emailTypeName", e.displayName);
					}}
					required={true}
					className="w-full mt-2"
				/>
			</div>
		</div>
	);
};
export default TeamsEmailForm;
