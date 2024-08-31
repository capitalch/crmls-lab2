import ReactTooltip from "react-tooltip";

export function ThemeTooltip() {	
	return <ReactTooltip type="light" effect="solid" border={true} borderColor="gray" html={true} className="text-left" />;
}

export function rebuildTooltips () {
	ReactTooltip.rebuild();
};
<<<<<<< HEAD
=======

export function hideTooltips () {
	ReactTooltip.hide();
};
>>>>>>> dev-1
