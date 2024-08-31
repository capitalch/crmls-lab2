import Main from "./pages/Main";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { connect } from "react-redux";
import { AppDispatch, RootState, store } from "./app/store";
import "./App.css";
import { useEffect, useState } from "react";
import Loader from "./components/widgets/Loader";
import Public from "./pages/public/Public";
import { loadUser } from "redux-oidc";
import userManager from "./util/userManager";
import "../node_modules/@syncfusion/ej2-react-grids/styles/bootstrap.css";

import '../node_modules/@syncfusion/ej2-base/styles/bootstrap.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap.css';
import '../node_modules/@syncfusion/ej2-calendars/styles/bootstrap.css';
import '../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/bootstrap.css';
import '../node_modules/@syncfusion/ej2-navigations/styles/bootstrap.css';
import '../node_modules/@syncfusion/ej2-popups/styles/bootstrap.css';
import '../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap.css';

library.add(fab);

const App = (props: any) => {
	const { oidc_user } = props;
	const [isLoading, setIsLoading] = useState(true);
	const queryParameters = new URLSearchParams(window.location.search);
	let loginAor = queryParameters.get("loginAor");

	useEffect(() => {
		if (loginAor) {
			loadUser(store, userManager);
			userManager.signinRedirect();
		} else {
			// Give a loading buffer for oidc user state
			setTimeout(() => {
				setIsLoading(false);
			}, 1500);
		}
	}, []);

	return isLoading ? <div className="h-screen flex overflow-hidden bg-primary text-primary"><Loader /></div> : oidc_user ? <Main /> : <Public />;
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
