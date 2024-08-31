import React from "react";
import {HomeIcon} from "@heroicons/react/solid";

const Welcome = () => {
    return (
        <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                            <img className="hidden h-16 w-16 rounded-full sm:block"
                                 src="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                                 alt="" />
                                <div>
                                    <div className="flex items-center">
                                        <img className="h-16 w-16 rounded-full sm:hidden"
                                             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                                             alt="" />
                                            <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                                Good morning, Anthony Terranova
                                            </h1>
                                    </div>
                                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                        <dt className="sr-only">Company</dt>
                                        <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            Keller Williams Los Angeles
                                        </dd>
                                        <dt className="sr-only">Account status</dt>
                                        <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            Active Member
                                        </dd>
                                    </dl>
                                </div>
                        </div>
                    </div>
                    <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                        <button type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crmls-blue">
                            <HomeIcon className="mr-2 w-6 h-6" />
                            Manage listings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;