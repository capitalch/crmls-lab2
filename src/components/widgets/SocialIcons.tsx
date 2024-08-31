import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const SocialIcons = () => {
    return (
        <div className="flex flex-row mt-1" role="group">
            <a href="https://www.youtube.com/user/CRMLSTV"
               rel="noreferrer"
               target="_blank"
               className="group flex px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <FontAwesomeIcon className="pr-2" size="2x" icon={['fab', 'youtube-square']} />
            </a>

            <a href="https://www.facebook.com/crmls"
               rel="noreferrer"
               target="_blank"
               className="group flex px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <FontAwesomeIcon className="pr-2" size="2x" icon={['fab', 'facebook-square']} />
            </a>

            <a href="https://www.instagram.com/crmlsnews/"
               rel="noreferrer"
               target="_blank"
               className="group flex px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <FontAwesomeIcon className="pr-2" size="2x" icon={['fab', 'instagram-square']} />
            </a>

            <a href="https://twitter.com/crmlsnews"
               rel="noreferrer"
               target="_blank"
               className="group flex px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <FontAwesomeIcon className="pr-2" size="2x" icon={['fab', 'twitter-square']} />
            </a>

            <a href="https://www.linkedin.com/company/crmls/"
               rel="noreferrer"
               target="_blank"
               className="group flex px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <FontAwesomeIcon className="pr-2" size="2x" icon={['fab', 'linkedin']} />
            </a>
        </div>
    );
}

export default SocialIcons;