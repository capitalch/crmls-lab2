import React, {useState} from "react";
import AsyncSelect from "react-select/async";
import { OptionTypeBase } from "react-select/src/types"
import {memberSettingTypeahead} from "../../../adapters";
import {useSelector} from "react-redux";
import {formattedProfile, officeProfile, userAccessSelector} from "../../../features/user/selectors";

const memberLabelFormatter = (i: any) => {
    return {
        label: i.loginId + ' - ' + i.firstName + ' ' + i.lastName + ' - ' + i.emailAddress,
        value: i,
    }
}

export type settingAutoCompleteProps = {
    setFieldValue: any,
    field: {
        type: string,
        id: string,
        label: string,
    },
}

type memberResponse = {
    contactId: string,
    firstName: string,
    lastName: string,
    fullName: string,
    emailAddress: string,
    aorShortName: string,
    applicationShortName: string,
    mlsShortName: string,
    memberStatus: string,
    memberType: string,
    aorName: string,
    applicationName: string,
    mlsName: string,
    memberStatusName: string,
    memberTypeName: string,
    searchIndex: string,
    loginId: string,
    officeCode: string,
    mainOfficeCode: string,
    createdOn: string,
    id: number,
    modifiedOn: string,
}

const SettingMemberAutoComplete = ({setFieldValue, field}: settingAutoCompleteProps) => {
    const [input, setInput] = useState<OptionTypeBase | null>(null);
    const userProfile = useSelector(formattedProfile);
    const offProfile = useSelector(officeProfile);
    const userAccessLevel = useSelector(userAccessSelector);
    // let entity : 'office' | 'mainOffice' | 'aor' | 'crmls' = 'office';
    let entity : 'office' | 'mainOffice' | 'aor' | 'crmls';
    let entityId = 'none';

    // 'office' | 'mainOffice' | 'aor' | 'crmls'
    if (userAccessLevel === 5) {
        entity = 'crmls';
    } else if (userAccessLevel === 4) {
        entity = 'aor';
        entityId = userProfile.aorId;
    } else if (userAccessLevel === 3) {
        entity = 'mainOffice';
        entityId = offProfile && offProfile.mainOfficeCode ? offProfile.mainOfficeCode : 'none';
    } else if (userAccessLevel === 2) {
        entity = 'office';
        entityId = offProfile && offProfile.officeCode ? offProfile.officeCode : 'none';
    }

    const input_class = "input-registered mt-1";

    const onChange = (e: any) => {
        setInput(e);
        if (e) {
            setFieldValue(field.id, e.value);
        } else {
            // e is null / undefined-- that means they hit the clear button?
            setFieldValue(field.id, {});
        }
    }

    const loadOptions = (
        inputText: string,
        callback: (options: OptionTypeBase[]) => void
    ): void => {
        memberSettingTypeahead(inputText, entityId, entity)
            .then((response) => {
                let data: memberResponse[] = response.data.results;
                callback(data.map((result) => {
                    return memberLabelFormatter(result);
                }))
            });
    };

    return (
        <div key={`${field.type}${field.id}`}
             className="col-span-4 sm:col-span-2">
            <label htmlFor={field.id} className="text-primary">
                {field.label}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                    <AsyncSelect
                        id={field.id}
                        name={field.id}
                        isClearable={true}
                        onChange={onChange}
                        placeholder={"Search by name, email or MLS ID"}
                        value={input}
                        classNamePrefix="custom-input"
                        className={input_class}
                        loadOptions={loadOptions}
                    />
                </div>
            </div>
        </div>
    );
}

export default SettingMemberAutoComplete;