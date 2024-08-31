import React from "react";
import {useAppDispatch} from "../../app/hooks";
import {push} from "connected-react-router";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {userProfile} from "../user/selectors";
import {show} from "../notification/notificationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {faBan, faPen} from "@fortawesome/pro-solid-svg-icons";

const RegListingsButtons = ({listing}: any) => {
    const profile = useSelector(userProfile);
    const dispatch = useAppDispatch();
    const disabled = listing.cancellationDate || listing.promotedDate || listing.promotedMlsId || dayjs(listing.expirationDate).add(7, 'days') < dayjs();

    const handleCancelClick = () => {
        dispatch(show(
            {
                show: true,
                status: 'cancel',
                title: listing.id,
                message: '',
                position: 'modal',
                autoHide: false,
                confirm: false,
                notificationId: null
        }))
    }

    const handlePromoteClick = () => {
        dispatch(show(
            {
                show: true,
                status: 'promote',
                title: listing.id,
                message: '',
                position: 'modal',
                autoHide: false,
                confirm: false,
                notificationId: null
            }))
    }

    return (
        <>
            <span className="relative z-0 inline-flex shadow-sm rounded-sm">
                <button
                    title="Edit"
                    type="button"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-sm border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:cursor-not-allowed"
                    onClick={() => {
                        dispatch(push(`/registered/${listing.id}`))
                    }}
                >
                    <span className="sr-only">Edit</span>
                    <FontAwesomeIcon style={{color: 'blue'}} icon={faPen} />
                </button>
                {['CRM','CN','CRP','CRF'].includes(profile.originatingSystemID) &&
                    <button
                        title="Send to MLS. Once you send a Registered listing to the MLS, its status changes to “Incomplete” in the MLS."
                        type="button"
                        className="relative inline-flex items-center px-2 py-2 border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:cursor-not-allowed"
                        onClick={() => handlePromoteClick()}
                        disabled={disabled}
                    >
                        <span className="sr-only">Send to MLS</span>
                        <FontAwesomeIcon style={{color: 'green'}} icon={faPaperPlane} />
                    </button>
                }
                <button
                    title="Change registered status to Cancelled. Once you cancel a registered listing, you can no longer edit the registered information."
                    type="button"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-sm border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:cursor-not-allowed"
                    onClick={() => handleCancelClick()}
                    disabled={disabled}
                >
                    <span className="sr-only">Cancel</span>
                    <FontAwesomeIcon style={{color: 'red'}} icon={faBan} />
                </button>
            </span>
        </>
    );
}

export default RegListingsButtons;
