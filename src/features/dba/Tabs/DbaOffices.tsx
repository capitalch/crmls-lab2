import { useDispatch, useSelector } from "react-redux";
import { dba_resource_name } from "../Dbas";
import useGrid from "../../../util/useClearGrid";
import { useEffect } from "react";
import { setShowSelectedRows } from "../../../components/SelectableGrid/SelectableGridSlice";
import { SelectableGrid } from "../../../components/SelectableGrid/SelectableGrid";
import Loader from "../../../components/widgets/Loader";
import { OperationCriterias } from "../../../Interfaces/Criteria";
import { FormikProps, useFormikContext } from "formik";
import { DBA } from "../DbaInterface";
import { useParams } from "react-router";
import { TabTitle } from "../../../components/widgets/TabTitle";

export const dba_offices_fieldName = "officesIDs",
	resource = `offices`;
export const dba_offices_gridName = "DbaOfficeIds";

function DbaOffices() {
	const formik: FormikProps<DBA> = useFormikContext();
	const { id }: any = useParams();
	// const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
	const selectedIds: any = useSelector(
		(state: any) => state?.selectableGrid[dba_offices_gridName]?.selectedIDs
	);

	const dispatch = useDispatch();
	const reloadGrid = () => {
		const args2: any = { name: dba_offices_gridName };
		dispatch(setShowSelectedRows(args2));
	};

	useEffect(() => {
		reloadGrid();
		formik.setFieldValue(dba_offices_fieldName, selectedIds ?? []);
	}, [JSON.stringify(selectedIds)]);

	return (
		<div className="px-4">
			<TabTitle title="Associate Offices" />
			<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
				{formik.values.brokerageFirmID ? (
					<SelectableGrid
						name={dba_offices_gridName}
						fieldName={dba_offices_fieldName}
						columns={columns}
						resource={resource}
						className="m-4"
						preSelectedIDs={formik.values?.[dba_offices_fieldName] || []}
						orderBy={[{ field: "officeCode", direction: "Asc" }]}
						criteria={[
							{
								field: "brokerageFirmID",
								op: OperationCriterias.Equal,
								values: [formik.values.brokerageFirmID],
							},
						]}
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
		field: "name",
		headerText: "Name",
		width: 80,
	},
	{
		field: "officeCode",
		headerText: "Office Code",
		width: 80,
	},
	{
		field: "mainOfficeCode",
		headerText: "Main Office Code",
		isIgnoreInPanel: true,
		width: 100,
	},
	// {
	//     field: 'id',
	//     isPrimaryKey: true,
	//     isIgnoreInPanel:true,
	//     headerText: 'ID',
	//     visible: false,
	// },
	{
		field: "aorName",
		headerText: "AOR",
		entityField: "primaryAor.name",
		width: 80,
		isIgnoreInPanel: true,
		isIgnoreInSearch: true,
	},
	{
		field: "address1",
		width: 80,
		headerText: "Address",
		isIgnoreInPanel: true,
	},
	{
		field: "stateName",
		headerText: "State",
		width: 80,
	},
	{
		field: "city",
		width: 80,
		headerText: "City",
	},
	{
		field: "secondaryContactName",
		entityField: "secondaryContact.firstName",
		headerText: "Primary Contact",
		isIgnoreInSearch: true,
		isIgnoreInPanel: true,
	},
];

export default DbaOffices;
