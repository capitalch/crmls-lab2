import { useSelector } from "react-redux";
import clsx from "clsx";
import { BasicSelect } from "../../../components/BasicSelect/BasicSelect";
import { dba_resource_name } from "../Dbas";
import { StandardSelect } from "../../../components/StandardSelect/StandardSelect";
import FormikInput from "../../../util/controls/formikInput";
import { ErrorComp } from "../../../components/widgets/ErrorComp";
import { AstrixComp } from "../../../components/widgets/AstrixComp";
import { ZipCode } from "../../../components/widgets/ZipCode";
import { PhoneNumber } from "../../../components/widgets/PhoneNumber";
import moment from "moment";
import { MembershipMessages } from "../../../util/MembershipMessages";
import { FormikProps, useFormikContext } from "formik";
import { DBA } from "../DbaInterface";
import { dba_licenses_fieldName, dba_licenses_gridName } from "./DbaLicenses";
import FormikSelect from "../../../util/controls/FormikInputSelect/FormikInputSelect";
import InputWrapper from "../../../util/controls/InputWrapper";
import { dba_offices_fieldName, dba_offices_gridName } from "./DbaOffices";
import { useAppDispatch } from "../../../app/store";
import {
	resetSelectableGrid,
	resetSelectedIDs,
} from "../../../components/SelectableGrid/SelectableGridSlice";
// import { bf_resource_name as brokerageFirmResourceName } from "../MyBrokerageFirms/MyBrokerageFirms"
// import { BasicSelect } from "../../../../components/BasicSelect/BasicSelect"

const DBADetailsTab = () => {
	const inputClassName =
		"w-full text-sm mt-2 h-8 border-1 border-gray-200 hover:border-gray-300 block w-20 p-3";
	const formik: FormikProps<DBA> = useFormikContext();
	const dispatch = useAppDispatch();

	const dba = useSelector(
		(state: any) => state?.queryHelper[dba_resource_name]?.contents
	);
	const { setFieldValue, getFieldProps, values: dbaValues } = formik;

	const { onChange: brokerageFirmOnChange, ...brokerageFirmProps } =
		getFieldProps("brokerageFirmID");

	return (
		<div className="flex flex-wrap w-full mb-32 sm:mb-16 animate-fade mx-4 pr-10">
			<FormikInput fieldName="name" label="Name" type="text" required={true} />
			<FormikSelect
				fieldName="brokerageFirmID"
				resource="brokerageFirms"
				label="Brokerage Firm"
				required={true}
				preventDefault={true}
				onChange={(firm: any) => {
					// brokerageFirmOnChange(e);
					setFieldValue("brokerageFirmID", firm?.id || "");
					setFieldValue(dba_licenses_fieldName, []);
					setFieldValue(dba_offices_fieldName, []);
					const args1: any = { name: dba_licenses_gridName };
					dispatch(resetSelectableGrid(args1));
					dispatch(resetSelectedIDs(args1));
					const args2: any = { name: dba_offices_gridName };
					dispatch(resetSelectableGrid(args2));
					dispatch(resetSelectedIDs(args2));
				}}
				{...brokerageFirmProps}
			/>
			<FormikInput
				fieldName="address1"
				label="Address 1"
				type="text"
				required={true}
			/>
			<FormikInput fieldName="address2" label="Address 2" type="text" />
			<FormikInput fieldName="city" label="City" type="text" required={true} />
			<FormikSelect fieldName="stateID" resource="StateLookups" label="State" />
			<InputWrapper fieldName="zip" label="Zip" required={true}>
				<ZipCode
					id="zip"
					className={inputClassName}
					setFieldValue={setFieldValue}
					{...getFieldProps("zip")}
				/>
			</InputWrapper>
			<InputWrapper fieldName="phone" label="Phone" required={true}>
				<PhoneNumber
					id="phone"
					type="text"
					setFieldValue={setFieldValue}
					className={inputClassName}
					{...getFieldProps("phone")}
				/>
			</InputWrapper>
			<FormikInput
				fieldName="expirationDate"
				label="Expiration Date"
				type="date"
				value={getDate(dbaValues?.expirationDate)}
				required={true}
				onChange={(e) =>
					formik.setFieldValue(
						"expirationDate",
						moment(e.target.value).format("YYYY-MM-DDTHH:mm:ssZ")
					)
				}
			/>
			<FormikInput
				fieldName="activeDate"
				label="Active Date"
				type="date"
				value={getDate(dbaValues?.activeDate)}
				required={true}
				onChange={(e) =>
					formik.setFieldValue(
						"activeDate",
						moment(e.target.value).format("YYYY-MM-DDTHH:mm:ssZ")
					)
				}
			/>
		</div>
	);
};
export default DBADetailsTab;

const getDate = (date: string) => {
	let formattedDate: any;
	try {
		// const originalDate = new Date(date);
		formattedDate = date.split("T")[0];
	} finally {
		return formattedDate;
	}
};
