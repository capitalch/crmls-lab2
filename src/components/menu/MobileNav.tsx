<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> dev-1
import { classNames } from "../../util/helpers";
import { tempRoutes } from "../../app/routes";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { dynamicMenuType, selectAllDynamicMenus } from "./dynamicMenuSlice";
import { NavLoader } from "../widgets/SkeletonScreens";
<<<<<<< HEAD
import { AdDisplay } from "../../features/ads/AdContainer";
import { selectAllAds } from "../../features/ads/adsSlice";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import SubNav from "./SubNav";
import { checkSubmenuActive } from "./MainNav";

const MobileNav = () => {
	const location = useLocation();
	const allAds = useSelector(selectAllAds);
	const dynamicMenu = useSelector(selectAllDynamicMenus);
	const [mainNav, setMainNav] = useState<dynamicMenuType[]>([]);
	const [quickLinks, setQuickLinks] = useState<dynamicMenuType[]>([]);
	const [spotlightAd, setSpotlightAd] = useState<any>();
=======
// import { AdDisplay } from "../../features/ads/AdContainer";
// import { selectAllAds } from "../../features/ads/adsSlice";
import { ExternalLinkIcon } from "@heroicons/react/solid";

const MobileNav = () => {
	const location = useLocation();
	// const allAds = useSelector(selectAllAds);
	const dynamicMenu = useSelector(selectAllDynamicMenus);
	const [mainNav, setMainNav] = useState<dynamicMenuType[]>([]);
	const [quickLinks, setQuickLinks] = useState<dynamicMenuType[]>([]);
	// const [spotlightAd, setSpotlightAd] = useState<any>();
>>>>>>> dev-1

	useEffect(() => {
		if (dynamicMenu && dynamicMenu.length > 0) {
			const mainNavRoutes: any[] = [];
			dynamicMenu
				.filter((route) => route.menuType === "nav" && route.menu === "main")
				.forEach((dynamicItem) => {
					const foundComponent = tempRoutes.find((tr) => tr.path === dynamicItem.path);
					if (foundComponent) {
						mainNavRoutes.push({ ...foundComponent, ...dynamicItem });
					} else if (dynamicItem.target === "_blank") {
						const tmpNav = { ...dynamicItem };
						tmpNav.icon = ExternalLinkIcon;
						mainNavRoutes.push(tmpNav);
					}
				});
			setMainNav(mainNavRoutes.sort((a, b) => (a.viewOrder > b.viewOrder ? 1 : -1)));
			setQuickLinks(dynamicMenu.filter((route) => route.menuType === "quicklink").sort((a, b) => (a.viewOrder > b.viewOrder ? 1 : -1)));
		}
	}, [dynamicMenu]);

<<<<<<< HEAD
	useEffect(() => {
		if (allAds.length > 0) {
			const adsResponse = allAds[0];
			const tmpSpotlightAd = adsResponse.impressions.find((impression: any) => impression.tagName === "spotlight-ad");

			if (adsResponse?.isEnabled && tmpSpotlightAd?.isEnabled) {
				setSpotlightAd(<AdDisplay type="mobile-spotlight-ad" wrapperClass="p-4" isScript={tmpSpotlightAd.isScript} template={tmpSpotlightAd.template} />);
			}
		}
	}, [allAds]);
=======
	// useEffect(() => {
	// 	if (allAds.length > 0) {
	// 		const adsResponse = allAds[0];
	// 		const tmpSpotlightAd = adsResponse.impressions.find((impression: any) => impression.tagName === "spotlight-ad");

	// 		if (adsResponse?.isEnabled && tmpSpotlightAd?.isEnabled) {
	// 			setSpotlightAd(<AdDisplay type="mobile-spotlight-ad" wrapperClass="p-4" isScript={tmpSpotlightAd.isScript} template={tmpSpotlightAd.template} />);
	// 		}
	// 	}
	// }, [allAds]);

	const checkSubmenuActive = (path: string) => {
		if (path === "/" && location.pathname === "/") {
			return true;
		} else {
			return path !== "/" && location.pathname.includes(path);
		}
	}
>>>>>>> dev-1

	return (
		<nav className="px-2 bg-menu mt-4">
			{mainNav.length > 0 && quickLinks.length > 0 ? (
				<nav className="px-3 mt-6">
					<div className="space-y-1">
<<<<<<< HEAD
						{mainNav.map(({ id, title, path, icon: Icon, target, children }, i) => {
							return children && children.length > 0 ? (
								<details open={checkSubmenuActive(path, location, children)} className="group" key={i}>
									<summary className="flex items-baseline">
										<NavLink
											key={i}
											exact
											className="w-full text-primary hover:text-secondary hover:bg-primary group flex items-center px-2 py-2 leading-5 font-medium rounded-t-md"
											to={{ pathname: path }}
											activeClassName="bg-primary text-secondary"
											target={target ?? ""}
											rel={target ? "noopener noreferrer" : ""}
											isActive={() => checkSubmenuActive(path, location, children)}
										>
											{Icon && <Icon className={classNames("text-secondary group-hover:text-primary", "mr-3 flex-shrink-0 h-6 w-6")} aria-hidden="true" />}
											{title}
										</NavLink>
									</summary>
									<SubNav children={children} flyout={false} />
								</details>
							) : (
=======
						{mainNav.map(({ id, title, path, icon: Icon, target }, i) => {
							return (
>>>>>>> dev-1
								<NavLink
									key={i}
									exact
									className="text-primary hover:text-secondary hover:bg-primary group flex items-center px-2 py-2 leading-5 font-medium rounded-md"
									to={{ pathname: path }}
									activeClassName="bg-primary text-secondary"
									target={target ?? ""}
									rel={target ? "noopener noreferrer" : ""}
<<<<<<< HEAD
									isActive={() => checkSubmenuActive(path, location, children)}
=======
									isActive={() => checkSubmenuActive(path)}
>>>>>>> dev-1
								>
									{Icon && <Icon className={classNames("text-secondary group-hover:text-primary", "mr-3 flex-shrink-0 h-6 w-6")} aria-hidden="true" />}
									{title}
								</NavLink>
							);
						})}
					</div>
<<<<<<< HEAD
=======
					{/* {spotlightAd} */}
>>>>>>> dev-1
					<div className="mt-8">
						<h3 className="px-3 text-xs font-semibold text-secondary uppercase tracking-wider" id="teams-headline">
							Quick Links
						</h3>
						<div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
							{quickLinks.map((item, i) => (
								<NavLink key={i} exact className="text-primary hover:text-secondary hover:bg-primary group flex items-center px-3 py-2 text-sm font-medium rounded-md" to={{ pathname: item.path }} target={item.target ?? ""} rel="noopener noreferrer">
									<span className={classNames(item.color ? item.color : "", "w-2.5 h-2.5 mr-4 rounded-full")} aria-hidden="true" />
									<span className="truncate">{item.title}</span>
								</NavLink>
							))}
						</div>
					</div>
				</nav>
			) : (
				<NavLoader />
			)}
<<<<<<< HEAD
			{spotlightAd}
=======
>>>>>>> dev-1
		</nav>
	);
};

export default MobileNav;
