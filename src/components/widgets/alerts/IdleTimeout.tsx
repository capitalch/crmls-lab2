import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import GenericModal from "../modal/GenericModal";
import { useAppDispatch } from "../../../app/hooks";
import { push } from "connected-react-router";
import { secondsToReadable } from "../../../util/helpers";

function IdleTimeout() {
	let environment = process.env.REACT_APP_DEPLOY_ENV;
	const devMode = environment === "local" || environment === "development";
	const dispatch = useAppDispatch();
	const [timeout, setTimeout] = useState(7200000); // Timeout after 2 hours of idle time
	const [promptBeforeIdle, setPromptBeforeIdle] = useState(300000); // show prompt 5 minutes before idle logout
	const [remaining, setRemaining] = useState<number>(timeout);
	const [open, setOpen] = useState<boolean>(false);

	const onIdle = () => {
		setOpen(false);
		dispatch(push("/logout"));
	};

	const onActive = () => {
		setOpen(false);
	};

	const onPrompt = () => {
		setOpen(true);
	};

	const { getRemainingTime, activate } = useIdleTimer({
		onIdle,
		onActive,
		onPrompt,
		timeout,
		promptBeforeIdle,
		throttle: 500,
	});

	useEffect(() => {
		const idleInterval = setInterval(() => {
			setRemaining(Math.ceil(getRemainingTime() / 1000));
		}, 500);

		return () => {
			clearInterval(idleInterval);
		};
	});

	const handleStillHere = () => {
		activate();
	};

	const modalContent = <p>Due to inactivity, your session will expire in {secondsToReadable(remaining)} seconds. If you would like to continue your session, please click "Continue" below.</p>;
	const modalActions = [
		<button type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" onClick={handleStillHere}>
			Continue
		</button>,
	];

	const devTimeoutMode = () => {
		setTimeout(30000);
		setPromptBeforeIdle(15000);
	};

	return (
		<>
			{devMode && (
				<div className="p-4 bg-crmls-blue text-white text-xs">
					<h3 className="font-medium text-base">Idle Timeout Test</h3>
					<p>
						<span className="cursor-pointer text-tertiary" onClick={devTimeoutMode}>
							Click here
						</span>{" "}
						to test the idle timeout. This will set the idle timeout to 30 seconds with a prompt in 15 seconds of idle activity (do not click or move mouse). By default, the timeout will be 15 minutes of idle time with a prompt 5 minutes before expiration. If the user does not respond to the prompt,
						they will be logged out when the idle timeout expires.
					</p>
				</div>
			)}
			{open ? <GenericModal title="Session Expiring" type="error" content={modalContent} actions={modalActions} allowClose={false} /> : <></>}
		</>
	);
}

export default IdleTimeout;
