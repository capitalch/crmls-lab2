import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateDeleteFormProps } from "../../../../../util/grids/UpdateDeleteGrid/UpdateDeleteGrid";
import { useParams } from "react-router";
import {
	MembershipMessages,
	MembershipRegEx,
} from "../../../../../util/MembershipMessages";
import { GRID_ACTION_TYPES } from "../../../../../util/grids/constants/UpdateDeleteGridConstant";
import FormControls from "../../../../../util/grids/UpdateDeleteGrid/FormControls";
import FormikInput from "../../../../../util/controls/formikInput";
import { ErrorComp } from "../../../../../components/widgets/ErrorComp";

const BrokerageFirmBrandsForm = ({
	currentRecord,
	setCurrentRecord,
	allRecords,
	onAddOrUpdate,
}: UpdateDeleteFormProps) => {
	const { id: firmGUID }: any = useParams();
	console.log("allRecords", allRecords);
	const formikFirmBrands = useFormik({
		initialValues: {
			id: "",
			name: "",
		},
		validateOnMount: true,
		validateOnChange: true,
		validationSchema: Yup.object({
			name: Yup.string()
				.required(MembershipMessages.required)
				.test(
					"cannot-be-duplicate",
					MembershipMessages.brandExists,
					(name: any) => {
						const isDuplicate = allRecords.some(
							(record: any) =>
								name &&
								record?.name &&
								record.name.toLowerCase().trim() ===
									name.toLowerCase().trim() &&
								// ensure that the record is not the current record
								// if yes, then it is an update operation
								currentRecord.id !== record.id
						);
						return !isDuplicate;
					}
				),
		}),
		onSubmit: (values, actions) => {},
		onReset: (values, actions) => {
			setCurrentRecord({});
			formikFirmBrands.setValues(formikFirmBrands.initialValues);
		},
	});

	const {
		errors,
		getFieldProps,
		handleReset,
		touched,
		values,
		setValues,
	}: any = formikFirmBrands;

	useEffect(() => {
		if (!currentRecord.id) {
			formikFirmBrands.resetForm();
			return;
		}
		setValues(currentRecord);
	}, [currentRecord.id]);

	useEffect(() => {
		formikFirmBrands.resetForm();
	}, [firmGUID]);

	return (
		<div className="mr-5 mb-5" style={{ minWidth: "25rem" }}>
			<div className="flex justify-end items-center mb-1">
				<FormControls
					formik={formikFirmBrands}
					onAddOrUpdate={onAddOrUpdate}
					currentRecord={currentRecord}
				/>
			</div>

			<div className="form-group">
				<FormikInput
					fieldName="name"
					type="text"
					className="form-control"
					label="Brand Name"
					required={true}
					formik={formikFirmBrands}
				/>
			</div>
		</div>
	);
};
export default BrokerageFirmBrandsForm;
