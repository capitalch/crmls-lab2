import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import ContentContainer from "../../components/content/ContentContainer";
import Loader from "../../components/widgets/Loader";
import dayjs from "dayjs";
import AorLogo from "../../app/AorLogo";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

const LoggedOutPage = (props: any) => {
	const { oidc_user } = props;
	const dispatch = useAppDispatch();
	const [redirecting, setRedirecting] = useState(true);
	const [count, setCount] = useState(15);

	useEffect(() => {
		// Give a loading buffer for oidc user state
		const loggedInCheck = setTimeout(() => {
			clearTimeout(loggedInCheck);
			if (oidc_user) {
				dispatch(push("/"));
			} else {
				setRedirecting(false);
			}
		}, 1500);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => currentCount - 1);
		}, 1000);

		if (count === 0) {
			dispatch(push("/"));
		}
		return () => clearInterval(interval);
	}, [count]);

	return redirecting ? (
		<div className="h-screen flex overflow-hidden bg-primary text-primary">
			<Loader />
		</div>
	) : (
		<ContentContainer title="REcenterhub<sup>TM</sup> Logged Out" cssClass="public-logged-out relative p-4 sm:p-16">
			<section className="h-full">
				<div className="p-0 container h-full xl:p-10">
					<div className="g-6 flex h-full flex-wrap items-center justify-center text-primary">
						<div className="w-full">
							<div className="block rounded-lg bg-primary shadow-lg border border-default">
								<div className="g-0 xl:flex xl:flex-wrap">
									<div className="px-4 md:px-0 xl:w-6/12">
										<div className="p-6 md:mx-6 md:p-12">
											<div className="flex justify-center">
												{/* <img className="mx-auto" src="https://go.crmls.org/wp-content/uploads/2015/06/crmlsMatrixLogoTransp.png" alt="logo" /> */}
												<AorLogo vertical={true} />
											</div>
											<div className="text-center mt-4 text-sm">
												<p className="mb-2">You have securely logged out.</p>
												<p className="mb-2">To protect your privacy, always logout from all REcore applications and completely exit your web browser when done.</p>
												<p className="mb-2">You will now be redirected to the dashboard.</p>
												<p className="mb-2">Thank you.</p>
												<p className="text-xs">Redirecting in {count} seconds</p>
											</div>
										</div>
									</div>
									<div className="flex items-center xl:w-6/12 lg:rounded-l-lg lg:rounded-br-none relative">
										<img className="absolute inset-0 h-full w-full object-cover lg:rounded-l-lg lg:rounded-br-none p-2" src="https://go.crmls.org/wp-content/uploads/2022/03/MLS-Login-Image.jpg" alt="Log In" />
									</div>
								</div>
							</div>
							{/* <div className="p-4 text-center">
								<p className="text-sm">California Regional Multiple Listing Service, Inc.</p>
								<p className="text-xs text-secondary text-opacity-80">
									Authorized users only. All information contained herein is copyright &copy; {dayjs().format("YYYY")} CRMLS. All rights reserved.
									<br />
									<a href="https://go.crmls.org/privacy-policy/" target="_blank" rel="noreferrer" title="Privacy Policy" className="text-tertiary">
										Privacy Policy
									</a>
								</p>
							</div> */}
						</div>
					</div>
				</div>
			</section>
		</ContentContainer>
	);
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

export default connect(mapStateToProps, mapDispatchToProps)(LoggedOutPage);
