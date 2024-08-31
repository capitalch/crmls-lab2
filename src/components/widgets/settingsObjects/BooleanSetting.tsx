import React, {useEffect, useRef, useState} from "react";
import {Switch} from "@headlessui/react";
import {classNames} from "../../../util/helpers";
import {useAppDispatch} from "../../../app/hooks";
import {updateAppSetting} from "../../../features/appSettings/appSettingsSlice";
import {show} from "../../../features/notification/notificationSlice";
import {MemberAccessControlEntity} from "../../../util/memberPortalTypes";

export type settingProps = {
    icon: JSX.Element | null,
    application: MemberAccessControlEntity,
    disabled: boolean,
    officeId: string,
    message: {
        disabled: any,
        active: any,
    },
}

const BooleanSetting = (props: settingProps) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(Boolean(props.application.accessControl));
    const valuePref = useRef(Boolean(props.application.accessControl));

    useEffect(() => {
        if (value !== valuePref.current) {
            dispatch(updateAppSetting({
                officeId: props.officeId,
                id: props.application.applicationId,
                value: value
            }))
            .then(() => dispatch(show({
                show: true,
                title: 'Updated',
                message: 'Setting updated!',
                status: 'success',
                position: 'popover',
                autoHide: 2500,
                confirm: false,
                notificationId: null
            })));
        }
    }, [props.officeId, props.application.applicationId, dispatch, value]);

    const buildLabel = () => {
        if (props.icon) {
            return (props.icon);
        } else {
            return <span className="">{props.application.applicationName}</span>
        }
    }

    return (
        <>
        <Switch.Group as="div" className="mt-6 grid grid-cols-4 gap-6 py-3">
            <Switch.Label as="span" className="col-span-4 sm:col-span-2" passive>
                <span className="text-sm font-medium text-gray-900">
                    {buildLabel()}
                </span>
            </Switch.Label>
            <Switch
                checked={value}
                onChange={setValue}
                disabled={props.disabled}
                className={classNames(
                    value ? 'bg-crmls-blue' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crmls-blue disabled:bg-gray-200 disabled:cursor-not-allowed'
                )}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={classNames(
                        value ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                >
                    <span
                        className={classNames(
                            value ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                        )}
                        aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                        className={classNames(
                            value ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                        )}
                        aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-crmls-blue" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                </span>
            </Switch>
        </Switch.Group>
    <span className="text-xs text-gray-500 pt-4">{props.disabled ? props.message.disabled : props.message.active}</span>
    </>
    )
}

export default BooleanSetting;