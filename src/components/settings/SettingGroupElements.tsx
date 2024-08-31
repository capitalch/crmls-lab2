import React from "react";
import SettingFactory from "./SettingFactory";
import {formattedSettingEntity} from "../../features/generalSettings/settingsHelper";
import {SettingInputTypeEntity, SettingValueEntity} from "../../util/memberPortalTypes";

export interface groupTypeEntity {
    id: number,
    name: string,
    description: string,
    actionRequired: number,
    accessLevel: number,
    settingInputTypeId: number,
    settingInputType: SettingInputTypeEntity,
    settingValues: SettingValueEntity[],
    createdOn: string,
    createdBy: string,
    modifiedBy: string,
    modifiedOn: string,
    defaultAllow: number,
}

export type settingGroupElementProps = {
    settingsGroupTypes: any[],
    settings: formattedSettingEntity[],
    changeHandler: (typeId: number, value: string) => void,
    userLevel: number,
}

const SettingGroupElements = ({settingsGroupTypes, settings, changeHandler, userLevel}: settingGroupElementProps) => {
    const buildSettings = () => {
        if (settingsGroupTypes.length) {
            return <>
                {
                    settingsGroupTypes.map((settingGroupType) => {
                        let formattedSetting = settings.find((settingEntity) => settingEntity.typeId === settingGroupType.id);
                        return <SettingFactory key={settingGroupType.id} settingGroupType={settingGroupType} setting={formattedSetting} changeHandler={changeHandler} userLevel={userLevel} />
                    })
                }
                </>
        } else {
            return <div className="px-4">No results</div>
        }
    }

    return (
        // <div className="px-4">
            buildSettings()
        // </div>
    );
}

export default SettingGroupElements;