import {getToken, RootState} from "../../app/store";
import {createSelector} from "@reduxjs/toolkit";
export const user = (state: RootState) => state.user;
export const userProfile = (state: RootState) => state.user.profile;
export const officeProfile = (state: RootState) => state.user.profile.office;
export const aorProfile = (state: RootState) => state.user.profile.aor;
export const userId = (state: RootState) => state.user.profile?.member?.id;

export const selectReadNotifications = (state: RootState) => state.userPrefs.UserPrefs.notifications.read;
export const selectArchivedNotifications = (state: RootState) => state.userPrefs.UserPrefs.notifications.archived;
export const selectReadArticles = (state: RootState) => state.userPrefs.UserPrefs.articles.read;
export const selectFavoriteArticles = (state: RootState) => state.userPrefs.UserPrefs.articles.favorites;
export const selectFavoriteApplications = (state: RootState) => state.userPrefs.UserPrefs.applications.favorites;
export const selectDashPrefs = (state: RootState) => state.userPrefs.UserPrefs.dashboardSettings;
export const selectReadSystemNotifications = (state: RootState) => state.userPrefs.UserPrefs.systemNotifications.read;
export const selectPrefsProfile = (state: RootState) => state.userPrefs.UserPrefs.profile;

export const formattedProfile = createSelector(
    userProfile,
    (profile) : userState => {
        return formatProfile(profile);
    }
)

export const formatProfile = (profile: userPayload): userState=> {
    return {
        loginId: profile.userid,
        memberId: profile?.member?.id ?? '',
        officeId: profile.officeMlsId,
        firstName: profile.memberFirstName,
        lastName: profile.memberLastName,
        email: profile.memberEmail,
        photoUrl: (profile.hasOwnProperty('member') && profile.member.hasOwnProperty('photoUrl') && profile.member.photoUrl) ? profile.member.photoUrl : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${profile.memberFirstName + ' ' + profile.memberLastName}`,
        memberType: mapUserLevel(profile.userclass),
        aorName: profile.memberAOR,
        aorFullName: profile?.aor?.name ?? '',
        aorId: profile.memberAOR,
        token: getToken(),
        isCrmlsAdmin: profile.isCrmlsAdmin,
        isCrmlsAorAdmin: profile.isCrmlsAorAdmin,
        isCrmlsOfficeAdmin: profile.isCrmlsOfficeAdmin,
    }
}

export const userAccessSelector = createSelector(
    userProfile,
    (profile) : number => {
        if (!profile.isAuthenticated) {
            return 0;
        } else if (profile.isCrmlsAorAdmin && (profile.officeAOR === profile.memberAOR)) {
            return 4; // AOR admin
        } else if (profile.isCrmlsAdmin) {
            return 5; // CRMLS admin
        }

        switch (profile.member.memberTypeId) {
            case 1: // Agent
            case 5: // Personal Assist.
                return 1; // Agent
            case 2: // Broker
            case 3: // Office Manager
            case 4: // Office Assist.
                if (profile.office && (profile.office.officeCode === profile.office.mainOfficeCode || profile.office.mainOfficeCode === null)) {
                    return 3; // main office / broker
                }
                return 2; // Broker
            default:
                return 0;
        }
    }
)

export type userCore = {
    profile: object,
    token: string,
}

export type userState = {
    loginId: string;
    memberId: string;
    officeId: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    memberType: memberType;
    aorName: string;
    aorFullName?: string;
    aorId: string;
    token: string | null;
    isCrmlsAdmin: boolean;
    isCrmlsAorAdmin: boolean;
    isCrmlsOfficeAdmin: boolean;
}

export type userPayload = {
    memberKeyNumeric: number,
    userid: string,
    userlevel: string,
    brokercode: string,
    userclass: string,
    brokerbranch: string,
    agentcode: string,
    memberFirstName: string,
    memberLastName: string,
    memberAOR: string,
    memberIsAssistantTo: string,
    officeKeyNumeric: number,
    memberMlsSecurityClass: string,
    memberStatus: string,
    originatingSystemID: string,
    officeAOR: string,
    memberEmail: string,
    officeMlsId: string,
    memberStateLicense: string,
    hasMemberPortalAccess: boolean,
    isAuthenticated: boolean,
    isCrmlsAdmin: boolean,
    isCrmlsAorAdmin: boolean,
    isCrmlsOfficeAdmin: boolean,
    member: memberPayload,
    office?: officePayload,
    aor?: aorPayload,
    token: string,
    memberType: memberType,
    requiredPasswordUpdate?: boolean | undefined,
}

export type memberPayload = {
    firstName: string,
    lastName: string,
    middleName?: string,
    title?: string,
    displayName: string,
    contactTypeId: number,
    photoUrl?: string,
    comment?: string,
    order: number,
    officeCode: string,
    loginId: string,
    memberStatusId: number,
    memberTypeId: number,
    designationId?: number,
    createdOn: string,
    createdBy?: string,
    id: string,
    modifiedOn: string,
    modifiedBy?: string,
}

export type officePayload = {
    name: string,
    officeCode: string,
    address1: string,
    phone: string,
    fax: string,
    mainOfficeCode: string,
    officeStatusId:number,
    officeAorId: string,
    createdOn: string,
    id: string,
    modifiedOn: string,
}

export type aorPayload = {
    name: string,
    shortName: string,
    phone: string,
    address1: string,
    stateAssociation: string,
    createdOn: string,
    id: string,
    modifiedOn: string,
    logoUrl?: string
}

export function emptyUserState(): userPayload {
    return {
        memberKeyNumeric: 0,
        userid: '',
        userlevel: '',
        brokercode: '',
        userclass: '',
        brokerbranch: '',
        agentcode: '',
        memberFirstName: '',
        memberLastName: '',
        memberAOR: '',
        memberIsAssistantTo: '',
        officeKeyNumeric: 0,
        memberMlsSecurityClass: '',
        memberStatus: '',
        originatingSystemID: '',
        officeAOR: '',
        memberEmail: '',
        officeMlsId: '',
        memberStateLicense: '',
        hasMemberPortalAccess: false,
        isAuthenticated: false,
        isCrmlsAdmin: false,
        isCrmlsAorAdmin: false,
        isCrmlsOfficeAdmin: false,
        member: {
            firstName: '',
            lastName: '',
            displayName: '',
            contactTypeId: 0,
            order: 0,
            officeCode: '',
            loginId: '',
            memberStatusId: 0,
            memberTypeId: 0,
            createdOn: new Date().toString(),
            id: '',
            modifiedOn: new Date().toString()
        },
        token: '',
        memberType: {
            name: '',
            displayName: '',
            shortName: '',
            description: '',
            value: 0,
        },
    }
}

export type memberType = {
    name: string,
    displayName: string,
    shortName: string,
    description: string,
    value: number,
}

export const userLevels : memberType[] = [
    {
        name: 'Agent',
        displayName: 'Agent',
        shortName: 'A',
        description: 'Agent',
        value: 1,
    },
    {
        name: 'Broker',
        displayName: 'Broker',
        shortName: 'B',
        description: 'Broker',
        value: 2,
    },
    {
        name: 'Office Manager',
        displayName: 'Office Manager',
        shortName: 'OM',
        description: 'Office Manager',
        value: 3,
    },
    {
        name: 'Office Assistant',
        displayName: 'Office Assistant',
        shortName: 'OA',
        description: 'Office Assistant',
        value: 4,
    },
    {
        name: 'Personal Assistant',
        displayName: 'Personal Assistant',
        shortName: 'PA',
        description: 'Personal Assistant',
        value: 5,
    },
    {
        name: 'Appraiser',
        displayName: 'Appraiser',
        shortName: 'AP',
        description: 'Appraiser',
        value: 6,
    },
    {
        name: 'Photographer',
        displayName: 'Photographer',
        shortName: 'PH',
        description: 'Photographer',
        value: 7,
    },
    {
        name: 'Reciprocal',
        displayName: 'Reciprocal',
        shortName: 'RCP',
        description: 'Reciprocal',
        value: 8,
    },
    {
        name: 'Vendor',
        displayName: 'Vendor',
        shortName: 'V',
        description: 'Vendor',
        value: 9,
    },
    {
        name: 'Affiliate',
        displayName: 'Affiliate',
        shortName: 'AF',
        description: 'Affiliate',
        value: 10,
    },
    {
        name: 'Association Staff',
        displayName: 'Association Staff',
        shortName: 'AA',
        description: 'Association Staff',
        value: 11,
    },
    {
        name: 'MLS Staff',
        displayName: 'MLS Staff',
        shortName: 'MLS',
        description: 'MLS Staff',
        value: 12,
    },
    {
        name: 'System Staff',
        displayName: 'System Staff',
        shortName: 'ST',
        description: 'System Staff',
        value: 13,
    },
    {
        name: 'Other',
        displayName: 'Other',
        shortName: 'OTH',
        description: 'Other',
        value: 14,
    },
];

export const mapUserLevel = (userClass: string) : memberType => {
    let member_code : string;

    switch (userClass)
    {
        case "AG":
        case "AN":
        case "HA":
        case "CA":
            member_code = "A";
            break;
        case "DB":
        case "DN":
        case "HB":
        case "CB":
            member_code = "B";
            break;
        case "OM":
        case "ON":
        case "HM":
            member_code = "OM";
            break;
        case "OA":
            member_code = "OA";
            break;
        case "PA":
            member_code = "PA";
            break;
        case "AP":
            member_code = "AP";
            break;
        case "PH":
            member_code = "PH";
            break;
        case "OD":
        case "OG":
            member_code = "RCP";
            break;
        case "TP":
            member_code = "V";
            break;
        case "AF":
            member_code = "AF";
            break;
        case "BANGM":
        case "BANGN":
        case "BANGL":
        case "BANGK":
            member_code = "AA";
            break;
        case "BANGP":
        case "BANGQ":
        case "BANGG":
        case "AS":
            member_code = "MLS";
            break;
        case "TA":
            member_code = "ST";
            break;
        case "NA":
        case "IMS":
        case "IMSM":
        case "CRIB":
        case "MLSTA":
        case "WC":
            member_code = "OTH";
            break;
        default:
            member_code = "OTH";
            break;
    }
    const ut = userLevels.find(el => el.shortName === member_code);

    return ut ?? {
        name: '',
        displayName: '',
        shortName: '',
        description: '',
        value: 0,
    };
}