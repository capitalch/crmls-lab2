import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userProfile } from "../user/selectors";

declare global {
	interface Window {
		_hsq: any;
	}
}


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

export const BillboardSection = (isScript: boolean, template: string) => {
	return [
		{
			id: "billboard-ad",
			name: "Advertisement",
			bgClass: "bg-primary bg-opacity-100",
			component: "advertisement",
			content: <AdDisplay type="dashboard-billboard" wrapperClass="flex justify-center items-center" isScript={isScript} template={template} />,
			locked: true,
		},
	];
};

export const AdDisplay = ({ type, wrapperClass, isScript, template, showOverlay, callback }: { type: string, wrapperClass?: string; isScript?: boolean; template?: string; showOverlay?: boolean; callback?: () => void }) => {
	const [templateContent, setTemplateContent] = useState<string>();
    useEffect(() => {
		let templateCode : string | undefined = template;
		if (isScript && templateCode) {
			if (type === 'dashboard-billboard') {
				// check if we should display the mobile dpid, or billboard dpid
				const { innerWidth: width } = window;
				if (width <= 480) {
					templateCode = templateCode.replace("billboard-", "mobilebillboard-");
				}
			}
			if (type === 'mobile-spotlight-ad') {
				templateCode = templateCode.replace("spotlight-ad", type);
			}
			eval(templateCode);
		} else {
			setTemplateContent(templateCode)
		}
    }, []);

    return (
        <div className={wrapperClass ?? ""}>
            {showOverlay && <div className="absolute top-0 left-0 w-full h-full z-10" onClick={callback}></div>}
            <div id={type} dangerouslySetInnerHTML={{ __html: templateContent ?? '' }}></div>
        </div>
    );
};

export const AdIdentity = () => {
	const profile = useSelector(userProfile);	

	useEffect(() => {
		// IMPORTANT! The script file (located in index.html) must be loaded for the below indentification step to work.
		// See steps 1 and 2 in the implementation guide for more information:
		// https://docs.google.com/document/d/1p5cBTgysk2oHsGAdqRbpj6IRE5bhF5fIuNpT5fPq-dQ
		if (profile.memberEmail) {
			var _hsq = (window._hsq = window._hsq || []);
			_hsq.push([
				"identify",
				{
					email: profile.memberEmail
				},
			]);
			_hsq.push(["trackPageView"]);
		}
	}, [profile]);

	return <></>;
}
