import dayjs from "dayjs";
import React, { FC } from "react";

const DateTemplate: FC = (props: any) => {
	let value = props[props.column.field]; // this will be the actual value of the column
	if (value) {
		return <span>{dayjs(value).format("MMM D, YYYY hh:mm A")}</span>;
	}
	return <span></span>;
};

export default DateTemplate;
