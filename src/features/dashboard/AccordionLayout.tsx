import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setUserPrefs } from "../user/userPrefsSlice";

const AccordionLayout = ({ settingsKey, title, children, section, className }: { settingsKey?: string | null; title: string; children: any; section: any; className?: string }) => {
	const dispatch = useAppDispatch();
	const [collapsed, setCollapsed] = useState<boolean>();
	const [isPending, setIsPending] = useState<boolean>(false);

	useEffect(() => {
		setCollapsed(section.collapsed || false);
		setIsPending(section.status === "Pending");
	}, [section]);

	const handleSetIndex = () => {
		if (settingsKey) {
			const prefKey = `${settingsKey}.${section.id}.collapsed`;
			dispatch(
				setUserPrefs({
					key: prefKey,
					value: !collapsed,
				})
			);
		}
		setCollapsed(!collapsed);
	};

	function getPendingText() {
		if (isPending) {
			return <span className="bg-yellow-300 w-2.5 h-2.5 mr-4 rounded-full" aria-hidden="true" data-tip={`<p class="text-md font-semibold">Pending</p><p class="text-xs">This section is pending approval and is only visible to admin users.</p>`}></span>;
		}
	}

	return (
		<div className={`relative ${section.locked ? `p-4` : `p-8 ${collapsed ? "sm:py-6" : "sm:py-8"}`} ${className ?? "bg-secondary"}`}>
			{!section.locked ? (
				!collapsed ? (
					<div className="absolute top-4 left-3 flex items-center">
						<ChevronUpIcon className="h-5 w-5 cursor-pointer" aria-hidden={true} onClick={() => handleSetIndex()} />
						{getPendingText()}
					</div>
				) : (
					<div className="absolute top-4 left-3 flex items-center">
						<ChevronDownIcon className="h-5 w-5 cursor-pointer" aria-hidden={true} onClick={() => handleSetIndex()} /> <span className="text-sm font-medium mr-2">{title}</span>
						{getPendingText()}
					</div>
				)
			) : (
				""
			)}
			{(section.locked || !collapsed) && <>{children}</>}
		</div>
	);
};

export default AccordionLayout;
