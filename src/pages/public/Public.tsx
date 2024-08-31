import { useState } from "react";
import MobileFramework from "../../components/menu/MobileFramework";
import MobileNavContentFrame from "../../components/menu/MobileNavContentFrame";
import PopoverNotification from "../../features/notification/PopoverNotification";
import PublicFooter from "./PublicFooter";
import Modal from "../../components/widgets/modal/Modal";
import { ThemeTooltip } from "../../components/settings/theme/ThemeTooltip";
import { ChatIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/solid";
import PublicRouter from "./PublicRouter";
import PublicNav from "./PublicNav";
import { NavLink } from "react-router-dom";
import userManager from "../../util/userManager";

const Public = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleLoginRedirect = () => {
		userManager.signinRedirect();
	};

	return (
		<>
			<div className="h-screen flex overflow-hidden bg-primary text-primary">
				<MobileFramework sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isPublic={true} />
				<PublicNav />
				<div className="flex flex-col flex-1 overflow-hidden shadow-xl">
					<MobileNavContentFrame sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isPublic={true} />
					<main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
						<nav className="fixed sticky inset-x-0 top-0 px-4 py-2 border-b border-divider z-20 shadow-md hidden lg:block bg-primary">
							<div className="mx-auto">
								<div className="flex items-center justify-between">
									<div className="header-left" />
									<div className="ml-4 flex items-center md:ml-6">
										<div className="relative p-1 rounded-full text-secondary hover:text-primary cursor-pointer focus:outline-none focus:ring-0">
											<NavLink to={{ pathname: "/" }}>
												<HomeIcon className={`h-6 w-6`} aria-hidden="true" data-tip="Home" />
											</NavLink>
										</div>
										{/* <div className="relative p-1 rounded-full text-secondary hover:text-primary cursor-pointer focus:outline-none focus:ring-0">
											<NavLink to={{ pathname: "https://go.crmls.org/support/" }} target="_blank">
												<ChatIcon className={`h-6 w-6`} aria-hidden="true" data-tip="Support" />
											</NavLink>
										</div> */}
										<div className="relative p-1 rounded-full text-secondary hover:text-primary cursor-pointer focus:outline-none focus:ring-0">
											<button className="flex items-center" onClick={handleLoginRedirect}>
												<UserCircleIcon className={`h-6 w-6`} aria-hidden="true" data-tip="Log In" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</nav>
						<PublicRouter />
					</main>
					<div className="relative w-full">
						<PublicFooter />
					</div>
				</div>
			</div>
			<PopoverNotification />
			<Modal />
			<ThemeTooltip />
		</>
	);
};

export default Public;
