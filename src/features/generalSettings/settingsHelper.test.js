import {formatDerivedSettings} from './settingsHelper';

const user = {
    memberKeyNumeric: 359457411,
    userid: "PF22816",
    userlevel: "",
    brokercode: "",
    userclass: "HB",
    brokerbranch: "PF5229M",
    agentcode: "PF22816",
    memberFirstName: "Michael",
    memberLastName: "Williamson",
    memberAOR: "PF",
    memberIsAssistantTo: "",
    officeKeyNumeric: 9680412,
    memberMlsSecurityClass: "HB",
    memberStatus: "A",
    originatingSystemID: "CRM",
    officeAOR: "PF",
    memberEmail: "michael.williamson@sothebyshomes.com",
    officeMlsId: "PF5229M",
    memberStateLicense: "00824452",
    hasMemberPortalAccess: true,
    isAuthenticated: true,
    isCrmlsAdmin: false,
    isCrmlsAorAdmin: false,
    isCrmlsOfficeAdmin: false,
    member: {"firstName":"Michael","lastName":"Williamson","contactTypeId":1,"order":0,"officeCode":"PF5229M","loginId":"PF22816","memberStatusId":1,"memberTypeId":2,"createdOn":"2020-10-06T08:20:59.0162944-07:00","id":"17e6af42-4ae0-4c69-8afa-3eab6ce6683c","modifiedOn":"2021-04-14T16:48:25.4753883-07:00"},
    office: {"name":"Sotheby's International Realty","officeCode":"PF5229M","address1":"800 East Colorado Blvd.Ste 150","phone":"626-229-0909","fax":"626-229-0515","mainOfficeCode":"PF5229M","officeStatusId":1,"officeAorId":"bcd7da3d-8874-4dfe-b5db-be32e0a5b7b2","createdOn":"2021-08-16T07:43:55.3862278-07:00","id":"86cad52e-824a-4e3b-b764-8bc73ec749fc","modifiedOn":"2021-08-16T07:43:55.3862278-07:00"},
    aor: {"name":"Pasadena-Foothills REALTORS","shortName":"PF","phone":"805-489-7303","address1":"1070 E Green St. #100, Pasadena, CA 91106","stateAssociation":"CAR","createdOn":"2020-10-06T07:53:10.7410408-07:00","id":"bcd7da3d-8874-4dfe-b5db-be32e0a5b7b2","modifiedOn":"2020-10-06T07:53:10.7410408-07:00"}
};

const groupTypes = [
    {
        "id":1,
        "groupTypes":
            [
                {
                    name: "IDX Contact Field Selection",
                    settingValues: [{"typeId":150,"shortValue":"10","longValue":"Office Fax","sortOrder":-1,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2785,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"}, {"typeId":150,"shortValue":"5","longValue":"Agent Pager Ph","sortOrder":-1,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2782,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"3","longValue":"Agent Fax","sortOrder":-1,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2780,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"13","longValue":"Co-Agent Fax","sortOrder":-1,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2772,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"22","longValue":"Preferred","sortOrder":-1,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":5601,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"15","longValue":"Co-Agent Pager Ph","sortOrder":-1,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2774,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"21","longValue":"Co-Agent Text Message","sortOrder":-1,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":5600,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"20","longValue":"Agent Text Message","sortOrder":-1,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":5599,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"99","longValue":"Allow Listing Agent to Select","sortOrder":10,"createdOn":"2021-07-29T21:55:56.066562+00:00","id":0,"modifiedOn":"2021-07-29T21:55:56.066562+00:00"},{"typeId":150,"shortValue":"9","longValue":"Office Phone","sortOrder":20,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2786,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"1","longValue":"Agent Direct Phone","sortOrder":30,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2778,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"2","longValue":"Agent Cell Phone","sortOrder":40,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2777,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"8","longValue":"Agent Email","sortOrder":50,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2779,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"4","longValue":"Agent Home Phone","sortOrder":60,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2781,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"6","longValue":"Agent Voice Mail","sortOrder":70,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2784,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"7","longValue":"Agent Toll Free","sortOrder":80,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2783,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"19","longValue":"Other","sortOrder":90,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2787,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"11","longValue":"Co-Agent Direct Phone","sortOrder":100,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2770,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"12","longValue":"Co-Agent Cell Phone","sortOrder":110,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2769,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"14","longValue":"Co-Agent Home Phone","sortOrder":120,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2773,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"16","longValue":"Co-Agent Voice Mail","sortOrder":130,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2776,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"17","longValue":"Co-Agent Toll Free","sortOrder":140,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2775,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"18","longValue":"Co-Agent Email","sortOrder":150,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":2771,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"},{"typeId":150,"shortValue":"23","longValue":"Offers Email","sortOrder":160,"createdOn":"2021-06-17T08:20:01.1112943-07:00","id":93035,"modifiedOn":"2021-06-17T08:20:01.1112943-07:00"}],
                    description: "Select contact field to use on listings in all IDX feeds",
                    actionRequired: 1,
                    accessLevel: 3,
                    defaultAllow: 1,
                    settingInputTypeId: 1,
                    settingInputType: {
                        inputStyle: "select",
                        dataType: "string",
                        description: "single select/dropdown input types",
                        createdOn:"2021-06-17T08:04:50.1053991-07:00",
                        id: 1,
                        modifiedOn:"2021-06-17T08:04:50.1053991-07:00"
                    },
                    createdOn: "2021-06-17T08:04:50.1053991-07:00",
                    id: 150,
                    modifiedOn: "2021-08-16T22:58:54.7430391+00:00"
                }
            ]
    },
    {
        "id":2,
        "groupTypes":[]
    },
    {
        "id":3,
        "groupTypes":[]
    }
];

let derivedSettings = [
    {
        settingValue:  {
            typeId: 150,
            shortValue: '12',
            longValue: '',
            sortOrder: 0,
            settingType: {
                name: "IDX Contact Field Selection",
                settingValues: [],
                description: "Select contact field to use on listings in all IDX feeds",
                actionRequired: 1,
                accessLevel: 3,
                defaultAllow: 1,
                settingInputTypeId: 1,
                settingInputType: {
                    inputStyle: "select",
                    dataType: "string",
                    description: "single select/dropdown input types",
                    createdOn:"2021-06-17T08:04:50.1053991-07:00",
                    id: 1,
                    modifiedOn:"2021-06-17T08:04:50.1053991-07:00"
                },
                createdOn: "2021-06-17T08:04:50.1053991-07:00",
                id: 150,
                modifiedOn: "2021-08-16T22:58:54.7430391+00:00"
            },
            accessLevel: 0,
            createdBy: '',
            createdOn: '',
            id: 0,
            modifiedBy: '',
            modifiedOn: '',
        }
    }
];

// if there's no derived settings, the formatted setting should be empty too
test('empty member settings', () => {
    let memberRequest = true;
    let userAccessLevel = 1;
    let derivedSettings = [];
    let result = formatDerivedSettings(memberRequest, userAccessLevel, user, derivedSettings, groupTypes);
    expect(result).toEqual([]);
});

// if there's no derived settings, the formatted setting should be empty too
test('empty office settings', () => {
    let memberRequest = false;
    let userAccessLevel = 3;
    let derivedSettings = [];
    let result = formatDerivedSettings(memberRequest, userAccessLevel, user, derivedSettings, groupTypes);
    expect(result).toEqual([]);
});

// basic test for member settings,
test('member settings', () => {
    let memberRequest = true;
    let userAccessLevel = 1;
    let result = formatDerivedSettings(memberRequest, userAccessLevel, user, derivedSettings, groupTypes);
    let expected = [
        {
            ownerId: '17e6af42-4ae0-4c69-8afa-3eab6ce6683c',
            typeId: 150,
            shortValue: "12",
            originalValue: "",
            isEditable: true,
            id: null,
            ownerType: 1,
            ownerName: user,
        }
    ];
    expect(result).toEqual(expected);
});

// basic test for office settings,
test('office settings', () => {
    let memberRequest = false;
    let userAccessLevel = 3;

    let result = formatDerivedSettings(memberRequest, userAccessLevel, user, derivedSettings, groupTypes);
    let expected = [
        {
            ownerId: '86cad52e-824a-4e3b-b764-8bc73ec749fc',
            typeId: 150,
            shortValue: "12",
            originalValue: "",
            isEditable: true,
            id: null,
            ownerType: 3,
            ownerName: user,
        }
    ];
    expect(result).toEqual(expected);
});

// test an admin user setting another member's setting
test('testing setting another member\'s settings', () => {
    let anotherUser = {"contactId":"821c51d7-5f22-4332-b2b7-8a1bf713acbf","firstName":"Betty","lastName":"Lanza","fullName":"Betty Lanza","emailAddress":"lanzaandassociates@adelphia.net","aorShortName":"AR","applicationShortName":"MTX","mlsShortName":"CRM","memberStatus":"A","memberType":"B","aorName":"Arcadia Association of REALTORS&#174;","applicationName":"Matrix","mlsName":"CRMLS","memberStatusName":"Active","memberTypeName":"Broker","searchIndex":"[\"Betty\",\"Lanza\",\"lanzaandassociates@adelphia.net\"]","loginId":"A30055","officeCode":"3204","mainOfficeCode":"3204","createdOn":"2020-10-06T15:47:33.1383231+00:00","id":10,"modifiedOn":"2020-10-06T15:47:33.1383231+00:00"};
    let memberRequest = true;
    let userAccessLevel = 1;
    let result = formatDerivedSettings(memberRequest, userAccessLevel, anotherUser, derivedSettings, groupTypes);
    let expected = [
        {
            ownerId: '821c51d7-5f22-4332-b2b7-8a1bf713acbf',
            typeId: 150,
            shortValue: "12",
            originalValue: "",
            isEditable: true,
            id: null,
            ownerType: 1,
            ownerName: anotherUser,
        }
    ];
    expect(result).toEqual(expected);
});

// test an admin user setting another office's setting
test('testing setting another office\'s settings', () => {
    let anotherUser = {"name":"OC Homes Realty","officeCode":"PB20302","address1":"9 Orchard, Suite 106","phone":"949-584-5712","fax":"949-709-0506","mainOfficeCode":"PB20302","officeStatusId":1,"officeAorId":"0304a436-5272-47d0-9646-dbe8636f80ae","createdOn":"2021-06-02T15:28:01.5000404-07:00","id":"b78803d5-04c2-4aa4-afa4-0010d8f8c19c","modifiedOn":"2021-06-02T15:28:01.5000404-07:00"};
    let memberRequest = false;
    let userAccessLevel = 3;
    let result = formatDerivedSettings(memberRequest, userAccessLevel, anotherUser, derivedSettings, groupTypes);
    let expected = [
        {
            ownerId: 'b78803d5-04c2-4aa4-afa4-0010d8f8c19c',
            typeId: 150,
            shortValue: "12",
            originalValue: "",
            isEditable: true,
            id: null,
            ownerType: 3,
            ownerName: anotherUser,
        }
    ];
    expect(result).toEqual(expected);
});

// test an admin user setting another office's setting
test('testing setting another office\'s settings where other office isn\'t a main office', () => {
    let anotherUser = {"name":"OC Homes Realty","officeCode":"PB20302","address1":"9 Orchard, Suite 106","phone":"949-584-5712","fax":"949-709-0506","mainOfficeCode":"PB20303","officeStatusId":1,"officeAorId":"0304a436-5272-47d0-9646-dbe8636f80ae","createdOn":"2021-06-02T15:28:01.5000404-07:00","id":"b78803d5-04c2-4aa4-afa4-0010d8f8c19c","modifiedOn":"2021-06-02T15:28:01.5000404-07:00"};
    let memberRequest = false;
    let userAccessLevel = 3;
    let result = formatDerivedSettings(memberRequest, userAccessLevel, anotherUser, derivedSettings, groupTypes);
    let expected = [
        {
            ownerId: 'b78803d5-04c2-4aa4-afa4-0010d8f8c19c',
            typeId: 150,
            shortValue: "12",
            originalValue: "",
            isEditable: true, // it's editable since the group setting is default allow and there's no office setting specified
            id: null,
            ownerType: 2,
            ownerName: anotherUser,
        }
    ];
    expect(result).toEqual(expected);
});

// test an admin user setting another office's setting where the setting isn't default editable
test('testing setting another office\'s settings where other office isn\'t a main office and default allow is false', () => {
    let anotherUser = {"name":"OC Homes Realty","officeCode":"PB20302","address1":"9 Orchard, Suite 106","phone":"949-584-5712","fax":"949-709-0506","mainOfficeCode":"PB20303","officeStatusId":1,"officeAorId":"0304a436-5272-47d0-9646-dbe8636f80ae","createdOn":"2021-06-02T15:28:01.5000404-07:00","id":"b78803d5-04c2-4aa4-afa4-0010d8f8c19c","modifiedOn":"2021-06-02T15:28:01.5000404-07:00"};
    let memberRequest = false;
    let userAccessLevel = 3;

    let derivedSettingsLocked = [
        {
            settingValue:  {
                typeId: 150,
                shortValue: '12',
                longValue: '',
                sortOrder: 0,
                settingType: {
                    name: "IDX Contact Field Selection",
                    settingValues: [],
                    description: "Select contact field to use on listings in all IDX feeds",
                    actionRequired: 1,
                    accessLevel: 3,
                    defaultAllow: 0,
                    settingInputTypeId: 1,
                    settingInputType: {
                        inputStyle: "select",
                        dataType: "string",
                        description: "single select/dropdown input types",
                        createdOn:"2021-06-17T08:04:50.1053991-07:00",
                        id: 1,
                        modifiedOn:"2021-06-17T08:04:50.1053991-07:00"
                    },
                    createdOn: "2021-06-17T08:04:50.1053991-07:00",
                    id: 150,
                    modifiedOn: "2021-08-16T22:58:54.7430391+00:00"
                },
                accessLevel: 0,
                createdBy: '',
                createdOn: '',
                id: 0,
                modifiedBy: '',
                modifiedOn: '',
            }
        }
    ];

    let result = formatDerivedSettings(memberRequest, userAccessLevel, anotherUser, derivedSettingsLocked, groupTypes);
    let expected = [
        {
            ownerId: 'b78803d5-04c2-4aa4-afa4-0010d8f8c19c',
            typeId: 150,
            shortValue: "12",
            originalValue: "",
            isEditable: false, // should be false since the owner is now just a regular broker, not main office
            id: null,
            ownerType: 2,
            ownerName: anotherUser,
        }
    ];
    expect(result).toEqual(expected);
});