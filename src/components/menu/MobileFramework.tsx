import React, {Fragment} from "react";
import {Dialog, Transition} from '@headlessui/react';
import {XIcon} from "@heroicons/react/outline";
import MobileNav from "./MobileNav";
import {sidebarOptions} from "../../pages/Main";
import AorLogo from "../../app/AorLogo";
import PublicMobileNav from "../../pages/public/PublicMobileNav";
import PoweredBy from "../content/PoweredBy";

const MobileFramework = ({sidebarOpen, setSidebarOpen, isPublic} : sidebarOptions) => {

    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed inset-0 flex z-40 lg:hidden"
                open={sidebarOpen}
                onClose={setSidebarOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-secondary bg-opacity-75" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-menu border-r border-dark">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-inset ring-primary"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <XIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                                </button>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 flex items-center justify-center px-4">
                            <AorLogo />
                        </div>
                        <div className="mt-5 flex-1 h-0 overflow-y-auto">
                            {isPublic ? <PublicMobileNav /> : <MobileNav />}
                        </div>
                        <div className="flex flex-col items-center justify-center flex-shrink-0 px-4">
                            <PoweredBy />
                        </div>
                    </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default MobileFramework;