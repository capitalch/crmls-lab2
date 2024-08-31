const StatsWidget = () => {
    let message = {
        message: "Major tribble attack on CRMLS servers. Service may be degraded until further notice."
    }
    return (
        <div className="w-full p-4">
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                <div className="relative bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                    <dt>
                        <div className="absolute bg-yellow-500 rounded-md p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">Total Listing Views</p>
                    </dt>
                    <dd className="ml-16 pb-5 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">
                            13,897
                        </p>
                        <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">
                                Increased by
                            </span>
                            122
                        </p>
                    </dd>
                </div>

                <div className="relative bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                    <dt>
                        <div className="absolute bg-red-600 rounded-md p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">Total Showings</p>
                    </dt>
                    <dd className="ml-16 pb-5 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">
                            27
                        </p>
                        <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">
                                Increased by
                            </span>
                            5.4%
                        </p>
                    </dd>
                </div>

                <div className="relative bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                    <dt>
                        <div className="absolute bg-pink-700 rounded-md p-3">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">Positive Showing Reviews</p>
                    </dt>
                    <dd className="ml-16 pb-5 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">
                            96.57%
                        </p>
                        <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">
                                Increased by
                              </span>
                            3.2%
                        </p>
                    </dd>
                </div>

                <div className="relative bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                    <dt>
                        <div className="absolute bg-green-500 rounded-md p-3">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">Avg. Click Rate</p>
                    </dt>
                    <dd className="ml-16 pb-5 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">
                            24.57%
                        </p>
                        <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">
                                Decreased by
                              </span>
                            3.2%
                        </p>
                    </dd>
                </div>

                <div className="relative bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                    <dt>
                        <div className="absolute bg-green-300 rounded-md p-3">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">Offers</p>
                    </dt>
                    <dd className="ml-16 pb-5 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">
                            4
                        </p>
                        <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">
                                Decreased by
                              </span>
                            18%
                        </p>
                    </dd>
                </div>
            </dl>
        </div>
    );
}

export default StatsWidget;