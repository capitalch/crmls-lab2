import { useEffect } from "react";
import Loader from "../components/widgets/Loader";
import userManager from "../util/userManager";

const Logout = () => {
	useEffect(() => {
		setTimeout(async () => {
			const userIdToken = (await userManager.getUser())?.id_token;
			userManager.signoutRedirect({ id_token_hint: userIdToken });
		}, 2000);
	}, []);

	return (
		<div className="h-screen flex overflow-hidden bg-primary text-primary">
			<Loader />
		</div>
	);
};

export default Logout;
