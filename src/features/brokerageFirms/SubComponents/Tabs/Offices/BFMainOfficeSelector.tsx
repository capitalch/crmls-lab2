import React, { useEffect, useState } from "react";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { FormikProps, useFormikContext } from "formik";
import { bf_offices_resource_name } from "./BrokerageFirmOfficesSelectable";
import { useParams } from "react-router";

export const bf_main_office_fieldname = "mainOfficeID";

const BFMainOfficeSelector = (props: any) => {
	const [checked, setChecked] = useState(false);
	const formik: FormikProps<any> = useFormikContext();
	const mainOfficeID = formik.values?.[bf_main_office_fieldname];
	const { id }: any = useParams();
	const systemOfRecordIsManual =
		formik.values && formik.values.systemOfRecordID == "1";
	const isReadOnly = !systemOfRecordIsManual && id;

	useEffect(() => {
		if (!mainOfficeID) {
			setChecked(false);
			return;
		}
		setChecked(props.id === mainOfficeID);
	}, [mainOfficeID]);

	const setPrimaryBrokerageFirm = async (newMainOfficeID?: string, e?: any) => {
		e.stopPropagation();
		formik.setFieldValue(bf_main_office_fieldname, newMainOfficeID || "");
	};

	return (
		<input
			type="checkbox"
			checked={checked}
			className="cursor-pointer disabled:pointer-events-none disabled:opacity-30"
			onChange={(e: any) => setPrimaryBrokerageFirm(props.id, e)}
			disabled={isReadOnly}
		/>
		// <CheckBoxComponent checked={checked} onChange={(e:any) => setPrimaryBrokerageFirm(props.id, e)} key={props.id}/>
	);
};

export default BFMainOfficeSelector;
