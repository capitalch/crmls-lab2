import { useState, useEffect } from "react";
import Tab from "./Tab";
import { useAppDispatch } from "../../app/hooks";
import { selectPersistenceByPath, setSessionPref } from "../../features/user/persistenceSlice";
import { useHistory, useParams } from "react-router";
import { convertUrlToString } from "../../util/helpers";

const Tabs = ({ section, activeTab, setActiveTab, persist, children, rootPath, badges }: { section?: string; activeTab?: string | undefined; setActiveTab?: (tab: string) => void; persist?: boolean; children: any; rootPath?: string; badges?: any[] }) => {
	const dispatch = useAppDispatch();
	const usePersistence = persist ?? true;
	const tabPersistenceKey = section && usePersistence ? [section, "tabs", "active"].join(".") : "";
	const [currentTab, setCurrentTab] = useState(activeTab);
	const [backBtnClick, setBackBtnClick] = useState(false);
	const history = useHistory();
	const { urlTab } = useParams<{ urlTab: string }>();
	const defaultTab = activeTab ?? children[0].props["data-label"];

	useEffect(() => {
		return () => {
			// Fix for browser back button double click issue
			// prevent pushing to history when returning to a previous tab
			if (history.action === "POP") {
				setBackBtnClick(true);
			}
		};
	});

	useEffect(() => {
		if (activeTab) {
			setCurrentTab(activeTab);
		} else if (urlTab) {
			setCurrentTab(convertUrlToString(urlTab));
		} else {
			setCurrentTab(section && usePersistence ? selectPersistenceByPath(tabPersistenceKey) ??  defaultTab : defaultTab);
		}
	}, [activeTab, urlTab]);

	useEffect(() => {
		if (rootPath && currentTab) {
			if (!backBtnClick) {
				history.push(
					rootPath +
						"/" +
						currentTab
							.toLowerCase()
							.replace(/\s+/g, "-")
							.replace(/[^\w-]+/g, "")
				);
			}
		}
		if (section && usePersistence) {
			dispatch(
				setSessionPref({
					key: tabPersistenceKey,
					value: currentTab,
				})
			);
		}
	}, [currentTab]);

	const onClickTabItem = (tab: string) => {
		setCurrentTab(tab);
		if (setActiveTab) {
			setActiveTab(tab);
		}
		setBackBtnClick(false);
	};

	return (
		<div className="crmls-tabs">
			<ol className="crmls-tab-list">
				{children.map((child: any) => {
					let tabBadge = null;
					if (badges && badges.length > 0) {
						tabBadge = badges.find(badge => badge.tab === child.props["data-label"]);
					}
					return <Tab activeTab={currentTab} key={child.props["data-label"]} label={child.props["data-label"]} onClick={onClickTabItem} badge={tabBadge ?? tabBadge?.badge} />;
				})}
			</ol>
			<div className="crmls-tab-content">
				{children.map((child: any) => {
					return (
						<div key={child.props["data-label"]} hidden={child.props["data-label"] !== currentTab}>
							{child.props.children}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Tabs;
