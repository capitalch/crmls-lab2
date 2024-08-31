import { ApplicationCardEntity, ApplicationEntity } from "../../../features/dashboard/DashboardSlice";
import { TemplateIcon } from "@heroicons/react/outline";
import { useAppDispatch } from "../../../app/hooks";
import { show } from "../../../features/notification/notificationSlice";

export const ApplicationCardFull = ({ application }: ApplicationCardEntity) => {
	const dispatch = useAppDispatch();

	const handleAppClick = (application: ApplicationEntity) => {
		if (application.url) {
			window.open(application.url, "_blank");
		} else {
			dispatch(
				show({
					show: true,
					title: "No Application URL",
					message: `No application URL found for ${application.name}`,
					status: "error",
					position: "popover",
					autoHide: false,
					confirm: false,
					notificationId: null,
				})
			);
		}
	};

	return (
		<>
			<div className="flex flex-col flex-shrink-0" data-tip={`<p class="text-md font-semibold">${application.name}</p>${(application.hoverText) ? '<p class="text-xs">' + application.hoverText + '</p>' : ''}`}>
				{application.iconUrl ? (
					<>
						<div className={`p-0 sm:px-3 sm:py-2 cursor-pointer rounded-xl shadow-md border border-divider flex items-center justify-center sm:justify-start w-16 sm:w-64 h-16 ${application.mlsSystem ? "bg-crmls-blue bg-opacity-20 border border-2 border-header" : "bg-white bg-opacity-10"} overflow-hidden relative app-card-${application.isNew ? "new" : application.applicationCategory?.toLowerCase() ?? "none"}`} onClick={() => handleAppClick(application)}>
							<img className="w-12 h-12" src={application.iconUrl} alt={application.name ?? "app-image"} />
							<div className="ml-4 text-sm lg:text-md text-left hidden sm:block">{application.name}</div>
						</div>
					</>
				) : (
					<>
						<div className={`p-0 sm:px-3 sm:py-2 cursor-pointer rounded-xl shadow-md border border-divider flex items-center justify-center sm:justify-start w-16 sm:w-64 h-16 bg-header bg-opacity-50 text-inverse overflow-hidden relative app-card-${application.isNew ? "new" : application.applicationCategory?.toLowerCase() ?? "none"}`} onClick={() => handleAppClick(application)}>
							<TemplateIcon className="h-12 w-12" aria-hidden="true" />
							<div className="ml-4 text-sm lg:text-md text-left hidden sm:block">{application.name}</div>
						</div>
					</>
				)}
				<p className="mt-2 text-sm text-primary tracking-tight text-center block sm:hidden w-16 sm:w-64 h-16">{application.name}</p>
			</div>
		</>
	);
};
