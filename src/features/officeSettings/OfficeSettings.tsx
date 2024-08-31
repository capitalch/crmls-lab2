import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { user, userAccessSelector } from "../user/selectors";
import { selectAllSettingGroups } from "../generalSettings/settingsGroupSlice";
import SettingGroupElements from "../../components/settings/SettingGroupElements";
import { formatOfficeUser, getSettingTypeById, isObjectEmpty, saveAllSettings } from "../generalSettings/settingsHelper";
import { show } from "../notification/notificationSlice";
import SettingOfficeAutoComplete, { officeResponse } from "../../components/widgets/autoComplete/SettingOfficeAutocomplete";
import { settingProps } from "../generalSettings/GeneralSettings";
import { store } from "../../app/store";
import { insertOfficeSetting, updateOfficeSetting } from "./officeSettingsSlice";

const OfficeSettings = ({ userFormattedSettings, groupTypes, dirty, setDirty, mlsId, setMlsId, setUseAs, useAs, reloadMemberSettings }: settingProps) => {
	const dispatch = useAppDispatch();
	const authUser = useSelector(user);
	let userAccessLevel = useSelector(userAccessSelector);
	let groups = useSelector(selectAllSettingGroups);
	const label = "Select office to configure settings";

	async function saveSettings() {
		return Promise.all(saveAllSettings(userFormattedSettings));
	}

	const handleOfficeChange = (id: string, value: officeResponse) => {
		console.log("office change fired");
		if (!isObjectEmpty(value)) {
			setMlsId(value.officeCode);
			setUseAs(value);
		} else {
			setMlsId(authUser.profile.officeMlsId);
			setUseAs(authUser.profile);
		}
	};

	const handleSettingChange = (typeId: number, value: string) => {
		let state = store.getState().officeSettings;
		let entities = store.getState().officeSettings.entities;
		let key = state.ids.findIndex((type) => type === typeId);
		if (key > -1) {
			let real_setting = entities[typeId];
			let setting = {} as any;

			if (real_setting && real_setting.settingValue) {
				setting.settingValue = { ...real_setting.settingValue };
				setting.settingValue.shortValue = value;
			} else {
				setting.settingValue = {
					typeId: typeId,
					shortValue: value,
					longValue: "",
					sortOrder: 0,
					settingType: getSettingTypeById(typeId, groupTypes),
					accessLevel: 0,
					createdBy: "",
					createdOn: "",
					id: 0,
					modifiedBy: "",
					modifiedOn: "",
				};
			}

			dispatch(updateOfficeSetting(setting));
		} else {
			// there's no existing setting in the system-- so add one to the store so we can save it later
			dispatch(
				insertOfficeSetting({
					settingValue: {
						typeId: typeId,
						shortValue: value,
						longValue: "",
						sortOrder: 0,
						settingType: getSettingTypeById(typeId, groupTypes),
						accessLevel: 0,
						createdBy: "",
						createdOn: "",
						id: 0,
						modifiedBy: "",
						modifiedOn: "",
					},
				})
			);
		}
		setDirty(true);
	};

	const getOfficeSelection = () => {
		// if they're a AOR admin or above show the office selection
		// changing this from main office or above to AOR admin or above per Jimmy, since only main office setting matters,
		// so there's no point to have sub office settings changed here
		if (userAccessLevel > 3) {
			return (
				<div className="border-b border-default py-6 sm:flex sm:items-center sm:justify-between">
					<div className="flex-1 min-w-0">
						<SettingOfficeAutoComplete
							setFieldValue={handleOfficeChange}
							field={{
								type: "auto",
								id: "member",
								label: label,
							}}
							onlyMain={true}
						/>
					</div>
				</div>
			);
		} else {
			return <></>;
		}
	};

	return (
		<>
			{getOfficeSelection()}
			<div className="py-6 lg:grid lg:grid-cols-12 lg:gap-x-5">
				<div className="space-y-6 lg:col-span-12">
					{groups.map((setting_group) => {
						let groupTypeEntities = groupTypes.find((gt) => gt.id === setting_group.id);
						if (groupTypeEntities && groupTypeEntities.groupTypes.length) {
							return (
								<React.Fragment key={setting_group.id}>
									<div>
										<h2>Available Settings</h2>
										{mlsId !== authUser.profile.officeMlsId && <span className="mr-4 text-red-600 text-sm">On behalf of: {formatOfficeUser(useAs)}</span>}
									</div>
									<SettingGroupElements settingsGroupTypes={groupTypeEntities ? groupTypeEntities.groupTypes : []} settings={userFormattedSettings} changeHandler={handleSettingChange} userLevel={userAccessLevel} />
								</React.Fragment>
							);
						}
						return "";
					})}
				</div>
				<div className="space-y-6 lg:col-span-12">
					<div className="flex justify-end pt-6">
						<button
							disabled={!dirty}
							type="submit"
							className="ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-inverse bg-header hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
							onClick={() => {
								saveSettings()
									.then((res) => {
										console.log(res);
										dispatch(
											show({
												show: true,
												status: "success",
												title: "Settings saved!",
												message: "Settings saved!",
												position: "popover",
												autoHide: false,
												confirm: false,
												notificationId: null,
											})
										);
									})
									.then(() => setDirty(false))
									.then(() => (reloadMemberSettings ? reloadMemberSettings() : console.log("no reload member")));
							}}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default OfficeSettings;
