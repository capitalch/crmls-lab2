import { useEffect, useState } from "react";
import { ApplicationCard, NewApplicationCard } from "../../components/widgets/cards/ApplicationCard";
import { ApplicationEntity } from "./DashboardSlice";
import { RoundedSquareBlurbGrid } from "../../components/widgets/SkeletonScreens";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { selectDashPrefs, selectFavoriteApplications } from "../user/selectors";
import { useSelector } from "react-redux";
import { getAudienceApplications } from "../../adapters";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "../../app/hooks";
import { setUserPrefs } from "../user/userPrefsSlice";
import { ApplicationCardFull } from "../../components/widgets/cards/ApplicationCardFull";
import { PlusCircleIcon, TemplateIcon } from "@heroicons/react/solid";
import { showSliderView } from "./sideSliderSlice";
import { rebuildTooltips } from "../../components/settings/theme/ThemeTooltip";

export const FavoriteApps = () => {
	const dispatch = useAppDispatch();
	const [applications, setApplications] = useState<ApplicationEntity[]>([]);
	const [favoriteApps, setFavoriteApps] = useState<ApplicationEntity[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();
	const [appView, setAppView] = useState<string>();
	const userFavorites = useSelector(selectFavoriteApplications);
	const dashboardPrefs = useSelector(selectDashPrefs);

	useEffect(() => {
		setAppView(dashboardPrefs.applications?.view ?? "card");
		rebuildTooltips();
	}, [dashboardPrefs]);

	useEffect(() => {
		rebuildTooltips();
	}, [favoriteApps]);

	useEffect(() => {
		const orderedFavorites: any[] = [];
		userFavorites.forEach((userFavorite: string) => {
			let foundFavorite = applications.find((app) => app.id === userFavorite);
			if (foundFavorite) {
				orderedFavorites.push(foundFavorite);
			}
		});
		setFavoriteApps(orderedFavorites);
	}, [applications, userFavorites]);

	useEffect(() => {
		getAudienceApplications()
			.then((response) => {
				setApplications(response.data.results);
			})
			.then(() => {
				setIsLoading(false);
				rebuildTooltips();
			})
			.catch((e: Error) => setError(e));
	}, []);

	const onDragEnd = (result: any) => {
		// If dragged outside boundary, return
		if (!result.destination) return;

		// reorder the items and store the state in user prefs
		const items = Array.from(favoriteApps);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const orderedFavoriteApps = items.map((item) => item.id);

		setFavoriteApps(items);
		dispatch(
			setUserPrefs({
				key: "applications.favorites",
				value: orderedFavoriteApps,
			})
		);
	};

	const openSidePanel = (panelView: string) => {
		dispatch(
			showSliderView({
				showSlider: true,
				view: panelView,
			})
		);
	};

	const toggleAppView = () => {
		const newAppView = appView === "icon" ? "card" : "icon";

		// Store selected application view to profile
		dispatch(
			setUserPrefs({
				key: "dashboardSettings.applications.view",
				value: newAppView,
			})
		);
		setAppView(newAppView);
	};

	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	return (
		<>
			<div className="absolute top-4 right-4 flex items-end align-center">
				<div data-place="left" data-tip="Change View">
					<TemplateIcon className="h-5 w-5 text-primary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" onClick={toggleAppView} />
				</div>
				<div data-place="left" data-tip="Manage Apps">
					<PlusCircleIcon className="h-5 w-5 text-primary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" onClick={() => openSidePanel("applications")} />
				</div>
			</div>
			<div className="relative mx-auto px-4 sm:px-6 lg:px-12 text-center max-w-md sm:max-w-3xl lg:max-w-full mt-8 sm:mt-0">
				<div>
					{isLoading && (
						<div className="mx-auto w-full grid grid-cols-3 gap-3 sm:flex flex-wrap justify-center items-top">
							{[...Array(10)].map((i, v) => {
								return <RoundedSquareBlurbGrid key={v} />;
							})}
						</div>
					)}
					{!isLoading && favoriteApps.length <= 0 && <NewApplicationCard text="Add Favorite Applications" onClick={() => openSidePanel("applications")} />}
					{!isLoading && favoriteApps.length > 0 && (
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="droppable" direction="horizontal">
								{(provided, snapshot) => (
									<div ref={provided.innerRef} {...provided.droppableProps} className="mx-auto w-full grid grid-cols-3 gap-3 sm:flex flex-wrap justify-center items-top">
										{favoriteApps.map((app, index) => (
											<Draggable key={app.id} draggableId={`draggable-${app.id}`} index={index}>
												{(provided, snapshot) => {
													if (appView === "card") {
														return (
															<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-3">
																<ApplicationCardFull application={app} />
															</div>
														);
													} else {
														return (
															<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-3">
																<ApplicationCard application={app} />
															</div>
														);
													}
												}}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					)}
				</div>
			</div>
		</>
	);
};
