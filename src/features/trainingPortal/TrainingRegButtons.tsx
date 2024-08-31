import React from "react";
import {CheckCircleIcon, LoginIcon, MinusCircleIcon, XCircleIcon} from "@heroicons/react/solid";
import {useSelector} from "react-redux";
import {
    registerForTrainingClass,
    selectRegistrationByClassId,
    unRegisterFromTrainingClass
} from "./trainingPortalSlice";
import dayjs from "dayjs";
import {formattedProfile} from "../user/selectors";
import {useAppDispatch} from "../../app/hooks";
import {show} from "../notification/notificationSlice";

export const RegisterButton = (memberId: string, classId: string) => {
    const dispatch = useAppDispatch();
    return (
        <span className="relative z-0 inline-flex rounded-sm">
            <button
                title="Register"
                type="button"
                onClick={() => dispatch(registerForTrainingClass({
                        memberId: memberId,
                        classId: classId
                    }))
                    .then((response) => {
                        if (response.payload && response.payload.isSuccessful === false) {
                            let errorMessage = response.payload.message || 'There was a problem with your request.';
                            dispatch(show({
                                show: true,
                                title: 'Error!',
                                message: errorMessage,
                                status: 'error',
                                position: 'popover',
                                autoHide: 5000,
                                confirm: false,
                                notificationId: null
                            }))
                        } else {
                            dispatch(show({
                                show: true,
                                title: 'Success!',
                                message: 'You have successfully registered.',
                                status: 'success',
                                position: 'popover',
                                autoHide: 5000,
                                confirm: false,
                                notificationId: null
                            }))
                        }
                    })
                    .catch((error) => {
                        dispatch(show({
                            show: true,
                            title: 'Error',
                            message: error.message,
                            status: 'error',
                            position: 'popover',
                            autoHide: 6000,
                            confirm: false,
                            notificationId: null
                        }))
                    })}
                className="shadow-sm rounded-md relative inline-flex items-center px-2 py-2 bg-green-600 text-sm font-medium text-white hover:bg-green-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:cursor-not-allowed"
            >
                <span className="sr-only">Register now!</span>
                <LoginIcon className="w-6 pr-2"/>Register now!
            </button>
        </span>
    );
}

export const UnRegisterButton = (id: string) => {
    const dispatch = useAppDispatch();
    return (
        <span className="relative z-0 inline-flex rounded-sm">
            <button
                title="Unregister"
                type="button"
                onClick={() => dispatch(unRegisterFromTrainingClass(id))
                    .then(() => {
                        dispatch(show({
                            show: true,
                            title: 'Success!',
                            message: 'You have successfully unregistered.',
                            status: 'success',
                            position: 'popover',
                            autoHide: 5000,
                            confirm: false,
                            notificationId: null
                        }))
                    })
                    .catch((error) => {
                        dispatch(show({
                            show: true,
                            title: 'Error',
                            message: error.message,
                            status: 'error',
                            position: 'popover',
                            autoHide: 6000,
                            confirm: false,
                            notificationId: null
                        }))
                    })}
                className="shadow-sm rounded-md relative inline-flex items-center px-2 py-2 bg-yellow-600 text-sm font-medium text-white hover:bg-yellow-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:cursor-not-allowed"
            >
                <span className="sr-only">Unregister</span>
                <MinusCircleIcon className="w-6 pr-2"/>Unregister
            </button>
        </span>
    );
}

const TrainingRegButtons = ({classId, seatsLeft}: {classId: string, seatsLeft: number|null|undefined}) => {
    let userProfile = useSelector(formattedProfile);
    let registration = useSelector(selectRegistrationByClassId(classId));

    if (registration) {
        let start = registration.trainingClass?.startTime ? dayjs(registration.trainingClass?.startTime) : false;

        if (start && start < dayjs()) {
            // the class is in the past
            if (registration.wasPresent) {
                return (
                    <span className="relative z-0 inline-flex rounded-sm">
                        <button
                            title="Attended"
                            type="button"
                            disabled={true}
                            className="shadow-sm rounded-md relative inline-flex items-center px-2 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Attended</span>
                            <CheckCircleIcon className="w-6 pr-2"/> Attended
                        </button>
                    </span>
                );
            } else {
                return (
                    <span className="relative z-0 inline-flex rounded-sm">
                        <button
                            title="Did not attend"
                            type="button"
                            disabled={true}
                            className="shadow-sm rounded-md relative inline-flex items-center px-2 py-2 bg-yellow-600 text-sm font-medium text-white focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Did not attend</span>
                            <XCircleIcon className="w-6 pr-2"/> Did Not Attend
                        </button>
                    </span>
                );
            }
        } else {
            if (!registration.unRegisteredOn) {
                return UnRegisterButton(registration.id);
            } else {
                return RegisterButton(userProfile.memberId, classId);
            }
        }
    }

    if (seatsLeft === 0) {
        return (
            <span className="relative z-0 inline-flex rounded-sm">
                <button
                    title="Register"
                    type="button"
                    disabled={true}
                    className="sm:w-full shadow-sm rounded-md relative inline-flex items-center px-2 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:cursor-not-allowed"
                >
                    <span className="sr-only">Full</span>
                    <XCircleIcon className="w-6 pr-2"/> Class Full
                </button>
            </span>
        );
    }

    // if nothing else applies
    return RegisterButton(userProfile.memberId, classId);
}

export default TrainingRegButtons;
