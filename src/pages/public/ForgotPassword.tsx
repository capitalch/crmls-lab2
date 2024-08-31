import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useAppDispatch, useAutoFocus } from "../../app/hooks";
import { DashAlert } from "../../components/widgets/alerts/AlertElements";
import * as Yup from "yup";
import axios from "axios";
import { profile_url } from "../../adapters";
import { show } from "../../features/notification/notificationSlice";
import ContentContainer from "../../components/content/ContentContainer";
import Loader from "../../components/widgets/Loader";
import AorLogo from "../../app/AorLogo";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import userManager from "../../util/userManager";

export const ForgotPasswordForm = () => {
	const dispatch = useAppDispatch();
	const [passwordResetSent, setPasswordResetSent] = useState(false);
	const redirectTimer = 20; // After forgot password request, redirect to home page in x seconds
	const [redirectTimeout, setRedirectTimeout] = useState(0);
	const inputFocus = useAutoFocus();

	const startRedirectTimer = () => {
		setRedirectTimeout(redirectTimer);
	};

	useEffect(() => {
		if (redirectTimeout !== 0) {
			const interval = setInterval(() => {
				// update the state after 1000ms
				setRedirectTimeout((currentCount) => currentCount - 1);
			}, 1000);

			if (redirectTimeout - 1 === 0) {
				dispatch(push("/"));
			}

			// clean up the interval
			return () => clearInterval(interval);
		}
	}, [redirectTimeout]);

	return passwordResetSent ? (
		<div className="mt-6">
			<DashAlert
				notification={{
					show: true,
					title: "Password Reset Email Sent",
<<<<<<< HEAD
					message: `Your password reset request has been received. Please check your email inbox. If your User ID exists in the system, you will be sent a password reset link. If you do not receive an email, please contact support. You will be redirected in ${redirectTimeout} seconds.`,
=======
					message: `Your password reset request has been received. Please check your email inbox. If your user ID exists in the system, you will be sent a password reset link. If you do not receive an email, please check your junk email folder or contact support. You will be redirected in ${redirectTimeout} seconds.`,
>>>>>>> dev-1
					status: "success",
					position: "dash",
					autoHide: false,
					confirm: false,
					notificationId: null,
					systemNotificationStatus: {
						color: "green",
					},
				}}
				canClose={false}
			/>
		</div>
	) : (
		<>
			<div className="px-8 text-center">
				<p className="text-sm">Please enter your user ID.</p>
			</div>
			<Formik
				validationSchema={Yup.object().shape({
					fpUserId: Yup.string().required("User ID Required"),
				})}
				initialValues={{
					fpUserId: "",
				}}
				onSubmit={async (values, { resetForm }) => {
					// Call api to send password reset email
					if (values.fpUserId) {
						axios
<<<<<<< HEAD
							.post(profile_url + "api/app/AccountContact/ForgotPassword", {
								LoginId: values.fpUserId,
							})
=======
							.post(profile_url + "api/app/AccountContact/ForgotPassword", { LoginId: values.fpUserId })
>>>>>>> dev-1
							.then((response: any) => {
								resetForm();
								setPasswordResetSent(true);
								startRedirectTimer();
							})
							.catch((e) => {
								dispatch(
									show({
										show: true,
										title: "Error",
<<<<<<< HEAD
										message:
											e.message ??
											`There was an error sending your password reset email.`,
=======
										message: e.message ?? `There was an error sending your password reset email.`,
>>>>>>> dev-1
										status: "error",
										position: "popover",
										autoHide: 5000,
										confirm: false,
										notificationId: null,
									})
								);
							});
					}
				}}
			>
<<<<<<< HEAD
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					isSubmitting,
				}) => (
					<Form className="px-4 2xl:px-8 py-2">
						<div className="mb-4">
							<input
								id="fpUserId"
								type="text"
								className="basic-form-field"
								placeholder="Enter User ID"
								value={values.fpUserId}
								onChange={handleChange}
								onBlur={handleBlur}
								ref={inputFocus}
							/>
							{touched.fpUserId && errors.fpUserId && (
								<div className="text-xs text-red-600 text-right mt-1">
									{errors.fpUserId}
								</div>
							)}
						</div>
						<div className="mb-6 text-center">
							<button
								className="cta-button"
								type="submit"
								disabled={isSubmitting}
							>
=======
				{({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
					<Form className="px-4 2xl:px-8 py-2">
						<div className="mb-4">
							<input id="fpUserId" type="text" className="basic-form-field" placeholder="Enter User ID" value={values.fpUserId} onChange={handleChange} onBlur={handleBlur} ref={inputFocus} />
							{touched.fpUserId && errors.fpUserId && <div className="text-xs text-red-600 text-right mt-1">{errors.fpUserId}</div>}
						</div>
						<div className="mb-6 text-center">
							<button className="cta-button" type="submit" disabled={isSubmitting}>
>>>>>>> dev-1
								Send password reset email
							</button>
						</div>
						<div className="text-center">
<<<<<<< HEAD
							<span
								className="basic-link font-medium text-lg"
								onClick={() => userManager.signinRedirect()}
							>
								Back to Login
							</span>
						</div>
						<div className="flex justify-center items-center space-x-2 text-sm text-center mt-2">
							Forgot your User ID? Please contact your association or support.
						</div>
=======
							<span className="basic-link font-medium text-lg" onClick={() => userManager.signinRedirect()}>
								Back to Login
							</span>
						</div>
						<div className="flex justify-center items-center space-x-2 text-sm text-center mt-2">Forgot your User ID? Please contact your association or support.</div>
>>>>>>> dev-1
					</Form>
				)}
			</Formik>
		</>
	);
};

const ForgotPassword = (props: any) => {
	const { oidc_user } = props;
	const dispatch = useAppDispatch();
	const [redirecting, setRedirecting] = useState(true);

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

	return redirecting ? (
		<div className="h-screen flex overflow-hidden bg-primary text-primary">
			<Loader />
		</div>
	) : (
<<<<<<< HEAD
		<ContentContainer
			title="Welcome to REcenterhub<sup>TM</sup>"
			cssClass="public-login relative p-4 sm:p-16"
		>
=======
		<ContentContainer title="Welcome to REcenterhub<sup>TM</sup>" cssClass="public-login relative p-4 sm:p-16">
>>>>>>> dev-1
			<section className="h-full">
				<div className="p-0 container h-full">
					<div className="g-6 flex h-full flex-wrap items-center justify-center text-primary">
						<div className="w-full">
							<div className="block rounded-lg bg-primary">
								<div className="g-0 xl:flex xl:flex-wrap">
									<div className="px-4 md:px-0 xl:w-5/12 mt-16">
										<div className="p-4 md:mx-4 md:p-8">
											<div className="flex justify-center">
												<AorLogo vertical={true} />
											</div>
											<div className="mt-8">
												<ForgotPasswordForm />
											</div>
										</div>
									</div>
									<div className="h-48 flex items-center xl:w-7/12 xl:h-auto relative rounded-tl-7xl rounded-br-7xl shadow-solid bg-header">
<<<<<<< HEAD
										<img
											className="absolute inset-0 h-full w-full object-cover rounded-tl-7xl rounded-br-7xl"
											src="https://cdn.crmls.org/mace/campaigns/REcenterhub Dashboard/REcenterhub-Login-Page-Image.jpg"
											alt="Log In"
										/>
=======
										<img className="absolute inset-0 h-full w-full object-cover rounded-tl-7xl rounded-br-7xl" src="https://cdn.crmls.org/mace/campaigns/REcenterhub Dashboard/REcenterhub-Login-Page-Image.jpg" alt="Log In" />
>>>>>>> dev-1
									</div>
								</div>
							</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
