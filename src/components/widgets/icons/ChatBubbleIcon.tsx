import { ChatAlt2Icon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";

const ChatBubbleIcon = ({supportLink}: {supportLink: string | undefined}) => {
	return supportLink ? (
		<div className="fixed bottom-24 sm:bottom-4 right-4">
			<NavLink to={{ pathname: supportLink }} target="_blank">
				<div className="relative rounded-lg border border-divider bg-primary px-2 py-1 shadow-sm flex items-center space-x-3 shadow-lg sm:px-4 sm:py-3 text-primary">
					<div className="flex-shrink-0">
						<div className="h-6 w-6 sm:h-10 sm:w-10 rounded-full flex justify-items-center">
							<ChatAlt2Icon className="text-crmls-blue" />
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<span className="absolute inset-0" aria-hidden="true" />
						<p className="text-sm font-medium">Support</p>
						<p className="hidden text-sm truncate xl:block">Questions? We're here to help.</p>
					</div>
				</div>
			</NavLink>
		</div>
	) : (
		<></>
	);
};

export default ChatBubbleIcon;
