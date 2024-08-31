import SettingGroupElements, {groupTypeEntity} from "../../components/settings/SettingGroupElements";
import {userLevels} from "../user/selectors";
import {DerivedSettingEntity, SettingTypeEntity} from "../../util/memberPortalTypes";
import {getSettingsGroupTypes, saveFormattedSetting} from "../../adapters";
import {AxiosResponse} from "axios";
import React from "react";

export function isObjectEmpty(obj: object) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getSettingTypeById(typeId: number, groupTypes: {id: number, groupTypes: SettingTypeEntity[]}[]) : SettingTypeEntity | undefined {
    let settingType: SettingTypeEntity | undefined = undefined;
    groupTypes.forEach((gt) => {
        let types = gt.groupTypes;
        if (Object.keys(types).length) {
            let foundTypeSearch = types.find((gtt: any) => gtt.id === typeId);
            if (foundTypeSearch) {
                settingType = foundTypeSearch;
            }
        }
    })

    return settingType;
}

export type settingMemberType = {
    contactId: string,
    firstName: string,
    lastName: string,
    fullName: string,
    emailAddress: string,
    aorShortName: string,
    applicationShortName: string,
    mlsShortName: string,
    memberStatus: string,
    memberType: string,
    aorName: string,
    applicationName: string,
    mlsName: string,
    memberStatusName: string,
    memberTypeName: string,
    searchIndex: string,
    loginId: string,
    officeCode: string,
    mainOfficeCode: string,
    createdOn: string,
    id: number,
    modifiedOn: string,
}

export const isSettingLocked = (userAccessLevel: number, settingGroup: groupTypeEntity|SettingTypeEntity, settingEntity: DerivedSettingEntity | undefined) => {
    // disable the setting IF:
    // user's accessLevel <= settingGroupType.accessLevel
    // AND mainOfficeSetting exists
    // AND mainOfficeSetting.shortValue !== 99
    // OR
    // mainOfficeSetting does NOT exist
    // AND settingsGroupType.defaultAllow !== 1
    if (!settingEntity) {
        return true;
    } else if (settingGroup.accessLevel <= userAccessLevel) {
        // if the setting's access is lower than the user's, return UNLOCKED immediately
        return false;
    } else if (settingEntity.hasOwnProperty('mainOfficeSetting') && settingEntity.mainOfficeSetting && settingEntity.mainOfficeSetting.hasOwnProperty('shortValue')) {
        // if we got here, the setting's access level must be greater than the user's accesslevel, so let's check if the main office setting is 99
        return settingEntity.mainOfficeSetting.shortValue !== "99";
    } else if (!settingEntity.hasOwnProperty('mainOfficeSetting')) {
        // only fall back to the setting group if we have nothing else to go on
        if (settingGroup.defaultAllow === 1) {
            return false;
        }
    }

    // fail down to return LOCKED by default
    return true;
}

export type formattedSettingEntity = {
    ownerId: string
    typeId: number,
    shortValue: string | undefined,
    originalValue: string | undefined,
    isEditable: boolean,
    id: string | null | undefined,
    ownerType: number,
    ownerName: any,
}

export const formatDerivedSettings = (memberRequest: boolean, userAccessLevel: number, user: any, derivedSettings: (DerivedSettingEntity|undefined)[], groupTypes: {id: number, groupTypes: any}[]): formattedSettingEntity[] => {
    // debugger;
    // start out with an accessLevel of zero, then we'll set it as we figure out who's making the request
    let accessLevel = 0;
    let typeSearch: any = null;
    let formattedEntity: formattedSettingEntity = {
        ownerId: '',
        typeId: 0,
        shortValue: '',
        originalValue: '',
        isEditable: false,
        id: null,
        ownerType: accessLevel,
        ownerName: user
    }

    // if we're formatting member settings, only look at the member IDs
    if (memberRequest) {
        if (user.hasOwnProperty('member')) {
            // we're working as the logged in user
            formattedEntity.ownerId = user.member.id;
            accessLevel = userAccessLevel;
        } else if (user.hasOwnProperty('contactId')) {
            // we're working on behalf of another MEMBER
            formattedEntity.ownerId = user.contactId;
            // I *think* this is unnecessary and we'll always have an accessLevel of 1 for a member setting?
            let memberType = userLevels.find((userLevel) => userLevel.shortName === user.memberType);
            if (memberType) {
                accessLevel = memberRequest ? 1 : memberType.value;
            }
        }
    } else {
        // if we're looking at office settings, look at the office IDs
        if (user.hasOwnProperty('office')) {
            formattedEntity.ownerId = user.office.id;
            accessLevel = userAccessLevel;
        } else if (user.hasOwnProperty('officeStatusId')) {
            // we're working on behalf of another OFFICE
            formattedEntity.ownerId = user.id;
            accessLevel = (user.officeCode === user.mainOfficeCode) ? 3 : 2;
        }
    }

    formattedEntity.ownerType = accessLevel;

    let formattedEntities: formattedSettingEntity[] = [];
    derivedSettings.forEach((settingEntity) => {
        if (!settingEntity) {
            return;
        }
        /*
         * This is hopefully a temporary hack while we get the derived settings figured out
         * we *must* have at least member / office / mainOffice setting here, so use those values
         */
        if (!settingEntity.settingValue) {
            let tId = 0;

            if (settingEntity.mainOfficeSetting) {
                tId = settingEntity.mainOfficeSetting.typeId;
            } else if (settingEntity.officeSetting) {
                tId = settingEntity.officeSetting.typeId;
            } else if (settingEntity.memberSetting) {
                tId = settingEntity.memberSetting.typeId;
            }

            formattedEntity.typeId = tId;

            // we do this because if we don't have the group type in the derived setting, we need to look it up for the
            // disabled check
            typeSearch = getSettingTypeById(tId, groupTypes);

            // I *THINK* this should never happen-- if a user is a member / office / mainOffice and there's a
            // memberSetting / officeSetting / mainOfficeSetting, there should also
            // be a settingValue getting derived. But I'll leave it just in case
            if (accessLevel === 1 && settingEntity.memberSetting) {
                formattedEntity.shortValue = settingEntity.memberSetting.shortValue;
            } else if (accessLevel === 2 && settingEntity.officeSetting) {
                formattedEntity.shortValue = settingEntity.officeSetting.shortValue;
            } else if (accessLevel >= 3 && settingEntity.mainOfficeSetting) {
                formattedEntity.shortValue = settingEntity.mainOfficeSetting.shortValue;
            }
        } else {
            formattedEntity.typeId = settingEntity.settingValue.typeId;
            formattedEntity.shortValue = settingEntity.settingValue.shortValue;
        }
        /*
         * end temporary
         */

        if (accessLevel === 1 && settingEntity.memberSetting) {
            formattedEntity.id = settingEntity.memberSetting?.id;
            formattedEntity.ownerId = settingEntity.memberSetting.memberId;
        } else if (accessLevel === 2 && settingEntity.officeSetting) {
            formattedEntity.id = settingEntity.officeSetting?.id;
            formattedEntity.ownerId = settingEntity.officeSetting.officeId;
        } else if (accessLevel >= 3 && settingEntity.mainOfficeSetting) {
            formattedEntity.id = settingEntity.mainOfficeSetting?.id;
            formattedEntity.ownerId = settingEntity.mainOfficeSetting.officeId;
        }

        let entitySettingType = (settingEntity.settingValue && settingEntity.settingValue.settingType) ? settingEntity.settingValue.settingType : typeSearch;
        formattedEntity.isEditable = entitySettingType ? !isSettingLocked(accessLevel, entitySettingType, settingEntity) : false;

        // add all this to the entities
        formattedEntities.push(formattedEntity);
    })

    return formattedEntities;
}

export const saveAllSettings = (settings: formattedSettingEntity[]) : Promise<AxiosResponse<any>>[] => {
    let promises: Promise<AxiosResponse<any>>[] = [];
    settings.forEach((setting) => {
        promises.push(saveFormattedSetting(setting))
    });

    return promises;
}

export async function getGroupTypes(id: number) {
    return await getSettingsGroupTypes(id);
}

export function findTypeIdFromDerivedSetting(settingEntity: DerivedSettingEntity): number {
    if (settingEntity.settingValue) {
        return settingEntity.settingValue.typeId;
    } else if (settingEntity.memberSetting) {
        return settingEntity.memberSetting.typeId;
    } else if (settingEntity.officeSetting) {
        return settingEntity.officeSetting.typeId;
    } else if (settingEntity.mainOfficeSetting) {
        return settingEntity.mainOfficeSetting.typeId;
    }

    return 0;
}

export function formatMemberUser(user: any): string {
    if (user.hasOwnProperty('contactId')) {
        return user.loginId + ' - ' + user.firstName + ' ' + user.lastName + ' - ' + user.emailAddress;
    }
    return '';
}

export function formatOfficeUser(user: any): string {
    if (user.hasOwnProperty('officeStatusId')) {
        return user.officeCode + ' - ' + user.name;
    }
    return '';
}