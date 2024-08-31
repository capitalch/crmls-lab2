import React, {useState} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline";
import {changeRegisteredListingCancellation, selectRegisteredListingById} from "../registeredListing/registeredListingSlice";
import {useAppDispatch} from "../../app/hooks";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {hide} from "./notificationSlice";

const CancellationModal = ({id}: {id: string}) => {
    const [cancellation, setCancellation] = useState<Date|null>(null);
    const [error, setError] = useState<string|null>(null);
    const listing = useSelector((state: RootState) => selectRegisteredListingById(state, id));
    const dispatch = useAppDispatch();
    return (
        <>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Cancel registered listing
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Choose the listing cancellation date.
                        </p>
                        <p className="text-sm text-gray-500">
                            Once you cancel a listing, you can no longer edit it.
                        </p>
                        <p className="pt-2">
                            <input
                                type="date"
                                id="exp_date"
                                onChange={(e) => setCancellation(dayjs(e.target.value).toDate())}
                            />
                        </p>
                        <p>
                            {error && <span className="text-red-800 text-xs">{error}</span>}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                        if (!cancellation) {
                            setError("Cancellation date is required.");
                        } else if (dayjs(cancellation).startOf('day') > dayjs()) {
                            setError("Cancellation must be prior to " + dayjs().format('YYYY-MM-DD'));
                        } else {
                            dispatch(changeRegisteredListingCancellation({listing: listing, date: cancellation})).then(() => dispatch(hide()));
                            setCancellation(null);
                        }
                    }}
                >
                    Cancel Listing
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => {
                        dispatch(hide());
                        setCancellation(null);
                    }}
                >
                    Go Back
                </button>
            </div>
        </>
    );
}

export default CancellationModal;