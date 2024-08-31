import { dynamicMenuType } from './../components/menu/dynamicMenuSlice';
import {Action, AnyAction} from "@reduxjs/toolkit";
import axios from "axios";
import {formattedSettingEntity} from "../features/generalSettings/settingsHelper";
import dayjs from "dayjs";
import {accessControlType} from "../features/accessControls/accessControlsSlice";
import {getEnvironmentFromLocation} from "../util/helpers";

// TODO: Need to set env var or otherwise figure out solid way to determine dev
let base, membership, member_portal, training, mace, notifications, membershipProfile, kpis, compliance,crib;
let environment = getEnvironmentFromLocation();

// this is assuming staging will be hitting prod endpoints. . .double check this!
switch (environment) {
    case "production":
    case "staging":
    case "gsmls":
    case "sso":
        base = 'https://prod-registeredlistings-api.azurewebsites.net/';
        membership = 'https://membershipdirectory.azurewebsites.net/';
        member_portal = 'https://prod-memberportalapi.azurewebsites.net/';
        training = 'https://trainingapi-prod.azurewebsites.net/';
        mace = 'https://macewindu.azurewebsites.net/';
        notifications = 'https://crmlsnotification.azurewebsites.net/';
        membershipProfile = 'https://membershipapi-prod.azurewebsites.net/';
        kpis = "https://kpi-prod.azurewebsites.net/";
        compliance = "https://complianceapi-prod-app.azurewebsites.net/";
        crib= 'https://cribdata-dev.azurewebsites.net/'
        break;
    case "testing":
    case "mmuat":
        base = 'https://test-registeredlistings-api.azurewebsites.net/';
        membership = 'https://membershipdirectory-api-test.azurewebsites.net';
        member_portal = 'https://test-memberportalapi.azurewebsites.net/';
        training = 'https://trainingapi-test.azurewebsites.net/';
        mace = 'https://macewindu-test.azurewebsites.net/';
        notifications = 'https://crmlsnotification-test.azurewebsites.net/';
        membershipProfile = 'https://membershipapi-test.azurewebsites.net/';
        kpis = "https://kpi-dev.azurewebsites.net/"; // @todo: update when test api is published (https://kpi-test.azurewebsites.net/)
        compliance = 'https://complianceapi-uat-app-westus.azurewebsites.net/'
        crib = 'https://cribdata-dev.azurewebsites.net/'
    break;
    case "development":
    case "local":
    case "mmdemo":
    default:
        base = 'https://dev-registeredlistings-api.azurewebsites.net/';
        membership = 'https://membershipdirectory-dev.azurewebsites.net/';
        member_portal = 'https://dev-memberportalapi.azurewebsites.net/';
        training = 'https://trainingapi-dev.azurewebsites.net/';
        mace = 'https://macewindu-dev.azurewebsites.net/';
        notifications = 'https://crmlsnotification-dev.azurewebsites.net/';
        membershipProfile = 'https://membership-dev.azurewebsites.net/';
        kpis = "https://kpi-dev.azurewebsites.net/";
        compliance = 'https://complianceapi-dev.azurewebsites.net/'
        crib ='https://cribdata-dev.azurewebsites.net/'
    break;
}

export const base_url = base;
export const membership_url = membership;
export const member_portal_url = member_portal;
export const training_url = training;
export const mace_url = mace;
export const notifications_url = notifications;
export const json_server_url = 'http://localhost:3000/'; // For local dev using json server
export const profile_url = membershipProfile;
export const kpi_url = kpis;
export const compliance_url = compliance;
export const crib_url = crib;
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

export function getPaginatedMembershipResource(resource:string, payload: any) {
    return axios.post(`${profile_url}api/app/${resource}/q`, {
        pageId: payload.pageId,
        pageSize: payload.pageSize,
        criteria: payload.criteria,
        orderBy: payload.orderBy,
    });
}

export async function updateMembershipResourse(resource:string, payload: any) {
    return await axios.put(`${profile_url}api/app/${resource}/${payload?.id}`, payload);
}
export async function fetchMembershipResourseWithId(resource:string, id: string|number) {
    const result = await axios.get(`${profile_url}api/app/${resource}/${id}`);
    return result.data.results?.[0]
}
export async function fetchMembershipData(resource:string) {
    const result = await axios.get(`${profile_url}api/app/${resource}`);
    return result.data.results
}
export async function createMembershipResourse(resource:string, payload: any) {
    return await axios.post(`${profile_url}api/app/${resource}`, payload);
}
export async function patchMembershipResource(resourcePath:string, payload: any) {
    return await axios.patch(`${profile_url}api/app/${resourcePath}`, payload);
}

export async function fetchAllMembershipData({resource, criteria = [], orderBy = [], searchCriteria = []}:{resource:string, criteria?:any, searchCriteria?:any, orderBy?:any}) {
    let pageSize = 10000;
    let pageId = 0
    let results = [];
    let url = profile_url + "api/app/" + resource + "/q"
    let config = {
        pageId,
        pageSize,
        criteria,
        orderBy,
        searchCriteria
    }
    let response =  await axios.post(url, config);
    results = response.data.results;

    while (pageId + 1 < response.data.totalPages) {
        pageId++;
        response = await await axios.post(url, config);;
        results = results.concat(response.data.results);
    }

    return results;
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
    // return axios.get(member_portal_url + url);

    return {
        data: {
            "isSuccessful": true,
            "results": [{
                "contactId": "dce5c1f0-85c2-4eca-ad3d-7035caca2121",
                "memberMlsId": "B36607",
                "aorShortName": "BB",
                "applicationId": "f10f31f7-5f59-4e21-b4c6-08d8e5f2b40a",
                "applicationName": "Glide",
                "applicationNameShort": "GLIDE",
                "officeId": "9503d004-3013-4623-a817-175fed9255d6",
                "officeMlsId": "BH5345029",
                "mainOfficeId": "1cbc9f29-47aa-433d-af05-b7397bdf3e58",
                "mainOfficeMlsId": "BH5730001",
                "accessControl": 1,
                "accessLevel": 3,
                "createdOn": "0001-01-01T00:00:00+00:00",
                "modifiedOn": "0001-01-01T00:00:00+00:00"
            }, {
                "contactId": "dce5c1f0-85c2-4eca-ad3d-7035caca2121",
                "memberMlsId": "B36607",
                "aorShortName": "BB",
                "applicationId": "94d4ae6e-0314-4c07-80e1-682bcb0d6438",
                "applicationName": "Matrix",
                "applicationNameShort": "MTX",
                "officeId": "9503d004-3013-4623-a817-175fed9255d6",
                "officeMlsId": "BH5345029",
                "mainOfficeId": "1cbc9f29-47aa-433d-af05-b7397bdf3e58",
                "mainOfficeMlsId": "BH5730001",
                "accessControl": 1,
                "accessLevel": 1,
                "createdOn": "0001-01-01T00:00:00+00:00",
                "modifiedOn": "0001-01-01T00:00:00+00:00"
            },
                {
                    "contactId": "dce5c1f0-85c2-4eca-ad3d-7035caca2121",
                    "memberMlsId": "B36607",
                    "aorShortName": "BB",
                    "applicationId": "94d4ae6e-0314-4c07-80e1-682bcb0d6438",
                    "applicationName": "Flexmls",
                    "applicationNameShort": "FLEXMLS",
                    "officeId": "9503d004-3013-4623-a817-175fed9255d6",
                    "officeMlsId": "BH5345029",
                    "mainOfficeId": "1cbc9f29-47aa-433d-af05-b7397bdf3e58",
                    "mainOfficeMlsId": "BH5730001",
                    "accessControl": 1,
                    "accessLevel": 3,
                    "createdOn": "0001-01-01T00:00:00+00:00",
                    "modifiedOn": "0001-01-01T00:00:00+00:00"
                },
                {
                    "contactId": "dce5c1f0-85c2-4eca-ad3d-7035caca2121",
                    "memberMlsId": "B36607",
                    "aorShortName": "BB",
                    "applicationId": "94d4ae6e-0314-4c07-80e1-682bcb0d6438",
                    "applicationName": "LionDesk",
                    "applicationNameShort": "LIONDESK",
                    "officeId": "9503d004-3013-4623-a817-175fed9255d6",
                    "officeMlsId": "BH5345029",
                    "mainOfficeId": "1cbc9f29-47aa-433d-af05-b7397bdf3e58",
                    "mainOfficeMlsId": "BH5730001",
                    "accessControl": 1,
                    "accessLevel": 1,
                    "createdOn": "0001-01-01T00:00:00+00:00",
                    "modifiedOn": "0001-01-01T00:00:00+00:00"
                },
                {
                    "contactId": "dce5c1f0-85c2-4eca-ad3d-7035caca2121",
                    "memberMlsId": "B36607",
                    "aorShortName": "BB",
                    "applicationId": "94d4ae6e-0314-4c07-80e1-682bcb0d6438",
                    "applicationName": "Top Producer",
                    "applicationNameShort": "Top Producer",
                    "officeId": "9503d004-3013-4623-a817-175fed9255d6",
                    "officeMlsId": "BH5345029",
                    "mainOfficeId": "1cbc9f29-47aa-433d-af05-b7397bdf3e58",
                    "mainOfficeMlsId": "BH5730001",
                    "accessControl": 1,
                    "accessLevel": 1,
                    "createdOn": "0001-01-01T00:00:00+00:00",
                    "modifiedOn": "0001-01-01T00:00:00+00:00"
                },
                {
                    "contactId": "dce5c1f0-85c2-4eca-ad3d-7035caca2121",
                    "memberMlsId": "B36607",
                    "aorShortName": "BB",
                    "applicationId": "94d4ae6e-0314-4c07-80e1-682bcb0d6438",
                    "applicationName": "CloudCMA",
                    "applicationNameShort": "CloudCMA",
                    "officeId": "9503d004-3013-4623-a817-175fed9255d6",
                    "officeMlsId": "BH5345029",
                    "mainOfficeId": "1cbc9f29-47aa-433d-af05-b7397bdf3e58",
                    "mainOfficeMlsId": "BH5730001",
                    "accessControl": 0,
                    "accessLevel": 1,
                    "createdOn": "0001-01-01T00:00:00+00:00",
                    "modifiedOn": "0001-01-01T00:00:00+00:00"
                },
                {
                    "contactId": "dce5c1f0-85c2-4eca-ad3d-7035caca2121",
                    "memberMlsId": "B36607",
                    "aorShortName": "BB",
                    "applicationId": "94d4ae6e-0314-4c07-80e1-682bcb0d6438",
                    "applicationName": "ShowingTime",
                    "applicationNameShort": "SHOWINGTIME",
                    "officeId": "9503d004-3013-4623-a817-175fed9255d6",
                    "officeMlsId": "BH5345029",
                    "mainOfficeId": "1cbc9f29-47aa-433d-af05-b7397bdf3e58",
                    "mainOfficeMlsId": "BH5730001",
                    "accessControl": 0,
                    "accessLevel": 1,
                    "createdOn": "0001-01-01T00:00:00+00:00",
                    "modifiedOn": "0001-01-01T00:00:00+00:00"
                },
                {
                    "contactId": "dce5c1f0-85c2-4eca-ad3d-7035caca2121",
                    "memberMlsId": "B36607",
                    "aorShortName": "BB",
                    "applicationId": "94d4ae6e-0314-4c07-80e1-682bcb0d6438",
                    "applicationName": "BoxMLS",
                    "applicationNameShort": "BOXMLS",
                    "officeId": "9503d004-3013-4623-a817-175fed9255d6",
                    "officeMlsId": "BH5345029",
                    "mainOfficeId": "1cbc9f29-47aa-433d-af05-b7397bdf3e58",
                    "mainOfficeMlsId": "BH5730001",
                    "accessControl": 0,
                    "accessLevel": 1,
                    "createdOn": "0001-01-01T00:00:00+00:00",
                    "modifiedOn": "0001-01-01T00:00:00+00:00"
                },
            ]
        }
    }

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
