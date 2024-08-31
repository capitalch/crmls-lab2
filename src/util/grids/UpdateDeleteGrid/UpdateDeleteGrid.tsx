import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SimpleSFGrid, { GridColumnType } from "../SimpleSyncGrid/SimpleSFGrid";
import { FormikProps, useFormikContext } from "formik";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import { GRID_ACTION_TYPES } from "../constants/UpdateDeleteGridConstant";
import {
	generateGUIDForNewRecord,
	generateRandomNumberWithCurrentTime,
} from "../../helpers";
import { isEqual } from "lodash";

/**UpdateAndDeleteGrid is to be wrapped with a formik provider or a formik prop*/
const UpdateDeleteGrid = ({
	fieldName,
	columns,
	Form,
	id,
	formik: propFormik,
	newIdType,
	isReadOnly,
}: UpdateDeleteGridProps) => {
	const formikContext: FormikProps<any> = useFormikContext();
	const formik: FormikProps<any> = propFormik || formikContext;
	const records = formik.values?.[fieldName] || [];
	const [currentRecord, setCurrentRecord] = useState({});
	const [allRecords, setAllRecords] = useState([...records]);

	//if id is not provided "id" field would be used as primary identifier
	const primaryIdentifier = id || "id";

	useEffect(() => {
		const alreadyInSync = isEqual(records, allRecords);
		!alreadyInSync && formik?.setFieldValue(fieldName, allRecords);
	}, [allRecords]);

	useEffect(() => {
		const alreadyInSync = isEqual(records, allRecords);
		!alreadyInSync && setAllRecords(records);
	}, [formik.values?.[fieldName]]);

	const columnsWithControls = addControlButtonsToColumns(columns);
	return (
		<div className="flex p-3 flex-col lg:flex-row pt-5">
			{!isReadOnly && (
				<Form
					currentRecord={currentRecord}
					setCurrentRecord={setCurrentRecord}
					allRecords={allRecords}
					onAddOrUpdate={onAddOrUpdate}
					setAllRecords={setAllRecords}
					id={primaryIdentifier}
				/>
			)}
			<SimpleSFGrid
				fieldName={fieldName}
				columns={!isReadOnly ? columnsWithControls : columns}
			/>
		</div>
	);

	function deleteRecord(record: any) {
		setAllRecords((previousRecords) =>
			previousRecords.filter(
				(prevRecord) =>
					!(prevRecord?.[primaryIdentifier] === record?.[primaryIdentifier])
			)
		);
		setCurrentRecord({});
	}

	function onAddOrUpdate({ type, record }: { type: string; record: any }) {
		switch (type) {
			case GRID_ACTION_TYPES.update:
				return updateRecord(record);
			case GRID_ACTION_TYPES.add:
				return addRecord(record);
		}
	}

	function onClickUpdateOrDelete(type: string, record: any) {
		switch (type) {
			case GRID_ACTION_TYPES.update:
				return updateClicked(record);
			case GRID_ACTION_TYPES.delete:
				return deleteRecord(record);
		}
	}

	function updateClicked(record: any) {
		setCurrentRecord({ ...record, mode: GRID_ACTION_TYPES.update });
	}

	function updateRecord(record: any) {
		setAllRecords((previousRecords) => {
			const newRecords = previousRecords.map((prevRec) =>
				prevRec?.[primaryIdentifier] === record?.[primaryIdentifier]
					? record
					: prevRec
			);
			return newRecords;
		});
	}

	function addRecord(record: any) {
		const newRecord = {
			...record,
			isNew: true,
			[primaryIdentifier]:
				record[primaryIdentifier] ||
				(newIdType === "Number"
					? generateRandomNumberWithCurrentTime()
					: generateGUIDForNewRecord()),
		};
		setAllRecords((previousRecords) => {
			return [...previousRecords, newRecord];
		});
	}

	function addControlButtonsToColumns(
		columns: GridColumnType[]
	): GridColumnType[] {
		return [
			{
				field: "sl",
				headerText: "#",
				width: 30,
				template: (props: any) => <div>{Number(props.index) + 1}</div>,
			},
			...columns,
			{
				field: "control buttons",
				headerText: "",
				template: (props: any) => {
					return (
						<div>
							<UpdateButton
								onClick={() =>
									onClickUpdateOrDelete(GRID_ACTION_TYPES.update, props)
								}
							/>
							<DeleteButton
								onClick={() =>
									onClickUpdateOrDelete(GRID_ACTION_TYPES.delete, props)
								}
							/>
						</div>
					);
				},
				width: 80,
			},
		];
	}
};

export default UpdateDeleteGrid;

export interface UpdateDeleteGridColumnType extends GridColumnType {}

export interface UpdateDeleteGridProps {
	Form: ({
		currentRecord,
		setCurrentRecord,
		allRecords,
		onAddOrUpdate,
	}: UpdateDeleteFormProps) => React.JSX.Element;
	/**fieldName is the name of the field where all the data of grid would be assigned to */
	fieldName: string;
	columns: GridColumnType[];
	id?: string;
	formik?: FormikProps<any>;
	newIdType?: "GUID" | "Number";
	isReadOnly?: boolean;
}

export interface UpdateDeleteFormProps {
	/** It is the record that is being updated or deleted */
	currentRecord: any;
	/** All records that are available in the right grid */
	allRecords: any[];
	/**Can be used to set the right grid data */
	setAllRecords: Dispatch<SetStateAction<any[]>>;
	/**Use this method to sync the currentRecord with the formik changes */
	/**within a useEffect with the formik.values as a dependency */
	setCurrentRecord: Dispatch<SetStateAction<any>>;
	/** This function just jas to be passed the FormControl component */
	onAddOrUpdate: GridAddOrUpdateEvent;
	/** Using the id prop is optional, it is made available for convinience.
	 * It is the same key that you pass to UpdateAndDeleteGrid.
	 * One can use directly the primary identifier field.
	 * If id is not provided "id" field would be used as primary identifier.
	 */
	id: string;
}

export type GridAddOrUpdateEvent = ({
	type,
	record,
}: {
	type: string;
	record: any;
}) => void;
