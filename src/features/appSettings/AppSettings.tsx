import React, {useEffect, useState} from "react";
import glideLogo from "../../assets/glide-logo_purple.png";
import flexlogo from "../../assets/flexmls.png";
import boxlogo from "../../assets/boxmls.png";
import liondesklogo from "../../assets/liondesk.png";
import cloudcmalogo from "../../assets/cloudcma.png";
import showingtimelogo from "../../assets/showingtime.png";
import topproducerlogo from "../../assets/topproducer.png";
import {useSelector} from "react-redux";
import {InformationCircleIcon} from "@heroicons/react/solid";
import GlideAdmin from "./glide/GlideAdmin";
import {formattedProfile, officeProfile, userAccessSelector} from "../user/selectors";
import {useAppDispatch} from "../../app/hooks";
import {fetchAllAppSettings, fetchAllOfficeAppSettings} from "./appSettingsSlice";
import {accessControlSchema, selectAppSettings, selectOfficeAppSettings} from "./selectors";
import BooleanSetting from "../../components/widgets/settingsObjects/BooleanSetting";
import {MemberAccessControlEntity} from "../../util/memberPortalTypes";
import ContentContainer from "../../components/content/ContentContainer";

/**
 * ACCESS LEVELS:
 0: locked / un-editable
 1: member: member edit
 2: broker / office: broker office edit
 3: main office / office admin: main office edit
 4: AOR admin: AOR admin edit
 5: CRMLS admin: CRMLS admin edit
 */

// add apps that we want to know about here
export const appSettingsEnabled = [
    {
        app_short_id: 'FLEXMLS',
        member: BooleanSetting,
        admin: GlideAdmin,
        disabled: "This setting is managed by your broker",
        active: "This setting affects all users in your organization.",
        visible: ['A','B'],
        icon: <img
            src={flexlogo}
            alt="flexmls logo"
            className="w-auto h-6 pr-3"
        />
    },
    {
        app_short_id: 'GLIDE',
        member: BooleanSetting,
        admin: GlideAdmin,
        disabled: "This setting is managed by your broker",
        active: <><p className="pt-2">The 'Submit Offer using Glide' button/link takes users directly to Glide’s offer management tool and automatically imports information from the listing.</p>
            <p className="pt-2">The button/link will appear in your MLS system whether you opt in or out. If you choose to opt out, a pop-up message will appear to any of your agents who click it, letting them know the feature is disabled. Agents can still use Glide’s offer management by going to Glide.com.</p>
            </>,
        visible: ['A','B'],
        icon: <img
            src={glideLogo}
            alt="glide logo"
            className="w-auto h-6 pr-3"
        />
    },
    {
        app_short_id: 'LIONDESK',
        member: BooleanSetting,
        admin: GlideAdmin,
        disabled: "This setting is managed by your broker",
        active: "This setting affects all users in your organization.",
        visible: ['A','B'],
        icon: <img
            src={liondesklogo}
            alt="LionDesk logo"
            className="w-auto h-6 pr-3"
        />
    },
    {
        app_short_id: 'TOPPRODUCER',
        member: BooleanSetting,
        admin: GlideAdmin,
        disabled: "This setting is managed by your broker",
        active: "This setting affects all users in your organization.",
        visible: ['A','B'],
        icon: <img
            src={topproducerlogo}
            alt="top producer logo"
            className="w-auto h-6 pr-3"
        />
    },    {
        app_short_id: 'CLOUDCMA',
        member: BooleanSetting,
        admin: GlideAdmin,
        disabled: "This setting is managed by your broker",
        active: "This setting affects all users in your organization.",
        visible: ['A','B'],
        icon: <img
            src={cloudcmalogo}
            alt="cloud cma logo"
            className="w-auto h-6 pr-3"
        />
    },
    {
        app_short_id: 'SHOWINGTIME',
        member: BooleanSetting,
        admin: GlideAdmin,
        disabled: "This setting is managed by your broker",
        active: "This setting affects all users in your organization.",
        visible: ['A','B'],
        icon: <img
            src={showingtimelogo}
            alt="showingtime logo"
            className="w-auto h-6 pr-3"
        />
    },
    {
        app_short_id: 'BOXMLS',
        member: BooleanSetting,
        admin: GlideAdmin,
        disabled: "This setting is managed by your broker",
        active: "This setting affects all users in your organization.",
        visible: ['A','B'],
        icon: <img
            src={boxlogo}
            alt="boxmls logo"
            className="w-auto h-6 pr-3"
        />
    }
];

const AppSettings = () => {
    const dispatch = useAppDispatch();
    let user = useSelector(formattedProfile);
    let office = useSelector(officeProfile);
    let appSettings = useSelector(selectAppSettings);
    let officeSettings = useSelector(selectOfficeAppSettings);
    let userAccessLevel = useSelector(userAccessSelector);

    const [apps, setApps] = useState<MemberAccessControlEntity[]>([]);

    useEffect(() => {
        if (user.loginId.length) {
            dispatch(fetchAllAppSettings(user.loginId));
            dispatch(fetchAllOfficeAppSettings(user.officeId));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (userAccessLevel > 1) {
            setApps(officeSettings);
        } else {
            setApps(appSettings);
        }
    }, [userAccessLevel, appSettings, officeSettings]);

    const buildApps = () => {
        console.log(apps)
        console.log(apps.length)
        if (user.isCrmlsAdmin || user.isCrmlsAorAdmin || user.isCrmlsOfficeAdmin) {
            return (
                <ContentContainer title="Application Settings Admin" subTitle="Select an office to change app settings for.">
                    <GlideAdmin />
                </ContentContainer>
            )
        } else if (user.memberType && apps.length) {
            return (
                <ContentContainer title="Product Settings Admin" subTitle="These settings manage connected applications.">
                    <div className="py-8 lg:grid lg:grid-cols-12 lg:gap-x-5 max-w-4xl">
                        <div className="space-y-6 lg:col-span-12">
                            {
                                apps.map(app => {
                                    if (app.accessLevel) {
                                        let a = appSettingsEnabled.find(ap => ap.app_short_id === app.applicationNameShort);

                                        if (a) {
                                            return <a.member
                                                key={app.applicationNameShort}
                                                icon={a.icon}
                                                application={app}
                                                disabled={userAccessLevel < app.accessLevel}
                                                officeId={office ? office.id : ''}
                                                message={{
                                                    disabled: a.disabled,
                                                    active: a.active,
                                                }}
                                            />
                                        }
                                    }
                                    return '';
                                })
                            }
                        </div>
                    </div>
                </ContentContainer>
            )
        } else {
            return (
                <ContentContainer title="Product Settings Admin" subTitle="You do not have access to this area.">
                    <div className="mt-6 grid grid-cols-4 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                            <div className="rounded-md bg-blue-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 flex-1 md:flex md:justify-between">
                                        <p className="text-sm text-blue-700">You do not have the proper credentials. Please contact your broker.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContentContainer>
            )
        }
    }

    return (
        <>{buildApps()}</>
    );
}

export default AppSettings;