/* This example requires Tailwind CSS v2.0+ */
import { PlusCircleIcon, TemplateIcon } from "@heroicons/react/solid";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { showSliderView } from "./sideSliderSlice";
import { KpiCard } from "../../components/widgets/cards/KpiCard";
import { KpiEntity } from "./DashboardSlice";
import { getKpis } from "../../adapters";
import { useSelector } from "react-redux";
import { selectDashPrefs } from "../user/selectors";
import { RectangleLoader } from "../../components/widgets/SkeletonScreens";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { setUserPrefs } from "../user/userPrefsSlice";
import { KpiCardFull } from "../../components/widgets/cards/KpiCardFull";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
<<<<<<< HEAD
import { rebuildTooltips } from "../../components/settings/theme/ThemeTooltip";
=======
import { hideTooltips, rebuildTooltips } from "../../components/settings/theme/ThemeTooltip";
>>>>>>> dev-1

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

export default function UserKpis() {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [kpis, setKpis] = useState<any[]>([]);
	const [kpiSections, setKpiSections] = useState<any[]>([]);
	const dashboardPrefs = useSelector(selectDashPrefs);
	const [error, setError] = useState<any>();
	const [kpiView, setKpiView] = useState<string>();
	const { disableScroll, enableScroll } = usePreventBodyScroll();

	useEffect(() => {
		getKpis()
			.then((response) => {
				setKpis(response.data.results);
			})
			.then(() => {
				setIsLoading(false);
				rebuildTooltips();
			})
			.catch((e: Error) => setError(e));
	}, []);

	useEffect(() => {
		setKpiView(dashboardPrefs.kpis?.view ?? "card");
	}, [dashboardPrefs]);

	const getKpiChangeType = (kpi: KpiEntity) => {
		if (kpi.changeMeasure) {
			if (kpi.changeMeasure.charAt(0) === "+") return "increase";
			if (kpi.changeMeasure.charAt(0) === "-") return "decrease";
		}
		return "none";
	};

	useEffect(() => {
		if (dashboardPrefs) {
			const kpiDisplay: any[] = [];
			let order = 1;
			// kpis = Array(50).fill(kpis[0]);
			// const tmpStatus = ["-2.0%", "+4.3%", "+10%", "-3.5%", "+6.4%", "-3.1%"];
			kpis.forEach((kpi: KpiEntity) => {
				// kpi.changeMeasure = tmpStatus[Math.floor(Math.random() * tmpStatus.length)];
				let kpiConfig = dashboardPrefs?.kpis && dashboardPrefs?.kpis[kpi.kpiDefinitionID] ? dashboardPrefs?.kpis[kpi.kpiDefinitionID] : null;
				kpiDisplay.push({
					kpiDefinitionID: kpi.kpiDefinitionID,
					title: kpi.title,
					description: kpi.description,
					show: kpiConfig?.show ?? true,
					order: kpiConfig?.order ?? kpi.viewOrder ?? order,
					changeType: getKpiChangeType(kpi),
					measure: kpi.measure,
					changeMeasure: kpi.changeMeasure,
					iconUrl: kpi.iconUrl ?? null,
				});
				order++;
			});
			setKpiSections(kpiDisplay.filter((kpi) => kpi.show === true));
		}
	}, [dashboardPrefs, kpis]);

	const openSidePanel = (panelView: string) => {
		dispatch(
			showSliderView({
				showSlider: true,
				view: panelView,
			})
		);
	};

	const toggleKpiView = () => {
		const newKpiView = kpiView === "icon" ? "card" : "icon";

		// Store selected kpi view to profile
		dispatch(
			setUserPrefs({
				key: "dashboardSettings.kpis.view",
				value: newKpiView,
			})
		);
<<<<<<< HEAD
=======
		hideTooltips();
>>>>>>> dev-1
		setKpiView(newKpiView);
	};

	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	return isLoading ? (
		<RectangleLoader />
	) : (
		<>
			<div className="absolute top-4 right-4 flex items-end align-center">
				<div data-place="left" data-tip="Change View">
					<TemplateIcon className="h-5 w-5 hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" onClick={toggleKpiView} />
				</div>
				<div data-place="left" data-tip="Manage Statistics">
					<PlusCircleIcon className="h-5 w-5 hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" onClick={() => openSidePanel("kpis")} />
				</div>
			</div>
			<div className="relative mx-auto">
				{kpiSections.length > 0 ? (
					<div className={`pt-3 w-full ${kpiView === "card" ? "h-24" : "h-16"}`} onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
						<ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
							{kpiSections
								.sort((a, b) => a.order - b.order)
								.map((item: KpiEntity, v) => {
									if (kpiView === "card") {
										return <KpiCardFull itemId={"kpi" + v} key={item.kpiDefinitionID} kpi={item} />;
									} else {
										return <KpiCard itemId={"kpi" + v} key={item.kpiDefinitionID} kpi={item} />;
									}
								})}
						</ScrollMenu>
					</div>
				) : (
					<div className="flex w-full justify-center h-24">
						<div className="flex flex-col justify-center items-center">
							<TemplateIcon className="h-8 w-8" />
							<p className="text-lg">No KPIs Found</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

function Arrow({ children, disabled, onClick }: { children: React.ReactNode; disabled: boolean; onClick: VoidFunction }) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			style={{
				cursor: "pointer",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				right: "1%",
				opacity: disabled ? "0" : "1",
				userSelect: "none",
			}}
		>
			{children}
		</button>
	);
}

export function LeftArrow() {
	const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } = useContext(VisibilityContext);
	const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isFirstItemVisible);
		}
	}, [isFirstItemVisible, visibleItemsWithoutSeparators]);

	return (
		<Arrow disabled={disabled} onClick={() => scrollPrev()}>
			<div
				style={{
					marginRight: "6px",
					width: "0",
					height: "0",
					borderTop: "24px solid transparent",
					borderBottom: "24px solid transparent",
					borderRight: "13px solid white",
				}}
				className="opacity-50 hover:opacity-100"
			></div>
		</Arrow>
	);
}

export function RightArrow() {
	const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = useContext(VisibilityContext);
	const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isLastItemVisible);
		}
	}, [isLastItemVisible, visibleItemsWithoutSeparators]);

	return (
		<Arrow disabled={disabled} onClick={() => scrollNext()}>
			<div
				style={{
					marginLeft: "6px",
					width: "0",
					height: "0",
					borderTop: "24px solid transparent",
					borderBottom: "24px solid transparent",
					borderLeft: "13px solid white",
				}}
				className="opacity-50 hover:opacity-100"
			></div>
		</Arrow>
	);
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

	if (isThouchpad) {
		ev.stopPropagation();
		return;
	}

	if (ev.deltaY < 0) {
		apiObj.scrollNext();
	} else if (ev.deltaY > 0) {
		apiObj.scrollPrev();
	}
}

const preventDefault = (ev: Event) => {
	if (ev.preventDefault) {
		ev.preventDefault();
	}
	ev.returnValue = false;
};

const enableBodyScroll = () => {
	document && document.removeEventListener("wheel", preventDefault, false);
};

const disableBodyScroll = () => {
	document &&
		document.addEventListener("wheel", preventDefault, {
			passive: false,
		});
};

function usePreventBodyScroll() {
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		hidden ? disableBodyScroll() : enableBodyScroll();

		return enableBodyScroll;
	}, [hidden]);

	const disableScroll = useCallback(() => setHidden(true), []);
	const enableScroll = useCallback(() => setHidden(false), []);
	return { disableScroll, enableScroll };
}
