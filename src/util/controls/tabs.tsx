import React, { ReactElement, useEffect, useState } from "react";
import { FormikProvider } from "formik";
import { useParams } from "react-router";

interface Props {
	tabs: (Tab | null)[];
	children: ReactElement<any, any>[] | ReactElement<any, any>;
	formik: any;
	errorFields?: (string | undefined)[];
	className?: string;
}
export interface Tab {
	name: string;
	id?: string;
	required?: boolean;
	keepMounted?: boolean;
}

const SimpleTabs = ({
	tabs,
	children,
	formik,
	errorFields,
	className,
}: Props) => {
	const [selectedTabName, setSelectedTabName] = useState(tabs[0]?.name);

	const tabChildren = Array.isArray(children) ? children : [children];
	const { id }: any = useParams();

	const handleTabClick = (name: string) => {
		setSelectedTabName(name);
	};

	// Set the first tab as selected tab, on component mount or when new record is opened
	useEffect(() => {
		setSelectedTabName(tabs?.[0]?.name);
	}, [id]);

	return (
		<div className="crmls-tabs">
			<ul className={className || "crmls-tab-list mb-4"} role="tablist">
				{tabs.map((tab, index) => {
					if (!tab) return <></>;
					const tabHasError =
						(tab && tab?.id && formik.errors[tab?.id]) ||
						(errorFields && errorFields.includes(tab.id));
					return (
						<li
							role="presentation"
							className={`crmls-tab ${
								selectedTabName === tab.name ? "active" : ""
							}`}
							key={tab.name}
							onClick={() => handleTabClick(tab.name)}
						>
							<a className={`${tabHasError ? "text-red-400" : ""}`}>
								{tab.name}
							</a>
						</li>
					);
				})}
			</ul>
			<div className="tab-content">
				{tabChildren.map((child, index) => {
					if (!child) return <></>;
					return (
						<div
							// role="tabpanel"
							style={{
								display:
									selectedTabName === tabs[index]?.name ? "block" : "none",
							}}
							id={tabs[index]?.name}
							key={tabs[index]?.name}
						>
							{/* Tab tabs by default would mount and unmount a component
                  But if keepMounted is true then the component would stay hidden but mounted
              */}
							{(selectedTabName === tabs[index]?.name ||
								tabs[index]?.keepMounted) && (
								<div className="portlet-box portlet-fullHeight mb-30">
									<FormikProvider value={formik}>
										{React.cloneElement(child, { formik })}
									</FormikProvider>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SimpleTabs;
