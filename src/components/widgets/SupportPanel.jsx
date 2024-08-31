import { DocumentAddIcon, ChatAlt2Icon, ChatAltIcon, PhoneIcon } from "@heroicons/react/solid";
import { hideTooltips } from "../settings/theme/ThemeTooltip";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userProfile } from "../../features/user/selectors";
import SupportTicketForm from "./forms/SupportTicketForm";
import BaseModal from "./modal/BaseModal";
import { filterOn } from "../../util/ibuki";

export const FeedbackTab = () => {
	const profile = useSelector(userProfile);
	const [showFeedback, setShowFeedback] = useState(false);

	useEffect(() => {
		if (profile && profile.originatingSystemID) {
			// Hide the feedback button for SWL users
			if (["SWL"].includes(profile.originatingSystemID)) {
				setShowFeedback(false);
			} else {
				setShowFeedback(true);
			}
		}
	}, [profile]);

	return showFeedback ? (
		<div className="fixed -right-8 top-1/2 bg-transparent transform rotate-90 z-20">
			<a href="https://go.crmls.org/crmls-user-feedback/" target="_blank" rel="noreferrer">
				<div className="bg-header text-white rounded-b-md cursor-pointer tracking-wide px-2 py-2 opacity-80 hover:opacity-100 flex justify-center items-center -mt-4">
					<ChatAltIcon className="h-6 w-6 mr-1" /> Feedback
				</div>
			</a>
		</div>
	) : (
		<></>
	);
};

export const SupportTabs = (props) => {
	const profile = useSelector(userProfile);
	const [openSupportTicket, setOpenSupportTicket] = useState(false);
	const [openPhoneModal, setOpenPhoneModal] = useState(false);

	// Listeners for support ticket form and chat
	useEffect(() => {
		let supportChatSub, supportTicketSub = undefined;

		supportChatSub = filterOn("openSupportChat").subscribe(() => {
			handleChat();
		});

		supportTicketSub = filterOn("openSupportTicket").subscribe(() => {
			handleSupportTicket();
		});

		return () => {
			supportChatSub && supportChatSub.unsubscribe();
			supportTicketSub && supportTicketSub.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (!window.Genesys) {
			(function (g, e, n, es, ys) {
				g["_genesysJs"] = e;
				g[e] =
					g[e] ||
					function () {
						(g[e].q = g[e].q || []).push(arguments);
					};
				g[e].t = 1 * new Date();
				g[e].c = es;
				ys = document.createElement("script");
				ys.async = 1;
				ys.src = n;
				ys.charset = "utf-8";
				document.head.appendChild(ys);
			})(window, "Genesys", process.env.REACT_APP_GENESYS_SCRIPT_URL, { environment: process.env.REACT_APP_GENESYS_ENVIRONMENT, deploymentId: process.env.REACT_APP_GENESYS_DEPLOYMENT_ID });
		}
	}, []);

	const handleChat = () => {
		// Open genesys chat
		const profileDetails = {
			memberFirstName: profile.memberFirstName,
			memberLastName: profile.memberLastName,
			memberLoginID: profile.member.loginId,
			memberEmail: profile.memberEmail,
			memberAOR: profile.memberAOR,
		};
		window.Genesys("command", "Database.set", {
			messaging: {
				customAttributes: profileDetails,
			},
		});
		window.Genesys(
			"command",
			"Messenger.open",
			{},
			function (o) {},
			function (o) {
				window.Genesys("command", "Messenger.close");
			}
		);
	};

	const handlePhone = () => {
		// Open phone
		setOpenPhoneModal(true);
		hideTooltips();
	};

	const handleSupportTicket = () => {
		// Open support ticket form
		setOpenSupportTicket(true);
		hideTooltips();
	};

	return props.layout === "tabs" ? (
		<>
			<div className="absolute right-16 -top-10 bg-transparent transform">
				<div className="bg-primary text-header rounded-t-md flex justify-center items-center border border-divider border-b-0">
					<div className="p-2 cursor-pointer opacity-80 hover:opacity-100" data-tip="Call" onClick={handlePhone}>
						<PhoneIcon className="h-6 w-6" />
					</div>
					<div className="p-2 cursor-pointer opacity-80 hover:opacity-100" data-tip="Live Chat" onClick={handleChat}>
						<ChatAlt2Icon className="h-6 w-6" />
					</div>
					<div className="p-2 cursor-pointer opacity-80 hover:opacity-100" data-tip="Create Ticket" onClick={handleSupportTicket}>
						<DocumentAddIcon className="h-6 w-6" />
					</div>
				</div>
			</div>
			<SupportTicketForm title="Create Ticket" open={openSupportTicket} setOpen={setOpenSupportTicket} />
			<BaseModal open={openPhoneModal} setOpen={setOpenPhoneModal}>
				<div className="p-4">
					<h3 className="text-lg font-semibold">Call Support</h3>
					<p className="text-sm">
						Please call the support team at <a href={`tel:${props.supportPhone.replace(/\D+/g, "")}`}>{props.supportPhone}</a>.
					</p>
				</div>
			</BaseModal>
		</>
	) : props.layout === "flyout" ? (
		<>
			<div className="fixed bottom-24 sm:bottom-4 right-4 invisible md:visible">
				<div className="relative rounded-lg border border-divider bg-primary px-2 py-1 shadow-sm flex items-center space-x-3 shadow-lg sm:px-4 sm:py-3 text-primary">
					<ul className="support-menu absolute w-full h-full">
						<li className="bg-header cursor-pointer" data-tip="Create Ticket" onClick={handleSupportTicket}>
							<DocumentAddIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
						</li>
						<li className="bg-header cursor-pointer" data-tip="Live Chat" onClick={handleChat}>
							<ChatAlt2Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
						</li>
						<li className="bg-header cursor-pointer" data-tip="Call" onClick={handlePhone}>
							<PhoneIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
						</li>
					</ul>
					<div className="flex-shrink-0">
						<div className="flex justify-items-center">
							<ChatAlt2Icon className="h-6 w-6 sm:h-8 sm:w-8 text-header" />
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<span className="absolute inset-0" aria-hidden="true" />
						<p className="text-sm font-medium">Support</p>
						<p className="hidden text-sm truncate xl:block">Questions? We're here to help.</p>
					</div>
				</div>
			</div>
			<div className="fixed bottom-16 right-4 visible md:invisible w-1/2">
				<div className="flex justify-between">
					<div className="p-2 bg-header rounded-full">
						<PhoneIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white bg-header rounded-full" onClick={handlePhone} />
					</div>
					<div className="p-2 bg-header rounded-full">
						<ChatAlt2Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white bg-header rounded-full" onClick={handleChat} />
					</div>
					<div className="p-2 bg-header rounded-full">
						<DocumentAddIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" onClick={handleSupportTicket} />
					</div>
				</div>
			</div>
			<SupportTicketForm title="Create Ticket" open={openSupportTicket} setOpen={setOpenSupportTicket} />
			<BaseModal open={openPhoneModal} setOpen={setOpenPhoneModal}>
				<div className="p-4">
					<h3 className="text-lg font-semibold">Call Support</h3>
					<p className="text-sm">
						Please call the support team at <a href={`tel:${props.supportPhone.replace(/\D+/g, "")}`}>{props.supportPhone}</a>.
					</p>
				</div>
			</BaseModal>
		</>
	) : (
		<>
			<div className="fixed bottom-24 sm:bottom-4 right-4">
				<div className="relative rounded-lg border border-divider bg-primary px-2 py-1 shadow-sm flex items-center space-x-3 shadow-lg sm:px-4 sm:py-3 text-header">
					<div className="rounded-full flex justify-items-center opacity-80 hover:opacity-100 cursor-pointer" data-tip="Call" onClick={handlePhone}>
						<PhoneIcon className="h-6 w-6" />
					</div>
					<div className="rounded-full flex justify-items-center opacity-80 hover:opacity-100 cursor-pointer" data-tip="Live Chat" onClick={handleChat}>
						<ChatAlt2Icon className="h-6 w-6" />
					</div>
					<div className="rounded-full flex justify-items-center opacity-80 hover:opacity-100 cursor-pointer" data-tip="Create Ticket" onClick={handleSupportTicket}>
						<DocumentAddIcon className="h-6 w-6" />
					</div>
				</div>
			</div>
			<SupportTicketForm title="Create Ticket" open={openSupportTicket} setOpen={setOpenSupportTicket} />
			<BaseModal open={openPhoneModal} setOpen={setOpenPhoneModal}>
				<div className="p-4">
					<h3 className="text-lg font-semibold">Call Support</h3>
					<p className="text-sm">
						Please call the support team at <a href={`tel:${props.supportPhone.replace(/\D+/g, "")}`}>{props.supportPhone}</a>.
					</p>
				</div>
			</BaseModal>
		</>
	);
};
