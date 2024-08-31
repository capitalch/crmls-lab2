import { CogIcon, EyeIcon, EyeOffIcon, LockClosedIcon, PlusCircleIcon, PresentationChartBarIcon, RefreshIcon, SelectorIcon, TemplateIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SlidePanel from "../../components/content/SlidePanel";
import { ApplicationCard } from "../../components/widgets/cards/ApplicationCard";
import { ApplicationEntity, KpiEntity } from "../dashboard/DashboardSlice";
import { formattedProfile, selectDashPrefs, userProfile } from "../user/selectors";
import { setUserPrefs } from "../user/userPrefsSlice";
import { getAudienceApplications, getGenericContainers, getKpis } from "../../adapters";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ThemeToggle from "../../components/settings/theme/ThemeToggle";
import { selectSlider, showSliderView } from "../../features/dashboard/sideSliderSlice";
import Loader from "../../components/widgets/Loader";
import { NavLink } from "react-router-dom";
import { hideTooltips, rebuildTooltips } from "../../components/settings/theme/ThemeTooltip";
import { BillboardSectionConfig } from "../ads/AdContainer";
import { selectAllAds } from "../ads/adsSlice";
import dayjs from "dayjs";

export const newAppDateCheck = dayjs().subtract(30, "day");

function DashboardOptions() {
	const allAds = useSelector(selectAllAds);
	const dispatch = useAppDispatch();
	let userFormattedProfile = useSelector(formattedProfile);
	const [sidebarContent, setSidebarContent] = useState<any>();
	const [sidebarTitle, setSidebarTitle] = useState<any>();
	const [updatedCount, setUpdatedCount] = useState<number>(0);
	const [activePanel, setActivePanel] = useState<string>();
	const dashboardPrefs = useSelector(selectDashPrefs);
	const [dashSections, setDashSections] = useState<any[]>([]);
	const [kpis, setKpis] = useState<any[]>([]);
	const currentSlider = useAppSelector(selectSlider);
	const [sections, setSections] = useState<any[]>([]);
	const [kpiSections, setKpiSections] = useState<any[]>([]);
	const [staticSections, setStaticSections] = useState<any[]>([]);
	const profile = useSelector(userProfile);

	useEffect(() => {
		if (staticSections.length) {
			getGenericContainers()
				.then((response) => {
					setSections([...staticSections, ...response.data.results]);
				})
				.catch((e: Error) => console.error(e));

			getKpis()
				.then((response) => {
					setKpis(response.data.results);
				})
				.catch((e: Error) => console.error(e));
		}
	}, [staticSections]);

	useEffect(() => {
		if (currentSlider && currentSlider.view) {
			const currentPanel = sectionOptions.find((panel) => panel.view === currentSlider.view);
			if (currentPanel) {
				setActivePanel(currentPanel.view);
			}
		}
	}, [currentSlider]);

	const onSectionDragEnd = (result: any) => {
		// If dragged outside boundary, return
		if (!result.destination) return;

		// reorder the items and store the state in user
		const items = Array.from(dashSections);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		dashSections.forEach((section) => {
			const prefKey = `dashboardSettings.${section.id}.order`;
			const newOrder = items.findIndex((x: any) => x.id === section.id) + 1;
			dispatch(
				setUserPrefs({
					key: prefKey,
					value: newOrder,
				})
			);
		});
	};

	const onDragKpiEnd = (result: any) => {
		// If dragged outside boundary, return
		if (!result.destination) return;

		// reorder the items and store the state in user
		const items = Array.from(kpiSections);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		kpiSections.forEach((kpi) => {
			const prefKey = `dashboardSettings.kpis.${kpi.kpiDefinitionID}.order`;
			const newOrder = items.findIndex((x: any) => x.kpiDefinitionID === kpi.kpiDefinitionID) + 1;
			dispatch(
				setUserPrefs({
					key: prefKey,
					value: newOrder,
				})
			);
		});
	};

	useEffect(() => {
		if (allAds.length > 0) {
			const adsResponse = allAds[0];
			const dashboardAd = adsResponse.impressions.find((impression: any) => impression.tagName === "dashboard-billboard");
			const spotlightAd = adsResponse.impressions.find((impression: any) => impression.tagName === "spotlight-ad");

			let tmpStaticSections: any[] = adsResponse?.isEnabled && (dashboardAd?.isEnabled || spotlightAd?.isEnabled) ? BillboardSectionConfig() : [];
			tmpStaticSections = [
				...tmpStaticSections,
				...[
					{
						id: "applications",
						name: "User Applications",
						description: "The User Applications section will display all default or favorite applications. You may add or remove favorite applications for easy access, and arrange in custom order.",
					},
					{
						id: "analytics",
						name: "Market Statistics",
						description: "The Market Statistics section shows relevant KPIs to get a quick overview of statistics. You may configure statistics in the Market Statistics configuration panel.",
					},
					{
						id: "articles",
						name: "Articles",
						description: "The Articles section will display relevant articles for your convenience. After reading articles, they will be marked as read but can be marked as unread for future use.",
					},
				],
			];

			// GSMLS work around - hide analytics if user belongs to SWL
			if (['SWL'].includes(profile.originatingSystemID)) {
				tmpStaticSections = tmpStaticSections.filter((section) => section.id !== "analytics");
			}
			setStaticSections(tmpStaticSections);
		}
	}, [allAds]);

	useEffect(() => {
		if (dashboardPrefs) {
			const dashSections: any[] = [];
			let sectionOrder = 1;
			sections.forEach((section: any) => {
				let sectionConfig = dashboardPrefs[section.id];

				dashSections.push({
					id: section.id,
					name: section.name,
					description: section.description ?? "No description",
					locked: section.locked ?? false,
					show: sectionConfig?.show ?? true,
					order: sectionConfig?.order ?? sectionOrder,
				});
				sectionOrder++;
			});
			setDashSections(dashSections);

			const kpiDisplay: any[] = [];
			let kpiOrder = 1;
			kpis.forEach((kpi: KpiEntity) => {
				let kpiConfig = dashboardPrefs?.kpis && dashboardPrefs?.kpis[kpi.kpiDefinitionID] ? dashboardPrefs?.kpis[kpi.kpiDefinitionID] : null;
				kpiDisplay.push({
					kpiDefinitionID: kpi.kpiDefinitionID,
					title: kpi.title,
					description: kpi.description,
					show: kpiConfig?.show ?? true,
					order: kpiConfig?.order ?? kpi.viewOrder ?? kpiOrder,
				});
				kpiOrder++;
			});
			setKpiSections(kpiDisplay);
			setUpdatedCount(updatedCount + 1);
		}
	}, [dashboardPrefs, kpis, sections]);

	useEffect(() => {
		switch (activePanel) {
			case "settings":
				setSidebarTitle("More Options");
				setSidebarContent(
					<div className="absolute inset-0 px-4 sm:px-6 p-4">
						<div className="w-full align-left relative mt-4">
							<RefreshIcon className="absolute top-2 right-2 h-5 w-5 cursor-pointer z-9" aria-hidden={true} onClick={() => resetDashboardPrefs()} />
							<h2 className="text-lg">Dashboard Configuration</h2>
							<p className="text-sm pb-2">Manage your dashboard preferences. Drag and drop sections to change order or hide/show sections using the 'eye' icon to the right of each section. To restore defaults, click the refresh icon in the upper right.</p>
							<DragDropContext onDragEnd={onSectionDragEnd}>
								<Droppable droppableId="droppable">
									{(provided) => (
										<div {...provided.droppableProps} ref={provided.innerRef}>
											{dashSections
												.sort((a, b) => a.order - b.order)
												.map((section: any, index) => {
													return section.locked ? (
														<div key={section.id} className="relative bg-secondary text-secondary p-4 rounded-lg my-3 focus-visible:outline-none">
															<div className="flex">
																<div className="px-4 w-full">
																	<h3 className="text-sm font-medium">
																		{/* Extend touch target to entire panel */}
																		<span className="absolute inset-0" aria-hidden="true" />
																		{section.name}
																	</h3>
																	<p className="text-sm">{section.description}</p>
																</div>
																<div className="flex flex-col items-center justify-center z-10">
																	<LockClosedIcon className="h-4 w-4" aria-hidden={true} />
																</div>
															</div>
														</div>
													) : (
														<Draggable key={section.id} draggableId={section.id} index={index}>
															{(provided) => (
																<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onMouseDown={(e) => e.currentTarget.focus()} className="relative bg-secondary text-secondary p-4 rounded-lg my-3 focus-visible:outline-none">
																	<div className="flex">
																		<div className="flex items-center justify-center">
																			<SelectorIcon className="h-5 w-5" aria-hidden={true} />
																		</div>
																		<div className="px-4 w-full">
																			<h3 className="text-sm font-medium">
																				{/* Extend touch target to entire panel */}
																				<span className="absolute inset-0" aria-hidden="true" />
																				{section.name}
																			</h3>
																			<p className="text-sm">{section.description}</p>
																		</div>
																		<div className="flex flex-col items-center justify-center z-10">
																			<div data-tip={`${section.show === true ? "Hide" : "Show"} Section`} onClick={() => hideTooltips()}><SectionShowIcon section={section} /></div>
																		</div>
																	</div>
																</div>
															)}
														</Draggable>
													);
												})}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						</div>
					</div>
				);
				break;
			case "applications":
				setSidebarTitle("User Applications");
				setSidebarContent(<Loader />);
				getAudienceApplications().then((response) => {
					const appResults = response.data.results;
					const applications = appResults;

					// Filter by application category (core, aor, broker, or marketplace)
					const memberApps = appResults.filter((app: ApplicationEntity) => app.applicationCategory?.toLowerCase() === "member");
					const aorApps = appResults.filter((app: ApplicationEntity) => app.applicationCategory?.toLowerCase() === "aor");
					const brokerApps = appResults.filter((app: ApplicationEntity) => app.applicationCategory?.toLowerCase() === "broker");
					const marketplaceApps = appResults.filter((app: ApplicationEntity) => app.applicationCategory?.toLowerCase() === "marketplace");
					appResults.map((app: ApplicationEntity) => (app.isNew = dayjs(app.createdOn).isAfter(newAppDateCheck)));

					if (applications.length > 0) {
						setSidebarContent(
							<div className="absolute inset-0">
								<div className="bg-secondary text-secondary p-3 px-6 w-full border-b border-divider">
									<span className="text-lg">Core Products</span> (available at no additional cost)
								</div>
								{memberApps.length > 0 && (
									<div className="p-4 mx-auto w-full grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 py-4 pt-6 gap-3">
										{memberApps.map((app: ApplicationEntity) => (
											<ApplicationCard key={app.id} application={app} showFavorite={true} />
										))}
									</div>
								)}
								{memberApps.length <= 0 && (
									<div className="flex justify-center m-4">
										<div className="flex flex-col justify-center items-center">
											<TemplateIcon className="h-16 w-16 text-primary" />
											<p className="text-md text-primary">No Core Products Found</p>
										</div>
									</div>
								)}
								{aorApps.length > 0 && (
									<>
										<div className="bg-secondary text-secondary p-3 px-6 w-full border-b border-divider">
											<span className="text-lg">{userFormattedProfile?.aorFullName ? userFormattedProfile.aorFullName : "Association"} Products and Services</span>
										</div>
										<div className="p-4 mx-auto w-full grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 py-4 pt-6 gap-3">
											{aorApps.map((app: ApplicationEntity) => (
												<ApplicationCard key={app.id} application={app} showFavorite={true} />
											))}
										</div>
									</>
								)}
								{brokerApps.length > 0 && (
									<>
										<div className="bg-secondary text-secondary p-3 px-6 w-full border-b border-divider">
											<span className="text-lg">Broker Products and Services</span>
										</div>
										<div className="p-4 mx-auto w-full grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 py-4 pt-6 gap-3">
											{brokerApps.map((app: ApplicationEntity) => (
												<ApplicationCard key={app.id} application={app} showFavorite={true} />
											))}
										</div>
									</>
								)}
								{marketplaceApps.length > 0 && (
									<>
										<div className="bg-secondary text-secondary p-3 px-6 w-full border-b border-divider">
											<NavLink className="hover:text-crmls-blue cursor-pointer" to={{ pathname: "https://go.crmls.org/marketplace/" }} target="_blank" rel="noopener noreferrer">
												<span className="text-lg">Marketplace Products</span>
											</NavLink>{" "}
											(available at a discounted rate)
										</div>
										<div className="p-4 mx-auto w-full grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 py-4 pt-6 gap-3">
											{marketplaceApps.map((app: ApplicationEntity) => (
												<ApplicationCard key={app.id} application={app} showFavorite={true} />
											))}
										</div>
									</>
								)}
							</div>
						);
						rebuildTooltips();
					} else {
						setSidebarContent(
							<div className="flex justify-center mt-12 h-96">
								<div className="flex flex-col justify-center items-center">
									<TemplateIcon className="h-16 w-16" />
									<p className="text-lg">No Applications Found</p>
								</div>
							</div>
						);
					}
				});
				break;
			case "kpis":
				setSidebarTitle("Market Statistics");
				setSidebarContent(<Loader />);
				if (kpiSections.length > 0) {
					setSidebarContent(
						<div className="absolute inset-0 px-4 sm:px-6 p-4">
							<div className="w-full align-left relative mt-4">
								<RefreshIcon className="absolute top-2 right-2 h-5 w-5 cursor-pointer z-9" aria-hidden={true} onClick={() => resetKpiPrefs()} />
								<h2 className="text-lg">Market Statistics Configuration</h2>
								<p className="text-sm pb-2">Manage your dashboard Market Statistics preferences. Drag and drop stats to change order or hide/show sections using the 'eye' icon to the right of each section. To restore defaults, click the refresh icon in the upper right.</p>
								<DragDropContext onDragEnd={onDragKpiEnd}>
									<Droppable droppableId="droppable">
										{(provided) => (
											<div {...provided.droppableProps} ref={provided.innerRef}>
												{kpiSections
													.sort((a, b) => a.order - b.order)
													.map((kpi: KpiEntity, index: number) => {
														return (
															<Draggable key={kpi.kpiDefinitionID} draggableId={kpi.kpiDefinitionID} index={index}>
																{(provided) => (
																	<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onMouseDown={(e) => e.currentTarget.focus()} className="relative bg-secondary text-secondary p-4 rounded-lg my-3 focus-visible:outline-none">
																		<div className="flex">
																			<div className="flex items-center justify-center">
																				<SelectorIcon className="h-5 w-5" aria-hidden={true} />
																			</div>
																			<div className="px-4 w-full">
																				<h3 className="text-sm font-medium">
																					<span className="absolute inset-0" aria-hidden="true" />
																					{kpi.title}
																				</h3>
																				<p className="text-sm">{kpi.description}</p>
																			</div>
																			<div className="flex flex-col items-center justify-center z-10">
																				<div data-tip={`${kpi.show === true ? "Hide" : "Show"} Section`} onClick={() => hideTooltips()}><KpiShowIcon kpi={kpi} /></div>
																			</div>
																		</div>
																	</div>
																)}
															</Draggable>
														);
													})}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
							</div>
						</div>
					);
					rebuildTooltips();
				} else {
					setSidebarContent(
						<div className="flex justify-center mt-12 h-96">
							<div className="flex flex-col justify-center items-center">
								<TemplateIcon className="h-16 w-16" />
								<p className="text-lg">No KPIs Found</p>
							</div>
						</div>
					);
				}
				break;
		}
	}, [activePanel, updatedCount]);

	const resetDashboardPrefs = () => {
		const prefKey = `dashboardSettings`;
		dispatch(
			setUserPrefs({
				key: prefKey,
				value: {},
			})
		);
	};

	const resetKpiPrefs = () => {
		const prefKey = `dashboardSettings.kpis`;
		dispatch(
			setUserPrefs({
				key: prefKey,
				value: {},
			})
		);
	};

	const handleSectionShow = (sectionKey: any, show: boolean) => {
		const prefKey = `dashboardSettings.${sectionKey}.show`;
		dispatch(
			setUserPrefs({
				key: prefKey,
				value: show,
			})
		);
	};

	const SectionShowIcon = ({ section }: { section: any }) => {
		if (section.show === true) {
			return <EyeIcon className="h-4 w-4 text-secondary cursor-pointer z-9" aria-hidden={true} onClick={() => handleSectionShow(section.id, false)} />;
		} else {
			return <EyeOffIcon className="h-4 w-4 text-secondary cursor-pointer z-9" aria-hidden={true} onClick={() => handleSectionShow(section.id, true)} />;
		}
	};

	const handleKpiShow = (kpiId: string, show: boolean) => {
		const prefKey = `dashboardSettings.kpis.${kpiId}.show`;
		dispatch(
			setUserPrefs({
				key: prefKey,
				value: show,
			})
		);
	};

	const KpiShowIcon = ({ kpi }: { kpi: any }) => {
		if (kpi.show === true) {
			return <EyeIcon className="h-4 w-4 text-secondary cursor-pointer z-9" aria-hidden={true} onClick={() => handleKpiShow(kpi.kpiDefinitionID, false)} />;
		} else {
			return <EyeOffIcon className="h-4 w-4 text-secondary cursor-pointer z-9" aria-hidden={true} onClick={() => handleKpiShow(kpi.kpiDefinitionID, true)} />;
		}
	};

	const sectionOptions = [
		{
			view: "applications",
			icon: <PlusCircleIcon className="w-6 h-6 text-secondary hover:text-primary cursor-pointer" />,
			title: "Applications",
			visible: false,
			onClick: () => {
				dispatch(
					showSliderView({
						showSlider: true,
						view: "applications",
					})
				);
			},
		},
		{
			view: "settings",
			icon: <CogIcon className="w-6 h-6 text-secondary hover:text-primary cursor-pointer" />,
			title: "Settings",
			visible: true,
			onClick: () => {
				dispatch(
					showSliderView({
						showSlider: true,
						view: "settings",
					})
				);
			},
		},
		{
			view: "kpis",
			icon: <PresentationChartBarIcon className="w-6 h-6 text-secondary hover:text-primary cursor-pointer" />,
			title: "KPIs",
			visible: false,
			onClick: () => {
				dispatch(
					showSliderView({
						showSlider: true,
						view: "kpis",
					})
				);
			},
		},
		{
			visible: true,
			component: <ThemeToggle />,
		},
	];

	return (
		<>
			{/* mobile settings tray */}
			<aside className="z-10 w-full bg-primary border-b border-divider absolute top-0 sm:hidden">
				<div className="flex flex-row-reverse w-full items-end py-1 px-4">
					{sectionOptions
						.filter((option) => option.visible)
						.map((option, i) => {
							if (option.component) {
								return (
									<div key={i} className="relative text-center p-1">
										{option.component}
									</div>
								);
							} else {
								return (
									<div key={i} className="relative text-center p-1" onClick={option.onClick} data-tip={option.title}>
										{option.icon}
									</div>
								);
							}
						})}
				</div>
			</aside>
			{/* desktop settings tray */}
			<aside className="z-10 w-10 bg-secondary border-l border-divider shadow-2xl hidden sm:block">
				<div className="flex flex-col w-full items-center py-2">
					{sectionOptions
						.filter((option) => option.visible)
						.map((option, i) => {
							if (option.component) {
								return (
									<div key={i} className="relative text-center p-1">
										{option.component}
									</div>
								);
							} else {
								return (
									<div key={i} className="relative text-center p-1" onClick={option.onClick} data-tip={option.title}>
										{option.icon}
									</div>
								);
							}
						})}
				</div>
			</aside>
			<SlidePanel title={sidebarTitle}>{sidebarContent}</SlidePanel>
		</>
	);
}

export default DashboardOptions;
