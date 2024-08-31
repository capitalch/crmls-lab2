import React from "react";
import Loader from "../../components/widgets/Loader";
import { Route, Switch } from "react-router";
import NotFound from "../NotFound";
import { publicRoutes } from "../../app/routes";

const PublicRouter = () => {
	return (
		<React.Suspense fallback={<Loader />}>
			<Switch>
				{publicRoutes.map((route) => {
					if (route.component) {
						return <Route key={route.path} path={route.path} exact={route.exact ?? true} component={route.component} />;
					}
					return "";
				})}
				{publicRoutes.length > 0 && <Route component={NotFound} />}
			</Switch>
		</React.Suspense>
	);
};

export default PublicRouter;
