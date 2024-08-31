import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentContainer from "../components/content/ContentContainer";
import AccordionLayout from "../features/dashboard/AccordionLayout";
import DashboardOptions from "../features/dashboard/DashboardOptions";
import { FavoriteApps } from "../features/dashboard/FavoriteApps";
import { UserArticles } from "../features/dashboard/UserArticles";
import UserKpis from "../features/dashboard/UserKpis";
import { classNames } from "../util/helpers";
import { selectDashPrefs, userProfile } from "../features/user/selectors";
import { sample } from "lodash";
import { getGenericContainers } from "../adapters";
import ErrorMessage from "../components/widgets/ErrorMessage";
import { DashboardLoader } from "../components/widgets/SkeletonScreens";
import { BillboardSection } from "../features/ads/AdContainer";
import { selectAllAds } from "../features/ads/adsSlice";

const Home = () => {
	const allAds = useSelector(selectAllAds);
	const [dashSections, setDashSections] = useState<any[]>([]);
	const dashboardPrefs = useSelector(selectDashPrefs);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();
	const [sections, setSections] = useState<any[]>([]);
	const [staticSections, setStaticSections] = useState<any[]>([]);
	const profile = useSelector(userProfile);

	useEffect(() => {
		if (staticSections.length) {
			getGenericContainers()
				.then((response) => {
					setSections([...staticSections, ...response.data.results]);
				})
				.then(() => {
					setIsLoading(false);
				})
				.catch((e: Error) => setError(e));
		}
	}, [staticSections]);

	useEffect(() => {
		if (allAds.length > 0) {
			const adsResponse = allAds[0];
<<<<<<< HEAD
			const dashboardAd = adsResponse.impressions.find((impression: any) => impression.tagName === "dashboard-billboard");

			let tmpStaticSections: any[] = (adsResponse?.isEnabled && dashboardAd?.isEnabled) ? BillboardSection(dashboardAd.isScript, dashboardAd.template) : [];
=======
			const billboardAd = adsResponse.impressions.find((impression: any) => impression.tagName === "dashboard-billboard");
			const spotlightAd = adsResponse.impressions.find((impression: any) => impression.tagName === "spotlight-ad");

			let tmpStaticSections: any[] = adsResponse?.isEnabled && (billboardAd?.isEnabled || spotlightAd?.isEnabled) ? BillboardSection({billboardAd, spotlightAd}) : [];
>>>>>>> dev-1
			tmpStaticSections = [
				...tmpStaticSections,
				...[
					{
						id: "applications",
						name: "Applications quick launch",
						bgClass: "bg-tertiary bg-opacity-20 text-primary",
						component: "applications",
						content: <FavoriteApps />,
					},
					{
						id: "analytics",
						name: "Market Statistics",
						bgClass: "bg-header bg-opacity-50 text-inverse",
						component: "analytics",
						content: <UserKpis />,
					},
					{
						id: "articles",
						name: "Articles",
						bgClass: "bg-tertiary bg-opacity-50 text-primary",
						component: "articles",
						content: <UserArticles />,
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
			let order = 1;
			sections.forEach((section: any) => {
				let sectionConfig = dashboardPrefs[section.id];
				dashSections.push({
					id: section.id,
					component: section.component ?? false,
					name: section.name,
					content: section.content,
					locked: section.locked ?? false,
					show: sectionConfig?.show ?? true,
					order: sectionConfig?.order ?? order,
					collapsed: sectionConfig?.collapsed ?? false,
					bgClass: section.bgClass ?? `bg-tertiary text-primary bg-opacity-${sample([20, 30, 40, 50, 60, 70, 80, 90])}`,
					status: section.status ?? "Approved",
				});
				order++;
			});
			setDashSections(dashSections);
		}
	}, [dashboardPrefs, sections]);

	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	return (
<<<<<<< HEAD
		<ContentContainer actions={null} cssClass="crmls-dashboard pb-12" sideBarOptions={<DashboardOptions />}>
=======
		<ContentContainer actions={null} cssClass="crmls-dashboard pb-12 mt-10 sm:mt-0" sideBarOptions={<DashboardOptions />}>
>>>>>>> dev-1
			{isLoading ? (
				<DashboardLoader />
			) : (
				<div className="min-h-screen">
					{dashSections
						.sort((a, b) => a.order - b.order)
						.map((section, i) => {
							if (section.locked || section.show === true) {
								return (
									<div key={i} id={`${section.id}-target`}>
										<AccordionLayout settingsKey="dashboardSettings" title={section.name} section={section} className={classNames(section.bgClass)}>
											{section.component ? section.content : <div dangerouslySetInnerHTML={{ __html: section.content }} />}
										</AccordionLayout>
									</div>
								);
							} else {
								return false;
							}
						})}
				</div>
			)}
		</ContentContainer>
	);
};

export default Home;
