import { Fragment, useEffect, useState } from "react";
import { tempRoutes } from "../../app/routes";
import { classNames } from "../../util/helpers";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExternalLinkIcon, MenuIcon } from "@heroicons/react/solid";
import AorLogo from "../../app/AorLogo";
import { Transition } from "@headlessui/react";
import { dynamicMenuType, selectAllDynamicMenus } from "./dynamicMenuSlice";
import { NavLoader } from "../widgets/SkeletonScreens";
<<<<<<< HEAD
import { AdDisplay } from "../../features/ads/AdContainer";
import { rebuildTooltips } from "../settings/theme/ThemeTooltip";
import { selectAllAds } from "../../features/ads/adsSlice";
import PoweredBy from "../content/PoweredBy";
import SubNav from "./SubNav";

export const checkSubmenuActive = (path: string, location: any, children?: dynamicMenuType[]) => {
	if (path === "/" && location.pathname === "/") {
		return true;
	} else if (children && children.length > 0) {
		return children.some((child) => location.pathname.includes(child.path)) || location.pathname.includes(path);
	} else {
		return path !== "/" && location.pathname.includes(path);
	}
};

const MainNav = () => {
	const location = useLocation();
	const allAds = useSelector(selectAllAds);
=======
// import { AdDisplay } from "../../features/ads/AdContainer";
import { rebuildTooltips } from "../settings/theme/ThemeTooltip";
// import { selectAllAds } from "../../features/ads/adsSlice";
import PoweredBy from "../content/PoweredBy";

const MainNav = () => {
	const location = useLocation();
	// const allAds = useSelector(selectAllAds);
>>>>>>> dev-1
	const dynamicMenu = useSelector(selectAllDynamicMenus);
	const [mainNav, setMainNav] = useState<dynamicMenuType[]>([]);
	const [quickLinks, setQuickLinks] = useState<dynamicMenuType[]>([]);
	const [sidebarOpen, setSidebarOpen] = useState(true);
<<<<<<< HEAD
	const [spotlightAd, setSpotlightAd] = useState<any>();
	const flyout = true;

	useEffect(() => {
		if (dynamicMenu && dynamicMenu.length > 0) {
			// console.dir(JSON.stringify(dynamicMenu, null, 5))
=======
	// const [spotlightAd, setSpotlightAd] = useState<any>();

	useEffect(() => {
		if (dynamicMenu && dynamicMenu.length > 0) {
>>>>>>> dev-1
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
				setSpotlightAd(<AdDisplay type="spotlight-ad" wrapperClass="p-4" isScript={tmpSpotlightAd.isScript} template={tmpSpotlightAd.template} />);
			}
		}
	}, [allAds]);
=======
	// useEffect(() => {
	// 	if (allAds.length > 0) {
	// 		const adsResponse = allAds[0];
	// 		const tmpSpotlightAd = adsResponse.impressions.find((impression: any) => impression.tagName === "spotlight-ad");

	// 		if (adsResponse?.isEnabled && tmpSpotlightAd?.isEnabled) {
	// 			setSpotlightAd(<AdDisplay type="spotlight-ad" wrapperClass="p-4" isScript={tmpSpotlightAd.isScript} template={tmpSpotlightAd.template} />);
	// 		}
	// 	}
	// }, [allAds]);
>>>>>>> dev-1

	useEffect(() => {
		rebuildTooltips();
	}, [sidebarOpen]);

<<<<<<< HEAD
	return (
		<div className="hidden lg:flex lg:flex-shrink-0">
			<div className="flex flex-col justify-between items-center pt-4 pb-4 w-16 z-10 bg-menucollapse">
=======
	const checkSubmenuActive = (path: string) => {
		if (path === "/" && location.pathname === "/") {
			return true;
		} else {
			return path !== "/" && location.pathname.includes(path);
		}
	}

	return (
		<div className="hidden lg:flex lg:flex-shrink-0">
			<div className="flex flex-col justify-between items-center pt-4 pb-4 w-16 overflow-y-auto z-10 bg-menucollapse">
>>>>>>> dev-1
				<div className="flex flex-col space-y-2 w-full items-center">
					<div className="relative w-6 h-6 text-menucollapse hover:text-opacity-80 text-center cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
						<MenuIcon />
					</div>
					{!sidebarOpen &&
<<<<<<< HEAD
						mainNav.map(({ path, title, icon: Icon, target, children }, i) => {
							return (
								<div className="group relative dropdown w-full" key={i}>
									<NavLink
										exact
										className="flex flex-col items-center p-2 text-menucollapse group-hover:text-opacity-80"
										to={{ pathname: path }}
										isActive={() => checkSubmenuActive(path, location, children)}
										activeClassName="bg-menu bg-opacity-50"
										target={target ?? ""}
										rel={target ? "noopener noreferrer" : ""}
										data-tip={title}
									>
										{Icon && <Icon className={classNames("flex-shrink-0 h-6 w-6")} aria-hidden="true" />}
									</NavLink>
									{children && children.length > 0 && <SubNav children={children} />}
=======
						mainNav.map(({ path, title, icon: Icon, target }, i) => {
							return (
								<div key={i} className="relative w-full">
									<NavLink key={i} exact className="flex flex-col items-center p-2 text-menucollapse group-hover:text-opacity-80" to={{ pathname: path }} isActive={() => checkSubmenuActive(path)} activeClassName="bg-menu bg-opacity-50" target={target ?? ""} rel={target ? "noopener noreferrer" : ""} data-tip={title}>
										{Icon && <Icon className={classNames("flex-shrink-0 h-6 w-6")} aria-hidden="true" />}
									</NavLink>
>>>>>>> dev-1
								</div>
							);
						})}
				</div>
			</div>
			<Transition show={sidebarOpen} as={Fragment} enter="transition-all ease-in-out duration-300 transform" enterFrom="-ml-64" enterTo="ml-0" leave="transition-all ease-in-out duration-300 transform" leaveFrom="ml-0" leaveTo="-ml-64">
				<aside className="flex flex-col w-64 border-r pt-5 pb-4 bg-menu border-menu">
					<div className="flex items-center justify-center flex-shrink-0 px-6">
						<AorLogo />
					</div>
<<<<<<< HEAD
					<div className={`h-0 flex-1 flex flex-col${sidebarOpen && !flyout ? " overflow-y-auto" : ""}`}>
						{mainNav.length > 0 || quickLinks.length > 0 ? (
							<nav className="px-3 mt-6">
								<div className="space-y-1">
									{mainNav.map(({ title, path, icon: Icon, target, children }, i) => {
										return flyout || !children || children.length <= 0 ? (
											<div className="group relative dropdown" key={i}>
												<NavLink
													exact
													className="flex items-center px-2 py-2 text-sm font-medium rounded-md"
													to={{ pathname: path }}
													activeClassName="bg-primary text-primary"
													target={target ?? ""}
													rel={target ? "noopener noreferrer" : ""}
													isActive={() => checkSubmenuActive(path, location, children)}
												>
													{Icon && <Icon className={classNames("text-secondary group-hover:text-opacity-80", "mr-3 flex-shrink-0 h-6 w-6")} aria-hidden="true" />}
													{title}
												</NavLink>
												{children && children.length > 0 && <SubNav children={children} flyout={flyout} />}
											</div>
										) : (
											<details open={checkSubmenuActive(path, location, children)} className="group" key={i}>
												<summary className="flex items-baseline">
													<NavLink
														key={i}
														exact
														className="w-full text-primary hover:text-secondary hover:bg-primary group flex items-center px-2 py-2 text-sm font-medium rounded-t-md"
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
												<SubNav children={children} flyout={flyout} />
											</details>
										);
									})}
								</div>
=======
					<div className="h-0 flex-1 flex flex-col overflow-y-auto">
						{mainNav.length > 0 || quickLinks.length > 0 ? (
							<nav className="px-3 mt-6">
								<div className="space-y-1">
									{mainNav.map(({ title, path, icon: Icon, target }, i) => {
										return (
											<NavLink
												key={i}
												exact
												className="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
												to={{ pathname: path }}
												activeClassName="bg-primary text-primary"
												target={target ?? ""}
												rel={target ? "noopener noreferrer" : ""}
												isActive={() => checkSubmenuActive(path)}
											>
												{Icon && <Icon className={classNames("text-secondary group-hover:text-opacity-80", "mr-3 flex-shrink-0 h-6 w-6")} aria-hidden="true" />}
												{title}
											</NavLink>
										);
									})}
								</div>
								{/* {spotlightAd} */}
>>>>>>> dev-1
								<div className="mt-8">
									{/* Secondary navigation */}
									<h3 className="px-3 text-xs font-semibold text-secondary uppercase tracking-wider" id="teams-headline">
										Quick Links
									</h3>
									<div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
										{quickLinks.map((item, i) => (
											<NavLink key={i} exact className="group flex items-center px-3 py-2 text-sm font-medium text-secondary rounded-md hover:text-primary hover:bg-primary" to={{ pathname: item.path }} target={item.target ?? ""} rel="noopener noreferrer">
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
					</div>
					<div className="flex flex-col items-center justify-center flex-shrink-0 px-6">
						<PoweredBy />
					</div>
				</aside>
			</Transition>
		</div>
	);
};

export default MainNav;
