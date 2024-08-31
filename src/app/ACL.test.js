import {ACLCheck} from "./ACL";

let memberType = {
    name: 'string',
    displayName: 'string',
    shortName: 'string',
    description: 'string',
    value: 8,
}

let memberPay = {
    firstName: 'string',
    lastName: 'string',
    displayName: 'string',
    contactTypeId: 0,
    order: 0,
    officeCode: 'string',
    loginId: 'string',
    memberStatusId: 0,
    memberTypeId: 0,
    createdOn: 'string',
    id: 'string',
    modifiedOn: 'string',
}

let userProfile = {
    memberKeyNumeric: 1,
    userid: '',
    userlevel: 'B', // broker
    brokercode: 'string',
    userclass: 'DB',
    brokerbranch: 'string',
    agentcode: 'string',
    memberFirstName: 'Tim',
    memberLastName: 'Rulez',
    memberAOR: 'string',
    memberIsAssistantTo: 'string',
    officeKeyNumeric: 1234,
    memberMlsSecurityClass: 'string',
    memberStatus: 'Active',
    originatingSystemID: 'CN',
    officeAOR: 'string',
    memberEmail: 'string',
    officeMlsId: 'string',
    memberStateLicense: 'string',
    hasMemberPortalAccess: false,
    isAuthenticated: false,
    isCrmlsAdmin: false,
    isCrmlsAorAdmin: false,
    isCrmlsOfficeAdmin: false,
    member: memberPay,
    token: '',
    memberType: memberType,
}

test('test equal', () => {
    let rule = {
        id: 'A',
        type: 'routing',
        name: 'testComponent',
        key: 'memberStatus',
        value: 'ACTIVE',
        action: 'hide',
        operator: 'equal',
        createdOn: '',
        modifiedOn: '',
    };

    let result = ACLCheck(userProfile, rule);
    expect(result).toEqual(true);
});

test('test not equal', () => {
    let rule = {
        id: 'A',
        type: 'routing',
        name: 'testComponent',
        key: 'memberStatus',
        value: 'ACTIVE',
        action: 'hide',
        operator: 'notEqual',
        createdOn: '',
        modifiedOn: '',
    };

    let result = ACLCheck(userProfile, rule);
    expect(result).toEqual(false);
});

test('test contains', () => {
    let rule = {
        id: 'A',
        type: 'routing',
        name: 'testComponent',
        key: 'memberStatus',
        value: ['ACTIVE','WITHDRAWN'],
        action: 'hide',
        operator: 'contains',
        createdOn: '',
        modifiedOn: '',
    };

    let result = ACLCheck(userProfile, rule);
    expect(result).toEqual(true);
});

test('test not contains', () => {
    let rule = {
        id: 'A',
        type: 'routing',
        name: 'testComponent',
        key: 'memberStatus',
        value: ['GONZO','WITHDRAWN'],
        action: 'hide',
        operator: 'notContains',
        createdOn: '',
        modifiedOn: '',
    };

    let result = ACLCheck(userProfile, rule);
    expect(result).toEqual(true);
});