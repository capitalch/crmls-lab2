import { useEffect, useState } from "react";
import { userProfile } from "../features/user/selectors";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

const AorLogo = ({ vertical }: { vertical?: boolean }) => {
	const profile = useSelector(userProfile);
	const [aorLogo, setAorLogo] = useState<any>(<></>);
	const [logoUrl, setLogoUrl] = useState<string>();
	const location = useLocation();
	const association = useParams<{ association: string }>();

	useEffect(() => {
		if (profile?.aor?.logoUrl) {
			setLogoUrl(profile.aor.logoUrl);
		}
	}, [profile]);

	useEffect(() => {
		const urlParts = location.pathname.split("/");
		if (location.pathname.includes("login") && (association || urlParts.length > 1)) {
			const association = location.pathname.split("/").pop();
			switch (association) {
				case "AR":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/Arcadia.png");
					break;
				case "CV":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/Citrus-Valley.png");
					break;
				case "DW":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/Downey.png");
					break;
				case "GSM":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/Greater-Southern-MLS.png");
					break;
				case "JT":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/Joshua-Tree.png");
					break;
				case "LG":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/LagunaBoardofRealtors.png");
					break;
				case "MD":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/Madera.png");
					break;
				case "MP":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/Mariposa-County.png");
					break;
				case "NP":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/NewportBeach.png");
					break;
				case "ND":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/NorthSanDiego.png");
					break;
				case "OC":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/OrangeCounty.png");
					break;
				case "PT":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/PacificSouthwest.png");
					break;
				case "SB":
					setLogoUrl("https://cdn.crmls.org/operations/files/logos/aors/SouthBay.png");
					break;
			}
		}
	}, [association, location]);

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
		let logoTimeout:any;
		if (logoUrl) {
			// Make sure the logoUrl image exists - fallback to CRMLS logo if not
			checkIfImageExists(logoUrl, (exists) => {
				if (exists) {
					setAorLogo(<img src={logoUrl} alt={profile?.aor?.name ?? "AOR Logo"} />);
				}
			});
		} else {
			let defaultImage;
			let defaultCss;
			logoTimeout = setTimeout(() => {
				if (vertical) {
					defaultImage = "https://cdn.crmls.org/operations/files/REcenterhub images/REcenterhub-logoTMFullColorVertical_sm.png";
					defaultCss = "transform h-36";
				} else {
					defaultImage = "https://cdn.crmls.org/operations/files/REcenterhub images/REcenterhub-logoTMFullColorHorizontal_sm.png";
					defaultCss = "transform";
				}
				setAorLogo(<img src={defaultImage} className={defaultCss} alt="REcenterhub" />)
			}, 1000);
		}

		return () => {
			if (logoTimeout) {
				clearTimeout(logoTimeout);
			}
		}
	}, [logoUrl]);

	return aorLogo;
};

export default AorLogo;
