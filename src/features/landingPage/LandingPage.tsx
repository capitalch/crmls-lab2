import React, {useEffect} from "react";
import StatsWidget from "./StatsWidget";
import DashLinkTiles from "./DashLinkTiles";
import NewsContainer from "./NewsContainer";
import DashCalendar from "./DashCalendar";
import GraphImg from "../Images/basic-line-chart.svg";
import Welcome from "./Welcome";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {show} from "../notification/notificationSlice";
import {useAppDispatch} from "../../app/hooks";

const LandingPage = () => {
    const dispatch = useAppDispatch();
    const { notices } = useSelector((state: RootState) => state.landingPage);

    useEffect(() => {
        dispatch(show({
            show: true,
            title: 'Notice',
            message: 'Listing ABC123 has been flagged for a violation. Please contact your broker or visit the compliance section of this site for more information.',
            status: 'warn',
            position: 'modal',
            autoHide: false,
            confirm: true,
            notificationId: '1'
        }))
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(show({
                show: true,
                title: 'Outage',
                message: 'FlexMLS systems are currently undergoing maintenance. Systems should be back online by 13:00 PST',
                status: 'warn',
                position: 'dash',
                autoHide: false,
                confirm: true,
                notificationId: '2'
            }))
        }, 10000)
    });

    return (
        <>
            <div
                className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                        Home
                    </h1>
                </div>
                <div className="float-right text-sm flex">
                    <div className="pr-2">
                        Live Chat with Support
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                    </svg>
                </div>
            </div>
            <Welcome />
            <StatsWidget />
            <DashCalendar />

            <div className="px-3">
                <DashLinkTiles />
            </div>

            <div className="px-3 mt-3">
                <NewsContainer />
            </div>
        </>
    );
}

export default LandingPage;