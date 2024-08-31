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

export interface TrainingTopicEntity {
    trainingClasses?: TrainingTopicLookupEntity[] | null;
    description?: string | null;
    isDeleted: boolean;
    name: string;
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
    isDeleted: boolean;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface AOREntity {
    aorStatusShort?: string | null;
    shortName?: string | null;
    name?: string | null;

    /** @format uuid */
    id?: string;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface LocationEntity {
    description?: string | null;
    parent?: string | null;
    locationType?: string | null;
    notes?: string | null;
    status?: string | null;
    address?: string | null;
    isDeleted: boolean;
    name: string;

    /** @format int32 */
    capacity: number;
    isVirtual: boolean;
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
    color?: string | null;
    title?: string | null;
    status?: string | null;
    notes?: string | null;
    photoURL?: string | null;
    surveyURL?: string | null;

    /** @format uuid */
    staffID?: string | null;
    hostID?: string | null;
    isDeleted: boolean;
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
    aor?: AOREntity;
    sendReminder?: string | null;

    /** @format uuid */
    locationId: string;
    location?: LocationEntity;

    /** @format uuid */
    instructorId: string;
    instructor?: InstructorEntity;
    presentationType?: string | null;
    className?: string | null;
    imageURL?: string | null;
    meetingId?: string | null;
    meetingType?: string | null;

    /** @format int32 */
    eventType: number;
    meetingURL?: string | null;
    status?: string | null;
    isDeleted: boolean;

    /** @format uuid */
    aorId?: string | null;

    /** @format date-time */
    startTime: string;

    /** @format int32 */
    duration: number;

    /** @format int32 */
    capacity: number;

    /** @format int32 */
    seatsAvailable?: number | null;
    isPublic: boolean;

    /** @format date-time */
    endTime?: string | null;
    aorShortName?: string | null;
    aorName?: string | null;
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
    events?: TrainingClassEntity[] | null;

    /** @format uuid */
    memberID: string;

    /** @format uuid */
    trainingClassId: string;
    trainingClass?: TrainingClassEntity;
    wasPresent?: boolean | null;
    notes?: string | null;
    registrationId?: string | null;
    isDeleted: boolean;

    /** @format date-time */
    registeredOn: string;

    /** @format date-time */
    unRegisteredOn?: string | null;

    /** @format date-time */
    confirmedOn?: string | null;

    /** @format date-time */
    surveyedOn?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    memberName?: string | null;
    emailAddress?: string | null;
    memberStatus?: string | null;
    contactType?: string | null;
    memberType?: string | null;
    aorShortName?: string | null;
    aorName?: string | null;
    joinURL?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
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

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: AttendeeEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface ClassRequestEntity {
    requestedBy?: string | null;
    requestedByLoginId?: string | null;

    /** @format date-time */
    dateTime: string;
    comments?: string | null;
    notes?: string | null;
    isDeleted: boolean;

    /** @format int32 */
    requestStatus: number;

    /** @format uuid */
    locationID?: string | null;
    location?: LocationEntity;

    /** @format uuid */
    trainingTopicId?: string | null;
    trainingTopic?: TrainingTopicEntity;
    aorShortName?: string | null;
    createdBy?: string | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string;
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

    /** @format int32 */
    totalPages?: number;
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

export interface DataAggregationDto {
    /** @format int32 */
    totalClasses?: number;

    /** @format int32 */
    totalRegistrations?: number;

    /** @format int32 */
    attended?: number;

    /** @format int32 */
    notAttended?: number;
}

export interface DataAggregationResult {
    isSuccessful?: boolean;
    result?: DataAggregationDto[] | null;
    message?: string | null;
    exceptions?: string | null;
}

export interface InstructorQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
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

    /** @format int32 */
    totalPages?: number;
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

    /** @format int32 */
    totalPages?: number;
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

    /** @format int32 */
    totalPages?: number;
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

    /** @format int32 */
    totalPages?: number;
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

    /** @format int32 */
    totalPages?: number;
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

export interface TrainingTopicLookupQueryResult {
    /** @format int32 */
    pageId?: number;

    /** @format int32 */
    pageSize?: number;

    /** @format int32 */
    totalResults?: number;

    /** @format int32 */
    totalPages?: number;
    isSuccessful?: boolean;
    results?: TrainingTopicLookupEntity[] | null;
    exceptions?: string[] | null;
    message?: string | null;
}

export interface TrainingTopicLookupServiceResult {
    isSuccessful?: boolean;
    results?: TrainingTopicLookupEntity[] | null;
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
         * @secure
         */
        appAttendeeRegisterCreate: (data: AttendeeEntity, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, void>({
                path: `/api/app/Attendee/Register`,
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
         * @tags AttendeeApi
         * @name AppAttendeeUnRegisterUpdate
         * @summary This API is used for unregister attendee based on Id
         * @request PUT:/api/app/Attendee/UnRegister
         * @secure
         */
        appAttendeeUnRegisterUpdate: (query?: { id?: string }, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, void>({
                path: `/api/app/Attendee/UnRegister`,
                method: "PUT",
                query: query,
                secure: true,
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
         * @secure
         */
        appAttendeeAttendeeSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<AttendeeQueryResult, void>({
                path: `/api/app/Attendee/AttendeeSearchApi`,
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
         * @tags AttendeeApi
         * @name AppAttendeePurgeDelete
         * @summary This Api will delete an existing attendee by marking it as soft delete.
         * @request DELETE:/api/app/Attendee/{attendeeId}/purge
         * @secure
         */
        appAttendeePurgeDelete: (attendeeId: string | null, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, void>({
                path: `/api/app/Attendee/${attendeeId}/purge`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AttendeeApi
         * @name AppAttendeeWasPresentCreate
         * @summary This endpoint is used to update attendee was present status.
         * @request POST:/api/app/Attendee/WasPresent/{attendeeId}/{isPresent}
         * @secure
         */
        appAttendeeWasPresentCreate: (attendeeId: string | null, isPresent: boolean, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, void>({
                path: `/api/app/Attendee/WasPresent/${attendeeId}/${isPresent}`,
                method: "POST",
                secure: true,
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
         * @secure
         */
        appAttendeeListDetail: (trainingClassId: string | null, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, void>({
                path: `/api/app/Attendee/${trainingClassId}/list`,
                method: "GET",
                secure: true,
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
         * @secure
         */
        appAttendeeQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<AttendeeQueryResult, void>({
                path: `/api/app/Attendee/q`,
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
         * @tags AttendeeApi
         * @name AppAttendeeDetail
         * @summary Return Attendee by identifier
         * @request GET:/api/app/Attendee/{id}
         * @secure
         */
        appAttendeeDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, void>({
                path: `/api/app/Attendee/${id}`,
                method: "GET",
                secure: true,
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
         * @secure
         */
        appAttendeeDelete: (id: string, params: RequestParams = {}) =>
            this.request<AttendeeServiceResult, void>({
                path: `/api/app/Attendee/${id}`,
                method: "DELETE",
                secure: true,
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
         * @secure
         */
        appClassRequestClassRequestSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<ClassRequestQueryResult, void>({
                path: `/api/app/ClassRequest/ClassRequestSearchApi`,
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
         * @tags ClassRequestApi
         * @name AppClassRequestPurgeDelete
         * @summary This Api will delete an existing ClassRequest by marking it as soft delete.
         * @request DELETE:/api/app/ClassRequest/{ClassRequestId}/purge
         * @secure
         */
        appClassRequestPurgeDelete: (classRequestId: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/ClassRequest/${classRequestId}/purge`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestCancelUpdate
         * @summary This Api will Change the Class Request status to Cancel
         * @request PUT:/api/app/ClassRequest/Cancel/{ClassRequestId}
         * @secure
         */
        appClassRequestCancelUpdate: (classRequestId: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/ClassRequest/Cancel/${classRequestId}`,
                method: "PUT",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestClosedUpdate
         * @summary This Api will Change the Class Request status to Closed
         * @request PUT:/api/app/ClassRequest/Closed/{ClassRequestId}
         * @secure
         */
        appClassRequestClosedUpdate: (classRequestId: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/ClassRequest/Closed/${classRequestId}`,
                method: "PUT",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestActiveUpdate
         * @summary This Api will Change the Class Request status to Active
         * @request PUT:/api/app/ClassRequest/Active/{ClassRequestId}
         * @secure
         */
        appClassRequestActiveUpdate: (classRequestId: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/ClassRequest/Active/${classRequestId}`,
                method: "PUT",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestInProgressUpdate
         * @summary This Api will Change the Class Request status to InProgress
         * @request PUT:/api/app/ClassRequest/InProgress/{ClassRequestId}
         * @secure
         */
        appClassRequestInProgressUpdate: (classRequestId: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/ClassRequest/InProgress/${classRequestId}`,
                method: "PUT",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ClassRequestApi
         * @name AppClassRequestCreate
         * @summary Create a new ClassRequest For account-based models
         * @request POST:/api/app/ClassRequest
         * @secure
         */
        appClassRequestCreate: (data: ClassRequestEntity, params: RequestParams = {}) =>
            this.request<ClassRequestServiceResult, void>({
                path: `/api/app/ClassRequest`,
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
         * @tags ClassRequestApi
         * @name AppClassRequestQCreate
         * @summary Return specific page of ClassRequests
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/ClassRequest/q
         * @secure
         */
        appClassRequestQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<ClassRequestQueryResult, void>({
                path: `/api/app/ClassRequest/q`,
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
         * @tags ClassRequestApi
         * @name AppClassRequestDetail
         * @summary Return ClassRequest by identifier
         * @request GET:/api/app/ClassRequest/{id}
         * @secure
         */
        appClassRequestDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<ClassRequestServiceResult, void>({
                path: `/api/app/ClassRequest/${id}`,
                method: "GET",
                secure: true,
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
         * @secure
         */
        appClassRequestUpdate: (id: string, data: ClassRequestEntity, params: RequestParams = {}) =>
            this.request<ClassRequestServiceResult, void>({
                path: `/api/app/ClassRequest/${id}`,
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
         * @tags ClassRequestApi
         * @name AppClassRequestDelete
         * @summary Delete specific ClassRequest
         * @request DELETE:/api/app/ClassRequest/{id}
         * @secure
         */
        appClassRequestDelete: (id: string, params: RequestParams = {}) =>
            this.request<ClassRequestServiceResult, void>({
                path: `/api/app/ClassRequest/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DataAggregation
         * @name AppGetStatsList
         * @summary This Api is used for getting stats based on provided from datae
         * @request GET:/api/app/GetStats
         */
        appGetStatsList: (query?: { fromDate?: string }, params: RequestParams = {}) =>
            this.request<DataAggregationResult, any>({
                path: `/api/app/GetStats`,
                method: "GET",
                query: query,
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
         * @secure
         */
        appInstructorInstructorSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<InstructorQueryResult, void>({
                path: `/api/app/Instructor/InstructorSearchApi`,
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
         * @tags InstructorApi
         * @name AppInstructorPurgeDelete
         * @summary This Api will delete an existing Instructor by marking it as soft delete.
         * @request DELETE:/api/app/Instructor/{InstructorId}/purge
         * @secure
         */
        appInstructorPurgeDelete: (instructorId: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/Instructor/${instructorId}/purge`,
                method: "DELETE",
                secure: true,
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
         * @secure
         */
        appInstructorQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<InstructorQueryResult, void>({
                path: `/api/app/Instructor/q`,
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
         * @tags InstructorApi
         * @name AppInstructorCreate
         * @summary Create a new Instructor
         For account-based models
         * @request POST:/api/app/Instructor
         * @secure
         */
        appInstructorCreate: (data: InstructorEntity, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/Instructor`,
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
         * @tags InstructorApi
         * @name AppInstructorDetail
         * @summary Return Instructor by identifier
         * @request GET:/api/app/Instructor/{id}
         * @secure
         */
        appInstructorDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/Instructor/${id}`,
                method: "GET",
                secure: true,
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
         * @secure
         */
        appInstructorUpdate: (id: string, data: InstructorEntity, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/Instructor/${id}`,
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
         * @tags InstructorApi
         * @name AppInstructorDelete
         * @summary Delete specific Instructor
         * @request DELETE:/api/app/Instructor/{id}
         * @secure
         */
        appInstructorDelete: (id: string, params: RequestParams = {}) =>
            this.request<InstructorServiceResult, void>({
                path: `/api/app/Instructor/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LocationApi
         * @name AppLocationLocationSearchApiCreate
         * @summary Return specific page of Location this api will perform OR Search on criteria based
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/Location/LocationSearchApi
         * @secure
         */
        appLocationLocationSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<LocationQueryResult, void>({
                path: `/api/app/Location/LocationSearchApi`,
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
         * @tags LocationApi
         * @name AppLocationPurgeDelete
         * @summary This Api will delete an existing location by marking it as soft delete.
         * @request DELETE:/api/app/Location/{locationId}/purge
         * @secure
         */
        appLocationPurgeDelete: (locationId: string | null, params: RequestParams = {}) =>
            this.request<LocationServiceResult, void>({
                path: `/api/app/Location/${locationId}/purge`,
                method: "DELETE",
                secure: true,
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
         * @secure
         */
        appLocationQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<LocationQueryResult, void>({
                path: `/api/app/Location/q`,
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
         * @tags LocationApi
         * @name AppLocationCreate
         * @summary Create a new Location
         For account-based models
         * @request POST:/api/app/Location
         * @secure
         */
        appLocationCreate: (data: LocationEntity, params: RequestParams = {}) =>
            this.request<LocationServiceResult, void>({
                path: `/api/app/Location`,
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
         * @tags LocationApi
         * @name AppLocationDetail
         * @summary Return Location by identifier
         * @request GET:/api/app/Location/{id}
         * @secure
         */
        appLocationDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<LocationServiceResult, void>({
                path: `/api/app/Location/${id}`,
                method: "GET",
                secure: true,
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
         * @secure
         */
        appLocationUpdate: (id: string, data: LocationEntity, params: RequestParams = {}) =>
            this.request<LocationServiceResult, void>({
                path: `/api/app/Location/${id}`,
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
         * @tags LocationApi
         * @name AppLocationDelete
         * @summary Delete specific Location
         * @request DELETE:/api/app/Location/{id}
         * @secure
         */
        appLocationDelete: (id: string, params: RequestParams = {}) =>
            this.request<LocationServiceResult, void>({
                path: `/api/app/Location/${id}`,
                method: "DELETE",
                secure: true,
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
         * @secure
         */
        appTrainingClassTrainingClassSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<TrainingClassQueryResult, void>({
                path: `/api/app/TrainingClass/TrainingClassSearchApi`,
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
         * @tags TrainingClassApi
         * @name AppTrainingClassPurgeDelete
         * @summary This Api will delete an existing TrainingClass by marking it as soft delete.
         * @request DELETE:/api/app/TrainingClass/{traningClassId}/purge
         * @secure
         */
        appTrainingClassPurgeDelete: (traningClassId: string | null, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/${traningClassId}/purge`,
                method: "DELETE",
                secure: true,
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
         * @secure
         */
        appTrainingClassExpandedDetail: (traningClassId: string | null, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/${traningClassId}/expanded`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassManageTrainingTopicWithClassCreate
         * @summary This endpoint removes previously associated topic and add new based on data.
         * @request POST:/api/app/TrainingClass/ManageTrainingTopicWithClass
         * @secure
         */
        appTrainingClassManageTrainingTopicWithClassCreate: (
            data: TrainingTopicLookupEntity[] | null,
            params: RequestParams = {},
        ) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/ManageTrainingTopicWithClass`,
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
         * @tags TrainingClassApi
         * @name AppTrainingClassDetail
         * @summary Return TrainingClass by identifier
         * @request GET:/api/app/TrainingClass/{id}
         * @secure
         */
        appTrainingClassDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassUpdate
         * @summary Update an existing TraingingClass
         * @request PUT:/api/app/TrainingClass/{id}
         * @secure
         */
        appTrainingClassUpdate: (id: string, data: TrainingClassEntity, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/${id}`,
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
         * @tags TrainingClassApi
         * @name AppTrainingClassDelete
         * @summary Delete specific TrainingClass
         * @request DELETE:/api/app/TrainingClass/{id}
         * @secure
         */
        appTrainingClassDelete: (id: string, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassByAorDetail
         * @summary [Depracated - Use can use q endpoint] Get the training classes by AOR
         * @request GET:/api/app/TrainingClass/by_aor/{aor}
         */
        appTrainingClassByAorDetail: (aor: string, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, any>({
                path: `/api/app/TrainingClass/by_aor/${aor}`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassCreate
         * @summary Create a new TrainingClass For account-based models
         * @request POST:/api/app/TrainingClass
         * @secure
         */
        appTrainingClassCreate: (data: TrainingClassEntity, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass`,
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
         * @tags TrainingClassApi
         * @name AppTrainingClassPublishCreate
         * @summary Update an existing TrainingClass
         * @request POST:/api/app/TrainingClass/{id}/Publish
         * @secure
         */
        appTrainingClassPublishCreate: (id: string, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/${id}/Publish`,
                method: "POST",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassCancelCreate
         * @request POST:/api/app/TrainingClass/{id}/Cancel
         * @secure
         */
        appTrainingClassCancelCreate: (id: string, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/${id}/Cancel`,
                method: "POST",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassFinalizeCreate
         * @request POST:/api/app/TrainingClass/{id}/Finalize
         * @secure
         */
        appTrainingClassFinalizeCreate: (id: string, params: RequestParams = {}) =>
            this.request<TrainingClassServiceResult, void>({
                path: `/api/app/TrainingClass/${id}/Finalize`,
                method: "POST",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingClassApi
         * @name AppTrainingClassQCreate
         * @summary Return specific page of TrainingClasses
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/TrainingClass/q
         * @secure
         */
        appTrainingClassQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<TrainingClassQueryResult, void>({
                path: `/api/app/TrainingClass/q`,
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
         * @tags TrainingTopicApi
         * @name AppTrainingTopicTrainingTopicSearchApiCreate
         * @summary Advanced search options for Training Topics
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/TrainingTopic/TrainingTopicSearchApi
         * @secure
         */
        appTrainingTopicTrainingTopicSearchApiCreate: (data: ApiQuery, params: RequestParams = {}) =>
            this.request<TrainingTopicApiQueryResult, void>({
                path: `/api/app/TrainingTopic/TrainingTopicSearchApi`,
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
         * @tags TrainingTopicApi
         * @name AppTrainingTopicGetTrainingTopicDetail
         * @summary Return specific page of TrainingTopics
         Note: Default is page zero with a max size of 50 items
         * @request GET:/api/app/TrainingTopic/GetTrainingTopic/{topicId}
         * @secure
         */
        appTrainingTopicGetTrainingTopicDetail: (topicId: string, params: RequestParams = {}) =>
            this.request<TrainingTopicApiQueryResult, void>({
                path: `/api/app/TrainingTopic/GetTrainingTopic/${topicId}`,
                method: "GET",
                secure: true,
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
         * @secure
         */
        appTrainingTopicGetAllTrainingTopicsList: (params: RequestParams = {}) =>
            this.request<TrainingTopicApiQueryResult, void>({
                path: `/api/app/TrainingTopic/GetAllTrainingTopics`,
                method: "GET",
                secure: true,
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
         * @secure
         */
        appTrainingTopicPurgeDelete: (topicId: string, params: RequestParams = {}) =>
            this.request<TrainingTopicApiQueryResult, void>({
                path: `/api/app/TrainingTopic/${topicId}/purge`,
                method: "DELETE",
                secure: true,
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
         * @secure
         */
        appTrainingTopicQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<TrainingTopicQueryResult, void>({
                path: `/api/app/TrainingTopic/q`,
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
         * @tags TrainingTopicApi
         * @name AppTrainingTopicCreate
         * @summary Create a new TrainingTopic
         For account-based models
         * @request POST:/api/app/TrainingTopic
         * @secure
         */
        appTrainingTopicCreate: (data: TrainingTopicEntity, params: RequestParams = {}) =>
            this.request<TrainingTopicServiceResult, void>({
                path: `/api/app/TrainingTopic`,
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
         * @tags TrainingTopicApi
         * @name AppTrainingTopicDetail
         * @summary Return TrainingTopic by identifier
         * @request GET:/api/app/TrainingTopic/{id}
         * @secure
         */
        appTrainingTopicDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<TrainingTopicServiceResult, void>({
                path: `/api/app/TrainingTopic/${id}`,
                method: "GET",
                secure: true,
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
         * @secure
         */
        appTrainingTopicUpdate: (id: string, data: TrainingTopicEntity, params: RequestParams = {}) =>
            this.request<TrainingTopicServiceResult, void>({
                path: `/api/app/TrainingTopic/${id}`,
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
         * @tags TrainingTopicApi
         * @name AppTrainingTopicDelete
         * @summary Delete specific TrainingTopic
         * @request DELETE:/api/app/TrainingTopic/{id}
         * @secure
         */
        appTrainingTopicDelete: (id: string, params: RequestParams = {}) =>
            this.request<TrainingTopicServiceResult, void>({
                path: `/api/app/TrainingTopic/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicLookupApi
         * @name AppTrainingTopicLookupQCreate
         * @summary Return specific page of TrainingTopicLookups
         Note: Default is page zero with a max size of 50 items
         * @request POST:/api/app/TrainingTopicLookup/q
         * @secure
         */
        appTrainingTopicLookupQCreate: (data: ApiQuery, query?: { f?: string | null }, params: RequestParams = {}) =>
            this.request<TrainingTopicLookupQueryResult, void>({
                path: `/api/app/TrainingTopicLookup/q`,
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
         * @tags TrainingTopicLookupApi
         * @name AppTrainingTopicLookupCreate
         * @summary Create a new TrainingTopicLookup
         For account-based models
         * @request POST:/api/app/TrainingTopicLookup
         * @secure
         */
        appTrainingTopicLookupCreate: (data: TrainingTopicLookupEntity, params: RequestParams = {}) =>
            this.request<TrainingTopicLookupServiceResult, void>({
                path: `/api/app/TrainingTopicLookup`,
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
         * @tags TrainingTopicLookupApi
         * @name AppTrainingTopicLookupDetail
         * @summary Return TrainingTopicLookup by identifier
         * @request GET:/api/app/TrainingTopicLookup/{id}
         * @secure
         */
        appTrainingTopicLookupDetail: (id: string | null, params: RequestParams = {}) =>
            this.request<TrainingTopicLookupServiceResult, void>({
                path: `/api/app/TrainingTopicLookup/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TrainingTopicLookupApi
         * @name AppTrainingTopicLookupUpdate
         * @summary Update an existing TrainingTopicLookup
         * @request PUT:/api/app/TrainingTopicLookup/{id}
         * @secure
         */
        appTrainingTopicLookupUpdate: (id: string, data: TrainingTopicLookupEntity, params: RequestParams = {}) =>
            this.request<TrainingTopicLookupServiceResult, void>({
                path: `/api/app/TrainingTopicLookup/${id}`,
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
         * @tags TrainingTopicLookupApi
         * @name AppTrainingTopicLookupDelete
         * @summary Delete specific TrainingTopicLookup
         * @request DELETE:/api/app/TrainingTopicLookup/{id}
         * @secure
         */
        appTrainingTopicLookupDelete: (id: string, params: RequestParams = {}) =>
            this.request<TrainingTopicLookupServiceResult, void>({
                path: `/api/app/TrainingTopicLookup/${id}`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params,
            }),
    };
}
