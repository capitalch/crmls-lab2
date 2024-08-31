import { NavLink, useLocation } from "react-router-dom";
import { dynamicMenuType } from "./dynamicMenuSlice";
import { checkSubmenuActive } from "./MainNav";

function SubNav({ children, flyout = true }: { children?: dynamicMenuType[]; flyout?: boolean }) {
	// @todo - we should make this recursive so it can support multiple levels of submenus (ie if a submenu item also has children)
	const location = useLocation();
	if (!children || children.length <= 0) return null;

	if (flyout) {
		return (
			<div className="group-hover:block dropdown-menu absolute z-10 h-auto top-0 right-0 hidden transition transition-all">
				<div className="absolute top-0 -right-48 w-48 bg-menu shadow">
					{children
						.filter(({ menu }) => menu === "submenu")
						.sort((a, b) => (a.viewOrder > b.viewOrder ? 1 : -1))
						.map(({ title, path, icon: Icon, target, children }, k) => {
							// Make sure no edit paths are included in the submenu
							if (path.includes(":id") || path.includes("/new")) return false;
							return (
								<div className="group relative dropdown w-full" key={k}>
									<NavLink
										exact
										className="block w-full px-4 py-1 hover:bg-menucollapse hover:text-menucollapse hover:text-opacity-80 transition"
										to={{ pathname: path }}
										activeClassName="bg-menucollapse text-menucollapse"
										target={target ?? ""}
										rel={target ? "noopener noreferrer" : ""}
										isActive={() => checkSubmenuActive(path, location, children)}
									>
										{Icon && <Icon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />}
										{title}
									</NavLink>
								</div>
							);
						})}
				</div>
			</div>
		);
	}

	return (
		<div className="block p-2 bg-primary bg-opacity-60">
			{children
				.filter(({ menu }) => menu === "submenu")
				.sort((a, b) => (a.viewOrder > b.viewOrder ? 1 : -1))
				.map(({ title, path, icon: Icon, target, children }, k) => {
					// Make sure no edit paths are included in the submenu
					if (path.includes(":id") || path.includes("/new")) return false;
					return (
						<div className="w-full" key={k}>
							<NavLink
								exact
								className="block w-full px-4 py-1 text-sm pl-8 hover:bg-menucollapse hover:text-menucollapse hover:text-opacity-80 transition"
								to={{ pathname: path }}
								activeClassName="bg-menucollapse text-menucollapse"
								target={target ?? ""}
								rel={target ? "noopener noreferrer" : ""}
								isActive={() => checkSubmenuActive(path, location, children)}
							>
								{Icon && <Icon className="mr-3 flex-shrink-0 h-4 w-4" aria-hidden="true" />}
								{title}
							</NavLink>
						</div>
					);
				})}
		</div>
	);
}

export default SubNav;
