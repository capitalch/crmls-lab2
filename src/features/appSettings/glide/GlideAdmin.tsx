import SettingOfficeAutoComplete, {officeResponse} from "../../../components/widgets/autoComplete/SettingOfficeAutocomplete";
import React, {useEffect, useState} from "react";
import {isObjectEmpty} from "../../generalSettings/settingsHelper";
import {useSelector} from "react-redux";
import {selectOfficeAppSettings} from "../selectors";
import {fetchAllOfficeAppSettings} from "../appSettingsSlice";
import {useAppDispatch} from "../../../app/hooks";
import BooleanSetting from "../../../components/widgets/settingsObjects/BooleanSetting";
import {appSettingsEnabled} from "../AppSettings";
import { SearchCircleIcon } from "@heroicons/react/solid";

const GlideAdmin = () => {
    const dispatch = useAppDispatch();
    const [office, setOffice] = useState<officeResponse|undefined>();
    const label = 'Select office to configure application settings';
    let apps = useSelector(selectOfficeAppSettings);

    useEffect(() => {
        if (office && Object.keys(office).length) {
            dispatch(fetchAllOfficeAppSettings(office.officeCode));
        }
    }, [dispatch, office]);

    const handleOfficeChange = (id: string, value: officeResponse) => {
        console.log("office change fired")
        if (!isObjectEmpty(value)) {
            setOffice(value);
        } else {
            setOffice(undefined);
        }
    }

    const buildSettings = () => {
        if (office && Object.keys(office).length) {
            let disabled = office.officeCode !== office.mainOfficeCode;
            return apps.map(app => {
                if (app.accessLevel) {
                    let a = appSettingsEnabled.find(ap => ap.app_short_id === app.applicationNameShort);

                    if (a) {
                        return (
                            <BooleanSetting
                                key={app.applicationNameShort}
                                icon={a.icon}
                                application={app}
                                disabled={disabled}
                                officeId={office.id}
                                message={{
                                    disabled: `Sub-office settings have no effect-- only the main office setting (${office.mainOfficeCode}) will apply to this office and members.`,
                                    active: "This setting will apply to all members of your organization",
                                }}
                            />
                            )
                        }
                }
                return '';
            })
        } else {
            return (
                <div className="flex justify-center mt-8">
                    <div className="flex flex-col justify-center items-center">
                        <SearchCircleIcon className="h-8 w-8 text-primary" />
                        <p className="text-md text-primary">Please choose an office.</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <div className="border-b border-default pb-6 sm:flex sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                    <SettingOfficeAutoComplete
                        setFieldValue={handleOfficeChange}
                        field={
                            {
                                type: 'auto',
                                id: 'member',
                                label: label,
                            }
                        }
                        onlyMain={true}
                    />
                </div>
            </div>
            <div className="py-6 lg:grid lg:grid-cols-12 lg:gap-x-5">
                <div className="space-y-6 lg:col-span-12">
                    {buildSettings()}
                </div>
            </div>
        </>
    );
}

export default GlideAdmin;