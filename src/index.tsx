import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { store, history } from "./app/store";
import { loadUser, OidcProvider } from "redux-oidc";
import userManager from "./util/userManager";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import Callback from "./pages/Callback";
import SilentRenew from "./components/SilentRenew";
import { Log } from "oidc-client";
import { ThemeProvider } from "./components/settings/theme/ThemeContext";
import { registerLicense } from '@syncfusion/ej2-base'
import { GlobalContext, GlobalContextInitialValue } from "./app/GlobalContext";

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXdceXRdQmRdVkB1XUM=')
Log.logger = console;
Log.level = process.env.NODE_ENV === "development" ? Log.DEBUG : Log.ERROR;

loadUser(store, userManager);
export const AppVersion = '4.1';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider initialTheme="">
			<Provider store={store}>
				<GlobalContext.Provider value={GlobalContextInitialValue}>
					<OidcProvider userManager={userManager} store={store}>
						<ConnectedRouter history={history}>
							<Route path={"/silent_renew"} exact={true} component={SilentRenew} />
							<Route path="/" component={App} />
							<Route path="/callback" exact={true} component={Callback} />
						</ConnectedRouter>
					</OidcProvider>
				</GlobalContext.Provider>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
	, document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
