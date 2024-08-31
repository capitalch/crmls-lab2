import { useState } from "react";
// import Search from "../components/widgets/Search";
import MainNav from "../components/menu/MainNav";
import MobileFramework from "../components/menu/MobileFramework";
import MobileNavContentFrame from "../components/menu/MobileNavContentFrame";
import PopoverNotification from "../features/notification/PopoverNotification";
import Footer from "../components/menu/Footer";
import Modal from "../components/widgets/modal/Modal";
import ACLRouter from "../app/ACLRouter";
import HeaderNav from "../components/menu/HeaderNav";
import { ThemeTooltip } from "../components/settings/theme/ThemeTooltip";
import { useSelector } from "react-redux";
// import IdleTimeout from "../components/widgets/alerts/IdleTimeout";
import { EulaAlert } from "../components/widgets/alerts/EulaAlert";
import { selectViewEula } from "../features/notification/notificationSlice";
import { PasswordResetAlert } from "../components/widgets/alerts/AlertElements";
import { FeedbackTab } from "../components/widgets/SupportPanel";
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { ai } from "../telemetryService";

export type sidebarOptions = {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
	isPublic?: boolean;
};

const Main = () => {
	const viewEula = useSelector(selectViewEula);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<div className="h-screen flex overflow-hidden bg-primary text-primary">
				<FeedbackTab />
				<MobileFramework sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<MainNav />
				<div className="flex flex-col flex-1 overflow-hidden shadow-xl">
					<MobileNavContentFrame sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<main id="re-content-container" className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
						<HeaderNav />
						<ACLRouter />
					</main>
					<div className="relative w-full">
						<Footer />
					</div>
				</div>
			</div>
			<PopoverNotification />
			<Modal />
			<ThemeTooltip />
			{/* <IdleTimeout /> */}
			<PasswordResetAlert />
			<EulaAlert viewOnly={viewEula} />
		</>
	);
};

export default withAITracking(ai.reactPlugin, Main);
