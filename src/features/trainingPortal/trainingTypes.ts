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

export function getAttendeeStatus(attendee: AttendeeEntity) {
    if (attendee.wasPresent) {
        return 'present';
    } else if (attendee.unRegisteredOn) {
        return 'unregistered';
    } else if (attendee.surveyedOn) {
        return 'surveyed';
    } else if (attendee.createdOn) {
        return 'registered';
    } else {
        return 'unknown';
    }
}

export interface TrainingTopicEntity {
    name?: string | null;
    description?: string | null;
    notes?: string | null;
    videoUrl?: string | null;
    attachmentUrl?: string | null | undefined;
    isDeleted?: boolean | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface TrainingTopicLookupEntity {
    /** @format uuid */
    trainingTopicId: string;
    trainingTopic?: TrainingTopicEntity;

    /** @format uuid */
    trainingClassId: string;
    trainingClass?: TrainingClassEntity;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface LocationEntity {
    name: string;
    description?: string | null;
    parent?: string | null;
    locationType?: string | null;

    /** @format int32 */
    capacity?: number | null;
    notes?: string | null;
    status?: string | null;
    address?: string | null;
    isVirtual?: boolean | null;
    isDeleted?: boolean | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface InstructorEntity {
    name?: string | null;
    role?: string | null;
    email?: string | null;
    phone?: string | null;
    title?: string | null;
    status?: string | null;
    notes?: string | null;
    photoURL?: string | null;
    surveyURL?: string | null;

    /** @format uuid */
    staffID?: string | null;
    isDeleted?: boolean | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface TrainingClassEntity {
    trainingTopics?: TrainingTopicLookupEntity[] | null;

    /** @format uuid */
    locationId: string;
    location?: LocationEntity;

    /** @format uuid */
    instructorId: string;
    instructor?: InstructorEntity;

    /** @format date-time */
    startTime?: string | null;

    /** @format int32 */
    duration?: number | null;
    presentationType?: string | null;

    /** @format int32 */
    capacity?: number | null;
    seatsAvailable?: number | null;
    className?: string | null;
    imageURL?: string | null;
    status?: string | null;

    /** @format date-time */
    endTime?: string | null;
    isDeleted?: boolean | null;
    isPublic?: boolean | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface AttendeeEntity {
    memberName?: string | null;

    /** @format uuid */
    memberID: string;

    /** @format uuid */
    trainingClassId: string;
    trainingClass?: TrainingClassEntity;

    /** @format date-time */
    registeredOn?: string | null;

    /** @format date-time */
    unRegisteredOn?: string | null;

    /** @format date-time */
    confirmedOn?: string | null;
    wasPresent?: boolean | null;

    /** @format date-time */
    surveyedOn?: string | null;
    notes?: string | null;
    isDeleted?: boolean | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface AttendeeServiceResult {
    isSuccessful?: boolean;
    results?: AttendeeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

/**
 * @format int32
 */
export type QueryParameterOperation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface ApiQueryParameter {
    field?: string | null;
    op?: QueryParameterOperation;
    values?: string[] | null;
}

/**
 * @format int32
 */
export type QuerySortDirection = 0 | 1;

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

export interface AttendeeQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;
    isSuccessful?: boolean;
    results?: AttendeeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface ClassRequestEntity {
    requestedBy?: string | null;
    trainingTopicId: string | null;
    trainingTopic: TrainingTopicEntity;

    /** @format date-time */
    dateTime?: string | null;
    location?: LocationEntity;
    comments?: string | null;

    /** @format int32 */
    requestStatus?: number | null;
    notes?: string | null;
    isDeleted?: boolean | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface ClassRequestQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;
    isSuccessful?: boolean;
    results?: ClassRequestEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface InstructorServiceResult {
    isSuccessful?: boolean;
    results?: InstructorEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface ClassRequestServiceResult {
    isSuccessful?: boolean;
    results?: ClassRequestEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface InstructorQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;
    isSuccessful?: boolean;
    results?: InstructorEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface LocationQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;
    isSuccessful?: boolean;
    results?: LocationEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface LocationServiceResult {
    isSuccessful?: boolean;
    results?: LocationEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface NotificationLogEntity {
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface NotificationLogQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;
    isSuccessful?: boolean;
    results?: NotificationLogEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface NotificationLogServiceResult {
    isSuccessful?: boolean;
    results?: NotificationLogEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface TrainingClassQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;
    isSuccessful?: boolean;
    results?: TrainingClassEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface TrainingClassServiceResult {
    isSuccessful?: boolean;
    results?: TrainingClassEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface GuidDynamicQueryResult {
    model?: Record<string, object>;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface TrainingTopicApiQueryResult {
    results?: TrainingTopicEntity[] | null;

    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;
    isSuccessful?: boolean;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface TrainingTopicQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;
    isSuccessful?: boolean;
    results?: TrainingTopicEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface TrainingTopicServiceResult {
    isSuccessful?: boolean;
    results?: TrainingTopicEntity[] | null;
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
 * @title CrmlsCosmosDomainServicesTrainingWebApi
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
         * @tags AttendeeApi
         * @name AppAttendeeRegisterCreate
         * @summary This API will register the attendee after filtering by the enroll bussiness rule.
         * @request POST:/api/app/Attendee/Register
         */
        appAttendeeRegisterCreate: (data: AttendeeEntity, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, any>({
                path: `/api/app/Attendee/Register`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeUnRegisterUpdate
         * @summary This API is used for unregister attendee based on Id
         * @request PUT:/api/app/Attendee/UnRegister
         */
        appAttendeeUnRegisterUpdate: (query?: { id?: string }, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, any>({
                path: `/api/app/Attendee/UnRegister`,
                method: "PUT",
                query: query,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeAttendeeSearchApiCreate
         * @summary Return specific page of Attendees this api will perform OR Search on criteria
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Attendee/AttendeeSearchApi
         */
        appAttendeeAttendeeSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<AttendeeQueryResult, any>({
                path: `/api/app/Attendee/AttendeeSearchApi`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeQCreate
         * @summary Return specific page of Attendees
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Attendee/q
         */
        appAttendeeQCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<AttendeeQueryResult, any>({
                path: `/api/app/Attendee/q`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeePurgeDelete
         * @summary This Api will delete an existing attendee by marking it as soft delete.
         * @request DELETE:/api/app/Attendee/{attendeeId}/purge
         */
        appAttendeePurgeDelete: (attendeeId: string | null, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, any>({
                path: `/api/app/Attendee/${attendeeId}/purge`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name appAttendeeWasPresentCreate
         * @summary This endpoint is used to update attendee was present status.
         * @request POST:/api/app/Attendee/WasPresent/{attendeeId}/{isPresent}
         */
        appAttendeeWasPresentCreate: (attendeeId: string | null, isPresent: boolean, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, any>({
                path: `/api/app/Attendee/WasPresent/${attendeeId}/${isPresent}`,
                method: "POST",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeListDetail
         * @summary This Endpoint will used for getting Attendees list based on TrainingClassId
         * @request GET:/api/app/Attendee/{trainingClassId}/list
         */
        appAttendeeListDetail: (trainingClassId: string | null, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, any>({
                path: `/api/app/Attendee/${trainingClassId}/list`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeCreate
         * @summary Create a new Attendee
         For account-based models
         * @request POST:/api/app/Attendee
         */
        appAttendeeCreate: (data: AttendeeEntity, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, void>({
                path: `/api/app/Attendee`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeDetail
         * @summary Return Attendee by identifier
         * @request GET:/api/app/Attendee/{id}
         */
        appAttendeeDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, any>({
                path: `/api/app/Attendee/${id}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeUpdate
         * @summary Update an existing Attendee
         * @request PUT:/api/app/Attendee/{id}
         */
        appAttendeeUpdate: (id: string, data: AttendeeEntity, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, any>({
                path: `/api/app/Attendee/${id}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeDelete
         * @summary Delete specific Attendee
         * @request DELETE:/api/app/Attendee/{id}
         */
        appAttendeeDelete: (id: string, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, any>({
                path: `/api/app/Attendee/${id}`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestClassRequestSearchApiCreate
         * @summary Return specific page of Location this api will perform OR Search on criteria
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/ClassRequest/ClassRequestSearchApi
         */
        appClassRequestClassRequestSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<ClassRequestQueryResult, any>({
                path: `/api/app/ClassRequest/ClassRequestSearchApi`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestPurgeDelete
         * @summary This Api will delete an existing ClassRequest by marking it as soft delete.
         * @request DELETE:/api/app/ClassRequest/{ClassRequestId}/purge
         */
        appClassRequestPurgeDelete: (classRequestId: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, any>({
                path: `/api/app/ClassRequest/${classRequestId}/purge`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestQCreate
         * @summary Return specific page of ClassRequests
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/ClassRequest/q
         */
        appClassRequestQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<ClassRequestQueryResult, any>({
                path: `/api/app/ClassRequest/q`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestCreate
         * @summary Create a new ClassRequest
         For account-based models
         * @request POST:/api/app/ClassRequest
         */
        appClassRequestCreate: (data: ClassRequestEntity, params: RequestParams = {}) =>
            this.request<ClassRequestServiceResult, void>({
                path: `/api/app/ClassRequest`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestDetail
         * @summary Return ClassRequest by identifier
         * @request GET:/api/app/ClassRequest/{id}
         */
        appClassRequestDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<ClassRequestServiceResult, any>({
                path: `/api/app/ClassRequest/${id}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestUpdate
         * @summary Update an existing ClassRequest
         * @request PUT:/api/app/ClassRequest/{id}
         */
        appClassRequestUpdate: (id: string, data: ClassRequestEntity, params: RequestParams = {}) =>
            this.request<ClassRequestServiceResult, any>({
                path: `/api/app/ClassRequest/${id}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestDelete
         * @summary Delete specific ClassRequest
         * @request DELETE:/api/app/ClassRequest/{id}
         */
        appClassRequestDelete: (id: string, params: RequestParams = {}) =>
            this.request<ClassRequestServiceResult, any>({
                path: `/api/app/ClassRequest/${id}`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags InstructorApi
         * @name AppInstructorInstructorSearchApiCreate
         * @summary Return specific page of Location this api will perform OR Search on criteria
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Instructor/InstructorSearchApi
         */
        appInstructorInstructorSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<InstructorQueryResult, any>({
                path: `/api/app/Instructor/InstructorSearchApi`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags InstructorApi
         * @name AppInstructorPurgeDelete
         * @summary This Api will delete an existing Instructor by marking it as soft delete.
         * @request DELETE:/api/app/Instructor/{InstructorId}/purge
         */
        appInstructorPurgeDelete: (instructorId: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, any>({
                path: `/api/app/Instructor/${instructorId}/purge`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags InstructorApi
         * @name AppInstructorQCreate
         * @summary Return specific page of Instructors
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Instructor/q
         */
        appInstructorQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<InstructorQueryResult, any>({
                path: `/api/app/Instructor/q`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags InstructorApi
         * @name AppInstructorCreate
         * @summary Create a new Instructor
         For account-based models
         * @request POST:/api/app/Instructor
         */
        appInstructorCreate: (data: InstructorEntity, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/Instructor`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags InstructorApi
         * @name AppInstructorDetail
         * @summary Return Instructor by identifier
         * @request GET:/api/app/Instructor/{id}
         */
        appInstructorDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, any>({
                path: `/api/app/Instructor/${id}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags InstructorApi
         * @name AppInstructorUpdate
         * @summary Update an existing Instructor
         * @request PUT:/api/app/Instructor/{id}
         */
        appInstructorUpdate: (id: string, data: InstructorEntity, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, any>({
                path: `/api/app/Instructor/${id}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags InstructorApi
         * @name AppInstructorDelete
         * @summary Delete specific Instructor
         * @request DELETE:/api/app/Instructor/{id}
         */
        appInstructorDelete: (id: string, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, any>({
                path: `/api/app/Instructor/${id}`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LocationApi
         * @name AppLocationLocationSearchApiCreate
         * @summary Return specific page of Location this api will perform OR Search on criteria
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Location/LocationSearchApi
         */
        appLocationLocationSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<LocationQueryResult, any>({
                path: `/api/app/Location/LocationSearchApi`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LocationApi
         * @name AppLocationPurgeDelete
         * @summary This Api will delete an existing location by marking it as soft delete.
         * @request DELETE:/api/app/Location/{locationId}/purge
         */
        appLocationPurgeDelete: (locationId: string | null, params: RequestParams = {}) =>
            this.request<LocationServiceResult, any>({
                path: `/api/app/Location/${locationId}/purge`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LocationApi
         * @name AppLocationQCreate
         * @summary Return specific page of Locations
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Location/q
         */
        appLocationQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<LocationQueryResult, any>({
                path: `/api/app/Location/q`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LocationApi
         * @name AppLocationCreate
         * @summary Create a new Location
         For account-based models
         * @request POST:/api/app/Location
         */
        appLocationCreate: (data: LocationEntity, params: RequestParams = {}) =>
            this.request<LocationServiceResult, void>({
                path: `/api/app/Location`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LocationApi
         * @name AppLocationDetail
         * @summary Return Location by identifier
         * @request GET:/api/app/Location/{id}
         */
        appLocationDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<LocationServiceResult, any>({
                path: `/api/app/Location/${id}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LocationApi
         * @name AppLocationUpdate
         * @summary Update an existing Location
         * @request PUT:/api/app/Location/{id}
         */
        appLocationUpdate: (id: string, data: LocationEntity, params: RequestParams = {}) =>
            this.request<LocationServiceResult, any>({
                path: `/api/app/Location/${id}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LocationApi
         * @name AppLocationDelete
         * @summary Delete specific Location
         * @request DELETE:/api/app/Location/{id}
         */
        appLocationDelete: (id: string, params: RequestParams = {}) =>
            this.request<LocationServiceResult, any>({
                path: `/api/app/Location/${id}`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationLogApi
         * @name AppNotificationLogNotificationLogSearchApiCreate
         * @summary Return specific page of NotificationLog this api will perform OR Search on criteria
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/NotificationLog/NotificationLogSearchApi
         */
        appNotificationLogNotificationLogSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<NotificationLogQueryResult, any>({
                path: `/api/app/NotificationLog/NotificationLogSearchApi`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationLogApi
         * @name AppNotificationLogQCreate
         * @summary Return specific page of NotificationLogs
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/NotificationLog/q
         */
        appNotificationLogQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<NotificationLogQueryResult, any>({
                path: `/api/app/NotificationLog/q`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationLogApi
         * @name AppNotificationLogCreate
         * @summary Create a new NotificationLog
         For account-based models
         * @request POST:/api/app/NotificationLog
         */
        appNotificationLogCreate: (data: NotificationLogEntity, params: RequestParams = {}) =>
            this.request<NotificationLogServiceResult, void>({
                path: `/api/app/NotificationLog`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationLogApi
         * @name AppNotificationLogDetail
         * @summary Return NotificationLog by identifier
         * @request GET:/api/app/NotificationLog/{id}
         */
        appNotificationLogDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<NotificationLogServiceResult, any>({
                path: `/api/app/NotificationLog/${id}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationLogApi
         * @name AppNotificationLogUpdate
         * @summary Update an existing NotificationLog
         * @request PUT:/api/app/NotificationLog/{id}
         */
        appNotificationLogUpdate: (id: string, data: NotificationLogEntity, params: RequestParams = {}) =>
            this.request<NotificationLogServiceResult, any>({
                path: `/api/app/NotificationLog/${id}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationLogApi
         * @name AppNotificationLogDelete
         * @summary Delete specific NotificationLog
         * @request DELETE:/api/app/NotificationLog/{id}
         */
        appNotificationLogDelete: (id: string, params: RequestParams = {}) =>
            this.request<NotificationLogServiceResult, any>({
                path: `/api/app/NotificationLog/${id}`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassTrainingClassSearchApiCreate
         * @summary Return specific page of Training Classes
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/TrainingClass/TrainingClassSearchApi
         */
        appTrainingClassTrainingClassSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<TrainingClassQueryResult, any>({
                path: `/api/app/TrainingClass/TrainingClassSearchApi`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassQCreate
         * @summary Return specific page of Training Classes
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/TrainingClass/q
         */
        appTrainingClassQCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<TrainingClassQueryResult, any>({
                path: `/api/app/TrainingClass/q`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassPurgeDelete
         * @summary This Api will delete an existing TraningClass by marking it as soft delete.
         * @request DELETE:/api/app/TrainingClass/{traningClassId}/purge
         */
        appTrainingClassPurgeDelete: (traningClassId: string | null, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, any>({
                path: `/api/app/TrainingClass/${traningClassId}/purge`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassExpandedDetail
         * @summary This Api will give you expanded data result for TrainingClass.
         * @request GET:/api/app/TrainingClass/{traningClassId}/expanded
         */
        appTrainingClassExpandedDetail: (traningClassId: string | null, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, any>({
                path: `/api/app/TrainingClass/${traningClassId}/expanded`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassCreate
         * @summary Create a new TrainingClass
         For account-based models
         * @request POST:/api/app/TrainingClass
         */
        appTrainingClassCreate: (data: TrainingClassEntity, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassDetail
         * @summary Return TrainingClass by identifier
         * @request GET:/api/app/TrainingClass/{id}
         */
        appTrainingClassDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, any>({
                path: `/api/app/TrainingClass/${id}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassUpdate
         * @summary Update an existing TrainingClass
         * @request PUT:/api/app/TrainingClass/{id}
         */
        appTrainingClassUpdate: (id: string, data: TrainingClassEntity, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, any>({
                path: `/api/app/TrainingClass/${id}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassDelete
         * @summary Delete specific TrainingClass
         * @request DELETE:/api/app/TrainingClass/{id}
         */
        appTrainingClassDelete: (id: string, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, any>({
                path: `/api/app/TrainingClass/${id}`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicTrainingTopicSearchApiCreate
         * @summary Advanced search options for Training Topics
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/TrainingTopic/TrainingTopicSearchApi
         */
        appTrainingTopicTrainingTopicSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<TrainingTopicApiQueryResult, any>({
                path: `/api/app/TrainingTopic/TrainingTopicSearchApi`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicGetTrainingTopicDetail
         * @summary Return specific page of TrainingTopics
         Note: Default is page zero with a max size of 50 items
         * @request GET:/api/app/TrainingTopic/GetTrainingTopic/{topicId}
         */
        appTrainingTopicGetTrainingTopicDetail: (topicId: string, params: RequestParams = {}) =>
            this.request<TrainingTopicApiQueryResult, any>({
                path: `/api/app/TrainingTopic/GetTrainingTopic/${topicId}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicGetAllTrainingTopicsList
         * @summary Return specific page of TrainingTopics
         Note: Default is page zero with a max size of 50 items
         * @request GET:/api/app/TrainingTopic/GetAllTrainingTopics
         */
        appTrainingTopicGetAllTrainingTopicsList: (params: RequestParams = {}) =>
            this.request<TrainingTopicApiQueryResult, any>({
                path: `/api/app/TrainingTopic/GetAllTrainingTopics`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicPurgeDelete
         * @summary This Api will delete an existing Topic with marked as soft delete.
         * @request DELETE:/api/app/TrainingTopic/{topicId}/purge
         */
        appTrainingTopicPurgeDelete: (topicId: string, params: RequestParams = {}) =>
            this.request<TrainingTopicApiQueryResult, any>({
                path: `/api/app/TrainingTopic/${topicId}/purge`,
                method: "DELETE",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicQCreate
         * @summary Return specific page of TrainingTopics
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/TrainingTopic/q
         */
        appTrainingTopicQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<TrainingTopicQueryResult, any>({
                path: `/api/app/TrainingTopic/q`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicCreate
         * @summary Create a new TrainingTopic
         For account-based models
         * @request POST:/api/app/TrainingTopic
         */
        appTrainingTopicCreate: (data: TrainingTopicEntity, params: RequestParams = {}) =>
            this.request<TrainingTopicServiceResult, void>({
                path: `/api/app/TrainingTopic`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicDetail
         * @summary Return TrainingTopic by identifier
         * @request GET:/api/app/TrainingTopic/{id}
         */
        appTrainingTopicDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<TrainingTopicServiceResult, any>({
                path: `/api/app/TrainingTopic/${id}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicUpdate
         * @summary Update an existing TrainingTopic
         * @request PUT:/api/app/TrainingTopic/{id}
         */
        appTrainingTopicUpdate: (id: string, data: TrainingTopicEntity, params: RequestParams = {}) =>
            this.request<TrainingTopicServiceResult, any>({
                path: `/api/app/TrainingTopic/${id}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicApi
         * @name AppTrainingTopicDelete
         * @summary Delete specific TrainingTopic
         * @request DELETE:/api/app/TrainingTopic/{id}
         */
        appTrainingTopicDelete: (id: string, params: RequestParams = {}) =>
            this.request<TrainingTopicServiceResult, any>({
                path: `/api/app/TrainingTopic/${id}`,
                method: "DELETE",
                format: "json",
                ...params,
            }),
    };
}
