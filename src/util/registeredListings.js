import * as yup from "yup";
import dayjs from "dayjs";
import dayjsBusinessDays from 'dayjs-business-days';
import LocationAutoComplete from "../components/widgets/autoComplete/LocationAutoComplete";
import MemberAutoComplete from "../components/widgets/autoComplete/MemberAutoComplete";
import CurrencyFormat from 'react-currency-format';
import {RequiredIndicator} from "../features/registeredListing/RegisteredListingForm";
import {prop_types} from "./helpers";

dayjs.extend(dayjsBusinessDays);

export function getValidation(listing) {
    let regListing = registeredListingObject();
    // let isNew = !listing;
    let schema = {};

    regListing.forEach((n) => {
        if (n.hasOwnProperty('validation')) {
            // if (isNew) {
                // TODO: probably will need to rethink this?
                schema[n.id] = n.validation;
            // }
        } else {
            switch (n.type) {
                case 'number':
                    n.required ?
                        schema[n.id] = yup.number('Enter ' + n.label).required(n.label + ' is required')
                        : schema[n.id] = yup.number('Enter ' + n.label);
                    break;
                case 'email':
                    n.required ?
                        schema[n.id] = yup.string('Enter ' + n.label).email().required(n.label + ' is required')
                        : schema[n.id] = yup.string('Enter ' + n.label).email();
                    break;
                case 'string':
                default:
                    n.required ?
                        schema[n.id] = yup.string('Enter ' + n.label).required(n.label + ' is required')
                        : schema[n.id] = yup.string('Enter ' + n.label);
                    break;
            }
        }
    });
    return yup.object(schema);
}

export function getForm(handleChange, handleBlur, errors, values, touched, setFieldValue, fieldNames) {
    return registeredListingObject().map((n, i) => {
        if (fieldNames.includes(n.id)) {
            // handle custom input first
            if (n.customInput) {
                return <n.customInput
                    key={`${n.type}${n.id}`}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    values={values}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    n={n}
                    parent={n.parent}
                    className="crmls-field-wrap compact"
                />
            }

            switch (n.type) {
                case 'number':
                    return (
                        <div key={`${n.type}${n.id}`}
                             className="crmls-field-wrap compact">
                            <label htmlFor={n.id}>
                                {n.label} {n.required && RequiredIndicator}
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg flex rounded-md shadow-sm">
                                    <input
                                        type="number"
                                        name={n.id}
                                        id={n.id}
                                        className={touched[n.id] && errors[n.id] ? "input-registered-invalid" : (n.required ? "input-registered-required" : "input-registered")}
                                        value={values[n.id]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                            {/* {touched[n.id] && errors[n.id] &&
                            <div className="text-sm text-red-600">{errors[n.id]}</div>} */}
                        </div>
                    );
                case 'currency':
                    return (
                        <div key={`${n.type}${n.id}`}
                             className="crmls-field-wrap compact">
                            <label htmlFor={n.id}>
                                {n.label} {n.required && RequiredIndicator}
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg flex rounded-md shadow-sm">
                                    <CurrencyFormat
                                        name={n.id}
                                        id={n.id}
                                        className={touched[n.id] && errors[n.id] ? "input-registered-invalid" : (n.required ? "input-registered-required" : "input-registered")}
                                        value={values[n.id]}
                                        onBlur={handleBlur}
                                        onValueChange={(values) => {
                                            setFieldValue(n.id, values.value);
                                        }}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                </div>
                            </div>
                            {/* {touched[n.id] && errors[n.id] &&
                            <div className="text-sm text-red-600">{errors[n.id]}</div>} */}
                        </div>
                    );
                case 'date':
                    if (n.id === 'startShowingDate') {
                        // hack because the goalposts moved on us
                        return (
                            <div key={`${n.type}${n.id}`}
                                 className="crmls-field-wrap compact">
                                <label htmlFor={n.id}>
                                    {n.label} {n.required && RequiredIndicator}
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg flex rounded-md shadow-sm">
                                        <input
                                            type="date"
                                            name={n.id}
                                            id={n.id}
                                            className={touched[n.id] && errors[n.id] ? "input-registered-invalid" : (n.required ? "input-registered-required" : "input-registered")}
                                            value={values[n.id]}
                                            onChange={e => {
                                                if (e.target.value.length) {
                                                    setFieldValue('no_marketing', false);
                                                } else {
                                                    setFieldValue('no_marketing', true);
                                                }
                                                handleChange(e);
                                            }}
                                            onBlur={e => {
                                                handleBlur(e);
                                            }}
                                        />
                                    </div>
                                    <div role="group">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                                            <div className="pt-3 mt-4 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg space-y-4">
                                                    <div className="relative flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                id="no_marketing"
                                                                name="no_marketing"
                                                                type="checkbox"
                                                                className="focus:ring-crmls-blue h-4 w-4 text-crmls-blue border-gray-300 rounded"
                                                                checked={values['no_marketing']}
                                                                onChange={e => {
                                                                    if (e.target.checked) {
                                                                        setFieldValue('startShowingDate', '');
                                                                    }
                                                                    handleChange(e);
                                                                }}
                                                                onBlur={e => {
                                                                    handleBlur(e);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="no_marketing"
                                                                   className="font-sm text-gray-700">No Start Marketing
                                                                Date. Seller instructs Broker NOT to market the Property
                                                                to the public. (Box checked on RLA 7D(2) and Agent
                                                                confirms that they have in their possession a Seller
                                                                signed Exclusion Form).</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {touched[n.id] && errors[n.id] &&
                                <div className="text-sm text-red-600">{errors[n.id]}</div>} */}
                            </div>
                        );
                    } else {
                        return (
                            <div key={`${n.type}${n.id}`}
                                 className="crmls-field-wrap compact">
                                <label htmlFor={n.id}>
                                    {n.label} {n.required && RequiredIndicator}
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg flex rounded-md shadow-sm">
                                        <input
                                            type="date"
                                            name={n.id}
                                            id={n.id}
                                            className={touched[n.id] && errors[n.id] ? "input-registered-invalid" : (n.required ? "input-registered-required" : "input-registered")}
                                            value={values[n.id]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                                {/* {touched[n.id] && errors[n.id] &&
                                <div className="text-sm text-red-600">{errors[n.id]}</div>} */}
                            </div>
                        );
                    }
                case 'select':
                    // TODO: HUGE hack here since this was a last minute change and there's no other way to do it
                    let disabled = false;
                    let ignored = ['Manu','Comm','Clse','Busop'];
                    // check if we have an AA listing (CRMLS reg listing system)
                    if (values['listingId'].slice(0, 2) === 'AA' || values['listingId'] === '') {
                        n.values = n.values.filter((val) => !ignored.includes(val));
                    } else {
                        disabled = true;
                    }
                    return (
                        <div key={`${n.type}${n.id}`}
                             className="crmls-field-wrap compact">
                            <label htmlFor={n.id}>
                                {n.label} {n.required && RequiredIndicator}
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg flex rounded-md shadow-sm">
                                    <select
                                        id={n.id}
                                        name={n.id}
                                        className={touched[n.id] && errors[n.id] ? "input-registered-invalid" : (n.required ? "input-registered-required" : "input-registered")}
                                        value={values[n.id]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={disabled}
                                    >
                                        <option>Select One</option>
                                        {n.values.map(v => {
                                            if (!ignored.includes(v.value)) {
                                                return <option key={v.value} value={v.value}>{v.label}</option>
                                            } else {
                                                return '';
                                            }
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* {touched[n.id] && errors[n.id] &&
                            <div className="text-sm text-red-600">{errors[n.id]}</div>} */}
                        </div>
                    );
                case 'string':
                case 'email':
                default:
                    return (
                        <div key={`${n.type}${n.id}`}
                             className="crmls-field-wrap compact">
                            <label htmlFor={n.id}>
                                {n.label} {n.required && RequiredIndicator}
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg flex rounded-md shadow-sm">
                                    <input
                                        type={n.type === 'email' ? "email" : "text"}
                                        name={n.id}
                                        id={n.id}
                                        className={touched[n.id] && errors[n.id] ? "input-registered-invalid" : (n.required ? "input-registered-required" : "input-registered")}
                                        value={values[n.id]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={n.hasOwnProperty('placeholder') ? n.placeholder : ''}
                                    />
                                </div>
                            </div>
                            {/* {touched[n.id] && errors[n.id] &&
                            <div className="text-sm text-red-600">{errors[n.id]}</div>} */}
                        </div>
                    );
            }
        } else {
            return null;
        }
    });
}

export function locationFields() {
    return [
        "streetNumber",
        "streetName",
        "city",
        "countyOrParish",
        "postalCode",
        "streetNumberNumeric",
        "streetDirPrefix",
        "streetSuffix",
        "streetSuffixModifier",
        "unitNumber",
        "streetDirSuffix",
        "stateOrProvince",
        "postalCodePlus4",
        "subdivisionName",
        "subdivisionNameOther",
    ];
}

export function infoFields() {
    return [
        "propertyType",
        "listPrice",
        "expirationDate",
        "listingContractDate",
        "startShowingDate",
    ];
}

export function agentFields() {
    return [
        "listAgentMlsId",
        "coListAgentMlsId",
        "listTeamKey",
        "coListTeamKey",
        "offersEmail",
    ];
}

export function registeredListingObject() {
    return [
        {
            id: "propertyType",
            type: "select",
            required: true,
            label: "Property Type",
            values: prop_types,
            customInput: null,
            parent: null,
        },
        {
            id: "listPrice",
            type: "currency",
            required: true,
            label: "List Price",
            values: null,
            customInput: null,
            parent: null,
            validation: yup
                .number('Enter List Price')
                .required('List Price is required')
                .min(1, ({min}) => "Minimum List Price is $1")
        },
        {
            id: "listingContractDate",
            type: "date",
            required: true,
            label: "Listing Contract Date",
            values: null,
            customInput: null,
            parent: null,
            validation: yup
                .date('Enter Listing Contract Date')
                .required('Listing Contract Date is required')
                .max(dayjs().endOf('day').toDate(), ({max}) => "Contract date must be on or before today's date")
        },
        {
            id: "startShowingDate",
            type: "date",
            // required: true,
            label: "Start Marketing Date",
            values: null,
            customInput: null,
            parent: null,
            // validation: yup.date('Start Marketing Date')
            //     .nullable()
            //     .min(yup.ref('listingContractDate'),
            //         ({ min }) => `Start Marketing Date must be after List Contract Date`
            //     )
            //     .max(yup.ref('expirationDate'),
            //         ({ max }) => `Start Marketing Date must be before Expiration Date`
            //     )
        },
        {
            id: "expirationDate",
            type: "date",
            required: true,
            label: "Expiration Date",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "streetNumber",
            type: "string",
            required: true,
            label: "Street #",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "streetName",
            type: "string",
            required: true,
            label: "Street",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "unitNumber",
            type: "string",
            required: false,
            label: "Unit #",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "city",
            type: "string",
            required: true,
            label: "City",
            values: null,
            customInput: LocationAutoComplete,
            parent: null,
        },
        {
            id: "countyOrParish",
            type: "string",
            required: true,
            label: "County / Parish",
            values: null,
            customInput: LocationAutoComplete,
            parent: null,
        },
        {
            id: "stateOrProvince",
            type: "select",
            required: true,
            label: "State / Province",
            values: [
                {
                    'value': 'CA',
                    'label': 'California'
                },
                {
                    'value': 'LA',
                    'label': 'Louisiana'
                }
            ],
            customInput: null,
            parent: null,
        },
        {
            id: "postalCode",
            type: "string",
            required: true,
            label: "Postal Code",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "listAgentMlsId",
            type: "string",
            required: true,
            label: "List Agent MLS ID",
            values: null,
            customInput: MemberAutoComplete,
            parent: null,
        },
        {
            id: "coListAgentMlsId",
            type: "string",
            required: false,
            label: "CoList Agent MLS ID",
            values: null,
            customInput: MemberAutoComplete,
            parent: null,
        },
    ]
}

export function disabledRegisteredListingObject() {
    return [
        {
            id: "listingId",
            type: "string",
            required: true,
            label: "Reg Listing Id",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "promotedMlsId",
            type: "string",
            required: true,
            label: "MLS ID",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "propertyType",
            type: "select",
            required: true,
            label: "Property Type",
            values: prop_types,
            customInput: null,
            parent: null,
        },
        {
            id: "listPrice",
            type: "currency",
            required: true,
            label: "List Price",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "listingContractDate",
            type: "date",
            required: true,
            label: "Listing Contract Date",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "startShowingDate",
            type: "date",
            // required: true,
            label: "Start Marketing Date",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "expirationDate",
            type: "date",
            required: true,
            label: "Expiration Date",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "cancellationDate",
            type: "date",
            required: true,
            label: "Cancellation Date",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "promotedDate",
            type: "date",
            required: true,
            label: "Sent To MLS Date",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "streetNumber",
            type: "string",
            required: true,
            label: "Street #",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "streetName",
            type: "string",
            required: true,
            label: "Street",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "unitNumber",
            type: "string",
            required: false,
            label: "Unit #",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "city",
            type: "string",
            required: true,
            label: "City",
            values: null,
            customInput: LocationAutoComplete,
            parent: null,
        },
        {
            id: "countyOrParish",
            type: "string",
            required: true,
            label: "County / Parish",
            values: null,
            customInput: LocationAutoComplete,
            parent: null,
        },
        {
            id: "stateOrProvince",
            type: "select",
            required: true,
            label: "State / Province",
            values: [
                {
                    'value': 'CA',
                    'label': 'California'
                },
                {
                    'value': 'LA',
                    'label': 'Louisiana'
                }
            ],
            customInput: null,
            parent: null,
        },
        {
            id: "postalCode",
            type: "string",
            required: true,
            label: "Postal Code",
            values: null,
            customInput: null,
            parent: null,
        },
        {
            id: "listAgentMlsId",
            type: "string",
            required: true,
            label: "List Agent MLS ID",
            values: null,
            customInput: MemberAutoComplete,
            parent: null,
        },
        {
            id: "coListAgentMlsId",
            type: "string",
            required: false,
            label: "CoList Agent MLS ID",
            values: null,
            customInput: MemberAutoComplete,
            parent: null,
        },
    ]
}

export function emptyRegisteredListingObject() {
    return {
        "unparsedAddress": "",
        "listingId": "",
        "propertyType": "",
        "listPrice": 0,
        "expirationDate": "",
        "cancellationDate": "",
        "promotedDate": "",
        "listingContractDate": dayjs().format('YYYY-MM-DD'),
        "startShowingDate": "",
        "no_marketing": false,
        "countyOrParish": "",
        "city": "",
        "streetName": "",
        "streetNumber": "",
        "streetNumberNumeric": 0,
        "streetDirPrefix": "",
        "streetSuffix": "",
        "streetSuffixModifier": "",
        "streetDirSuffix": "",
        "unitNumber": "",
        "stateOrProvince": "",
        "postalCode": "",
        "postalCodePlus4": "",
        "country": "",
        "subdivisionName": "",
        "subdivisionNameOther": "",
        "latitude": 0,
        "longitude": 0,
        "listAgentMlsId": "",
        "coListAgentMlsId": "",
        "listTeamKey": "",
        "coListTeamKey": "",
        "offersEmail": "",
        "photographerMlsId": "",
        "registeredYN": true,
        "createdBy": "",
        "createdOn": "",
        "id": "",
        "modifiedBy": "",
        "modifiedOn": "",
        "standardStatus": "",
    }
}

export function buildFormattedAddress(values) {
    return values.streetNumberNumeric + ' ' + values.streetName + ', ' + values.city + ', ' + values.stateOrProvince + ' ' + values.postalCode;
}

export function parseAzureMapResult(result) {
    let values = {};
    values.streetName = result.address.streetName;
    values.streetNumber = result.address.streetNumber;
    values.streetNumberNumeric = parseInt(result.address.streetNumber);
    values.stateOrProvince = result.address.countrySubdivision;
    values.countyOrParish = result.address.countrySecondarySubdivision;
    values.city = result.address.municipality;
    values.postalCode = result.address.postalCode;
    values.postalCodePlus4 = result.address.extendedPostalCode ? result.address.extendedPostalCode.split("-")[1] : ''; // grab just the +4
    values.country = result.address.countryCode;
    values.latitude = result.position.lat;
    values.longitude = result.position.lon;
    values.unparsedAddress = result.address.freeformAddress;

    return values;
}
