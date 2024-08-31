import React, {useEffect, useState} from "react";
import Select from "react-select";
import {autoCompleteProps} from "./MemberAutoComplete";
import { OptionTypeBase } from "react-select/src/types"
import {getCribLookupsById} from "../../../adapters";
import {RequiredIndicator} from "../../../features/registeredListing/RegisteredListingForm";

const LocationAutoComplete = ({handleChange, handleBlur, errors, values, touched, setFieldValue, n, className}: autoCompleteProps) => {
    const [filteredOptions, setFilteredOptions] = useState<OptionTypeBase[]>([]);
    const [input, setInput] = useState<OptionTypeBase | null>(null);
    const disabled = filteredOptions.length === 0;
    const input_class = touched[n.id] && errors[n.id] ? "input-registered-invalid" : (n.required ? "input-registered-required" : "input-registered") + (disabled ? " text-gray-50" : "");
    let group_id: number;

    const onChange = (e: any) => {
        setInput(e);
        if (e) {
            setFieldValue(n.id, e.value);
        }
    }

    switch (n.id) {
        case 'city':
            group_id = 8;
            break;
        default:
        case 'countyOrParish':
            group_id = 3;
            break;
    }

    useEffect(() => {
        if (values[n.id].length && filteredOptions.length) {
            let input_value = filteredOptions.find(element => {
                // check the value from formik against the value and label, since azure autocomplete doesn't know the shortcode
                return (element.value === values[n.id] || element.label === values[n.id]);
            });

            if (input_value) {
                setInput(input_value);
                setFieldValue(n.id, input_value.value);
            }
        }
    }, [values, filteredOptions, n.id, setFieldValue]);

    useEffect(() => {
        setFilteredOptions([]);
        getCribLookupsById(group_id)
            .then(function(response) {
                const options = response.data.map((i: {shortValue: string, longValue: string}) => ({
                    value: i.shortValue,
                    label: i.longValue,
                }));
                setFilteredOptions(options);
            })
    }, [group_id]);

    return (
        <div key={`${n.type}${n.id}`}
             className={className ?? "crmls-field-wrap"}>
            <label htmlFor={n.id}>
                {n.label} {n.required && RequiredIndicator}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                    <Select
                        id={n.id}
                        name={n.id}
                        options={filteredOptions}
                        isClearable={true}
                        onBlur={handleBlur}
                        onChange={onChange}
                        value={input}
                        classNamePrefix="custom-input"
                        className={input_class}
                    />
                </div>
            </div>
            {touched[n.id] && errors[n.id] &&
            <div className="text-sm text-red-600">{errors[n.id]}</div>}
        </div>
    );
}

export default LocationAutoComplete;