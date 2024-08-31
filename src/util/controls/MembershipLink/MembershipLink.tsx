import { ReactElement } from "react";
import { Link } from "react-router-dom";

const MembershipLink = ({
	resource,
	details,
	redirectField,
	children,
}: {
	resource: string;
	details: any;
	redirectField?: string;
	children?: ReactElement<any, any>;
}) => {
	return (
		<Link
			to={`/${resource}/edit/${
				redirectField ? details?.[redirectField || ""] : details.id
			}`}
			style={{ color: "initial" }}
			onMouseEnter={(e) => {
				e.currentTarget.style.color = "blue";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.color = "initial";
			}}
		>
			{children ? children : details[details.column.field]}
		</Link>
	);
};

export default MembershipLink;

export const addLinkToColumns = (columns: any[], resource: string) => {
	return columns.map((col) => {
		return {
			...col,
			template: (props: any) => (
				<MembershipLink resource={resource} details={props} />
			),
		};
	});
};
