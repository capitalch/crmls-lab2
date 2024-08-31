import React from "react";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
// import {settingsIcons} from "../../util/helpers";
import {user, userAccessSelector} from "../user/selectors";
import {selectAllSettingGroups} from "./settingsGroupSlice";
import SettingGroupElements from "../../components/settings/SettingGroupElements";
import SettingMemberAutoComplete from "../../components/widgets/autoComplete/SettingMemberAutocomplete";
import {
    formatMemberUser,
    getSettingTypeById,
    isObjectEmpty, saveAllSettings,
    settingMemberType
} from "./settingsHelper";
import {show} from "../notification/notificationSlice";
import {settingProps} from "./GeneralSettings";
import {insertGeneralSetting, updateGeneralSetting} from "./generalSettingsSlice";
import {store} from "../../app/store";

const MemberSettings = ({userFormattedSettings, groupTypes, dirty, setDirty, mlsId, setMlsId, useAs, setUseAs}: settingProps) => {
    const dispatch = useAppDispatch();
    const authUser = useSelector(user);

    let userAccessLevel = useSelector(userAccessSelector);
    const groups = useSelector(selectAllSettingGroups);
    const label = 'To configure individual agent settings, search for your agent by name, email, or MLS ID here';

    async function saveSettings() {
        return Promise.all(saveAllSettings(userFormattedSettings));
    }

    const handleMemberChange = (id: string, value: settingMemberType) => {
        console.log('member changed')
        if (!isObjectEmpty(value)) {
            setMlsId(value.loginId);
            setUseAs(value);
        } else {
            setMlsId(authUser.profile.userid);
            setUseAs(authUser.profile);
        }
    }

    const handleSettingChange = (typeId: number, value: string) => {
        let state = store.getState().generalSettings;
        let entities = store.getState().generalSettings.entities;
        let key = state.ids.findIndex((type) => type === typeId);
        if (key > -1) {
            // we found an existing setting for this option
            let real_setting = entities[typeId];
            let setting = {} as any;

            if (real_setting && real_setting.settingValue) {
                setting.settingValue = {...real_setting.settingValue};
                setting.settingValue.shortValue = value;
            } else {
                setting.settingValue = {
                    typeId: typeId,
                    shortValue: value,
                    longValue: '',
                    sortOrder: 0,
                    settingType: getSettingTypeById(typeId, groupTypes),
                    accessLevel: 0,
                    createdBy: '',
                    createdOn: '',
                    id: 0,
                    modifiedBy: '',
                    modifiedOn: '',
                }
            }

            dispatch(updateGeneralSetting(setting))
        } else {
            // there's no existing setting in the system-- so add one to the store so we can save it later
            dispatch(insertGeneralSetting({
                settingValue:  {
                    typeId: typeId,
                    shortValue: value,
                    longValue: '',
                    sortOrder: 0,
                    settingType: getSettingTypeById(typeId, groupTypes),
                    accessLevel: 0,
                    createdBy: '',
                    createdOn: '',
                    id: 0,
                    modifiedBy: '',
                    modifiedOn: '',
                }
            }))
        }
        setDirty(true);
    }

    const getMemberSelection = () => {
        // if they're a broker or above show the user selection
        if (userAccessLevel >= 2) {
            return (
                <div
                    className="border-b border-default py-6 sm:flex sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                        <SettingMemberAutoComplete
                            setFieldValue={handleMemberChange}
                            field={
                                {
                                    type: 'auto',
                                    id: 'member',
                                    label: label,
                                }
                            }
                        />
                    </div>
                </div>
            )
        } else {
            return <></>
        }
    }

    

    return (
        <>
            {getMemberSelection()}
            <div className="py-6 lg:grid lg:grid-cols-12 lg:gap-x-5 max-w-4xl">
                <div className="space-y-6 lg:col-span-12">
                    {groups.map((setting_group) => {
                        let groupTypeEntities = groupTypes.find((gt) => gt.id === setting_group.id);
                        if (groupTypeEntities && groupTypeEntities.groupTypes.length) {
                            return (
                                <React.Fragment key={setting_group.id}>
                                    <div>
                                        <h2>Available Settings</h2>
                                        {mlsId !== authUser.profile.userid &&
                                        <span
                                            className="mr-4 text-red-600 text-sm">On behalf of: {formatMemberUser(useAs)}
                                        </span>}
                                    </div>
                                    <SettingGroupElements
                                        settingsGroupTypes={groupTypeEntities ? groupTypeEntities.groupTypes : []}
                                        settings={userFormattedSettings}
                                        changeHandler={handleSettingChange}
                                        userLevel={1}
                                    />
                                </React.Fragment>
                            )
                        }
                        return '';
                    })}
                </div>
                <div className="space-y-6 lg:col-span-12">
                    <div className="flex justify-end pt-6">
                        <button
                            disabled={!dirty}
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-inverse bg-header hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
                            onClick={() => {
                                saveSettings()
                                    .then((res) => {
                                            console.log(res);
                                            dispatch(show(
                                                {
                                                    show: true,
                                                    status: 'success',
                                                    title: 'Settings saved!',
                                                    message: 'Settings saved!',
                                                    position: 'popover',
                                                    autoHide: false,
                                                    confirm: false,
                                                    notificationId: null                                                    
                                                }
                                            ))
                                        }
                                    )
                                    .then(() => setDirty(false))
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberSettings;