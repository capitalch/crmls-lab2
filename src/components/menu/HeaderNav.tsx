import MainUserMenu from "./MainUserMenu";
import NotificationIcon from "../../features/notification/NotificationIcon";
import SystemNotificationIcon from "../../features/systemNotification/SystemNotificationIcon";

function HeaderNav() {
	return (
		<nav className="fixed sticky inset-x-0 top-0 px-4 py-2 border-b border-divider z-20 shadow-md hidden lg:block bg-primary">
			<div className="mx-auto">
				<div className="flex items-center justify-between">
					<div className="header-left" />
					<div className="ml-4 flex items-center md:ml-6">
						<SystemNotificationIcon size={6} />
						<NotificationIcon size={6} />
						<MainUserMenu />
					</div>
				</div>
			</div>
		</nav>
	);
}

export default HeaderNav;
