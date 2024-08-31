import React from "react";
import { FormikProps, useFormikContext } from "formik";
import { TabTitle } from "../../../../../components/widgets/TabTitle";
import UpdateDeleteGrid, {
	UpdateDeleteGridColumnType,
} from "../../../../../util/grids/UpdateDeleteGrid/UpdateDeleteGrid";
import BrokerageFirmBrandsForm from "./BrokerageFirmBrandsForm";

const BrokerageFirmBrands = () => {
	const brokerageFirmFormik: FormikProps<any> = useFormikContext();
	const { touched, errors } = brokerageFirmFormik;
	return (
		<div className="px-4">
			<TabTitle
				title="Associate Brands"
				// customError={brokerageFirmFormik.errors.brands}
			/>
			<UpdateDeleteGrid
				fieldName="brands"
				Form={BrokerageFirmBrandsForm}
				columns={columns}
				id="id"
				newIdType="Number"
			/>
		</div>
	);
};

export default BrokerageFirmBrands;

const columns: UpdateDeleteGridColumnType[] = [
	{
		field: "name",
		headerText: "Name",
		width: 130,
	},
];
