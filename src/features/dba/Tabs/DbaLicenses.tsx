import { useDispatch, useSelector } from "react-redux";
import { dba_resource_name } from "../Dbas";
import useGrid from "../../../util/useClearGrid";
import { useEffect } from "react";
import { setShowSelectedRows } from "../../../components/SelectableGrid/SelectableGridSlice";
import { SelectableGrid } from "../../../components/SelectableGrid/SelectableGrid";
import Loader from "../../../components/widgets/Loader";
import { FormikProps, useFormikContext } from "formik";
import { DBA } from "../DbaInterface";
import { TabTitle } from "../../../components/widgets/TabTitle";

export const dba_licenses_fieldName = "licensesIDs";
export const dba_licenses_gridName = "DbaLicenseIds";

function DbaLicensesTab() {
	const formik: FormikProps<DBA> = useFormikContext();

	// const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
	const selectedIds: any = useSelector(
		(state: any) => state?.selectableGrid[dba_licenses_gridName]?.selectedIDs
	);
	const resource = `Licenses/available/dbas/selectedBrokerage/${formik.values.brokerageFirmID}`;

	const dispatch = useDispatch();
	const reloadGrid = () => {
		const args2: any = { name: dba_licenses_gridName };
		dispatch(setShowSelectedRows(args2));
	};

	useEffect(() => {
		reloadGrid();
		formik.setFieldValue(dba_licenses_fieldName, selectedIds ?? []);
	}, [JSON.stringify(selectedIds)]);

	return (
		<div className="px-4">
			<TabTitle
				title="Associate Licenses"
				customError={formik.errors[dba_licenses_fieldName]}
			/>
			<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
				{formik.values.brokerageFirmID ? (
					<SelectableGrid
						name={dba_licenses_gridName}
						fieldName={dba_licenses_fieldName}
						columns={columns}
						resource={resource}
						className="m-4"
						preSelectedIDs={formik.values?.[dba_licenses_fieldName] || []}
						orderBy={[{ field: "firstName", direction: "Asc" }]}
						// link={`${resource}/view`}
					/>
				) : (
					<div className="ml-4">Please select a brokerage firm</div>
				)}
			</div>
		</div>
	);
}

export const columns = [
	{
		field: "licenseNumber",
		headerText: "License Number",
		width: 80,
	},
	{
		field: "licenseType.name",
		headerText: "License Type",
		width: 80,
	},
	{
		field: "firstName",
		headerText: "First Name",
		width: 100,
	},
	{
		field: "lastName",
		headerText: "Last Name",
		width: 80,
	},
	{
		field: "licenseStatus.name",
		headerText: "Status",
		width: 80,
	},
];

export default DbaLicensesTab;
