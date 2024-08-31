import { ColumnDirective, ColumnsDirective } from "@syncfusion/ej2-react-grids";
import { GridComponent } from "@syncfusion/ej2-react-grids/src/grid/grid.component";
import React, { useEffect, useRef } from "react";
import { FormikProps, useFormikContext } from "formik";

const SimpleSFGrid = ({
	columns,
	fieldName,
	formik: propsFormik,
	data: propsData,
}: SimpleSFGridProps) => {
	const gridRef: any = useRef({});
	const contextformik: FormikProps<any> = useFormikContext();
	const formik = propsFormik || contextformik;
	useEffect(() => {
		const data = propsData || formik?.values?.[fieldName || ""];
		if (gridRef && gridRef.current) {
			gridRef.current.dataSource = data;
			gridRef.current.allowPaging = true;
			gridRef.current.pageSize = 20;
		}
	}, [formik?.values?.[fieldName || ""], gridRef, propsData]);

	return (
		<GridComponent
			allowTextWrap={true}
			allowSorting={true}
			style={{ height: "fit-content" }}
			ref={gridRef}
			gridLines="Both"
			allowPaging={true}
			pageSettings={{ pageSize: 15 }}
		>
			<ColumnsDirective>{getColumnsDirective(columns)}</ColumnsDirective>
		</GridComponent>
	);
};

export default SimpleSFGrid;

function getColumnsDirective(columns: GridColumnType[]) {
	let ret: any[] = [];
	ret = columns.map((column: any, index: number) => {
		return (
			<ColumnDirective
				key={column.field}
				field={column.field}
				headerText={column.headerText || ""}
				width={column.width}
				template={column.template}
				type={column.type}
				displayAsCheckBox={column.displayAsCheckBox}
				textAlign="Left"
			/>
		);
	});
	return ret;
}

export type GridColumnType = {
	entityField?: string;
	field: string;
	headerText?: string;
	width?: number;
	textAlign?: string;
	isPrimaryKey?: boolean;
	isIgnoreInSearch?: boolean;
	isIgnoreInPanel?: boolean;
	displayAsCheckBox?: boolean;
	type?: string;
	template?: any;
	visible?: boolean;
	valueAccessor?: (field: string, data: any, column: any) => any;
};

interface SimpleSFGridProps {
	columns: GridColumnType[];
	fieldName?: string;
	formik?: FormikProps<any>;
	data?: any[];
}
