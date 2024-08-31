import { useEffect, useState } from "react";

export const BillboardSectionConfig = () => {
	return [
		{
			id: "billboard-ad",
			name: "Default Content",
			description: "This advertising section is non-configurable",
			locked: true,
		},
	];
};

export const BillboardSection = ({ billboardAd, spotlightAd }: { billboardAd?: any; spotlightAd?: any }) => {
	return [
		{
			id: "billboard-ad",
			name: "Advertisement",
			bgClass: "bg-primary bg-opacity-100",
			component: "advertisement",
			content: (
				<div className="flex flex-wrap justify-center items-center gap-4 lg:flex-nowrap">
					{billboardAd && <AdDisplay type="dashboard-billboard" isScript={billboardAd.isScript} template={billboardAd.template} />}
					{spotlightAd && <AdDisplay type="spotlight-ad" isScript={spotlightAd.isScript} template={spotlightAd.template} />}
				</div>
			),
			locked: true,
		},
	];
};

export const AdDisplay = ({ type, wrapperClass, isScript, template, showOverlay, callback }: { type: string; wrapperClass?: string; isScript?: boolean; template?: string; showOverlay?: boolean; callback?: () => void }) => {
	const [templateContent, setTemplateContent] = useState<string>();
	useEffect(() => {
		let templateCode: string | undefined = template;
		if (isScript && templateCode) {
			if (type === "dashboard-billboard") {
				// check if we should display the mobile dpid, or billboard dpid
				const { innerWidth: width } = window;
				if (width <= 480) {
					templateCode = templateCode.replace("billboard-", "mobilebillboard-");
				}
			}
			if (type === "mobile-spotlight-ad") {
				templateCode = templateCode.replace("spotlight-ad", type);
			}
			eval(templateCode);
		} else {
			setTemplateContent(templateCode);
		}
	}, []);

	return (
		<div className={wrapperClass ?? ""}>
			{showOverlay && <div className="absolute top-0 left-0 w-full h-full z-10" onClick={callback}></div>}
			<div id={type} dangerouslySetInnerHTML={{ __html: templateContent ?? "" }}></div>
		</div>
	);
};
