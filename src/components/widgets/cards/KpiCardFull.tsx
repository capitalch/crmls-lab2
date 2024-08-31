import { ArrowSmDownIcon, ArrowSmUpIcon, TemplateIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { KpiCardEntity, KpiEntity } from "../../../features/dashboard/DashboardSlice";

export const KpiCardFull = ({ kpi, itemId }: KpiCardEntity) => {
	const [kpiIcon, setKpiIcon] = useState<any>();

	function classNames(...classes: any) {
		return classes.filter(Boolean).join(" ");
	}

	const checkIfImageExists = (url: string, callback: (exists: boolean) => void) => {
		const img = new Image();
		img.src = url;

		if (img.complete) {
			callback(true);
		} else {
			img.onload = () => {
				callback(true);
			};

			img.onerror = () => {
				callback(false);
			};
		}
	};

	useEffect(() => {
		if (kpi.iconUrl) {
			// Make sure the iconUrl image exists - fallback to default icon if not
			checkIfImageExists(kpi.iconUrl, (exists) => {
				if (exists) {
					setKpiIcon(<img src={kpi.iconUrl} alt={kpi.title ?? "KPI Icon"} />);
				} else {
					setKpiIcon(<TemplateIcon className="w-3 h-3 text-inverse" />);
				}
			});
		} else {
			setKpiIcon(<TemplateIcon className="w-3 h-3 text-inverse" />);
		}
	}, [kpi]);

	const getIconColor = (kpi: KpiEntity) => {
		switch (kpi.changeType) {
			case "increase":
				return "bg-green-600";
			case "decrease":
				return "bg-red-600";
			case "none":
			default:
				return "bg-header bg-opacity-50";
		}
	};

	const getKpiChangeMeasureDisplay = (kpi: KpiEntity) => {
		if (kpi.changeMeasure && kpi.changeType !== "none") {
			return (
				<p className={classNames(kpi.changeType === "increase" ? "text-green-600" : "text-red-600", "flex items-center text-xs font-semibold mt-1")}>
					{kpi.changeType === "increase" ? <ArrowSmUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" /> : <ArrowSmDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />}

					<span className="sr-only">{kpi.changeType === "increase" ? "Increased" : "Decreased"} by</span>
					{kpi.changeMeasure}
				</p>
			);
		}
		return "";
	};

	return (
		<>
			<div className="rounded-lg shadow-xs overflow-hidden bg-primary bg-opacity-90 text-primary mr-3" data-tip={`<p class="text-md font-semibold">${kpi.title}</p><p class="text-xs">${kpi.description}</p>`}>
				<div className="p-4 flex items-center">
					<div className="flex flex-col items-center justify-center mr-4">
						<div className={classNames("inline-flex items-center justify-center p-2 rounded-full w-7 h-7", getIconColor(kpi))}>{kpiIcon}</div>
						{getKpiChangeMeasureDisplay(kpi)}
					</div>
					<div className="w-32">
						<p className="text-xs font-medium text-primary truncate">{kpi.title}</p>
						<p className="text-xl font-semibold text-header truncate">{kpi.measure}</p>
					</div>
				</div>
			</div>
		</>
	);
};
