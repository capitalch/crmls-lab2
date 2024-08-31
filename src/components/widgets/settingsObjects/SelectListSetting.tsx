import React from "react";
import {settingObjectProps} from "../../settings/SettingFactory";
import {LockClosedIcon} from "@heroicons/react/solid";

const SelectListSetting = ({settingGroupType, value, changeHandler, disabled, userLevel}: settingObjectProps) => {
    let values = [...settingGroupType.settingValues];

    // add a "select one" option ONLY if there's no value already selected
    if (!value) {
        values.splice(0, 0, {
            typeId: 0,
            sortOrder: 0,
            shortValue: '',
            longValue: 'Select option',
        });
    }

    return (
        <div className="col-span-4 sm:col-span-2">
            <label htmlFor={settingGroupType.name} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex">
                {settingGroupType.name}
                {disabled && <div title="Setting selected by your broker, association or MLS"><LockClosedIcon className="text-red-600 w-6 pl-3" /></div>}
            </label>
            <select
                id={settingGroupType.name}
                name={settingGroupType.name}
                autoComplete={settingGroupType.name}
                className="input-registered mt-1 disabled:cursor-not-allowed col-span-4 sm:col-span-2"
                value={value ?? 0}
                onChange={(e) => changeHandler(settingGroupType.id, e.target.value)}
                disabled={disabled}
            >
                {values.filter(v => v.sortOrder >= 0)
                    .sort((a, b) => {
                    // sort the values by longValue
                    if (a.sortOrder < b.sortOrder) {
                        return -1;
                    } else if (a.sortOrder > b.sortOrder) {
                        return 1;
                    }
                    return 0;
                }).map(settingValue => {
                    // special handling here for the "Allow member to Select"
                    if (settingValue.shortValue === '99' && userLevel < 3) {
                        return '';
                    } else {
                        return (
                            <option
                                key={settingValue.shortValue}
                                value={settingValue.shortValue}>{settingValue.longValue}
                            </option>
                        )
                    }
                })}
            </select>
            <span className="text-xs text-primary">{settingGroupType.description}</span>
        </div>
    );
}

export default SelectListSetting;