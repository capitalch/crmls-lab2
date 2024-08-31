import { useFormik } from "formik";
import { useAppDispatch, useAutoFocus } from "../../app/hooks";
import ContentContainer from "../../components/content/ContentContainer";
import { show } from "../../features/notification/notificationSlice";
import * as Yup from "yup";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { push } from "connected-react-router";
import Loader from "../../components/widgets/Loader";
import { profile_url } from "../../adapters";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { ThemeTooltip } from "../../components/settings/theme/ThemeTooltip";
import { secondsToReadable, passwordValidation } from "../../util/helpers";
import { DashAlert } from "../../components/widgets/alerts/AlertElements";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

type PasswordResetParams = {
	resetToken: string;
};

const PasswordReset = (props: any) => {
	const { oidc_user } = props;
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [userId, setUserId] = useState("");
	const { resetToken } = useParams<PasswordResetParams>();
	const [validPassword, setValidPassword] = useState<boolean>();
	const [invalidTokenTimeout, setInvalidTokenTimeout] = useState(false);
	const [successTimeout, setSuccessTimeout] = useState(false);
	const [count, setCount] = useState(900);
	const inputFocus = useAutoFocus();
	const queryParameters = new URLSearchParams(window.location.search);
	const isNew = queryParameters.get("isNew");
	const passwordVerbiage = isNew ? "Create" : "Reset";

	const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
	const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
	const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
	const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
	const eightCharsOrMore = /.{8,}/g; // eight characters or more

	useEffect(() => {
		if (successTimeout || invalidTokenTimeout) {
			setCount(10);
		}
	}, [successTimeout, invalidTokenTimeout]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => currentCount - 1);
		}, 1000);

		if (count === 0) {
			dispatch(push("/"));
		}
		return () => clearInterval(interval);
	}, [count]);

	useEffect(() => {
		if (oidc_user) {
			// User is logged in, they should be redirected to the "password-change" page instead
			dispatch(push("/password-change"));
		} else {
			// First, we need to validate the password token - if it fails, go back to the home page login
			if (!resetToken) {
				// password requires a token - if no token, redirect to home page with toast message
				dispatch(
					show({
						show: true,
						title: "Missing Token",
						message: `No password token was found.`,
						status: "error",
						position: "popover",
						autoHide: 5000,
						confirm: false,
						notificationId: null,
					})
				);
				setInvalidTokenTimeout(true);
			} else {
				axios
					.post(profile_url + "api/app/AccountContact/ValidateResetToken", { Token: resetToken })
					.then((response: any) => {
						if (response.data && response.data.isSuccessful) {
							// Token validation successful - set the user ID from the response and show the reset form
							setUserId(response.data.results[0].memberLoginId);
						} else {
							// Token validation failed - display error and redirect to the home page
							setInvalidTokenTimeout(true);
						}
						setIsLoading(false);
					})
					.catch((e) => {
						// Endpoint failed to respond - display error and redirect to the home page
						setInvalidTokenTimeout(true);
						setIsLoading(false);
					});
			}
		}
	}, [resetToken]);

	const formik = useFormik({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object().shape({
			newPassword: Yup.string()
				.required("New Password Required")
				.matches(atLeastOneUppercase, "Password must contain at least one uppercase")
				.matches(atLeastOneLowercase, "Password must contain at least one lowercase")
				.matches(atLeastOneNumeric, "Password must contain at least one number")
				.matches(atLeastOneSpecialChar, "Password must contain at least one special character")
				.matches(eightCharsOrMore, "Password must be at least 8 characters"),
			confirmPassword: Yup.mixed()
				.oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
				.required("Please confirm your new password"),
		}),
		onSubmit: async (values, { resetForm }) => {
			const resetPayload = {
				Token: resetToken,
				Password: values.newPassword,
				ConfirmPassword: values.confirmPassword,
			};

			axios
				.post(profile_url + "api/app/AccountContact/ResetPassword", resetPayload)
				.then((response: any) => {
					if (response.data && response.data.isSuccessful) {
						// Password reset successful - show success message and timeout redirect to home page login
						resetForm();
						setSuccessTimeout(true);
					} else {
						// Password reset failed - show error message and stay on reset form
						dispatch(
							show({
								show: true,
								title: "Error",
								message: response.data.message ?? "There was an error setting your password. Please try again.",
								status: "error",
								position: "popover",
								autoHide: 7000,
								confirm: false,
								notificationId: null,
							})
						);
					}
				})
				.catch((e) => {
					// Password reset endpoint failed to respond - show error message and stay on reset form
					dispatch(
						show({
							show: true,
							title: "Error",
							message: e.message ?? "There was an error setting your password. Please try again.",
							status: "error",
							position: "popover",
							autoHide: 5000,
							confirm: false,
							notificationId: null,
						})
					);
				});
		},
	});

	const validateNewPassword = (value: string) => {
		setValidPassword(passwordValidation(value));
	};

	const passwordTracker = {
		uppercase: formik.values.newPassword.match(atLeastOneUppercase),
		lowercase: formik.values.newPassword.match(atLeastOneLowercase),
		number: formik.values.newPassword.match(atLeastOneNumeric),
		specialChar: formik.values.newPassword.match(atLeastOneSpecialChar),
		eightCharsOrGreater: formik.values.newPassword.match(eightCharsOrMore),
	};
	const passwordStrength = Object.values(passwordTracker).filter((value) => value).length;

	return isLoading ? (
		<Loader />
	) : (
		<ContentContainer title={`${passwordVerbiage} Password`} cssClass="password-reset relative">
			<div className="isolate">
				<div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden filter blur-3xl sm:top-[-20rem]">
					<svg className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
							fillOpacity=".3"
							d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
						/>
						<defs>
							<linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
								<stop stopColor="#7FA9CC" />
								<stop offset={1} stopColor="#F3F4F6" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<main>
					<div className="relative divide-y divide-light-blue-400">
						<div className="flex justify-center items-center w-full">
							<div className="w-full lg:w-1/3 p-5">
								<div className="px-8 text-center">
									<h3 className="pt-4 mb-2 text-2xl">{passwordVerbiage} Your Password</h3>
									{userId && <p>User ID: <strong>{userId}</strong></p>}
								</div>
								{invalidTokenTimeout ? (
									<div className="p-4 pb-0 flex flex-col animate-fade">
										<DashAlert
											notification={{
												show: true,
												title: "Invalid Password Token",
												message: `Your password token is no longer valid, you will be redirected to the home page in ${count} seconds.`,
												status: "Error",
												position: "dash",
												autoHide: false,
												confirm: false,
												notificationId: null,
												systemNotificationStatus: {
													color: "red",
												},
											}}
											canClose={false}
										/>
									</div>
								) : successTimeout ? (
									<div className="p-4 pb-0 flex flex-col animate-fade">
										<DashAlert
											notification={{
												show: true,
												title: `Password ${passwordVerbiage} Successful`,
												message: `Your password has been set successfully, you will be redirected to the home page login in ${count} seconds.`,
												status: "Success",
												position: "dash",
												autoHide: false,
												confirm: false,
												notificationId: null,
												systemNotificationStatus: {
													color: "green",
												},
											}}
										/>
									</div>
								) : (
									<form id="passwordResetForm" onSubmit={formik.handleSubmit} className="px-8 py-2">
										<div className="mb-4 relative">
											<input
												id="newPassword"
												type={passwordVisible ? "text" : "password"}
												className="basic-form-field"
												placeholder="New Password"
												value={formik.values.newPassword}
												onChange={(e) => {
													formik.handleChange(e);
													validateNewPassword(e.target.value);
												}}
												onBlur={(e) => {
													formik.handleBlur(e);
													validateNewPassword(e.target.value);
												}}
												ref={inputFocus}
											/>
											{formik.values.newPassword.length > 0 && (
												<div className="mt-2">
													<div className="password-strength-meter" style={{ width: `${(passwordStrength / 5) * 100}%` }} data-color={`${["red", "orange", "#03a2cc", "#03a2cc", "#10d652"][passwordStrength - 1] || ""}`}></div>
												</div>
											)}
											<div
												className="absolute right-4 top-3 cursor-pointer"
												data-tip={`<b>${passwordVisible ? "Hide" : "Show"} password</b><p>Password must:</p><ul class="list-disc ml-4"><li>be at least 8 characters</li><li>contain one uppercase<li>contain one lowercase</li><li>contain one number</li><li>contain one special character</li></ul></p>`}
											>
												{passwordVisible ? (
													<EyeOffIcon className={`h-4 ${validPassword === true ? "text-green-500" : validPassword === false ? "text-red-500" : ""}`} onClick={() => setPasswordVisible(!passwordVisible)} />
												) : (
													<EyeIcon className={`h-4 ${validPassword === true ? "text-green-500" : validPassword === false ? "text-red-500" : ""}`} onClick={() => setPasswordVisible(!passwordVisible)} />
												)}
											</div>
											{formik.touched.newPassword && formik.errors.newPassword && <div className="text-xs text-red-600 text-right mt-1">{formik.errors.newPassword}</div>}
										</div>
										<div className="mb-4">
											<input
												id="confirmPassword"
												onPaste={(e: any) => {
													e.preventDefault();
													return false;
												}}
												type="password"
												className="basic-form-field"
												placeholder="Confirm New Password"
												value={formik.values.confirmPassword}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
											{formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-xs text-red-600 text-right mt-1">{formik.errors.confirmPassword}</div>}
										</div>
										<div className="mb-6 text-center">
											<button className="w-full crmls-submit-btn" type="submit">
												{passwordVerbiage} Password
											</button>
										</div>
										<div className="border-t border-divider text-center text-xs p-2">
											<p>This page will redirect in {secondsToReadable(count)}.</p>
										</div>
									</form>
								)}
							</div>
						</div>
					</div>
				</main>
			</div>
			<ThemeTooltip />
		</ContentContainer>
	);
}

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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
