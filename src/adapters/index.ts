import { dynamicMenuType } from './../components/menu/dynamicMenuSlice';
import {Action, AnyAction} from "@reduxjs/toolkit";
import axios from "axios";
import {formattedSettingEntity} from "../features/generalSettings/settingsHelper";
import dayjs from "dayjs";
import {accessControlType} from "../features/accessControls/accessControlsSlice";

export const base_url = process.env.REACT_APP_REGLISTINGS_URL;
export const membership_url = process.env.REACT_APP_MEMBERSHIP_URL;
export const member_portal_url = process.env.REACT_APP_MEMBER_PORTAL_URL;
export const training_url = process.env.REACT_APP_TRAINING_URL;
export const mace_url = process.env.REACT_APP_MACE_URL;
export const notifications_url = process.env.REACT_APP_NOTIFICATIONS_URL;
export const profile_url = process.env.REACT_APP_PROFILE_URL;
export const kpi_url = process.env.REACT_APP_KPIS_URL;
export const workflow_url = process.env.REACT_APP_WORKFLOW_URL;
export const compliance_url = process.env.REACT_APP_COMPLIANCE_URL;
export const crib_url = process.env.REACT_APP_CRIB_URL;
export const media_url = process.env.REACT_APP_MEDIA_URL;

export type axiosConfig = {
    token: string,
    endpoint?: string,
}

export type derivedParameters = {
    type: 'member' | 'office',
    id: string,
}

export type crmlsPayload = {
    pageId: number,
    pageSize: number,
    totalResults: number,
    totalPages: number,
    isSuccessful: boolean,
    results: any[],
    exceptions?: string[],
    message?: string,
}

export type qPayload = {
    pageId: number,
    pageSize: number,
    criteria: qCriteria[],
    orderBy: { field: string, direction: string }[]
}

export type qCriteria = {
    field: string,
    op: string,
    values: any[] | string[],
}

export function defaultCrmlsPayload() {
    return {
        pageId: 0,
        pageSize: 0,
        totalResults: 0,
        totalPages: 0,
        isSuccessful: true,
        results: [],
    }
}

export function get(url: string, id?: string){
    let req_url = id ? url + id : url;
    return axios.get(req_url);
}

export function post(url: string, requestData: object){
    return axios.post(url, requestData);
}

export function put(url: string, requestData: object){
    return axios.put(url, requestData);
}

export function del(url: string, id: string){
    return axios.delete(url + '/' + id);
}

export interface RejectedAction extends Action {
    error: Error
}

export function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('rejected')
}

export function isPendingAction(action: AnyAction) {
    return action.type.endsWith('pending')
}

export function getMemberByLoginId(id: string, officeId?: string | null) {
    let criteria = {
        "pageId": 0,
        "pageSize": 1,
        "criteria": [
            {
                "field": "loginId",
                "op": "Equal",
                "values": [
                    id
                ]
            }
        ],
    }

    return axios.post(membership_url + 'api/app/AudienceIndex/q', criteria)
}

export function memberSettingTypeahead(searchString: string, entityId: string, entity: 'office' | 'mainOffice' | 'aor' | 'crmls') {
    let queryString = encodeURIComponent(searchString) + '?';
    switch (entity) {
        case 'office':
            queryString += 'officeCode=' + encodeURIComponent(entityId);
            break
        case 'mainOffice':
            queryString += 'mainOfficeCode=' + encodeURIComponent(entityId);
            break;
        case 'aor':
            queryString += 'aorShortName=' + encodeURIComponent(entityId);
            break;
        case 'crmls':
        default:
            break;
    }
    // officeCode, mainOfficeCode, aorShortName
    return axios.get(member_portal_url + `api/app/AudienceIndexes/ta/${queryString}`)
}

export function officeSettingTypeahead(searchString: string, entityId: string, entity: | 'mainOffice' | 'aor' | 'crmls', onlyMain: boolean) {
    let queryString = encodeURIComponent(searchString) + '?';
    switch (entity) {
        case 'mainOffice':
            queryString += 'mainOfficeCode=' + encodeURIComponent(entityId);
            break;
        case 'aor':
            queryString += 'aorShortName=' + encodeURIComponent(entityId);
            break;
        case 'crmls':
        default:
            break;
    }

    if (onlyMain) {
        queryString += "onlyMain=true"
    }

    // officeCode, mainOfficeCode, aorShortName
    return axios.get(member_portal_url + `api/app/Offices/ta/${queryString}`)
}

export function memberTypeahead(input_text: string) {
    return axios.get(base_url + `cribdata/Members/ta/${input_text}`)
}

export function ticketTypeahead(input_text: string) {
    let payload = {
        pageSize: 10,
    } as any;

    if(input_text?.length > 0){
        payload.searchText =  input_text;
    }
    return axios.post(`${workflow_url}api/app/WorkItem/q`,payload)
}

export function getAllTickets(criteria: {activePage: number, pageSize: number, orderBy: any[]}) {
    return axios.post( `${workflow_url}api/app/WorkItem/q`,{
            pageId: criteria.activePage,
            pageSize: criteria.pageSize,
            orderBy: criteria.orderBy,
    })
}
export function getTicket(id:string) {
    return axios.get(`${workflow_url}api/app/FormDefinition/ByWorkItem/${id}/expanded/view`);
}

export function getAllArticles(criteria: {activePage: number, pageSize: number, orderBy: any[]}) {
    return axios.post( `${mace_url}api/app/article/q`,{
            pageId: criteria.activePage,
            pageSize: criteria.pageSize,
            orderBy: criteria.orderBy,
    })
}

export function getArticle(id:string) {
    return axios.get(`${mace_url}api/app/article/${id}/expanded`);
}

export function getRegisteredListings() {
    return axios.post(base_url + "api/app/Registration/q", {
            pageId: 0,
            pageSize: 10000,
        })
}

export function getPaginatedRegisteredListings(payload: any) {
    return axios.post(base_url + "api/app/Registration/search/", {
        pageId: payload.pageId,
        pageSize: payload.pageSize,
        criteria: payload.criteria,
        orderBy: payload.orderBy,
    });
}

export function getRegisteredListingById(id: string) {
    return axios.get(base_url + `api/app/Registration/${id}`)
}

export function getCribLookupsById(group_id: number) {
    return axios.get(base_url + `cribdata/LookupValues/${group_id}`)
}

export function getMemberData() {
    return axios.get(member_portal_url + 'api/app/Members/AuthMemberDto');
}

export function getProfileData(memberId: string) {
    return axios.get(profile_url + `api/app/Profiles/Contact/${memberId}`);
}

export function saveProfileData(profileData: any) {
    return axios.put(profile_url + `api/app/Profiles/${profileData.id}`, profileData);
}

export function getTaxRecord(url: string, id: string){
    let req_url = id ? url + '?address=' + id : url;
    return axios.get(base_url + req_url);
}

export function getAppSettings(loginId: string) {
    let url = `api/app/MemberAccessControls/${loginId}`;
    return axios.get(member_portal_url + url);
}

export function getOfficeAppSettings(officeId: string) {
    let url = `api/app/OfficeAccessControls/${officeId}`;
    return axios.get(member_portal_url + url);
}

export function changeAppSetting(officeId: string, id: string, value: string|boolean) {
    let data = {
        "officeId": officeId,
        "applicationId": id,
        "accessControl": value ? 1 : 0,
    }
    return axios.put(member_portal_url + 'api/app/OfficeApplications', data);
}

export function getGeneralSettings() {
    return axios.post(member_portal_url + 'api/app/MemberSettings/q', {
        pageId: 0,
        pageSize: 5000,
    });
}

export function getDerivedSettings(type: string, id: string) {
    return axios.get(member_portal_url + `api/DerivedSettings/${type}/${id}`);
}

export function getOfficeSettings(officeId: string) {
    return axios.post(member_portal_url + 'api/app/OfficeSettings/q', {
        pageId: 0,
        pageSize: 5000,
        criteria: [
            {
                "field": "Office.OfficeId",
                "op": "Equal",
                "values": [
                    officeId
                ]
            }
        ],
    })
}

export function createGeneralSettings() {
    return axios.post(member_portal_url + 'api/app/MemberSettings/q', {
        pageId: 0,
        pageSize: 5000,
    });
}

export function getGeneralSettingsTypes() {
    return axios.post(member_portal_url + 'api/app/SettingTypes/q', {
        pageId: 0,
        pageSize: 5000,
    });
}

export function getGeneralSettingsInputTypes() {
    return axios.post(member_portal_url + 'api/app/InputTypes/q', {
        pageId: 0,
        pageSize: 5000,
    });
}

export function getSettingsValues(settingId: string) {
    return axios.post(member_portal_url + 'api/app/SettingValues/q', {
        pageId: 0,
        pageSize: 100,
        criteria: [
            {
                "field": "typeId",
                "op": "Equal",
                "values": [
                    settingId
                ]
            }
        ],
    })
}

export function getSettingsGroups() {
    return axios.post(member_portal_url + 'api/app/SettingGroups/q', {
        pageId: 0,
        pageSize: 100,
        criteria: [],
    });
}

export async function getSettingsGroupTypes(id: number) {
    return axios.get(member_portal_url + `api/app/SettingGroups/${id}/types`);
}

export function saveFormattedSetting(setting: formattedSettingEntity) {
    let field, member_office;

    if (setting.ownerType > 1) {
        member_office = 'Office';
        field = 'officeId';
    } else {
        member_office = 'Member';
        field = 'memberId';
    }

    let payload = {
        typeId: setting.typeId,
        shortValue: setting.shortValue,
        actionRequired: 1,
        [field]: setting.ownerId,
    }

    let url = member_portal_url + `api/app/${member_office}Settings`

    if (setting.id) {
        // updating an existing setting-- let's PUT
        return put(url + '/' + setting.id, payload);
    } else {
        // no existing setting-- we're going to POST
        return post(url, payload);
    }
}

export function getAllUpcomingTrainingClasses() {
    return axios.post(training_url + 'api/app/TrainingClass/q', {
        pageId: 0,
        pageSize: 100,
        criteria: [
            {
                field: 'startTime',
                op: "GreaterThan",
                values: [
                    dayjs().toISOString()
                ]
            }
        ],
        orderBy: [
            {
                field: 'startTime',
                order: 'desc'
            }
        ]
    });
}

export function getMyTrainingClasses(memberId: string) {
    return post(training_url + 'api/app/attendee/q', {
        pageId: 0,
        pageSize: 100,
        criteria: [
            {
                field: 'memberID',
                op: 0,
                values: [memberId]
            }
        ],
        orderBy: [
            {
                "field": 'trainingClass.startTime',
                "direction": 1,
            }
        ]
    })
}

export function getMyTrainingClassRequests(memberId: string) {
    return post(training_url + 'api/app/classrequest/q', {
        pageId: 0,
        pageSize: 500,
        criteria: [
            {
                "field": 'requestedBy',
                "op": 0,
                "values": [memberId]
            },
        ],
        orderBy: [
            {
                "field": 'dateTime',
                "direction": 1,
            }
        ]
    })
}

export function createTrainingClassRequest(topic: string, comments: string, dateTime: string, memberId: string) {
    return post(training_url + 'api/app/classrequest', {
        requestedBy: memberId,
        topic: topic,
        comments: comments,
        dateTime: dateTime,
    })
}

export function getDynamicMenus(): Promise<{data: { results: dynamicMenuType[] }}> {
    return axios.get(`${mace_url}api/app/DynamicMenus/`);
}

export function getAccessControls(): Promise<{ data: { results: accessControlType[] }}> {
    return new Promise((resolve, reject) => {
        resolve({
            data: {
                results: [
                    // // hide options from crisnet users
                    {
                        id: 'a',
                        type: 'menu',
                        name: 'syndication',
                        key: 'originatingSystemID',
                        value: ['CN','HD','GD'],
                        action: 'hide',
                        operator: 'contains',
                        createdOn: '',
                        modifiedOn: '',
                    },
                    {
                        id: 'b',
                        type: 'both',
                        name: 'profile',
                        key: 'isCrmlsAdmin',
                        value: 'true',
                        action: 'show',
                        operator: 'equal',
                        createdOn: '',
                        modifiedOn: '',
                    },
                    {
                        id: 'c',
                        type: 'both',
                        name: 'aorMessages',
                        key: 'isCrmlsAorAdmin',
                        value: 'true',
                        action: 'show',
                        operator: 'equal',
                        createdOn: '',
                        modifiedOn: '',
                    },
                ]
            }
        });
    })
}

export function getAudienceApplications() {
    return axios.get(`${member_portal_url}api/app/AudienceApplications/`);
}

export function getGenericContainers() {
    return axios.get(`${mace_url}api/app/GenericContainers/`);
}

export function getKpis() {
    return axios.get(`${kpi_url}api/app/KpiDefinition/ExecuteAll`);
}

export function fetchDataWithCriteria(baseUrl: string, resource: string, criteria: qPayload) {
    return axios.post(`${baseUrl}api/app/${resource}/q`, criteria);
}

