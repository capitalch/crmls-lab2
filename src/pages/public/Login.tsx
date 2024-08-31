import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import userManager from "../../util/userManager";

const LoginPage = (props: any) => {
	const { oidc_user } = props;
	const dispatch = useAppDispatch();

	// The custom login page is no longer being used - just wait to see if the user is already logged in
	// if so, redirect to the dashboard - if not, redirect to the IDP login page
	useEffect(() => {
		// Give a loading buffer for oidc user state
		const loggedInCheck = setTimeout(() => {
			clearTimeout(loggedInCheck);
			if (oidc_user) {
				dispatch(push("/"));
			} else {
				userManager.signinRedirect();
			}
		}, 1500);
	}, []);

	return <></>;
};

function mapStateToProps(state: RootState) {
	return {
		oidc_user: state.oidc.user,
	};
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
