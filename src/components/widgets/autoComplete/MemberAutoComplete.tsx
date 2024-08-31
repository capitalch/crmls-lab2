import React, {useMemo, useState} from "react";
import AsyncSelect from "react-select/async";
import { OptionTypeBase } from "react-select/src/types"
import {getMemberByLoginId, memberTypeahead} from "../../../adapters";
import {RequiredIndicator} from "../../../features/registeredListing/RegisteredListingForm";

export const memberLabelFormatter = (i: any) => {
    return {
        label: i.memberLoginId + ' - ' + i.memberFirstName + ' ' + i.memberLastName + ' - ' + i.memberEmail,
        value: i.memberLoginId,
    }
}

export type autoCompleteProps = {
    handleChange: () => {},
    handleBlur: () => {},
    errors: any,
    values: any,
    touched: any,
    setFieldValue: (id: string, value: any) => {},
    n: any,
    className?: string
}

export type cribTA = {
    memberKeyNumeric: number,
    memberLoginId: string,
    memberFirstName: string,
    memberLastName: string,
    memberEmail: string,
    memberAOR: string,
    memberAORkeyNumeric: number,
    memberMlsSecurityClass: string,
    memberStatus: string,
    officeKeyNumeric: number,
    officeAOR: string,
    officeMlsId: string,
    originatingSystemID: string,
    originatingSystemMemberKey: number,
    deletedYN: boolean,
    inactivatedTimestamp: string,
    teamLeadMlsId: string,
    sourceSystemID: string,
    sourceSystemMemberKey: string,
    syndicateTo: string,
    createdOn: string,
    modifiedOn: string,
}

const MemberAutoComplete = ({handleChange, handleBlur, errors, values, touched, setFieldValue, n}: autoCompleteProps) => {
    const [input, setInput] = useState<OptionTypeBase | null>(null);
    const input_class = touched[n.id] && errors[n.id] ? "input-registered-invalid" : (n.required ? "input-registered-required" : "input-registered");

    const onChange = (e: any) => {
        setInput(e);
        if (e) {
            setFieldValue(n.id, e.value);
        } else {
            // e is null / undefined-- that means they hit the clear button?
            setFieldValue(n.id, '');
        }
    }

    useMemo(() => {
        if (values[n.id].length && !input) {
            getMemberByLoginId(values[n.id])
                .then(response => {
                    if (response.data.results.length) {
                        let i = response.data.results[0];
                        setInput(memberLabelFormatter({
                            memberLoginId: i.loginId,
                            memberFirstName: i.firstName,
                            memberLastName: i.lastName,
                            memberEmail: i.emailAddress,
                        }));
                    }
                });
        }
    }, [values, input, n]);

    const loadOptions = (
        inputText: string,
        callback: (options: OptionTypeBase[]) => void
    ): void => {
        memberTypeahead(inputText)
        .then((response) => {
            let data: cribTA[] = response.data.results;
            callback(data.map((result) => {
                return memberLabelFormatter(result);
            }))
        });
    };

    return (
        <div key={`${n.type}${n.id}`}
             className="crmls-field-wrap">
            <label htmlFor={n.id}>
                {n.label} {n.required && RequiredIndicator}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                    <AsyncSelect
                        id={n.id}
                        name={n.id}
                        isClearable={true}
                        onBlur={handleBlur}
                        onChange={onChange}
                        placeholder={"Search by name, email or login ID"}
                        value={input}
                        classNamePrefix="custom-input"
                        className={input_class}
                        loadOptions={loadOptions}
                    />
                </div>
            </div>
            {touched[n.id] && errors[n.id] &&
            <div className="text-sm text-red-600">{errors[n.id]}</div>}
        </div>
    );
}

export default MemberAutoComplete;