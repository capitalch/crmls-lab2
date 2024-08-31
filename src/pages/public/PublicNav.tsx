import { Fragment, useEffect, useState } from "react";
import { classNames } from "../../util/helpers";
import { NavLink, useLocation } from "react-router-dom";
import AorLogo from "../../app/AorLogo";
import { Transition } from "@headlessui/react";
import { NavLoader } from "../../components/widgets/SkeletonScreens";
import { rebuildTooltips } from "../../components/settings/theme/ThemeTooltip";
import { MenuIcon } from "@heroicons/react/solid";
import { publicRoutes } from "../../app/routes";
import PoweredBy from "../../components/content/PoweredBy";

const PublicNav = () => {
	const location = useLocation();
	const [mainNav, setMainNav] = useState<any[]>([]);
	const [quickLinks, setQuickLinks] = useState<any[]>([]);
	const [sidebarOpen, setSidebarOpen] = useState(true);

	useEffect(() => {
		if (publicRoutes && publicRoutes.length > 0) {
			const mainNavRoutes = publicRoutes.filter((route) => route.menu === "main");
			const quickNavRoutes = publicRoutes.filter((route) => route.menu === "quicklink");
			setMainNav(mainNavRoutes.sort((a, b) => (a.viewOrder && b.viewOrder) ? (a.viewOrder > b.viewOrder ? 1 : -1) : 1));
			setQuickLinks(quickNavRoutes.sort((a, b) => (a.viewOrder && b.viewOrder) ? (a.viewOrder > b.viewOrder ? 1 : -1) : 1));
		}
	}, [publicRoutes]);

	useEffect(() => {
		rebuildTooltips();
	}, [sidebarOpen]);

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
				<div className="flex flex-col space-y-2 w-full items-center">
					<div className="relative w-6 h-6 text-menucollapse hover:text-opacity-80 text-center cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
						<MenuIcon />
					</div>
					{!sidebarOpen &&
						mainNav.map(({ path, title, icon: Icon, target }, i) => {
							return (
								<div key={i} className="relative w-full">
									<NavLink key={i} exact className="flex flex-col items-center p-2 text-menucollapse group-hover:text-opacity-80" to={{ pathname: path }} isActive={() => checkSubmenuActive(path)} activeClassName="bg-menu bg-opacity-50" target={target ?? ""} rel={target ? "noopener noreferrer" : ""} data-tip={title}>
										{Icon && <Icon className={classNames("flex-shrink-0 h-6 w-6")} aria-hidden="true" />}
									</NavLink>
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
								{/* <div className="mt-8">
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
								</div> */}
							</nav>
						) : (
							<NavLoader />
						)}
					</div>
					<div className="flex flex-col items-center justify-center flex-shrink-0 px-6">
						<PoweredBy />
					</div>
				</aside>
			</Transition>
		</div>
	);
};

export default PublicNav;
