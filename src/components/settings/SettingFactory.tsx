import React from "react";
import {groupTypeEntity} from "./SettingGroupElements";
import {useSelector} from "react-redux";
import {selectSettingInputTypeById} from "../../features/generalSettings/settingsInputTypeSlice";
import {RootState} from "../../app/store";
import SelectListSetting from "../widgets/settingsObjects/SelectListSetting";
// import BooleanSetting from "../widgets/settingsObjects/BooleanSetting";
import {formattedSettingEntity} from "../../features/generalSettings/settingsHelper";

export type settingObjectProps = {
    settingGroupType: groupTypeEntity,
    value: string | undefined,
    changeHandler: (typeId: number, value: string) => void,
    disabled: boolean,
    userLevel: number,
}

export type settingFactoryProps = {
    settingGroupType: groupTypeEntity,
    setting: formattedSettingEntity | undefined,
    changeHandler: (typeId: number, value: string) => void,
    userLevel: number,
}

const SettingFactory = ({settingGroupType, setting, changeHandler, userLevel}: settingFactoryProps) => {
    const inputType = useSelector((state: RootState) => selectSettingInputTypeById(state, settingGroupType.settingInputTypeId));

    if (setting === undefined) {
        // setting is undefined, so that means we know nothing about it-- create it with no defaults
        // TODO: we need to think about how defaults ought to work here, and possibly add handling for them at the setting type level
        setting = {
            ownerId: '',
            typeId: settingGroupType.id,
            shortValue: undefined,
            originalValue: undefined,
            isEditable: true,
            id: null,
            ownerType: 0,
            ownerName: null,
        }
    }

    if (inputType && setting) {
        switch (inputType.inputStyle) {
            case 'select':
                return <SelectListSetting settingGroupType={settingGroupType} value={setting.shortValue} changeHandler={changeHandler} disabled={!setting.isEditable} userLevel={userLevel} />
            default:
                return <div>Ain't no such type</div>
        }
    } else {
        return (
            <div>Setting Factory</div>
        );
    }
}

export default SettingFactory;