import React, { FC, FunctionComponent, ReactElement } from "react";
import DashNotification from "../../features/notification/DashNotification";

export type containerProps = {
	title?: string;
	subTitle?: string;
	description?: string;
	actions?: FC | ReactElement | null;
	cssClass?: string;
	sideBarOptions?: FC | ReactElement | null;
};

const ContentContainer: FunctionComponent<containerProps> = ({ title, subTitle, description, actions, cssClass, children, sideBarOptions }) => {
	return (
		<>
			<DashNotification />
			<div className="flex w-full mb-32 sm:mb-16 animate-fade">
				<div className="w-full">
					{(title || subTitle || actions) && <div className="border-b sm:flex sm:items-center sm:justify-between p-4 sm:p-6 bg-secondary border-divider">
						<div className="flex-1 min-w-0">
							<h1 className="text-xl font-medium leading-6 text-header" dangerouslySetInnerHTML={{ __html: title ?? '' }} />
							{subTitle && <span className="text-sm text-secondary">{subTitle}</span>}
						</div>
						{actions && <div className="flex justify-between items-center">{actions}</div>}
					</div>}
					<div className={cssClass ?? "max-w-full text-sm text-primary p-4 sm:p-6"}>
						{description && <div className="max-w-4xl mb-4 sm:mb-6 lg:mb-8">{description}</div>}
						<div className="sm:block">
							{children}
						</div>
					</div>
				</div>
				{sideBarOptions ?? ''}
			</div>
		</>
	);
};

export default ContentContainer;
