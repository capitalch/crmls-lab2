/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum QueryParameterOperation {
    Equal = "Equal",
    GreaterThan = "GreaterThan",
    GreaterThanOrEqual = "GreaterThanOrEqual",
    LessThan = "LessThan",
    LessThanOrEqual = "LessThanOrEqual",
    Between = "Between",
    NotEqual = "NotEqual",
    NotEmpty = "NotEmpty",
    Like = "Like",
    HasAny = "HasAny",
    Contains = "Contains",
    StartsWith = "StartsWith",
    NotLike = "NotLike",
    ContainsAny = "ContainsAny",
}

export interface ApiQueryParameter {
    field?: string | null;
    op?: QueryParameterOperation;
    values?: string[] | null;
}

export enum QuerySortDirection {
    Asc = "Asc",
    Desc = "Desc",
}

export interface ApiSortParameter {
    field?: string | null;
    direction?: QuerySortDirection;
}

export interface ApiQuery {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;
    criteria?: ApiQueryParameter[] | null;
    orderBy?: ApiSortParameter[] | null;
    fields?: string[] | null;
}

export interface AorEntity {
    name?: string | null;
    shortName?: string | null;
    description?: string | null;
    phone?: string | null;
    address1?: string | null;
    address2?: string | null;
    stateAssociation?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface AorQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: AorEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface AorServiceResult {
    isSuccessful?: boolean;
    results?: AorEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

/**
 * Holds access token (+ expiration) to use as Bearer token.
 */
export interface AccessTokenResult {
    token?: string | null;

    /** @format date-time */
    expiration?: string;
}

export interface ApplicationAccessEntity {
    memberMlsId?: string | null;

    /** @format int32 */
    accessControl?: number;

    /** @format uuid */
    applicationId?: string;
}

export interface ApplicationAccessServiceResult {
    isSuccessful?: boolean;
    results?: ApplicationAccessEntity[] | null;
    resultType?: string | null;

    /** @format int64 */
    totalCount?: number | null;

    /** @format int32 */
    pageIndex?: number | null;

    /** @format int32 */
    pageSize?: number | null;

    /** @format int32 */
    totalPages?: number | null;
    message?: string | null;
    exceptions?: string[] | null;
}

export interface ApplicationEntity {
    name: string;
    shortName?: string | null;
    description?: string | null;
    apiKey?: string | null;

    /** @format int32 */
    accessLevel: number;
    authorizedTypes?: string | null;
    roles?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface ApplicationQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: ApplicationEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface ApplicationServiceResult {
    isSuccessful?: boolean;
    results?: ApplicationEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface AudienceIndexEntity {
    /** @format uuid */
    contactId: string;
    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    emailAddress?: string | null;
    aorShortName?: string | null;
    applicationShortName?: string | null;
    mlsShortName?: string | null;
    memberStatus?: string | null;
    memberType?: string | null;
    aorName?: string | null;
    applicationName?: string | null;
    mlsName?: string | null;
    memberStatusName?: string | null;
    memberTypeName?: string | null;
    searchIndex?: string | null;
    loginId?: string | null;
    officeCode?: string | null;
    mainOfficeCode?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format int64 */
    id?: number;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface AudienceIndexServiceResult {
    isSuccessful?: boolean;
    results?: AudienceIndexEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface AudienceIndexQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: AudienceIndexEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingInputTypeEntity {
    inputStyle: string;
    dataType?: string | null;
    description?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format int64 */
    id?: number;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface SettingTypeEntity {
    settingValues?: SettingValueEntity[] | null;
    name: string;
    description?: string | null;

    /** @format int32 */
    actionRequired: number;

    /** @format int32 */
    accessLevel: number;

    /** @format int32 */
    defaultAllow: number;

    /** @format int64 */
    settingInputTypeId?: number | null;
    settingInputType?: SettingInputTypeEntity;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format int64 */
    id?: number;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface SettingValueEntity {
    /** @format int64 */
    typeId: number;
    shortValue: string;
    longValue: string;

    /** @format int32 */
    sortOrder: number;
    settingType?: SettingTypeEntity;

    /** @format int32 */
    accessLevel?: number | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format int64 */
    id?: number;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface MemberEntity {
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    title?: string | null;
    displayName?: string | null;

    /** @format int64 */
    contactTypeId?: number | null;
    photoUrl?: string | null;
    comment?: string | null;

    /** @format int32 */
    order: number;
    officeCode?: string | null;
    loginId?: string | null;

    /** @format int64 */
    memberStatusId?: number | null;

    /** @format int64 */
    memberTypeId?: number | null;

    /** @format int64 */
    designationId?: number | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface MemberSettingEntity {
    /** @format uuid */
    memberId: string;

    /** @format int64 */
    typeId: number;
    shortValue: string;
    otherValue?: string | null;

    /** @format int32 */
    actionRequired: number;
    member?: MemberEntity;
    settingValue?: SettingValueEntity;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface OfficeEntity {
    name?: string | null;
    officeCode?: string | null;
    address1?: string | null;
    address2?: string | null;
    phone?: string | null;
    fax?: string | null;
    mainOfficeCode?: string | null;

    /** @format int64 */
    officeTypeId?: number | null;

    /** @format int64 */
    officeStatusId?: number | null;

    /** @format uuid */
    officeAorId?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface OfficeSettingEntity {
    /** @format uuid */
    officeId: string;

    /** @format int64 */
    typeId: number;
    shortValue: string;
    otherValue?: string | null;

    /** @format int32 */
    actionRequired: number;
    office?: OfficeEntity;
    settingValue?: SettingValueEntity;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface DerivedSettingEntity {
    settingValue?: SettingValueEntity;
    memberSetting?: MemberSettingEntity;
    officeSetting?: OfficeSettingEntity;
    mainOfficeSetting?: OfficeSettingEntity;
}

export interface DerivedSettingServiceResult {
    isSuccessful?: boolean;
    results?: DerivedSettingEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface MemberAccessControlEntity {
    /** @format uuid */
    contactId: string;
    memberMlsId?: string | null;
    aorShortName?: string | null;

    /** @format uuid */
    applicationId: string;
    applicationName?: string | null;
    applicationNameShort?: string | null;

    /** @format uuid */
    officeId: string;
    officeMlsId: string;

    /** @format uuid */
    mainOfficeId: string;
    mainOfficeMlsId: string;

    /** @format int32 */
    accessControl?: number;

    /** @format int32 */
    accessLevel: number;
}

export interface MemberAccessControlServiceResult {
    isSuccessful?: boolean;
    results?: MemberAccessControlEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface MemberAccessControlQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: MemberAccessControlEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface AuthMemberDto {
    /** @format int64 */
    memberKeyNumeric?: number;
    userid?: string | null;
    userlevel?: string | null;
    brokercode?: string | null;
    userclass?: string | null;
    brokerbranch?: string | null;
    agentcode?: string | null;
    memberFirstName?: string | null;
    memberLastName?: string | null;
    memberAOR?: string | null;
    memberIsAssistantTo?: string | null;

    /** @format int64 */
    officeKeyNumeric?: number | null;
    memberMlsSecurityClass?: string | null;
    memberStatus?: string | null;
    originatingSystemID?: string | null;
    officeAOR?: string | null;
    memberEmail?: string | null;
    officeMlsId?: string | null;
    memberStateLicense?: string | null;
    hasMemberPortalAccess?: boolean;
    isAuthenticated?: boolean;
    isCrmlsAdmin?: boolean;
    isCrmlsAorAdmin?: boolean;
    isCrmlsOfficeAdmin?: boolean;
    member?: MemberEntity;
    office?: OfficeEntity;
    aor?: AorEntity;
}

export interface MemberQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: MemberEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface MemberServiceResult {
    isSuccessful?: boolean;
    results?: MemberEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface MemberSettingServiceResult {
    isSuccessful?: boolean;
    results?: MemberSettingEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface MemberDto {
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    title?: string | null;
    displayName?: string | null;

    /** @format int64 */
    contactTypeId?: number | null;
    photoUrl?: string | null;
    comment?: string | null;

    /** @format int32 */
    order?: number;
    officeCode?: string | null;
    loginId?: string | null;

    /** @format int64 */
    memberStatusId?: number | null;

    /** @format int64 */
    memberTypeId?: number | null;

    /** @format int64 */
    designationId?: number | null;

    /** @format uuid */
    id?: string;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string | null;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string | null;
}

export interface ApplicationDto {
    name?: string | null;
    shortName?: string | null;
    description?: string | null;
    apiKey?: string | null;

    /** @format int32 */
    accessLevel?: number;
    authorizedTypes?: string | null;
    roles?: string | null;

    /** @format uuid */
    id?: string;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string | null;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string | null;
}

export interface MemberApplicationDto {
    /** @format uuid */
    memberId?: string;

    /** @format uuid */
    applicationId?: string;

    /** @format int32 */
    accessControl?: number;
    member?: MemberDto;
    application?: ApplicationDto;

    /** @format uuid */
    id?: string;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string | null;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string | null;
}

export interface SettingInputTypeDto {
    inputStyle?: string | null;
    dataType?: string | null;
    description?: string | null;

    /** @format uuid */
    id?: string;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string | null;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string | null;
}

export interface SettingTypeDto {
    name?: string | null;
    description?: string | null;

    /** @format int32 */
    actionRequired?: number;

    /** @format int32 */
    accessLevel?: number;

    /** @format int32 */
    defaultAllow?: number;

    /** @format int64 */
    settingInputTypeId?: number | null;
    settingInputType?: SettingInputTypeDto;

    /** @format uuid */
    id?: string;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string | null;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string | null;
}

export interface SettingValueDto {
    /** @format int64 */
    typeId?: number;
    shortValue?: string | null;
    longValue?: string | null;

    /** @format int32 */
    sortOrder?: number;
    settingType?: SettingTypeDto;

    /** @format int32 */
    accessLevel?: number | null;

    /** @format uuid */
    id?: string;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string | null;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string | null;
}

export interface MemberSettingDto {
    /** @format uuid */
    memberId?: string;

    /** @format int64 */
    typeId?: number;
    shortValue?: string | null;
    otherValue?: string | null;

    /** @format int32 */
    actionRequired?: number;
    member?: MemberDto;
    settingValue?: SettingValueDto;

    /** @format uuid */
    id?: string;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string | null;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string | null;
}

export interface MemberSettingUpdatedEventArgs {
    memberApplications?: MemberApplicationDto[] | null;
    updatedEntity?: MemberSettingDto;
}

export interface MemberSettingQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: MemberSettingEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface OfficeAccessControlEntity {
    /** @format uuid */
    officeId: string;
    officeMlsId?: string | null;

    /** @format uuid */
    mainOfficeId: string;
    mainOfficeMlsId?: string | null;
    aorShortName?: string | null;

    /** @format uuid */
    applicationId: string;
    applicationName?: string | null;
    applicationNameShort?: string | null;

    /** @format int32 */
    accessControl: number;

    /** @format int32 */
    accessLevel: number;
}

export interface OfficeAccessControlServiceResult {
    isSuccessful?: boolean;
    results?: OfficeAccessControlEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface OfficeAccessControlQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: OfficeAccessControlEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface OfficeQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: OfficeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface OfficeServiceResult {
    isSuccessful?: boolean;
    results?: OfficeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface OfficeApplicationEntity {
    /** @format uuid */
    officeId: string;

    /** @format uuid */
    applicationId: string;

    /** @format int32 */
    accessControl: number;
}

export interface OfficeApplicationServiceResult {
    isSuccessful?: boolean;
    results?: OfficeApplicationEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface OfficeApplicationQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: OfficeApplicationEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface OfficeSettingServiceResult {
    isSuccessful?: boolean;
    results?: OfficeSettingEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface OfficeSettingQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: OfficeSettingEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingTypeServiceResult {
    isSuccessful?: boolean;
    results?: SettingTypeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingGroupEntity {
    settingTypeGroupings?: SettingTypeGroupingEntity[] | null;
    name: string;
    description?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format int64 */
    id?: number;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface SettingTypeGroupingEntity {
    /** @format int64 */
    typeId?: number;

    /** @format int64 */
    groupId?: number;
    settingType?: SettingTypeEntity;
    settingGroup?: SettingGroupEntity;
}

export interface SettingTypeGroupingServiceResult {
    isSuccessful?: boolean;
    results?: SettingTypeGroupingEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingGroupQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: SettingGroupEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingGroupServiceResult {
    isSuccessful?: boolean;
    results?: SettingGroupEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingInputTypeQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: SettingInputTypeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingInputTypeServiceResult {
    isSuccessful?: boolean;
    results?: SettingInputTypeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingTypeQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: SettingTypeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingValueQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: SettingValueEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface SettingValueServiceResult {
    isSuccessful?: boolean;
    results?: SettingValueEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "";
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

    private baseApiParams: RequestParams = {
        credentials: "same-origin",
        headers: {},
        redirect: "follow",
        referrerPolicy: "no-referrer",
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    private encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }

    private addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    private addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
            .join("&");
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === "object" && property !== null
                            ? JSON.stringify(property)
                            : `${property}`,
                );
                return formData;
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                return abortController.signal;
            }
            return void 0;
        }

        const abortController = new AbortController();
        this.abortControllers.set(cancelToken, abortController);
        return abortController.signal;
    };

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken);

        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };

    public request = async <T = any, E = any>({
                                                  body,
                                                  secure,
                                                  path,
                                                  type,
                                                  query,
                                                  format,
                                                  baseUrl,
                                                  cancelToken,
                                                  ...params
                                              }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter = this.contentFormatters[type || ContentType.Json];
        const responseFormat = format || requestParams.format;

        return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
            ...requestParams,
            headers: {
                ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
                ...(requestParams.headers || {}),
            },
            signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
            body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
        }).then(async (response) => {
            const r = response as HttpResponse<T, E>;
            r.data = null as unknown as T;
            r.error = null as unknown as E;

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                    .then((data) => {
                        if (r.ok) {
                            r.data = data;
                        } else {
                            r.error = data;
                        }
                        return r;
                    })
                    .catch((e) => {
                        r.error = e;
                        return r;
                    });

            if (cancelToken) {
                this.abortControllers.delete(cancelToken);
            }

            if (!response.ok) throw data;
            return data;
        });
    };
}

/**
 * @title CRMLS Domain Services for Member Portal
 * @version v1
 * @license Use under License: (http://crmls.org/dataLicense)
 * @termsOfService http://crmls.org
 * @contact Mark Bessett <mark@crmls.org> (http://crmls.org)
 *
 * CRMLS API Documentation and OpenAPI Exploration Application
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    api = {
        /**
         * No description
         *
         * @tags AorApi
         * @name AppAorsQCreate
         * @summary Return specific page of Aors
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Aors/q
         * @secure
         */
        appAorsQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<AorQueryResult, void>({
                path: `/api/app/Aors/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AorApi
         * @name AppAorsDetail
         * @summary Return Aor by identifier
         * @request GET:/api/app/Aors/{id}
         * @secure
         */
        appAorsDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<AorServiceResult, void>({
                path: `/api/app/Aors/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ApplicationAccess
         * @name AccessControlTokenCreate
         * @summary Builds 'Bearer' token to use for calls to obtain member's 'AccessControl'
         * @request POST:/api/AccessControl/token
         */
        accessControlTokenCreate: (query?: { apiKey?: string | null }, params: RequestParams = {}) =>
            this.request<AccessTokenResult, any>({
                path: `/api/AccessControl/token`,
                method: "POST",
                query: query,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ApplicationAccess
         * @name AccessControlDetail
         * @summary Obtain 'ApplicationAccess' service result model based on authenticated client and member's MLS ID.
         * @request GET:/api/AccessControl/{memberMlsId}
         * @secure
         */
        accessControlDetail: (memberMlsId: string | null, params: RequestParams = {}) =>
            this.request<ApplicationAccessServiceResult, void>({
                path: `/api/AccessControl/${memberMlsId}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ApplicationApi
         * @name AppApplicationsQCreate
         * @summary Return specific page of Applications
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Applications/q
         * @secure
         */
        appApplicationsQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<ApplicationQueryResult, void>({
                path: `/api/app/Applications/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ApplicationApi
         * @name AppApplicationsCreate
         * @summary Create a new Application
         For account-based models
         * @request POST:/api/app/Applications
         * @secure
         */
        appApplicationsCreate: (data: ApplicationEntity, params: RequestParams = {}) =>
            this.request<ApplicationServiceResult, void>({
                path: `/api/app/Applications`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ApplicationApi
         * @name AppApplicationsDetail
         * @summary Return Application by identifier
         * @request GET:/api/app/Applications/{id}
         * @secure
         */
        appApplicationsDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<ApplicationServiceResult, void>({
                path: `/api/app/Applications/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AudienceIndexApi
         * @name AppAudienceIndexesTaDetail
         * @summary Return (defaults to first 15) AudienceIndex by searching FirstName, LastName, LoginId and EmailAddress
         Optionally filter on officeCode (officeMlsId), mainOfficeCode, and/or aorShortName
         * @request GET:/api/app/AudienceIndexes/ta/{searchString}
         * @secure
         */
        appAudienceIndexesTaDetail: (
            searchString: string | null,
            query?: {
                officeCode?: string | null;
                mainOfficeCode?: string | null;
                aorShortName?: string | null;
                top?: number;
                skip?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<AudienceIndexServiceResult, void>({
                path: `/api/app/AudienceIndexes/ta/${searchString}`,
                method: "GET",
                query: query,
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AudienceIndexApi
         * @name AppAudienceIndexesQCreate
         * @summary Return specific page of AudienceIndexes
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/AudienceIndexes/q
         * @secure
         */
        appAudienceIndexesQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<AudienceIndexQueryResult, void>({
                path: `/api/app/AudienceIndexes/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AudienceIndexApi
         * @name AppAudienceIndexesDetail
         * @summary Return AudienceIndex by identifier
         * @request GET:/api/app/AudienceIndexes/{id}
         * @secure
         */
        appAudienceIndexesDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<AudienceIndexServiceResult, void>({
                path: `/api/app/AudienceIndexes/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DerivedSettingApi
         * @name DerivedSettingsMemberDetail
         * @summary Provides the SettingValue of either the Member or the Main Office based on main office's setting
         but still gives instances of both (member and main office setting) _if_ exists.
         Can optionally get them by group id.
         * @request GET:/api/DerivedSettings/Member/{memberMlsId}
         * @secure
         */
        derivedSettingsMemberDetail: (
            memberMlsId: string | null,
            query?: { settingGroupId?: number | null },
            params: RequestParams = {},
        ) =>
            this.request<DerivedSettingServiceResult, void>({
                path: `/api/DerivedSettings/Member/${memberMlsId}`,
                method: "GET",
                query: query,
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DerivedSettingApi
         * @name DerivedSettingsOfficeDetail
         * @summary Provides the SettingValue of either the Office or the Main Office based on main office's setting
         but still gives instances of both (sub and main office setting) _if_ exists.
         Can optionally get them by group id.
         * @request GET:/api/DerivedSettings/Office/{officeMlsId}
         * @secure
         */
        derivedSettingsOfficeDetail: (
            officeMlsId: string | null,
            query?: { settingGroupId?: number | null },
            params: RequestParams = {},
        ) =>
            this.request<DerivedSettingServiceResult, void>({
                path: `/api/DerivedSettings/Office/${officeMlsId}`,
                method: "GET",
                query: query,
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberAccessControlApi
         * @name AppMemberAccessControlsDetail
         * @summary Return MemberAccessControls by Member id
         * @request GET:/api/app/MemberAccessControls/{memberMlsId}
         * @secure
         */
        appMemberAccessControlsDetail: (memberMlsId: string | null, params: RequestParams = {}) =>
            this.request<MemberAccessControlServiceResult, void>({
                path: `/api/app/MemberAccessControls/${memberMlsId}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberAccessControlApi
         * @name AppMemberAccessControlsQCreate
         * @summary Return specific page of MemberAccessControlView
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/MemberAccessControls/q
         * @secure
         */
        appMemberAccessControlsQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<MemberAccessControlQueryResult, void>({
                path: `/api/app/MemberAccessControls/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberApi
         * @name AppMembersAuthMemberDtoList
         * @summary Returns the current authenticated user's AuthMemberDto model which also includes MemberEntity.
         * @request GET:/api/app/Members/AuthMemberDto
         * @secure
         */
        appMembersAuthMemberDtoList: (params: RequestParams = {}) =>
            this.request<AuthMemberDto, void>({
                path: `/api/app/Members/AuthMemberDto`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberApi
         * @name AppMembersQCreate
         * @summary Return specific page of Contacts
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Members/q
         * @secure
         */
        appMembersQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<MemberQueryResult, void>({
                path: `/api/app/Members/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberApi
         * @name AppMembersDetail
         * @summary Return Member by identifier
         * @request GET:/api/app/Members/{id}
         * @secure
         */
        appMembersDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<MemberServiceResult, void>({
                path: `/api/app/Members/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberSettingApi
         * @name AppMemberSettingsByMlsIdDetail
         * @summary Return MemberSettings by member login ID (member MLS ID)
         * @request GET:/api/app/MemberSettings/ByMlsId/{memberMlsId}
         * @secure
         */
        appMemberSettingsByMlsIdDetail: (memberMlsId: string | null, params: RequestParams = {}) =>
            this.request<MemberSettingServiceResult, void>({
                path: `/api/app/MemberSettings/ByMlsId/${memberMlsId}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberSettingApi
         * @name AppMemberSettingsRegisterWebhookCreate
         * @summary Subscribes a URL for member setting updated that have ActionRequired set to > 0
         * @request POST:/api/app/MemberSettings/RegisterWebhook
         * @secure
         */
        appMemberSettingsRegisterWebhookCreate: (
            query: { webhookAddress: string },
            data: MemberSettingUpdatedEventArgs,
            params: RequestParams = {},
        ) =>
            this.request<void, void>({
                path: `/api/app/MemberSettings/RegisterWebhook`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberSettingApi
         * @name AppMemberSettingsQCreate
         * @summary Return specific page of ContactSettings
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/MemberSettings/q
         * @secure
         */
        appMemberSettingsQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<MemberSettingQueryResult, void>({
                path: `/api/app/MemberSettings/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberSettingApi
         * @name AppMemberSettingsCreate
         * @summary Create a new MemberSetting
         For account-based models
         * @request POST:/api/app/MemberSettings
         * @secure
         */
        appMemberSettingsCreate: (data: MemberSettingEntity, params: RequestParams = {}) =>
            this.request<MemberSettingServiceResult, void>({
                path: `/api/app/MemberSettings`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberSettingApi
         * @name AppMemberSettingsDetail
         * @summary Return MemberSetting by identifier
         * @request GET:/api/app/MemberSettings/{id}
         * @secure
         */
        appMemberSettingsDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<MemberSettingServiceResult, void>({
                path: `/api/app/MemberSettings/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberSettingApi
         * @name AppMemberSettingsUpdate
         * @summary Update an existing MemberSetting
         * @request PUT:/api/app/MemberSettings/{id}
         * @secure
         */
        appMemberSettingsUpdate: (id: string, data: MemberSettingEntity, params: RequestParams = {}) =>
            this.request<MemberSettingServiceResult, void>({
                path: `/api/app/MemberSettings/${id}`,
                method: "PUT",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MemberSettingApi
         * @name AppMemberSettingsDelete
         * @summary Delete specific MemberSetting
         * @request DELETE:/api/app/MemberSettings/{id}
         * @secure
         */
        appMemberSettingsDelete: (id: string, params: RequestParams = {}) =>
            this.request<MemberSettingServiceResult, void>({
                path: `/api/app/MemberSettings/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeAccessControlApi
         * @name AppOfficeAccessControlsDetail
         * @summary Return OfficeAccessControls by OfficeMlsId.
         Note: The access control obtained will be for the main office associated with the given officeMlsId.
         * @request GET:/api/app/OfficeAccessControls/{officeMlsId}
         * @secure
         */
        appOfficeAccessControlsDetail: (officeMlsId: string | null, params: RequestParams = {}) =>
            this.request<OfficeAccessControlServiceResult, void>({
                path: `/api/app/OfficeAccessControls/${officeMlsId}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeAccessControlApi
         * @name AppOfficeAccessControlsQCreate
         * @summary Return specific page of OfficeAccessControlView
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/OfficeAccessControls/q
         * @secure
         */
        appOfficeAccessControlsQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<OfficeAccessControlQueryResult, void>({
                path: `/api/app/OfficeAccessControls/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeApi
         * @name AppOfficesQCreate
         * @summary Return specific page of Offices
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Offices/q
         * @secure
         */
        appOfficesQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<OfficeQueryResult, void>({
                path: `/api/app/Offices/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeApi
         * @name AppOfficesDetail
         * @summary Return Office by identifier
         * @request GET:/api/app/Offices/{id}
         * @secure
         */
        appOfficesDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<OfficeServiceResult, void>({
                path: `/api/app/Offices/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeApplicationApi
         * @name AppOfficeApplicationsDetail
         * @summary Return S by OfficeMlsId.
         Note: The access control obtained will be for the main office associated with the given officeMlsId.
         * @request GET:/api/app/OfficeApplications/{officeId}/{appId}
         * @secure
         */
        appOfficeApplicationsDetail: (officeId: string, appId: string, params: RequestParams = {}) =>
            this.request<OfficeApplicationServiceResult, void>({
                path: `/api/app/OfficeApplications/${officeId}/${appId}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeApplicationApi
         * @name AppOfficeApplicationsDelete
         * @summary Delete specific OfficeApplication
         * @request DELETE:/api/app/OfficeApplications/{officeId}/{appId}
         * @secure
         */
        appOfficeApplicationsDelete: (officeId: string, appId: string, params: RequestParams = {}) =>
            this.request<OfficeApplicationServiceResult, void>({
                path: `/api/app/OfficeApplications/${officeId}/${appId}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeApplicationApi
         * @name AppOfficeApplicationsCreate
         * @summary Create a new OfficeApplication
         * @request POST:/api/app/OfficeApplications
         * @secure
         */
        appOfficeApplicationsCreate: (data: OfficeApplicationEntity, params: RequestParams = {}) =>
            this.request<OfficeApplicationServiceResult, void>({
                path: `/api/app/OfficeApplications`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeApplicationApi
         * @name AppOfficeApplicationsUpdate
         * @summary Update an existing OfficeApplication
         * @request PUT:/api/app/OfficeApplications
         * @secure
         */
        appOfficeApplicationsUpdate: (data: OfficeApplicationEntity, params: RequestParams = {}) =>
            this.request<OfficeApplicationServiceResult, void>({
                path: `/api/app/OfficeApplications`,
                method: "PUT",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeApplicationApi
         * @name AppOfficeApplicationsQCreate
         * @summary Return specific page of OfficeApplications
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/OfficeApplications/q
         * @secure
         */
        appOfficeApplicationsQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<OfficeApplicationQueryResult, void>({
                path: `/api/app/OfficeApplications/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeSettingApi
         * @name AppOfficeSettingsByMlsIdDetail
         * @summary Return OfficeSettings by officeCode (member MLS ID)
         * @request GET:/api/app/OfficeSettings/ByMlsId/{officeMlsId}
         * @secure
         */
        appOfficeSettingsByMlsIdDetail: (officeMlsId: string | null, params: RequestParams = {}) =>
            this.request<OfficeSettingServiceResult, void>({
                path: `/api/app/OfficeSettings/ByMlsId/${officeMlsId}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeSettingApi
         * @name AppOfficeSettingsQCreate
         * @summary Return specific page of OfficeSettings
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/OfficeSettings/q
         * @secure
         */
        appOfficeSettingsQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<OfficeSettingQueryResult, void>({
                path: `/api/app/OfficeSettings/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeSettingApi
         * @name AppOfficeSettingsCreate
         * @summary Create a new OfficeSetting
         For account-based models
         * @request POST:/api/app/OfficeSettings
         * @secure
         */
        appOfficeSettingsCreate: (data: OfficeSettingEntity, params: RequestParams = {}) =>
            this.request<OfficeSettingServiceResult, void>({
                path: `/api/app/OfficeSettings`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeSettingApi
         * @name AppOfficeSettingsDetail
         * @summary Return OfficeSetting by identifier
         * @request GET:/api/app/OfficeSettings/{id}
         * @secure
         */
        appOfficeSettingsDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<OfficeSettingServiceResult, void>({
                path: `/api/app/OfficeSettings/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeSettingApi
         * @name AppOfficeSettingsUpdate
         * @summary Update an existing OfficeSetting
         * @request PUT:/api/app/OfficeSettings/{id}
         * @secure
         */
        appOfficeSettingsUpdate: (id: string, data: OfficeSettingEntity, params: RequestParams = {}) =>
            this.request<OfficeSettingServiceResult, void>({
                path: `/api/app/OfficeSettings/${id}`,
                method: "PUT",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OfficeSettingApi
         * @name AppOfficeSettingsDelete
         * @summary Delete specific OfficeSetting
         * @request DELETE:/api/app/OfficeSettings/{id}
         * @secure
         */
        appOfficeSettingsDelete: (id: string, params: RequestParams = {}) =>
            this.request<OfficeSettingServiceResult, void>({
                path: `/api/app/OfficeSettings/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingGroupApi
         * @name AppSettingGroupsTypesDetail
         * @summary Return SettingTypes's by SettingGroupId
         * @request GET:/api/app/SettingGroups/{id}/types
         * @secure
         */
        appSettingGroupsTypesDetail: (id: number, params: RequestParams = {}) =>
            this.request<SettingTypeServiceResult, void>({
                path: `/api/app/SettingGroups/${id}/types`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingGroupApi
         * @name AppSettingGroupsTypeGroupingCreate
         * @summary Create a new SettingTypeGrouping - model only required TypeId and GroupId
         * @request POST:/api/app/SettingGroups/TypeGrouping
         * @secure
         */
        appSettingGroupsTypeGroupingCreate: (data: SettingTypeGroupingEntity, params: RequestParams = {}) =>
            this.request<SettingTypeGroupingServiceResult, void>({
                path: `/api/app/SettingGroups/TypeGrouping`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingGroupApi
         * @name AppSettingGroupsTypeGroupingDelete
         * @summary Remove/Delete a SettingTypeGrouping - model only required TypeId and GroupId
         * @request DELETE:/api/app/SettingGroups/TypeGrouping
         * @secure
         */
        appSettingGroupsTypeGroupingDelete: (data: SettingTypeGroupingEntity, params: RequestParams = {}) =>
            this.request<SettingTypeGroupingServiceResult, void>({
                path: `/api/app/SettingGroups/TypeGrouping`,
                method: "DELETE",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingGroupApi
         * @name AppSettingGroupsQCreate
         * @summary Return specific page of SettingGroups
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/SettingGroups/q
         * @secure
         */
        appSettingGroupsQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<SettingGroupQueryResult, void>({
                path: `/api/app/SettingGroups/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingGroupApi
         * @name AppSettingGroupsCreate
         * @summary Create a new SettingGroup
         For account-based models
         * @request POST:/api/app/SettingGroups
         * @secure
         */
        appSettingGroupsCreate: (data: SettingGroupEntity, params: RequestParams = {}) =>
            this.request<SettingGroupServiceResult, void>({
                path: `/api/app/SettingGroups`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingGroupApi
         * @name AppSettingGroupsDetail
         * @summary Return SettingGroup by identifier
         * @request GET:/api/app/SettingGroups/{id}
         * @secure
         */
        appSettingGroupsDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<SettingGroupServiceResult, void>({
                path: `/api/app/SettingGroups/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingGroupApi
         * @name AppSettingGroupsUpdate
         * @summary Update an existing SettingGroup
         * @request PUT:/api/app/SettingGroups/{id}
         * @secure
         */
        appSettingGroupsUpdate: (id: number, data: SettingGroupEntity, params: RequestParams = {}) =>
            this.request<SettingGroupServiceResult, void>({
                path: `/api/app/SettingGroups/${id}`,
                method: "PUT",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingGroupApi
         * @name AppSettingGroupsDelete
         * @summary Delete specific SettingGroup
         * @request DELETE:/api/app/SettingGroups/{id}
         * @secure
         */
        appSettingGroupsDelete: (id: number, params: RequestParams = {}) =>
            this.request<SettingGroupServiceResult, void>({
                path: `/api/app/SettingGroups/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingInputTypeApi
         * @name AppInputTypesQCreate
         * @summary Return specific page of SettingInputTypes
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/InputTypes/q
         * @secure
         */
        appInputTypesQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<SettingInputTypeQueryResult, void>({
                path: `/api/app/InputTypes/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingInputTypeApi
         * @name AppInputTypesCreate
         * @summary Create a new SettingInputType
         For account-based models
         * @request POST:/api/app/InputTypes
         * @secure
         */
        appInputTypesCreate: (data: SettingInputTypeEntity, params: RequestParams = {}) =>
            this.request<SettingInputTypeServiceResult, void>({
                path: `/api/app/InputTypes`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingInputTypeApi
         * @name AppInputTypesDetail
         * @summary Return SettingInputType by identifier
         * @request GET:/api/app/InputTypes/{id}
         * @secure
         */
        appInputTypesDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<SettingInputTypeServiceResult, void>({
                path: `/api/app/InputTypes/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingInputTypeApi
         * @name AppInputTypesUpdate
         * @summary Update an existing SettingInputType
         * @request PUT:/api/app/InputTypes/{id}
         * @secure
         */
        appInputTypesUpdate: (id: number, data: SettingInputTypeEntity, params: RequestParams = {}) =>
            this.request<SettingInputTypeServiceResult, void>({
                path: `/api/app/InputTypes/${id}`,
                method: "PUT",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingInputTypeApi
         * @name AppInputTypesDelete
         * @summary Delete specific SettingInputType
         * @request DELETE:/api/app/InputTypes/{id}
         * @secure
         */
        appInputTypesDelete: (id: number, params: RequestParams = {}) =>
            this.request<SettingInputTypeServiceResult, void>({
                path: `/api/app/InputTypes/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingTypeApi
         * @name AppSettingTypesQCreate
         * @summary Return specific page of SettingTypes
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/SettingTypes/q
         * @secure
         */
        appSettingTypesQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<SettingTypeQueryResult, void>({
                path: `/api/app/SettingTypes/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingTypeApi
         * @name AppSettingTypesCreate
         * @summary Create a new SettingType
         For account-based models
         * @request POST:/api/app/SettingTypes
         * @secure
         */
        appSettingTypesCreate: (data: SettingTypeEntity, params: RequestParams = {}) =>
            this.request<SettingTypeServiceResult, void>({
                path: `/api/app/SettingTypes`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingTypeApi
         * @name AppSettingTypesDetail
         * @summary Return SettingType by identifier
         * @request GET:/api/app/SettingTypes/{id}
         * @secure
         */
        appSettingTypesDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<SettingTypeServiceResult, void>({
                path: `/api/app/SettingTypes/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingTypeApi
         * @name AppSettingTypesUpdate
         * @summary Update an existing SettingType
         * @request PUT:/api/app/SettingTypes/{id}
         * @secure
         */
        appSettingTypesUpdate: (id: number, data: SettingTypeEntity, params: RequestParams = {}) =>
            this.request<SettingTypeServiceResult, void>({
                path: `/api/app/SettingTypes/${id}`,
                method: "PUT",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingTypeApi
         * @name AppSettingTypesDelete
         * @summary Delete specific SettingType
         * @request DELETE:/api/app/SettingTypes/{id}
         * @secure
         */
        appSettingTypesDelete: (id: number, params: RequestParams = {}) =>
            this.request<SettingTypeServiceResult, void>({
                path: `/api/app/SettingTypes/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingValueApi
         * @name AppSettingValuesDetail
         * @summary Return SettingValue's by SettingTypeId
         * @request GET:/api/app/SettingValues/{typeId}
         * @secure
         */
        appSettingValuesDetail: (
            typeId: number,
            query?: { pageId?: number; pageSize?: number },
            params: RequestParams = {},
        ) =>
            this.request<SettingValueQueryResult, void>({
                path: `/api/app/SettingValues/${typeId}`,
                method: "GET",
                query: query,
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingValueApi
         * @name AppSettingValuesQCreate
         * @summary Return specific page of SettingValues
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/SettingValues/q
         * @secure
         */
        appSettingValuesQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<SettingValueQueryResult, void>({
                path: `/api/app/SettingValues/q`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SettingValueApi
         * @name AppSettingValuesCreate
         * @summary Create a new SettingValue
         For account-based models
         * @request POST:/api/app/SettingValues
         * @secure
         */
        appSettingValuesCreate: (data: SettingValueEntity, params: RequestParams = {}) =>
            this.request<SettingValueServiceResult, void>({
                path: `/api/app/SettingValues`,
                method: "POST",
                body: data,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
    };
}
