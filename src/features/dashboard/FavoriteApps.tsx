import { useEffect, useState } from "react";
import { ApplicationCard, NewApplicationCard } from "../../components/widgets/cards/ApplicationCard";
import { ApplicationEntity } from "./DashboardSlice";
import { RoundedSquareBlurbGrid } from "../../components/widgets/SkeletonScreens";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { selectDashPrefs, selectFavoriteApplications } from "../user/selectors";
import { useSelector } from "react-redux";
import { getAudienceApplications } from "../../adapters";
<<<<<<< HEAD
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "../../app/hooks";
=======
import { DragDropContext, Droppable, Draggable, DraggableLocation } from "react-beautiful-dnd";
import { useAppDispatch, useWindowSize } from "../../app/hooks";
>>>>>>> dev-1
import { setUserPrefs } from "../user/userPrefsSlice";
import { ApplicationCardFull } from "../../components/widgets/cards/ApplicationCardFull";
import { PlusCircleIcon, TemplateIcon } from "@heroicons/react/solid";
import { showSliderView } from "./sideSliderSlice";
<<<<<<< HEAD
import { rebuildTooltips } from "../../components/settings/theme/ThemeTooltip";
=======
import { hideTooltips, rebuildTooltips } from "../../components/settings/theme/ThemeTooltip";
import dayjs from "dayjs";
import { newAppDateCheck } from "./DashboardOptions";

export type AppMap = { [key: string]: ApplicationEntity[] };
export interface ListProps {
	apps: ApplicationEntity[];
	listId: string;
	listType?: string;
	internalScroll?: boolean;
	isCombineEnabled?: boolean;
}
>>>>>>> dev-1

export const FavoriteApps = () => {
	const dispatch = useAppDispatch();
	const [applications, setApplications] = useState<ApplicationEntity[]>([]);
	const [favoriteApps, setFavoriteApps] = useState<ApplicationEntity[]>([]);
<<<<<<< HEAD
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();
	const [appView, setAppView] = useState<string>();
	const userFavorites = useSelector(selectFavoriteApplications);
	const dashboardPrefs = useSelector(selectDashPrefs);
=======
	const [appRows, setAppRows] = useState<AppMap>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();
	const [appView, setAppView] = useState<string>();
	const [hasNewApps, setHasNewApps] = useState<boolean>(false);
	const [showPing, setShowPing] = useState<boolean>(true);
	const userFavorites = useSelector(selectFavoriteApplications);
	const dashboardPrefs = useSelector(selectDashPrefs);
	const windowSize = useWindowSize();
>>>>>>> dev-1

	useEffect(() => {
		setAppView(dashboardPrefs.applications?.view ?? "card");
		rebuildTooltips();
	}, [dashboardPrefs]);

	useEffect(() => {
		rebuildTooltips();
<<<<<<< HEAD
	}, [favoriteApps]);

	useEffect(() => {
=======
	}, [appRows]);

	useEffect(() => {
		if (hasNewApps) {
			setShowPing(true);
			setTimeout(() => {
				setShowPing(false);
			}, 5000);
		}
	}, [hasNewApps]);

	useEffect(() => {
		let newApps = applications.filter((app) => app.isNew);

>>>>>>> dev-1
		const orderedFavorites: any[] = [];
		userFavorites.forEach((userFavorite: string) => {
			let foundFavorite = applications.find((app) => app.id === userFavorite);
			if (foundFavorite) {
<<<<<<< HEAD
				orderedFavorites.push(foundFavorite);
			}
		});
=======
				newApps = newApps.filter((app) => app.id !== foundFavorite?.id);
				orderedFavorites.push(foundFavorite);
			}
		});
		setHasNewApps(newApps.length > 0);
>>>>>>> dev-1
		setFavoriteApps(orderedFavorites);
	}, [applications, userFavorites]);

	useEffect(() => {
<<<<<<< HEAD
		getAudienceApplications()
			.then((response) => {
=======
		if (favoriteApps.length > 0) {
			const appContainerWidth = document.getElementById("applications-target")?.offsetWidth ?? 0;
			const appWidth = appView === "card" && windowSize.width !== undefined && windowSize.width > 640 ? 350 : windowSize.width !== undefined && (windowSize.width > 1280 || windowSize.width < 490) ? 100 : 150;

			const perRowCount = Math.floor(appContainerWidth / appWidth);
			const rowCount = Math.ceil(favoriteApps.length / perRowCount);

			const appMap: AppMap = {};
			for (let i = 0; i < rowCount; i++) {
				appMap[String.fromCharCode(97 + i)] = favoriteApps.slice(i * perRowCount, (i + 1) * perRowCount);
			}
			setAppRows(appMap);
		}
	}, [favoriteApps, windowSize, appView]);

	useEffect(() => {
		getAudienceApplications()
			.then((response) => {
				response.data.results.map((app: ApplicationEntity) => (app.isNew = dayjs(app.createdOn).isAfter(newAppDateCheck)));
>>>>>>> dev-1
				setApplications(response.data.results);
			})
			.then(() => {
				setIsLoading(false);
				rebuildTooltips();
			})
			.catch((e: Error) => setError(e));
	}, []);

<<<<<<< HEAD
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

=======
>>>>>>> dev-1
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
<<<<<<< HEAD
		setAppView(newAppView);
	};

=======
		hideTooltips();
		setAppView(newAppView);
	};

	// Seperate droppable zones for each row - this is a workaround for the horizontal drag and drop
	const AppList: React.FC<ListProps> = ({ listId, listType, apps }) => {
		return (
			<Droppable droppableId={listId} type={listType} direction="horizontal" isCombineEnabled={false}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps} className="mx-auto w-full grid grid-cols-3 gap-3 sm:flex flex-wrap justify-center items-top">
						{apps.map((app, index) => (
							<Draggable key={app.id} draggableId={`draggable-${app.id}`} index={index}>
								{(provided) => {
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
		);
	};

	// a little function to help us with reordering the result
	const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	// Moves an item from one list to another list.
	const reorderApps = (apps: AppMap, source: DraggableLocation, destination: DraggableLocation) => {
		const current = [...apps[source.droppableId]];
		const next = [...apps[destination.droppableId]];
		const target = current[source.index];
		let newOrdered: AppMap;

		if (source.droppableId === destination.droppableId) {
			// moving to same horizontal list
			const reordered = reorder(current, source.index, destination.index);

			newOrdered = {
				...apps,
				[source.droppableId]: reordered,
			};
		} else {
			// moving to different row/horizontal list
			// remove from original
			current.splice(source.index, 1);
			// insert into next
			next.splice(destination.index, 0, target);

			newOrdered = {
				...apps,
				[source.droppableId]: current,
				[destination.droppableId]: next,
			};
		}

		const newOrderedFavorites = [];
		for (const [key, value] of Object.entries(newOrdered)) {
			newOrderedFavorites.push(...value);
		}
		const orderedFavoriteApps = newOrderedFavorites.map((item) => item.id);

		setFavoriteApps(newOrderedFavorites);
		dispatch(
			setUserPrefs({
				key: "applications.favorites",
				value: orderedFavoriteApps,
			})
		);
		return;
	};

>>>>>>> dev-1
	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	return (
		<>
			<div className="absolute top-4 right-4 flex items-end align-center">
				<div data-place="left" data-tip="Change View">
					<TemplateIcon className="h-5 w-5 text-primary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" onClick={toggleAppView} />
				</div>
<<<<<<< HEAD
				<div data-place="left" data-tip="Manage Apps">
					<PlusCircleIcon className="h-5 w-5 text-primary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" onClick={() => openSidePanel("applications")} />
=======
				<div data-place="left" data-tip={`Manage Apps${hasNewApps ? "<br /><span class='italic font-medium'>New Apps Available!</span>" : ""}`} className="relative h-5 w-5 cursor-pointer" onClick={() => openSidePanel("applications")}>
					<PlusCircleIcon className={`absolute h-full w-full ${hasNewApps ? "text-red-500" : "text-primary"} hover:opacity-80 focus:outline-none focus:ring-0`} />
					{hasNewApps && showPing && <span className={`animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-100`}></span>}
>>>>>>> dev-1
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
<<<<<<< HEAD
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
=======
						<DragDropContext
							onDragEnd={({ destination, source }) => {
								// If dragged outside boundary, return
								if (!destination) return;
								if (appRows) {
									reorderApps(appRows, source, destination);
								}
							}}
						>
							{appRows && Object.entries(appRows).map(([k, v]) => <AppList key={k} listId={k} listType="CARD" apps={v} />)}
>>>>>>> dev-1
						</DragDropContext>
					)}
				</div>
			</div>
		</>
	);
};
