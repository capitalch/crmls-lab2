import React from "react";
import { useSelector } from "react-redux";
import ContentContainer from "../components/content/ContentContainer";
import { formattedProfile } from "../features/user/selectors";

const Profile = () => {
	let profile = useSelector(formattedProfile);

	return (
		<ContentContainer title="My Profile">
			<div className="sm:flex sm:items-center sm:justify-between text-primary pb-6">
				<form className="space-y-8 divide-y divide-default">
					<div className="space-y-8 divide-y divide-default sm:space-y-5">
						<div>
							<div>
								<h3 className="text-lg leading-6 font-medium">Profile Information</h3>
								<p className="mt-1 max-w-2xl text-sm">This information will be displayed publicly so be careful what you share.</p>
							</div>

							<div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
								<div className="crmls-field-wrap">
									<label htmlFor="first_name">User type</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input type="text" disabled={true} value={profile.memberType.displayName} name="user_level" id="user_level" className="input-registered" />
									</div>
								</div>
								<div className="crmls-field-wrap">
									<label htmlFor="about">Bio</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<textarea id="about" name="about" rows={3} className="input-registered" />
										<p className="mt-2 text-sm">Write a few sentences about yourself.</p>
									</div>
								</div>

								<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:pt-5">
									<label htmlFor="photo" className="block text-sm font-medium">
										Photo
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<div className="flex items-center">
											<span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
												{!profile.photoUrl && (
													<svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
														<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
													</svg>
												)}
												{profile.photoUrl && <img src={profile.photoUrl} alt={profile.firstName} />}
											</span>
											<button type="button" className="ml-5 py-2 px-3 border border-default rounded-md shadow-sm text-sm leading-4 font-medium bg-secondary hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
												Change
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
							<div>
								<h3 className="text-lg leading-6 font-medium">Personal Information</h3>
								<p className="mt-1 max-w-2xl text-sm">Use a permanent address where you can receive mail.</p>
							</div>
							<div className="space-y-6 sm:space-y-5">
								<div className="crmls-field-wrap">
									<label htmlFor="first_name">First name</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input type="text" value={profile.firstName} name="first_name" id="first_name" className="input-registered" />
									</div>
								</div>

								<div className="crmls-field-wrap">
									<label htmlFor="last_name">Last name</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input type="text" value={profile.lastName} name="last_name" id="last_name" className="input-registered" />
									</div>
								</div>

								<div className="crmls-field-wrap">
									<label htmlFor="email">Email address</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input id="email" value={profile.email} name="email" type="email" className="input-registered" />
									</div>
								</div>

								<div className="crmls-field-wrap">
									<label htmlFor="country">Country / Region</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<select id="country" name="country" className="input-registered">
											<option>United States</option>
											<option>Canada</option>
											<option>Mexico</option>
										</select>
										{/*</div>*/}
									</div>
								</div>

								<div className="crmls-field-wrap">
									<label htmlFor="street_address">Street address</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input type="text" name="street_address" id="street_address" className="input-registered" />
									</div>
								</div>

								<div className="crmls-field-wrap">
									<label htmlFor="city">City</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input type="text" name="city" id="city" className="input-registered" />
									</div>
								</div>

								<div className="crmls-field-wrap">
									<label htmlFor="state">State / Province</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input type="text" name="state" id="state" className="input-registered" />
									</div>
								</div>

								<div className="crmls-field-wrap">
									<label htmlFor="zip">ZIP / Postal</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input type="text" name="zip" id="zip" className="input-registered" />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="py-5">
						<div className="flex justify-end">
							<button type="button" className="py-2 px-4 border border-default rounded-md shadow-sm text-sm font-medium bg-secondary hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								Cancel
							</button>
							<button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-inverse bg-header hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</ContentContainer>
	);
};

export default Profile;
