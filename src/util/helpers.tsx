import { RegisteredListingPayload } from "../features/registeredListing/selectors";
import { UserManagerSettings, WebStorageStateStore } from "oidc-client";
import {
	AdjustmentsIcon,
	MailOpenIcon,
	UserIcon,
} from "@heroicons/react/outline";
import { FC } from "react";
import dayjs from "dayjs";

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

type statusType = {
	valueID: number;
	lookupGroupID: number;
	displayOrder: number;
	longValue: string;
	shortValue: string;
	standardYN: boolean;
};

export const settingsIcons: { [key: string]: FC<{ className: string }> } = {
	general: AdjustmentsIcon,
	notification: MailOpenIcon,
	application: AdjustmentsIcon,
	profile: UserIcon,
};

export const standardStatusMap: statusType[] = [
	{
		valueID: 1,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Registered",
		shortValue: "A",
		standardYN: true,
	},
	{
		valueID: 2,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Active Under Contract",
		shortValue: "U",
		standardYN: true,
	},
	{
		valueID: 5,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Hold",
		shortValue: "H",
		standardYN: true,
	},
	{
		valueID: 6,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Canceled",
		shortValue: "K",
		standardYN: true,
	},
	{
		valueID: 8,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Pending",
		shortValue: "P",
		standardYN: true,
	},
	{
		valueID: 9,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Closed",
		shortValue: "S",
		standardYN: true,
	},
	{
		valueID: 10,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Withdrawn",
		shortValue: "W",
		standardYN: true,
	},
	{
		valueID: 11,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Expired",
		shortValue: "X",
		standardYN: true,
	},
	{
		valueID: 12,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Deleted",
		shortValue: "Z",
		standardYN: true,
	},
	{
		valueID: 90155,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Incomplete",
		shortValue: "I",
		standardYN: true,
	},
	{
		valueID: 93271,
		lookupGroupID: 1,
		displayOrder: 0,
		longValue: "Coming Soon",
		shortValue: "C",
		standardYN: true,
	},
];

export const prop_types = [
	{
		value: "Resi",
		label: "Residential",
	},
	{
		value: "Land",
		label: "Land",
	},
	{
		value: "Rinc",
		label: "Residential Income",
	},
	{
		value: "Rlse",
		label: "Residential Lease",
	},
	{
		value: "Manu",
		label: "Manufactured in Park",
	},
	{
		value: "Comm",
		label: "Commercial Sale",
	},
	{
		value: "Clse",
		label: "Commercial Lease",
	},
	{
		value: "Busop",
		label: "Business Opportunity",
	},
];

export function propTypeLookupCode(code: string) {
	let p = prop_types.find((o) => o.value === code);

	if (p) {
		return p.label;
	}
	return code;
}

export function propTypeLookupLabel(label: string) {
	let p = prop_types.find((o) => o.label === label);

	if (p) {
		return p.value;
	}
	throw new Error("Invalid property type");
}

export function buildUnparsedAddress(listing: RegisteredListingPayload) {
	let address = [
		listing.streetNumber,
		listing.streetName,
		listing.unitNumber,
		listing.city,
		listing.stateOrProvince,
		listing.postalCode,
	];

	return address.join(" ");
}

type environment =
	| "local"
	| "development"
	| "mmdemo"
	| "mmuat"
	| "testing"
	| "staging"
	| "production"
	| "gsmls"
	| "sso";

export function getEnvironmentFromLocation(): environment {
	if (
		window.location.href.includes("localhost") &&
		process.env.NODE_ENV === "development"
	) {
		return "local";
	} else if (window.location.href.includes("member-dev.crmls.org")) {
		return "development";
	} else if (window.location.href.includes("member-mmdemo")) {
		// Member management demo env
		return "mmdemo";
	} else if (window.location.href.includes("member-mmuat")) {
		// Member management UAT env
		return "mmuat";
	} else if (window.location.href.includes("member-uat.crmls.org")) {
		return "testing";
	} else if (
		window.location.href.includes("staging") ||
		window.location.href.includes("member-preview.crmls.org")
	) {
		return "staging";
	} else if (window.location.href.includes("member.crmls.org")) {
		return "production";
	} else if (window.location.href.includes("member.gsmls.org")) {
		return "gsmls";
	} else if (window.location.href.includes("member.recenterhub.com")) {
		return "sso"; // @note: vk - this will become the new production case when our IDP goes live
	}

	// fail to dev
	return "development";
}

export function generateUserManagerConfig(): UserManagerSettings {
	let redirect_uri, silent_redirect_uri, post_logout_uri;
	let root: string = "";
	let auth: string = "";
	let clientId = "memberPortalUI";
	let environment = getEnvironmentFromLocation();
	const queryParameters = new URLSearchParams(window.location.search);
	let loginAor = queryParameters.get("loginAor");

	// console.log(environment);

	switch (environment) {
		case "local":
			root = "localhost:44332";
			auth = "https://dev-is4ef.azurewebsites.net";
			break;
		case "development":
			root = "member-dev.crmls.org";
			auth = "https://dev-is4ef.azurewebsites.net";
			break;
		case "mmdemo":
			root = "member-mmdemo-app-westus.azurewebsites.net";
			auth = "https://dev-is4ef.azurewebsites.net";
			break;
		case "mmuat":
			root = "member-mmuat-app-westus.azurewebsites.net";
			auth = "https://signin.crmls.org";
			break;
		case "testing":
			root = "member-uat.crmls.org";
			auth = "https://soc.crmls.org";
			break;
		case "staging":
			root = "member-preview.crmls.org";
			auth = "https://soc.crmls.org";
			break;
		case "production":
			root = "member.crmls.org";
			auth = "https://soc.crmls.org";
			break;
		case "gsmls":
			clientId = "oidc-gsmls-member";
			root = "member.gsmls.net";
			auth = "https://dev-gsmls-memberhub-sso-proxy.azurewebsites.net";
			break;
		case "sso": // @note: vk - this will become the new production case when our IDP goes live
			root = "member.recenterhub.com";
			auth = "https://signin.crmls.org";
			break;
	}

	// console.log(auth);
	// console.log(root);

	redirect_uri = `https://${root}/callback`;
	silent_redirect_uri = `https://${root}/silent_renew`;
	post_logout_uri = `https://${root}/logged-out`;

	return {
		client_id: clientId,
		redirect_uri: redirect_uri,
		response_type: "code",
		response_mode: "query",
		scope: "ODataApi openid CrmlsProfile MemberPortalApi offline_access",
		authority: auth,
		silent_redirect_uri: silent_redirect_uri,
		automaticSilentRenew: true,
		filterProtocolClaims: true,
		loadUserInfo: true,
		post_logout_redirect_uri: post_logout_uri,
		monitorSession: false, // this seems to fix logout issue, possibly also related to https://github.com/IdentityModel/oidc-client-js/issues/1319#issuecomment-799944264
		includeIdTokenInSilentRenew: false, // trying this, found at https://github.com/IdentityModel/oidc-client-js/issues/172#issuecomment-593581424
		userStore: new WebStorageStateStore({ store: window.localStorage }), // use local storage - this will allow opening new tabs without being prompted to log in (https://github.com/IdentityModel/oidc-client-js/wiki)
		acr_values: loginAor ? loginAor : "",
	};
}
export function getForgotPasswordUri(): string {
	// https://recoresolutions.atlassian.net/browse/RSTR-847?focusedCommentId=14803
	let forgotPasswordUri: string = "";
	let environment = getEnvironmentFromLocation();

	switch (environment) {
		case "local":
		case "development":
		case "mmdemo":
			forgotPasswordUri = "member-dev.crmls.org";
			break;
		case "mmuat":
		case "testing":
			forgotPasswordUri = "member-uat.crmls.org";
			break;
		case "staging":
			forgotPasswordUri = "member-preview.crmls.org";
			break;
		case "production":
		case "gsmls":
		case "sso":
			forgotPasswordUri = "member.recenterhub.com";
			break;
		default:
			forgotPasswordUri = "member-dev.crmls.org";
			break;
	}

	return forgotPasswordUri;
}

export function convertUrlToString(url: string) {
	let convertedLabel: any[] = [];
	let convertUrlTab = url.split("-");
	convertUrlTab.forEach((word) => {
		if (word.length > 1) {
			convertedLabel.push(word.charAt(0).toUpperCase() + word.slice(1));
		} else {
			convertedLabel.push(word);
		}
	});
	return convertedLabel.join(" ");
}

export function passwordValidation(value: string) {
	// Password must be at least 8 charcters long and contain at least one uppercase, lowercase, number and special character
	if (
		value.length >= 8 &&
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)
	) {
		return true;
	} else {
		return false;
	}
}

export function secondsToReadable(seconds: any) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds - hours * 3600) / 60);
	seconds = seconds - hours * 3600 - minutes * 60;
	if (!!hours) {
		if (!!minutes) {
			return `${hours}h ${minutes}m ${seconds}s`;
		} else {
			return `${hours}h ${seconds}s`;
		}
	}
	if (!!minutes) {
		return `${minutes}m ${seconds}s`;
	}
	return `${seconds} seconds`;
}

export function formatPhoneNumber(number: string) {
	let cleaned = ("" + number).replace(/\D/g, "");
	if (cleaned.length > 10) {
		cleaned = cleaned.substring(0, 10);
	}
	const ret = doFormat(cleaned);
	return ret;

	function doFormat(value: string) {
		const chunks = value.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?$/);
		if (chunks) {
			const formattedChunks = chunks.slice(1).filter(Boolean);
			return formattedChunks.join("-");
		}
		return value;
	}
}

function getHash(s: string) {
	var h = 0,
		l = s.length,
		i = 0;
	if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
	return h;
}
export { getHash };

export function syncFusionDateFormatter(field: string, data: any, column: any) {
	let ret = "";
	if (data[field]) {
		ret = dayjs(data[field]).format("MMM D, YYYY");
	}
	return ret;
}

export function syncFusionNumberFormatter(field: string, data: any) {
	let ret: any = "";
	if (data[field]) {
		ret = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(data[field]);
	}
	return ret;
}

export enum SaveTypesEnum {
	"SaveOnly" = "SaveOnly",
	"SaveAndClose" = "SaveAndClose",
	"SaveAndNew" = "SaveAndNew",
}

export function generateGUIDForNewRecord() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function generateRandomNumberWithCurrentTime() {
	// such that if it is 13:45:30 the number will be 4530
	let currentTime = new Date();
	let minutes = currentTime.getMinutes();
	let seconds = currentTime.getSeconds();
	return minutes * 100 + seconds;
}
