import React from "react";

const NotificationSettings = () => {
    return (
        <>
            <div
                className="border-b border-default px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                        Notification Settings
                    </h1>
                </div>
            </div>
            <div className="border-b border-default px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <form className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                            <div>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    We'll always let you know about important changes and events, but you pick what else you want to hear about.
                                </p>
                            </div>
                            <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                                <div className="pt-6 sm:pt-5">
                                    <div role="group" aria-labelledby="label-email">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                                            <div>
                                                <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">
                                                    By Email
                                                </div>
                                            </div>
                                            <div className="mt-4 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg space-y-4">
                                                    <div className="relative flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input id="comments" name="comments" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-medium text-gray-700">Marketing</label>
                                                            <p className="text-gray-500">Get MLS marketing notifications.</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5">
                                                                <input id="candidates" name="candidates" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label htmlFor="candidates" className="font-medium text-gray-700">Holiday Emails</label>
                                                                <p className="text-gray-500">Get notified of upcoming holidays or shortened work days.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5">
                                                                <input id="offers" name="offers" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label htmlFor="offers" className="font-medium text-gray-700">Training</label>
                                                                <p className="text-gray-500">Get notified of upcoming training opportunities.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 sm:pt-5">
                                    <div role="group" aria-labelledby="label-notifications">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                                            <div>
                                                <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-notifications">
                                                    Push Notifications
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <div className="max-w-lg">
                                                    <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                                    <div className="mt-4 space-y-4">
                                                        <div className="flex items-center">
                                                            <input id="push_everything" name="push_notifications" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                                                            <label htmlFor="push_everything" className="ml-3 block text-sm font-medium text-gray-700">
                                                                Everything
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="push_email" name="push_notifications" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                                                            <label htmlFor="push_email" className="ml-3 block text-sm font-medium text-gray-700">
                                                                Same as email
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="push_nothing" name="push_notifications" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                                                            <label htmlFor="push_nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                                                No push notifications
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Cancel
                            </button>
                            <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default NotificationSettings;