import {userPayload} from "../features/user/selectors";
import {accessControlType} from "../features/accessControls/accessControlsSlice";

/*
 * This function should compare an access control object with a user payload and see if the rule should pass or fail
 */
export const ACLCheck = (userProfile: userPayload, rule: accessControlType): boolean => {
    if (!userProfile.hasOwnProperty(rule.key)) {
        // fail immediately if we don't have the key in the user payload
        console.log(`user profile has no key ${rule.key}`)
        return false;
    } else {
        let profileValue: any = userProfile[rule.key as keyof userPayload];
        if (profileValue === null || profileValue === undefined) {
            console.log(`profileValue has no value: ${profileValue}`)
            // and if the value is null / undefined return false
            return false;
        } else {
            // we have the profileValue, and it's a valid "thing". Now lets check what the rule says it needs to be
            let ruleValue = rule.value;

            // at this point we should have the proper value and all the info we need, now let's do a switch on the operator
            switch (rule.operator) {
                case 'equal':
                    // using locale compare so we account for case differences and loose compare
                    ruleValue = String(ruleValue);
                    profileValue = String(profileValue);
                    return ruleValue.localeCompare(profileValue, 'en-US', { sensitivity: 'base' }) === 0;
                case 'notEqual':
                    ruleValue = String(ruleValue);
                    profileValue = String(profileValue);
                    return ruleValue.localeCompare(profileValue, 'en-US', { sensitivity: 'base' }) !== 0;
                case 'contains':
                    if (Array.isArray(ruleValue)) {
                        // compare case insensitive
                        return (ruleValue.filter((val) => val.toLowerCase().includes(profileValue.toLowerCase())).length > 0);
                    } else {
                        return false;
                    }
                case 'notContains':
                    if (Array.isArray(ruleValue)) {
                        return (ruleValue.filter((val) => val.toLowerCase().includes(profileValue.toLowerCase())).length === 0);
                    } else {
                        return false;
                    }
            }
        }
    }
    console.log("Fell all the way through")
    return false;
}

export const ACLShowHide = (userProfile: userPayload, rule: accessControlType): boolean => {
    let aclCheck = ACLCheck(userProfile, rule);
    if (rule.action === "show") {
        return aclCheck;
    } else if (rule.action === "hide") {
        return !aclCheck;
    }

    // fall through to fail
    return false;
}