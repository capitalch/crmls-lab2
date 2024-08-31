import { useFormik } from "formik";
import ContentContainer from "../../components/content/ContentContainer";
import { show } from "../../features/notification/notificationSlice";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Loader from "../../components/widgets/Loader";
import { profile_url } from "../../adapters";
import axios from "axios";
import { ClockIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { rebuildTooltips, ThemeTooltip } from "../../components/settings/theme/ThemeTooltip";
import { useSelector } from "react-redux";
import { formattedProfile } from "./selectors";
import { useAppDispatch, useAutoFocus } from "../../app/hooks";
import { passwordValidation, secondsToReadable } from "../../util/helpers";
import { push } from "connected-react-router";
import { DashAlert } from "../../components/widgets/alerts/AlertElements";
import ReactTooltip from "react-tooltip";
import { fetchMemberData } from "./userSlice";

function PasswordChange() {
	const passwordResetTimer = 240; // Reset password field after x seconds (240 = 4min, 900 = 15min)
	const redirectTimer = 10; // After successful change, redirect to home page in x seconds
	const dispatch = useAppDispatch();
	let userProfile = useSelector(formattedProfile);
	const [fieldTimeout, setFieldTimeout] = useState(0);
	const [userId, setUserId] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [validPassword, setValidPassword] = useState<boolean>();
	const [redirectTimeout, setRedirectTimeout] = useState(0);
	const inputFocus = useAutoFocus();

	const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
	const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
	const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
	const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
	const eightCharsOrMore = /.{8,}/g; // eight characters or more

	const startFieldTimer = () => {
		setFieldTimeout(passwordResetTimer);
	};

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

	useEffect(() => {
		if (fieldTimeout === 0) {
			formik.setFieldValue("password", "");
			return;
		}

		rebuildTooltips();
		const interval = setInterval(() => {
			// update the state after 1000ms
			setFieldTimeout((currentCount) => currentCount - 1);
		}, 1000);

		// clean up the interval
		return () => clearInterval(interval);
	}, [fieldTimeout]);

	useEffect(() => {
		if (userProfile) {
			setIsLoading(false);
			setUserId(userProfile.loginId);
		}
	}, [userProfile]);

	const formik = useFormik({
		initialValues: {
			password: "",
			newPassword: "",
			confirmPassword: "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			password: Yup.string().required("Please enter your current password"),
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
		validate: (values) => {
			if (values.password !== "" && fieldTimeout === 0) {
				startFieldTimer();
			}
		},
		onSubmit: async (values, { resetForm }) => {
			const changePasswordPayload = {
				loginId: userId,
				password: values.password,
				newPassword: values.newPassword,
				confirmPassword: values.confirmPassword,
			};

			axios
				.post(profile_url + "api/app/AccountContact/ChangePassword", changePasswordPayload)
				.then((response: any) => {
					if (response.data && response.data.isSuccessful) {
						// Password reset successful - show success message and timeout redirect to home page login
						dispatch(fetchMemberData({ profile: userProfile, token: userProfile.token ?? "" }));
						resetForm();
						setFieldTimeout(0);
						startRedirectTimer();
					} else {
						// Password reset failed - show error message and stay on reset form
						dispatch(
							show({
								show: true,
								title: "Error",
								message: response.data.message ?? "There was an error updating your password. Please try again.",
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
							message: e.message ?? "There was an error changing your password. Please try again.",
							status: "error",
							position: "popover",
							autoHide: 7000,
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
		<ContentContainer title="Password Change" cssClass="password-change relative">
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
									<h3 className="pt-4 mb-2 text-2xl">Change Your Password</h3>
									<p>
										User ID: <strong>{userId}</strong>
									</p>
								</div>
								{redirectTimeout > 0 ? (
									<div className="p-4 pb-0 flex flex-col animate-fade">
										<DashAlert
											notification={{
												show: true,
												title: "Password Updated",
												message: `Your password has been updated successfully, you will be redirected to the home page in ${redirectTimeout} seconds`,
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
									<form id="passwordChangeForm" onSubmit={formik.handleSubmit} className="px-8 py-2">
										<div className="mb-4 relative">
											<input
												id="password"
												type="password"
												className="basic-form-field"
												placeholder="Current Password"
												value={formik.values.password}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												ref={inputFocus}
												onFocus={() => {
													ReactTooltip.hide();
												}}
											/>
											{fieldTimeout > 0 && (
												<div className="absolute right-4 top-3 cursor-pointer" data-tip={`This field will reset in ${secondsToReadable(fieldTimeout)}`}>
													<ClockIcon className="h-4" />
												</div>
											)}
											{formik.touched.password && formik.errors.password && <div className="text-xs text-red-600 text-right mt-1">{formik.errors.password}</div>}
										</div>
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
												onFocus={() => {
													ReactTooltip.hide();
												}}
											/>
											{formik.values.newPassword.length > 0 && (
												<div className="mt-2">
													<div className="password-strength-meter" style={{ width: `${(passwordStrength / 5) * 100}%` }} data-color={`${["red", "orange", "#03a2cc", "#03a2cc", "#10d652"][passwordStrength - 1] || ""}`}></div>
												</div>
											)}
											<div
												className="absolute right-4 top-3 cursor-pointer"
												data-tip={`<b>${passwordVisible ? "Hide" : "Show"} password</b><p>Password must:</p><ul class="list-disc ml-4"><li>be at least 8 characters</li><li>contain one uppercase<li>contain one lowercase</li><li>contain one number</li><li>contain one special character</li><li>not be a recently used password</li></ul></p>`}
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
												onFocus={() => {
													ReactTooltip.hide();
												}}
											/>
											{formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-xs text-red-600 text-right mt-1">{formik.errors.confirmPassword}</div>}
										</div>
										<div className="mb-6 text-center">
											<button className="w-full crmls-submit-btn" type="submit">
												Change Password
											</button>
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

export default PasswordChange;
