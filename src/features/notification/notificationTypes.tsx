export interface NotificationEntity {
    to: string | null;
    from: string | null;
    subject?: string | null;
    body?: string | null;
    isRead?: boolean;
    priority: number;
    status?: string;
    notificationCategory: NotificationCategoryEntity | null;
    notificationCategoryId: number | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface EmailRequestEntity {
    subject?: string | null;
    body?: string | null;
    priority: number;
    status?: string;
    emailCategory: NotificationCategoryEntity | null;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface NotificationCategoryEntity {
    name: string;
    createdBy: string;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}

export interface NotificationFilterEntity {
    category?: string | number | null;
    isRead?: string | null;
    sort?: string | null;
    search?: string | null;
}

export interface NotificationChangesPayload {
    id: string;
    changes: object;
}

export interface SystemNotificationStatusEntity {
    createdBy: string,
    createdOn: string,
    id: number,
    modifiedBy: string,
    modifiedOn: string,
    name: string,
    color: string,
    description: string
}

export interface SystemNotificationEntity {
    show: boolean;
    status: 'info' | 'warn' | 'error' | 'success' | 'delete' | 'promote' | 'cancel';
    title: string;
    message: string;
    url?: string;
    position: 'dash' | 'popover' | 'modal';
    autoHide: number | false;
    confirm: boolean; // TODO: maybe build option to track acknowledgement of message?
    notificationId: string | null;
    criteria?: [
        { field?: string, op?: string, values?: []}
    ],
    systemNotificationStatus?: SystemNotificationStatusEntity;
    systemNotificationStatusId: number;
    createdBy: string;
    expirationDate: string;
    source: string;

    /** @format date-time */
    createdOn?: string;

    /** @format uuid */
    id?: string | number | undefined;
    modifiedBy?: string | null;

    /** @format date-time */
    modifiedOn?: string;
}