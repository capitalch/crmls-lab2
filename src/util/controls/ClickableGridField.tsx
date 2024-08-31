import React, { ReactElement } from "react";

const ClickableRecord = ({
	details,
	onClick,
	children,
}: {
	details: any;
	onClick: (details: any) => void;
	children?: ReactElement<any, any>;
}) => {
	return (
		<a
			onClick={() => onClick(details)}
			className="cursor-pointer hover:text-crmls-blue"
		>
			{children ? children : details[details.column.field]}
		</a>
	);
};

export default ClickableRecord;
