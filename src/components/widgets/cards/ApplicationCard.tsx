import { StarIcon } from "@heroicons/react/solid";
import { ApplicationCardEntity, ApplicationEntity } from "../../../features/dashboard/DashboardSlice";
import { PlusSmIcon, TemplateIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectFavoriteApplications } from "../../../features/user/selectors";
import { setUserPrefs } from "../../../features/user/userPrefsSlice";
import { useAppDispatch } from "../../../app/hooks";
import { show } from "../../../features/notification/notificationSlice";

export const NewApplicationCard = ({ text, onClick }: { text: string; onClick: () => void }) => {
	return (
		<div className="text-center w-full mx-auto">
			<div className="w-16 h-16 flex-shrink-0 mx-auto rounded-full bg-secondary opacity-100 hover:opacity-80 text-secondary flex justify-center items-center cursor-pointer" onClick={onClick}>
				<PlusSmIcon className="h-6 w-6" aria-hidden="true" />
			</div>
			<p className="mt-2 text-md text-sm text-gray-600 tracking-tight text-center">{text}</p>
		</div>
	);
};

export const ApplicationCard = ({ application, showFavorite }: ApplicationCardEntity) => {
	const dispatch = useAppDispatch();
	const userFavorites = useSelector(selectFavoriteApplications);

	const toggleFavorite = (application: ApplicationEntity) => {
		let newFavorites;
		if (userFavorites.includes(application.id)) {
			newFavorites = [...userFavorites].filter((fav) => fav !== application.id);
		} else {
			newFavorites = [...userFavorites, application.id];
		}
		dispatch(
			setUserPrefs({
				key: "applications.favorites",
				value: newFavorites,
			})
		);
	};

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
			<div className="flex flex-col items-center flex-shrink-0" data-tip={`<p class="text-md font-semibold">${application.name}</p>${application.hoverText ? '<p class="text-xs">' + application.hoverText + "</p>" : ""}`}>
				{application.iconUrl ? (
					<div className={`w-16 h-16 cursor-pointer rounded-xl ${application.mlsSystem ? "bg-crmls-blue bg-opacity-20 border border-2 border-header" : "bg-white bg-opacity-10"} shadow-md flex justify-center items-center overflow-hidden relative app-card-${application.applicationCategory?.toLowerCase() ?? "none"}`} onClick={() => handleAppClick(application)}>
						<img className="w-12 h-12" src={application.iconUrl} alt={application.name ?? "app-image"} />
					</div>
				) : (
					<div className={`w-16 h-16 flex-shrink-0 mx-auto bg-header bg-opacity-50 text-inverse flex justify-center items-center cursor-pointer rounded-xl overflow-hidden relative app-card-${application.applicationCategory?.toLowerCase() ?? "none"}`} onClick={() => handleAppClick(application)}>
						<TemplateIcon className="h-6 w-6" aria-hidden="true" />
					</div>
				)}
				{showFavorite ? (
					<>
						<p className="mt-2 text-xs text-primary tracking-tight text-center text-wrap">{application.name}</p>
						<div className="flex justify-center items-center mt-0">
							<StarIcon
								className={`w-6 h-6 cursor-pointer ${userFavorites.includes(application.id) ? "text-yellow-400" : "text-gray-200"}`}
								onClick={() => toggleFavorite(application)}
								data-tip={userFavorites.includes(application.id) ? "Remove from favorites" : "Add to favorites"}
								data-type="dark"
							/>
						</div>
					</>
				) : (
					<p className="mt-2 text-xs text-primary tracking-tight text-center block xl:hidden text-wrap">{application.name}</p>
				)}
			</div>
		</>
	);
};
