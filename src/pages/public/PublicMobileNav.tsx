import { useEffect, useState } from "react";
import { classNames } from "../../util/helpers";
import { NavLink, useLocation } from "react-router-dom";
import { NavLoader } from "../../components/widgets/SkeletonScreens";
import { publicRoutes } from "../../app/routes";

const MobileNav = () => {
	const location = useLocation();
	const [mainNav, setMainNav] = useState<any[]>([]);
	const [quickLinks, setQuickLinks] = useState<any[]>([]);

	useEffect(() => {
		if (publicRoutes && publicRoutes.length > 0) {
			const mainNavRoutes = publicRoutes.filter((route) => route.menu === "main");
			const quickNavRoutes = publicRoutes.filter((route) => route.menu === "quicklink");
			setMainNav(mainNavRoutes.sort((a, b) => (a.viewOrder && b.viewOrder ? (a.viewOrder > b.viewOrder ? 1 : -1) : 1)));
			setQuickLinks(quickNavRoutes.sort((a, b) => (a.viewOrder && b.viewOrder ? (a.viewOrder > b.viewOrder ? 1 : -1) : 1)));
		}
	}, [publicRoutes]);

	const checkSubmenuActive = (path: string) => {
		if (path === "/" && location.pathname === "/") {
			return true;
		} else {
			return path !== "/" && location.pathname.includes(path);
		}
	};

	return (
		<nav className="px-2 bg-menu mt-4">
			{mainNav.length > 0 && quickLinks.length > 0 ? (
				<nav className="px-3 mt-6">
					<div className="space-y-1">
						{mainNav.map(({ id, title, path, icon: Icon, target }, i) => {
							return (
								<NavLink
									key={i}
									exact
									className="text-primary hover:text-secondary hover:bg-primary group flex items-center px-2 py-2 leading-5 font-medium rounded-md"
									to={{ pathname: path }}
									activeClassName="bg-primary text-secondary"
									target={target ?? ""}
									rel={target ? "noopener noreferrer" : ""}
									isActive={() => checkSubmenuActive(path)}
								>
									{Icon && <Icon className={classNames("text-secondary group-hover:text-primary", "mr-3 flex-shrink-0 h-6 w-6")} aria-hidden="true" />}
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
								<NavLink key={i} exact className="text-primary hover:text-secondary hover:bg-primary group flex items-center px-3 py-2 text-sm font-medium rounded-md" to={{ pathname: item.path }} target={item.target ?? ""} rel="noopener noreferrer">
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
		</nav>
	);
};

export default MobileNav;
