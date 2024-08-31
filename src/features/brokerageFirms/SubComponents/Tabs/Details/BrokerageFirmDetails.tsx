import { useSelector } from "react-redux";
import clsx from "clsx";
import { bf_resource_name as brokerageFirmResourceName } from "../../MyBrokerageFirms/MyBrokerageFirms";
import { BasicSelect } from "../../../../../components/BasicSelect/BasicSelect";
import { useParams } from "react-router";
import { FormikProps, useFormikContext } from "formik";
import FormikSelect from "../../../../../util/controls/FormikInputSelect/FormikInputSelect";
import { ZipCode } from "../../../../../components/widgets/ZipCode";
import { PhoneNumber } from "../../../../../components/widgets/PhoneNumber";
import FormikInput from "../../../../../util/controls/formikInput";
import InputWrapper from "../../../../../util/controls/InputWrapper";
import FormikMultiSelect from "../../../../../util/controls/FormikInputSelect/FormikInputMultiSelect";

const BrokerageFirmDetailsTab = () => {
	// const brokerageFirm = useSelector((state: any) => state?.queryHelper[brokerageFirmResourceName]?.contents)
	const formik: FormikProps<any> = useFormikContext();
	const { values: brokerageFirm, setFieldValue, getFieldProps } = formik;
	const { id }: any = useParams();
	const systemOfRecordIsManual =
		formik.values && formik.values.systemOfRecordID == 1;
	const isReadOnly = !systemOfRecordIsManual && id;
	const inputClassName = `w-full text-sm mt-2 h-8 border-1 border-gray-200 hover:border-gray-300 block w-20 ${
		isReadOnly ? "bg-gray-200" : ""
	}`;

	return (
		<div className="flex flex-wrap w-full mb-32 sm:mb-16 animate-fade mx-4 pr-10">
			<FormikInput
				fieldName="name"
				label="Name"
				type="text"
				required={true}
				disabled={isReadOnly}
			/>
			<InputWrapper fieldName="phone" label="Phone" required={true}>
				<PhoneNumber
					id="phone"
					type="text"
					setFieldValue={setFieldValue}
					className={inputClassName}
					{...getFieldProps("phone")}
					disabled={isReadOnly}
				/>
			</InputWrapper>
			<FormikInput
				fieldName="address1"
				label="Address 1"
				type="text"
				required={true}
				disabled={isReadOnly}
			/>
			<FormikInput
				fieldName="address2"
				label="Address 2"
				type="text"
				disabled={isReadOnly}
			/>
			<FormikInput
				fieldName="city"
				label="City"
				type="text"
				required={true}
				disabled={isReadOnly}
			/>
			<FormikSelect
				fieldName="stateID"
				resource="StateLookups"
				label="State"
				required={true}
				disabled={isReadOnly}
			/>
			<InputWrapper fieldName="zip" label="Zip" required={true}>
				<ZipCode
					id="zip"
					className={inputClassName}
					setFieldValue={setFieldValue}
					{...getFieldProps("zip")}
					disabled={isReadOnly}
				/>
			</InputWrapper>
			<FormikMultiSelect
				fieldName="originatingMlsSystemIDs"
				label="Originating MLS"
				resource="MlsSystemLookups"
				formik={formik}
				disabled={isReadOnly}
				isMulti={true}
			/>
		</div>
	);
};
export default BrokerageFirmDetailsTab;
