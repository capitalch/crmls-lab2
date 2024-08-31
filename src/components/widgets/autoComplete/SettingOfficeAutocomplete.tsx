import React, {useState} from "react";
import AsyncSelect from "react-select/async";
import { OptionTypeBase } from "react-select/src/types"
import {officeSettingTypeahead} from "../../../adapters";
import {useSelector} from "react-redux";
import {formattedProfile, officeProfile, userAccessSelector} from "../../../features/user/selectors";

const memberLabelFormatter = (i: any) => {
    return {
        label: i.officeCode + ' - ' + i.name,
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
    onlyMain: boolean,
}

export type officeResponse = {
    "name": string,
    "officeCode": string,
    "address1": string,
    "fax": string,
    "mainOfficeCode": string,
    "officeStatusId": number,
    "officeAorId": string,
    "createdOn": string,
    "id": string,
    "modifiedOn": string,
}

const SettingOfficeAutoComplete = ({setFieldValue, field, onlyMain}: settingAutoCompleteProps) => {
    const [input, setInput] = useState<OptionTypeBase | null>(null);
    const userProfile = useSelector(formattedProfile);
    const offProfile = useSelector(officeProfile);
    const userAccessLevel = useSelector(userAccessSelector);
    let entity : 'mainOffice' | 'aor' | 'crmls' = 'mainOffice';
    let entityId = 'none';

    // 'mainOffice' | 'aor' | 'crmls'
    if (userAccessLevel === 5) {
        entity = 'crmls';
    } else if (userAccessLevel === 4) {
        entity = 'aor';
        entityId = userProfile.aorId;
    } else if (userAccessLevel === 3) {
        entity = 'mainOffice';
        entityId = offProfile && offProfile.mainOfficeCode ? offProfile.mainOfficeCode : 'none';
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
        officeSettingTypeahead(inputText, entityId, entity, onlyMain)
            .then((response) => {
                let data: officeResponse[] = response.data.results;
                callback(data.map((result) => {
                    return memberLabelFormatter(result);
                }))
            });
    };

    return (
        <div key={`${field.type}${field.id}`}
             className="col-span-4 sm:col-span-2">
            <label htmlFor={field.id}>
                {field.label}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                    <AsyncSelect
                        id={field.id}
                        name={field.id}
                        isClearable={true}
                        onChange={onChange}
                        placeholder={"Search by name or MLS ID"}
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

export default SettingOfficeAutoComplete;