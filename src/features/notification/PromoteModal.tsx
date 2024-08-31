import {useAppDispatch} from "../../app/hooks";
import {
    promoteRegisteredListing
} from "../registeredListing/registeredListingSlice";
import {BadgeCheckIcon} from "@heroicons/react/outline";
import {hide, show} from "./notificationSlice";

const PromoteModal = ({id}: {id: string}) => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <BadgeCheckIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Confirm sending Listing to MLS
                    </h3>
                    <div className="mt-2" style={{overflowWrap: 'normal'}}>
                        <p className="text-sm text-gray-500">
                            By selecting "Send to MLS", you acknowledge that all information entered to register your listing is accurate and that you have a signed Listing Agreement with the seller. When you click "Send to MLS", all information used to register your listing will go to the MLS system for further input and publication.
                        </p>
                        <p className="text-sm font-semibold text-red-600 pt-2">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={
                        () => {
                            dispatch(promoteRegisteredListing(id))
                                .then(() => dispatch(hide()))
                                .then(() => dispatch(show({
                                        show: true,
                                        status: 'info',
                                        title: 'Registered Listing  has been sent to the MLS',
                                        message: 'We have sent your Registered listing to the MLS. You can find it it in your MLS system where you normally find Incomplete listings. This may vary depending on which MLS system you use.',
                                        position: 'dash',
                                        autoHide: 5000,
                                        confirm: false,
                                        notificationId: null
                                    })
                                ))
                        }
                    }
                >
                    Send to MLS
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => dispatch(hide())}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default PromoteModal;