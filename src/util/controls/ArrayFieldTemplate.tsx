import React, { FC } from "react";

const ArrayFieldTemplate: FC = (props: any) => {
	let values: string[] = props[props.column.field]; // this will be the actual value of the column
	if (values) {
		return <span>{values.join(", ")}</span>;
	}
	return <span></span>;
};

export default ArrayFieldTemplate;
