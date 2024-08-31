import React, {useMemo, useState} from "react";
import {disabledRegisteredListingObject, registeredListingObject} from "../../../util/registeredListings";
import {propTypeLookupCode} from "../../../util/helpers";
import dayjs from "dayjs";
import {getMemberByLoginId} from "../../../adapters";
import {memberLabelFormatter} from "../../../components/widgets/autoComplete/MemberAutoComplete";
import {LockClosedIcon} from "@heroicons/react/solid";

type confirmationProps = {
    isValid: boolean,
    values: any,
    isEditable: boolean,
}

const Confirmation = ({isValid, values, isEditable = true}: confirmationProps) => {
    let [listAgent, setListAgent] = useState(values['listAgentMlsId']);
    let [coListAgent, setCoListAgent] = useState(values['coListAgentMlsId']);
    let interesting_fields = [
        'unparsedAddress',
        'listPrice',
        'listingContractDate',
        'expirationDate',
        'startShowingDate',
        'listAgentMlsId',
        'coListAgentMlsId',
        'propertyType',
        'promotedDate',
        'cancellationDate',
        'promotedMlsId',
    ];
    let fields = isEditable ? registeredListingObject() : disabledRegisteredListingObject();

    let lockedReason = 'Other';
    if (values.hasOwnProperty('registeredStatus') && values.registeredStatus.length) {
        lockedReason = values.registeredStatus;
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    const memberLookup = (loginId: string, type: 'agent' | 'coagent') => {
        getMemberByLoginId(loginId)
            .then(response => {
                if (response.data.results.length) {
                    let i = response.data.results[0];
                    let formatted = memberLabelFormatter({
                        memberLoginId: i.loginId,
                        memberFirstName: i.firstName,
                        memberLastName: i.lastName,
                        memberEmail: i.emailAddress,
                    });
                    if (type === 'agent') {
                        setListAgent(formatted.label);
                    } else {
                        setCoListAgent(formatted.label);
                    }
                }
            });
    }

    useMemo(() => {
        if (values['listAgentMlsId'].length) {
            memberLookup(values['listAgentMlsId'], 'agent');
        }
        if (values['coListAgentMlsId'].length) {
            memberLookup(values['coListAgentMlsId'], 'coagent');
        }
    }, [values]);

    const buildValues = () => {
        let content = [];
        let address = values['streetNumber'] + ' ' + values['streetName'];
        if (values.unitNumber?.length) {
            address += ', Unit ' + values['unitNumber'];
        }
        address += ' ' + values['city'] + ', ' + values['stateOrProvince'];
        address += ' ' + values['postalCode'];

        content.push(
            <div key="unparsedAddress" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-semibold md:font-medium">
                    Address
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    {address}
                </dd>
            </div>
        );

        for (const v in values) {
            let field = fields.find(el => el.id === v);
            if (values.hasOwnProperty(v) && field && interesting_fields.includes(field.id)) {
                let value = '';

                switch (field.id) {
                    case 'listPrice':
                        value = formatter.format(values[v]);
                        break;
                    case 'propertyType':
                        value = propTypeLookupCode(values[v]);
                        break;
                    case 'startShowingDate':
                        if (!values[v]) {
                            value = 'DO NOT MARKET';
                        } else {
                            value = dayjs(values[v]).format('MMM DD, YYYY');
                        }
                        break;
                    case 'cancellationDate':
                    case 'promotedDate':
                    case 'listingContractDate':
                    case 'expirationDate':
                        value = dayjs(values[v]).format('MMM DD, YYYY');
                        break;
                    case 'listAgentMlsId':
                        value = listAgent;
                        break;
                    case 'coListAgentMlsId':
                        value = coListAgent;
                        break;
                    default:
                        value = values[v].toString();
                }

                if (value.length) {
                    content.push(
                        <div key={v} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-semibold md:font-medium">
                                {field.label}
                            </dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                {value}
                            </dd>
                        </div>
                    );
                }
            }
        }

        return content;
    }

    if (isValid) {
        return (
            <>
                <div>
                    {isEditable && <p className="mt-1 max-w-2xl text-sm text-primary">
                        Confirm all data is correct before submitting.
                    </p>}

                    {!isEditable &&
                    <>
                        <div className="relative text-primary">
                            <dt>
                                <div className="absolute bg-red-500 rounded-md p-3">
                                    <LockClosedIcon className="text-white h-6 w-6" />
                                </div>
                                <p className="ml-16 text-sm font-medium truncate"><span className="text-header font-semibold">Registered Listing ID:</span> {values.listingId}</p>
                            </dt>
                            <dd className="ml-16 flex items-baseline">
                                <p className="text-2xl font-semibold text-red-600">
                                    {lockedReason}
                                </p>
                            </dd>
                            <div className="py-2">
                                <p className="mt-1 max-w-2xl"><span className="font-semibold text-header">Created On:</span> <span>{dayjs(values.createdOn).format('LLL')}</span></p>
                                <p className="mt-1 max-w-2xl"><span className="font-semibold text-header">Created By:</span> <span>{values.createdBy}</span></p>
                            </div>
                            <div className="py-2">
                                <p className="mt-1 max-w-2xl"><span className="font-semibold text-header">Last Modified:</span> <span>{dayjs(values.modifiedOn).format('LLL')}</span></p>
                                <p className="mt-1 max-w-2xl"><span className="font-semibold text-header">Modified By:</span> <span>{values.modifiedBy}</span></p>
                            </div>
                        </div>
                    </>
                    }
                </div>
                <div className="mt-5">
                    <dl className="sm:divide-y sm:divide-default text-primary">
                        {buildValues()}
                    </dl>
                </div>
            </>
        );
    } else {
        return (
            <>
                <p className="mt-1 max-w-2xl text-sm text-primary">
                    Please fix validation issues with the input form.
                </p>
            </>
        );
    }
}

export default Confirmation;