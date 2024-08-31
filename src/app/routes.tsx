import React from "react";
import { AcademicCapIcon, HomeIcon, ChatIcon } from "@heroicons/react/solid";
import SyndicationIcon from "../components/widgets/icons/SyndicationIcon";
import Logout from "../pages/Logout";
import SettingsIcon from "../components/widgets/icons/SettingsIcon";
import TrainingIcon from "../components/widgets/icons/TrainingIcon";
import TrainingRegistrationForm from "../features/trainingPortal/TrainingRegistrationForm";
import TrainingHome from "../features/trainingPortal/TrainingHome";
import RegisteredListingIcon from "../components/widgets/icons/RegisteredListingIcon";
import AppSettingsIcon from "../components/widgets/icons/AppSettingsIcon";
import AppSettings from "../features/appSettings/AppSettings";
import RegisteredListings from "../features/registeredListing/RegisteredListings";
import RegisteredListing from "../features/registeredListing/RegisteredListing";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import GeneralSettings from "../features/generalSettings/GeneralSettings";
import NewsArticle from "../features/news/Article";
import NewsArticles from "../features/news/Articles";
import Notifications from "../features/notification/Notifications";
import SystemNotifications from "../features/systemNotification/SystemNotifications";
import PasswordChange from "../features/user/PasswordChange";
import PublicDashboard from "../pages/public/PublicDashboard";
import LoginPage from "../pages/public/Login";
import PasswordReset from "../pages/public/PasswordReset";
import LoggedOut from "../pages/public/LoggedOut";
import { DashboardLoader } from "../components/widgets/SkeletonScreens";
import ForgotPassword from "../pages/public/ForgotPassword";
<<<<<<< HEAD
import { Offices } from "../features/offices/Offices";
import OfficeIcon from "../components/widgets/icons/OfficeIcon";
import Aor from "../features/aor/Aor";
// import { Office } from "../features/offices/temp/OfficeOld";
import PersonIcon from "../components/widgets/icons/PersonIcon";
import { Contacts } from "../features/contacts/Contacts";
import { DBAs } from "../features/dba/Dbas";
import BrokerageFirms from "../features/brokerageFirms/BrokerageFirms";
import BrokerageFirm from "../features/brokerageFirms/BrokerageFirm";
import { Contact } from "../features/contacts/Contact";
import IDBA from "../features/dba/Dba";
import Licenses from "../features/licenses/Licenses";
import License from "../features/licenses/License";
import Teams from "../features/teams/Teams";
import Team from "../features/teams/Team";
import MemberIcon from "../components/widgets/icons/MemberIcon";
import { Members } from "../features/members/Members";
import { Member } from "../features/members/Member";
import { NewContact } from "../features/contacts/NewContact";
import { Office } from "../features/offices/Office";
import { NewMember } from "../features/members/NewMember";
=======
import CreateReport from "../features/compliance/CreateReport";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import AdminHome from "../features/admin/AdminHome";
>>>>>>> dev-1

export type routeObject = {
	id?: string;
	title?: string;
	path?: string;
	exact?: boolean;
	component?: React.FC | null;
	icon?: React.FunctionComponent<any>;
	// icon: ElementType,
	target?: "_blank" | null;
<<<<<<< HEAD
	menu?: "user" | "main" | "none" | "quicklink" | "static" | "submenu";
=======
	menu?: "user" | "main" | "none" | "quicklink" | "static";
>>>>>>> dev-1
	color?: string;
	viewOrder?: number | 0;
};

// Authorized routes
export const authRoutes: routeObject[] = [
	{
		path: "/",
		exact: true,
		component: Home,
		icon: HomeIcon,
	},
	{
		path: "/settings",
		exact: true,
		component: GeneralSettings,
		icon: SettingsIcon,
	},
	{
		path: "/settings/:urlTab?",
		exact: true,
		component: GeneralSettings,
		icon: SettingsIcon,
	},
	{
		path: "/product_settings",
		exact: true,
		component: AppSettings,
		icon: AppSettingsIcon,
	},
	{
		path: "/registered",
		exact: true,
		component: RegisteredListings,
		icon: RegisteredListingIcon,
	},
	{
		path: "/registered/:id",
		exact: true,
		component: RegisteredListing,
		icon: RegisteredListingIcon,
	},
	{
		path: "/training",
		exact: true,
		component: TrainingHome,
		icon: TrainingIcon,
	},
	{
		path: "/training/:urlTab?",
		exact: true,
		component: TrainingHome,
		icon: TrainingIcon,
	},
	{
		path: "/training/registration/:eventId",
		exact: true,
		component: TrainingRegistrationForm,
		icon: TrainingIcon,
	},
	{
		path: "https://choice.crmls.org/synd",
		exact: true,
		component: null,
		icon: SyndicationIcon,
	},
<<<<<<< HEAD
	// {
	// 	path: "/aor-messages",
	// 	exact: true,
	// 	component: Aor,
	// 	icon: ChatIcon,
	// },
	{
		path: "/aor-messages/:messageId",
		exact: true,
		component: Aor,
		icon: ChatIcon,
	},
	{
		path: "/aor-messages",
		exact: true,
		component: Aor,
		icon: ChatIcon,
	},
	// {
	// 	path: "/aor-messages/:messageId",
	// 	exact: true,
	// 	component: RegisteredListing,
	// 	icon: ChatIcon,
	// },
=======
	{
		path: "/admin",
		exact: true,
		component: AdminHome,
		icon: ChatIcon,
	},
	{
		path: "/admin/:urlTab?/:id?",
		exact: true,
		component: AdminHome,
		icon: ChatIcon,
	},
>>>>>>> dev-1
	{
		path: "/profile",
		exact: true,
		component: Profile,
		icon: SettingsIcon,
	},
	{
		path: "/articles/",
		exact: true,
		component: NewsArticles,
		icon: AcademicCapIcon,
	},
	{
		path: "/article/:articleId",
		exact: true,
		component: NewsArticle,
		icon: AcademicCapIcon,
	},
	{
		path: "/notifications",
		exact: true,
		component: Notifications,
		icon: AcademicCapIcon,
	},
	{
		path: "/system-notifications",
		exact: true,
		component: SystemNotifications,
		icon: AcademicCapIcon,
	},
	{
		path: "/password-change",
		exact: true,
		component: PasswordChange,
		menu: "static",
	},
<<<<<<< HEAD
	// roster links
	{
		path: "/offices",
		exact: true,
		component: Offices,
		icon: OfficeIcon,
		menu: "submenu",
	},
	{
		path: "/offices/view/:id",
		exact: true,
		component: Office,
		icon: OfficeIcon,
		menu: "none",
	},
	{
		path: "/offices/edit/:id",
		exact: true,
		component: Office,
		icon: OfficeIcon,
		menu: "none",
	},
	{
		path: "/offices/new",
		exact: true,
		component: Office,
		icon: OfficeIcon,
		menu: "submenu",
	},
	{
		path: `/brokerageFirms/view/:id`,
		exact: true,
		component: BrokerageFirm,
		icon: OfficeIcon,
		menu: "submenu",
	},
	{
		path: `/brokerageFirms/edit/:id`,
		exact: true,
		component: BrokerageFirm,
		icon: OfficeIcon,
		menu: "submenu",
	},
	{
		path: `/brokerageFirms/new`,
		exact: true,
		component: BrokerageFirm,
		icon: OfficeIcon,
		menu: "submenu",
	},
	{
		path: "/contacts",
		exact: true,
		component: Contacts,
		icon: PersonIcon,
		menu: "submenu",
	},
	{
		path: "/newContact",
		exact: true,
		component: NewContact,
		icon: PersonIcon,
		menu: "submenu",
	},
	{
		path: "/contacts/edit/:id",
		exact: true,
		component: Contact,
		icon: PersonIcon,
		menu: "submenu",
	},
	{
		path: "/contacts/new",
		exact: true,
		component: Contact,
		icon: PersonIcon,
		menu: "submenu",
	},
	{
		path: "/members",
		exact: true,
		component: Members,
		icon: MemberIcon,
		menu: "submenu",
	},
	{
		path: "/members/edit/:id",
		exact: true,
		component: Member,
		icon: MemberIcon,
		menu: "submenu",
	},
	{
		path: "/members/new",
		exact: true,
		component: Member,
		icon: MemberIcon,
		menu: "submenu",
	},
	{
		path: "/newMember",
		exact: true,
		component: NewMember,
		icon: PersonIcon,
		menu: "submenu",
	},
	{
		path: `/brokerageFirms`,
		exact: true,
		component: BrokerageFirms,
		icon: OfficeIcon,
		menu: "submenu",
	},
	{
		path: `/dbas`,
		exact: true,
		component: DBAs,
		icon: AcademicCapIcon,
		menu: "submenu",
	},
	{
		path: `/dbas/new`,
		exact: true,
		component: IDBA,
		icon: AcademicCapIcon,
		menu: "submenu",
	},
	{
		path: `/dbas/edit/:id`,
		exact: true,
		component: IDBA,
		icon: AcademicCapIcon,
		menu: "submenu",
	},
	{
		path: `/dbas/new`,
		exact: true,
		component: IDBA,
		icon: AcademicCapIcon,
		menu: "submenu",
	},
	{
		path: `/licenses`,
		exact: true,
		component: Licenses,
		icon: RegisteredListingIcon,
		menu: "submenu",
	},
	{
		path: `/licenses/edit/:id`,
		exact: true,
		component: License,
		icon: RegisteredListingIcon,
		menu: "submenu",
	},
	{
		path: `/brokerTeams`,
		exact: true,
		component: Teams,
		icon: PersonIcon,
		menu: "submenu",
	},
	{
		path: `/brokerTeams/new`,
		exact: true,
		component: () => <Team />,
		icon: PersonIcon,
		menu: "submenu",
	},
	{
		path: `/brokerTeams/edit/:id`,
		exact: true,
		component: () => <Team />,
		icon: PersonIcon,
		menu: "submenu",
=======
	{
		path: "/compliance-report",
		exact: true,
		component: CreateReport,
		icon: ExclamationCircleIcon,
		menu: "static",
	},
	{
		path: "/compliance-report/:listingId",
		exact: true,
		component: CreateReport,
		icon: ExclamationCircleIcon,
>>>>>>> dev-1
	},
];

// Public routes
export const publicRoutes: routeObject[] = [
	{
		title: "Home",
		path: "/",
		exact: true,
		component: PublicDashboard,
		icon: HomeIcon,
		menu: "main",
		viewOrder: 1,
	},
	{
		path: "/login/:association?",
		exact: true,
		component: LoginPage,
		menu: "static",
	},
	{
		path: "/forgot-password",
		exact: true,
		component: ForgotPassword,
		menu: "static",
	},
	{
		path: "/logout",
		exact: true,
		component: Logout,
		icon: SettingsIcon,
	},
	{
		path: "/logged-out",
		exact: true,
		component: LoggedOut,
		icon: SettingsIcon,
		menu: "static",
	},
	{
		path: "/password-reset/:resetToken?",
		exact: true,
		component: PasswordReset,
		menu: "static",
	},
	{
		path: "/callback",
		exact: true,
		component: DashboardLoader,
		menu: "static",
	},
<<<<<<< HEAD

=======
>>>>>>> dev-1
	// Quick links
	{
		title: "Brokers",
		path: "https://go.crmls.org/brokers/",
		color: "bg-yellow-500",
		target: "_blank",
		menu: "quicklink",
		viewOrder: 1,
	},
	{
		title: "Compliance",
		path: "https://go.crmls.org/compliance/",
		color: "bg-red-500",
		target: "_blank",
		menu: "quicklink",
		viewOrder: 2,
	},
	{
		title: "Education",
		path: "https://go.crmls.org/education/",
		color: "bg-purple-500",
		target: "_blank",
		menu: "quicklink",
		viewOrder: 3,
	},
	{
		title: "Knowledgebase",
		path: "https://kb.crmls.org/",
		color: "bg-blue-500",
		target: "_blank",
		menu: "quicklink",
		viewOrder: 4,
	},
	{
		title: "Marketplace",
		path: "https://go.crmls.org/marketplace/",
		color: "bg-green-500",
		target: "_blank",
		menu: "quicklink",
		viewOrder: 5,
	},
	{
		title: "Support",
		path: "https://go.crmls.org/support/",
		color: "bg-pink-500",
		target: "_blank",
		menu: "quicklink",
		viewOrder: 6,
	},
];

// Filter out any public routes where paths don't exist in authorized routes - public routes should be accessible after logging in
<<<<<<< HEAD
const tempPublicRoutes = publicRoutes.filter(
	(publicRoute) =>
		publicRoute.menu !== "quicklink" &&
		!authRoutes.find((authRoute) => authRoute.path === publicRoute.path)
);
=======
const tempPublicRoutes = publicRoutes.filter((publicRoute) => publicRoute.menu !== "quicklink" && !authRoutes.find((authRoute) => authRoute.path === publicRoute.path));
>>>>>>> dev-1
export const tempRoutes: routeObject[] = [...tempPublicRoutes, ...authRoutes];
