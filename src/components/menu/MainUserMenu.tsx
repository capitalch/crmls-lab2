import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "../../util/helpers";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { formattedProfile } from "../../features/user/selectors";
import { dynamicMenuType, selectAllDynamicMenus } from "./dynamicMenuSlice";
import { useAppDispatch } from "../../app/hooks";
import { toggleViewEula } from "../../features/notification/notificationSlice";

const MainUserMenu = () => {
	const dispatch = useAppDispatch();
	const user = useSelector(formattedProfile);
	const dynamicMenu = useSelector(selectAllDynamicMenus);
	const [userMenuRoutes, setUserMenuRoutes] = useState<dynamicMenuType[]>([]);
	const [greeting, setGreeting] = useState<string>("Welcome");

	useEffect(() => {
		if (dynamicMenu && dynamicMenu.length > 0) {
			setUserMenuRoutes(dynamicMenu.filter((route) => route.menuType === "nav" && route.menu === "user"));
		}
	}, [dynamicMenu]);

	useEffect(() => {
		var timeHour = new Date().getHours();
		setGreeting(timeHour < 12 ? "Good morning" : timeHour > 17 ? "Good evening" : "Good afternoon");
	}, []);

	const viewEula = () => {
		dispatch(toggleViewEula());
	};

	return (
		<Menu as="div" className="px-3 relative inline-block text-left">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none lg:p-2 lg:rounded-md">
							<img className="h-8 w-8 rounded-full" src={user.photoUrl} alt="" />
							<span className="hidden ml-3 text-secondary text-sm font-medium lg:block">
								{greeting}, {user.firstName}
							</span>
							<ChevronDownIcon className="hidden flex-shrink-0 ml-1 h-5 w-5 text-secondary lg:block" aria-hidden="true" />
						</Menu.Button>
					</div>
					<Transition
						show={open}
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items static className="z-10 mx-3 origin-top-right absolute right-0 mt-1 rounded-md shadow-lg bg-primary border border-divider divide-y divide-default focus:outline-none w-48">
							<div className="py-1">
								<Menu.Item>
									<span className="flex-1 flex flex-col min-w-0 text-secondary hover:text-primary hover:bg-secondary group flex items-left px-4 py-2 text-sm font-medium">
										<span>
											{user.firstName} {user.lastName}
										</span>
										<span className="font-normal text-xs">
											{user.loginId} - {user.memberType.displayName}
										</span>
									</span>
								</Menu.Item>
							</div>
							{userMenuRoutes.length > 0 && (
								<div className="py-1">
									{userMenuRoutes.map(({ id, title, path, target }, i) => {
										return (
											<NavLink
												key={i}
												exact
												className="text-secondary hover:text-primary hover:bg-secondary group flex items-center px-4 py-2 text-sm font-medium rounded-sm"
												to={{ pathname: path }}
												activeClassName="bg-secondary text-primary"
												target={target ?? ""}
												rel="noopener noreferrer"
											>
												{title}
											</NavLink>
										);
									})}
								</div>
							)}
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
										<div onClick={viewEula} className={classNames(active ? "bg-secondary text-primary" : "text-primary", "block px-4 py-2 text-sm cursor-pointer")}>
											View EULA
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<NavLink to="/logout" className={classNames(active ? "bg-secondary text-primary" : "text-primary", "block px-4 py-2 text-sm")}>
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
	);
};

export default MainUserMenu;
