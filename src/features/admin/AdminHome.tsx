import ContentContainer from "../../components/content/ContentContainer";
import Tabs from "../../components/tabs/Tabs";
import MemberInsights from "./MemberInsights/MemberInsights";
import Articles from "./Articles/Articles";
import Messages from "./Messages/Messages";
import ClassifiedAssets from "./ClassifiedAssets/ClassifiedAssets";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { userProfile } from "../user/selectors";
import { useSelector } from "react-redux";
import { GenericBadge } from "../../components/widgets/alerts/AlertElements";
import { ThemeTooltip } from "../../components/settings/theme/ThemeTooltip";

const AdminHome = (props: any) => {
	const { path } = props.match;
	const profile = useSelector(userProfile);
	const history = useHistory();
	const [showAdmin, setShowAdmin] = useState(true);
	const [isBroker, setIsBroker] = useState(false);
	const [confidentialDocsData, setConfidentialDocsData] = useState<any>({ url: process.env.REACT_APP_CONFIDENTIAL_DOCS_AOR_URL, password: process.env.REACT_APP_CONFIDENTIAL_DOCS_AOR_PASSWORD, image: process.env.REACT_APP_CONFIDENTIAL_DOCS_AOR_IMAGE });

	useEffect(() => {
		if (path === "/aor-messages") {
			history.push("/admin");
			setShowAdmin(false);
		}

		return () => {
			setShowAdmin(true);
		};
	}, []);

	useEffect(() => {
		// If the user is a broker, set the title to "Broker Center" and set the classified assets data accordingly
		if (["CB", "DB", "DN"].includes(profile?.userclass)) {
			setIsBroker(true);
			setConfidentialDocsData({ url: process.env.REACT_APP_CONFIDENTIAL_DOCS_BROKER_URL, password: process.env.REACT_APP_CONFIDENTIAL_DOCS_BROKER_PASSWORD, image: process.env.REACT_APP_CONFIDENTIAL_DOCS_BROKER_IMAGE });
		}
	}, [profile]);

	const buildTabContent = () => {
		let tabs = [
			<div key="messages" data-label="Messages">
				<div className="mt-4">
					<Messages />
				</div>
			</div>,
			<div key="member-insights" data-label="Member Insights">
				<div className="mt-4">
					<MemberInsights />
				</div>
			</div>,
		];

		// Brokers should not see the articles management tab
		if (!isBroker) {
			tabs.push(
				<div key="articles" data-label="Articles">
					<div className="mt-4">
						<Articles />
					</div>
				</div>
			);
		}

		// Only show the confidential documents tab if the user is not from SWL or NAB
		if (!["SWL", "NAB"].includes(profile.originatingSystemID) && confidentialDocsData.url && confidentialDocsData.password) {
			tabs.push(
				<div key="confidential-documents" data-label="Confidential Documents">
					<div className="mt-4">
						<ClassifiedAssets url={confidentialDocsData.url} password={confidentialDocsData.password} image={confidentialDocsData.image} isBroker={isBroker} />
					</div>
				</div>
			);
		}

		return tabs;
	};

	return showAdmin ? (
		<ContentContainer title={isBroker ? "Broker Center" : "AOR Center"} actions={null}>
			<Tabs section="admin" children={buildTabContent()} rootPath={path.replace("/:urlTab?/:id?", "")} badges={[{tab: "Member Insights", badge: <GenericBadge title="New!" className="bg-red-500 absolute top-0 right-0" />}]} />
			<ThemeTooltip />
		</ContentContainer>
	) : (
		<></>
	);
};

export default AdminHome;
