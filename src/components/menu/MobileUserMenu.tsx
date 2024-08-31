import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "../../util/helpers";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { formattedProfile } from "../../features/user/selectors";
import NotificationIcon from "../../features/notification/NotificationIcon";
import SystemNotificationIcon from "../../features/systemNotification/SystemNotificationIcon";
import { dynamicMenuType, selectAllDynamicMenus } from "./dynamicMenuSlice";

const MobileUserMenu = () => {
	const user = useSelector(formattedProfile);
	const dynamicMenu = useSelector(selectAllDynamicMenus);
	const [userMenuRoutes, setUserMenuRoutes] = useState<dynamicMenuType[]>([]);

	useEffect(() => {
		if (dynamicMenu && dynamicMenu.length > 0) {
			setUserMenuRoutes(dynamicMenu.filter((route) => route.menuType === "nav" && route.menu === "user"));
		}
	}, [dynamicMenu]);

	return (
		<>
			<SystemNotificationIcon size={6} />
			<NotificationIcon size={6} />
			<Menu as="div" className="ml-3 relative">
				{({ open }) => (
					<>
						<div>
							<Menu.Button className="max-w-xs bg-secondary flex items-center text-sm rounded-full focus:outline-none">
								<span className="sr-only">Open user menu</span>
								<img className="h-8 w-8 rounded-full" src={user.photoUrl} alt={user.loginId} />
							</Menu.Button>
						</div>
						<Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
							<Menu.Items static className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 divide-y divide-default focus:outline-none">
								<div className="py-1">
									{userMenuRoutes.map(({ id, title, path, target }, i) => {
										return (
											<NavLink key={i} exact className="text-secondary hover:text-primary hover:bg-primary group flex items-center px-4 py-2 text-sm font-medium rounded-sm" to={{ pathname: path }} activeClassName="bg-primary text-primary" target={target ?? ""} rel="noopener noreferrer">
												{title}
											</NavLink>
										);
									})}
								</div>
								<div className="py-1">
									<Menu.Item>
										{({ active }) => (
											<NavLink to="/password-change" className={classNames(active ? "bg-secondary text-primary" : "text-primary", "block px-4 py-2 text-sm")}>
												Change Password
											</NavLink>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<NavLink to="/logout" className={classNames(active ? "bg-primary text-primary" : "text-secondary", "block px-4 py-2 text-sm")}>
												Logout
											</NavLink>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		</>
	);
};

export default MobileUserMenu;
