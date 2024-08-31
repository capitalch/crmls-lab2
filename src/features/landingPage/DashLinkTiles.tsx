import {
    CameraIcon,
    LockClosedIcon,
    MinusIcon,
    PlusIcon,
    SwitchHorizontalIcon,
    UserCircleIcon
} from "@heroicons/react/solid";
import React, {useState} from "react";

const DashLinkTiles = () => {
    const [show, setShow] = useState(true);
    const tiles = [
        {
            label: "Listing Distribution",
            link: "https://poc-crmls-showingmanagerui.azurewebsites.net/",
            icon: <SwitchHorizontalIcon className="w-8 h-8 pr-2" />,
        },
        {
            label: "Showing Manager",
            link: "https://go.crmls.org/excludelisting",
            icon: <UserCircleIcon className="w-8 h-8 pr-2" />,
        },
        {
            label: "Photo Privacy",
            link: "https://go.crmls.org/welcome-to-crmls/",
            icon: <CameraIcon className="w-8 h-8 pr-2" />,
        },
        {
            label: "My Lock Box",
            link: "https://go.crmls.org/crmls-virtual-classroom-splash-page/",
            icon: <LockClosedIcon className="w-8 h-8 pr-2" />,
        },
    ];

    const buildTiles = () => {
        return tiles.map((t, i) => {
            return (
                <a key={i} href={t.link} target="_blank" rel="noreferrer">
                    <div
                        className="bg-crmls-blue h-12 rounded-md flex items-center justify-center text-white font-bold">
                        {t.icon}
                        {t.label}
                    </div>
                </a>
            );
        });
    }

    return (
        <div className="relative bg-white pt-5 px-4 pb-8 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <span
                className="float-right inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-gray-100 text-gray-800 mb-2"
                onClick={() => setShow(!show)}
            >
              {show && <MinusIcon className="w-4 h-4 pr-2" />}
                {!show && <PlusIcon className="w-4 h-4 pr-2" />}
                Toggle Tiles
            </span>
            <div>
            {show && <div className="grid grid-cols-4 gap-4">
                {buildTiles()}
            </div>}
            </div>
        </div>
    );
}

export default DashLinkTiles;