import React, { useEffect, useState } from "react";
import Loader from "../components/widgets/Loader";
import { Route, Switch } from "react-router";
import { useAppDispatch } from "./hooks";
import { useSelector } from "react-redux";
import { tempRoutes } from "./routes";
import NotFound from "../pages/NotFound";
import { dynamicMenuType, fetchDynamicMenu, selectAllDynamicMenus } from "../components/menu/dynamicMenuSlice";
import { userProfile } from "../features/user/selectors";
import { fetchAPIMemberPrefs } from "../features/user/userPrefsSlice";
import NoMemberData from "../pages/NoMemberData";
import { useLocation } from 'react-router-dom'

const ACLRouter = () => {
	const location = useLocation();
	const profile = useSelector(userProfile);
	const dispatch = useAppDispatch();
	const dynamicMenu = useSelector(selectAllDynamicMenus);
	const [dynamicRoutes, setDynamicRoutes] = useState<dynamicMenuType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(fetchDynamicMenu());
		if (profile && profile.member?.id) {
			dispatch(fetchAPIMemberPrefs(profile.member.id));
		}
	}, [dispatch, profile]);

	useEffect(() => {
		if (dynamicMenu && dynamicMenu.length > 0) {
			let componentRoutes: any[] = [];
			dynamicMenu.forEach((dynamicItem) => {
				const foundComponent = tempRoutes.find((tr) => tr.path === dynamicItem.path);
				if (foundComponent) {
					componentRoutes.push({ ...foundComponent, ...dynamicItem });
				}
				if (dynamicItem.children && dynamicItem.children.length > 0) {
					dynamicItem.children.forEach((child) => {
						const foundChildComponent = tempRoutes.find((tr) => tr.path === child.path);
						if (foundChildComponent) {
							componentRoutes.push({ ...foundChildComponent, ...child });
						}
					});
				}
			});
			const tabbedRoutes = tempRoutes.filter((tr) => tr.path?.includes("urlTab"));
			componentRoutes = [...componentRoutes, ...tabbedRoutes];
			const staticRoutes = tempRoutes.filter((tr) => tr.menu === "static");
			componentRoutes = [...componentRoutes, ...staticRoutes];
			setIsLoading(false);
			setDynamicRoutes(componentRoutes);
		}
	}, [dynamicMenu]);

	if (isLoading) {
		return <Loader />;
	} else if (!profile?.member && location.pathname !== '/logout') {
		return <NoMemberData />
	} else if (dynamicRoutes.length <= 0) {
		return (
			<div className="bg-primary min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
				<div className="max-w-max mx-auto">
					<main className="sm:flex">
						<p className="text-4xl font-extrabold text-header sm:text-3xl">Error</p>
						<div className="sm:ml-6">
							<div className="sm:border-l sm:border-divider sm:pl-6">
								<h1 className="text-4xl font-extrabold text-primary tracking-tight sm:text-3xl">Routes failed to load.</h1>
								<p className="mt-1 text-base text-secondary">Please refresh your browser and try again.</p>
							</div>
							<div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
								<a href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-inverse bg-header hover:bg-opacity-80 focus:outline-none">
									Go back home
								</a>
							</div>
						</div>
					</main>
				</div>
			</div>
		);
	}

	return (
		<React.Suspense fallback={<Loader />}>
			<Switch>
				{dynamicRoutes.map((route) => {
					if (route.component) {
						return <Route key={route.path} path={route.path} exact={route.exact ?? true} component={route.component} />;
					}
					return "";
				})}
				{dynamicRoutes.length > 0 && <Route component={NotFound} />}
			</Switch>
		</React.Suspense>
	);
};

export default ACLRouter;
