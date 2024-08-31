import React, {useCallback, useState, useEffect} from "react";
import {debounce} from "lodash";
import MapAutoCompleteItem from "./MapAutoCompleteItem";

const AzureAutoComplete = ({setAddressSelected, handleChange, handleBlur, errors, values, touched, setFieldValue, className}) => {
    const form_id = "unparsedAddress";
    // const azure_key = 'HEW5cie0fxBupPb0O9jxRse8KgXq5ANFc4FRWXL5aEE';
    const azure_key = '0em0MsBOEk3y74NL6ELRB2qjSQ0c3IlJZObu2n9_93Q';
    const default_lon = '-118.295';
    const default_lat = '34.010166';
    const [activeOption, setActiveOption] = useState(0);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [input, setInput] = useState(values[form_id] ? values[form_id] : '');

    useEffect(() => {
        if (values[form_id] && values[form_id].length) {
            setInput(values[form_id]);
        } else {
            setInput(values.streetNumber + ' ' + values.streetName + ' ' + values.city + ' ' + values.postalCode)
        }
    }, [values]);

    const onChange = (e) => {
        const userInput = e.currentTarget.value;
        debouncedSearchApi(userInput);
        setActiveOption(0);
        setShowOptions(true);
        setInput(userInput);
    };

    const onClick = (e) => {
        setActiveOption(0);
        setShowOptions(false);
        // set address selected next
        let values = filteredOptions[e.currentTarget.id];
        setAddressSelected(values);
        setFieldValue(form_id, e.currentTarget.innerText);
        setFilteredOptions([]);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            // enter key
            setActiveOption(0);
            setShowOptions(false);
            // set address selected next
            let values = filteredOptions[activeOption];
            setAddressSelected(values);
            setFieldValue(form_id, filteredOptions[activeOption].address.freeformAddress);
            setFilteredOptions([]);
        } else if (e.keyCode === 38) {
            // up arrow
            if (activeOption === 0) {
                return;
            }
            setActiveOption(activeOption - 1);
        } else if (e.keyCode === 40) {
            // down arrow
            if (activeOption - 1 === filteredOptions.length) {
                return;
            }
            setActiveOption(activeOption + 1);
        }
    };

    const debouncedSearchApi = useCallback(
        debounce((nextValue) => {
            searchAPI(nextValue)
        }, 1000),
        [], // will be created only once initially
    );

    const searchAPI = (query) => {
        setFilteredOptions([]);
        let url = `https://atlas.microsoft.com/search/address/json?subscription-key=${azure_key}&api-version=1.0&query=${query}&typeahead=true&countrySet=US&lat=${default_lat}&lon=${default_lon}`;
        fetch(url).then(function(response) {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                // we had an error
                setFilteredOptions([]);
            }
        }).then(function(data) {
            const options = data.results
            setFilteredOptions(options);
        }).catch(function(error) {
            console.error(error);
        });
    }

    const buildOptionsList = () => {
        if (filteredOptions.length) {
            return filteredOptions.map((option, index) => {
                let selected = index === activeOption;
                return <MapAutoCompleteItem key={index} option={option} index={index} selected={selected} onClick={onClick} />
            })
        } else {
            return (
                <li
                    id='nomatch'
                    key='nomatch'
                    className='text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9'
                    role="option"
                    aria-selected={false}
                >
                    <div className="flex">
                    <span className="font-normal truncate">
                        No address found
                    </span>
                    </div>
                </li>
            )
        }
    }

    return (
        <>
            <div className={className ?? "crmls-field-wrap"}>
                <label htmlFor="azure-autocomplete" className="block text-sm font-medium font-semibold text-indigo-700 sm:mt-px sm:pt-2">
                    Search for Listing
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                            id={form_id}
                            type="text"
                            className="input-registered"
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            placeholder="Start typing address to locate"
                            onBlur={handleBlur}
                            value={input}
                        />
                    </div>
                    {showOptions &&
                    <ul className="absolute z-50 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        tabIndex="-1" role="listbox" aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3">
                        {buildOptionsList()}
                    </ul>
                    }
                </div>
            </div>
        </>
    );
}

export default AzureAutoComplete;