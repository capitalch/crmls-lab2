import {
	ColumnDirective,
	ColumnsDirective,
	GridComponent,
	Inject,
	Resize,
} from "@syncfusion/ej2-react-grids";
import React, { useEffect, useRef } from "react";

function SimpleGrid({ data, columns }: SimpleGridType) {
	const gridRef: any = useRef({});

	useEffect(() => {
		if (gridRef?.current) {
			gridRef.current.dataSource = data;
		}
	});

	return (
		<div className="border-l-1">
			<GridComponent
				gridLines="Both"
				allowResizing={true}
				dataSource={data}
				ref={gridRef}
			>
				<ColumnsDirective>{getColumnsDirective()}</ColumnsDirective>

				<Inject services={[Resize]} />
			</GridComponent>
		</div>
	);

	function getColumnsDirective() {
		let ret: any[] = columns.map((col: SimpleGridColumnType, index: number) => {
			return (
				<ColumnDirective
					key={index + 1}
					headerText={col.headerText}
					field={col.field}
					width={col.width}
					template={col.template}
				/>
			);
		});
		return ret;
	}
}
export { SimpleGrid };

type SimpleGridType = {
	columns: SimpleGridColumnType[];
	data: any[];
};

type SimpleGridColumnType = {
	field: string;
	headerText?: string;
	entityField?: string;
	width?: number;
	textAlign?: string;
	template?: React.FC<any>;
};
