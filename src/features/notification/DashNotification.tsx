import { useEffect } from "react";
import { hide, selectNotification } from "./notificationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SystemDashNotification from "../systemNotification/SystemDashNotification";
import { DashAlert } from "../../components/widgets/alerts/AlertElements";

const DashNotification = () => {
	const dispatch = useAppDispatch();
	const notification = useAppSelector(selectNotification);
	let doICare = notification && notification.position === "dash" && notification.show;

	useEffect(() => {
		if (notification.autoHide && doICare) {
			setTimeout(() => {
				dispatch(hide());
			}, notification.autoHide);
		}
	}, [dispatch, notification.autoHide, doICare]);

	if (doICare) {
		return (
			<>
				<SystemDashNotification />
				<DashAlert notification={notification} />
			</>
		);
	}

	return <SystemDashNotification />;
};

export default DashNotification;
