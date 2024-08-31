import React, {useEffect, useState} from "react";
import Tabs from "../../components/tabs/Tabs";
import MemberSettings from "./MemberSettings";
import OfficeSettings from "../officeSettings/OfficeSettings";
import {useSelector} from "react-redux";
import {userAccessSelector, userProfile} from "../user/selectors";
import {Prompt} from "react-router";
import NavigationPrompt from "react-router-navigation-prompt";
import {useAppDispatch} from "../../app/hooks";
import {fetchGeneralSettings, selectAllSettings} from "./generalSettingsSlice";
import {fetchOfficeSettings, selectAllOfficeSettings} from "../officeSettings/officeSettingsSlice";
import {fetchAllTypes} from "./settingsTypeSlice";
import {fetchAllInputTypes} from "./settingsInputTypeSlice";
import {fetchAllGroups, selectAllSettingGroups} from "./settingsGroupSlice";
import {AxiosResponse} from "axios";
import {formatDerivedSettings, formattedSettingEntity, getGroupTypes} from "./settingsHelper";
import {SettingTypeEntity} from "../../util/memberPortalTypes";
import ContentContainer from "../../components/content/ContentContainer";
import Loader from "../../components/widgets/Loader";

export type settingProps = {
    userFormattedSettings: formattedSettingEntity[],
    groupTypes: {id: number, groupTypes: SettingTypeEntity[]}[],
    dirty: boolean,
    setDirty: (dirty: boolean) => void,
    mlsId: string,
    setMlsId: (id: string) => void,
    useAs: any,
    setUseAs: (user: any) => void,
    reloadMemberSettings?: () => void,
}

const GeneralSettings = (props: any) => {
    const { path } = props.match;
    let profile = useSelector(userProfile);
    const dispatch = useAppDispatch();
    const [dirty, setDirty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [groupTypes, setGroupTypes] = useState<{id: number, groupTypes: any}[]>([]);
    const [memberMlsId, setMemberMlsId] = useState<string>(profile.userid);
    const [officeMlsId, setOfficeMlsId] = useState<string>(profile.officeMlsId);
    const [useAsMember, setUseAsMember] = useState<any>(profile);
    const [useAsOffice, setUseAsOffice] = useState<any>(profile);
    const [memberFormattedSettings, setMemberFormattedSettings] = useState<formattedSettingEntity[]>([]);
    const [officeFormattedSettings, setOfficeFormattedSettings] = useState<formattedSettingEntity[]>([]);
    let userAccessLevel = useSelector(userAccessSelector);
    let groups = useSelector(selectAllSettingGroups);
    let officeSettings = useSelector(selectAllOfficeSettings);
    let memberSettings = useSelector(selectAllSettings);

    function reloadMemberDerivedSettings() {
        dispatch(fetchGeneralSettings(memberMlsId));
    }

    useEffect(() => {
        if (profile && profile.userid.length && profile.officeMlsId.length) {
            setMemberMlsId(profile.userid);
            setOfficeMlsId(profile.officeMlsId);
            setUseAsMember(profile);
            setUseAsOffice(profile);
        }
    }, [profile]);

    useEffect(() => {
        dispatch(fetchAllTypes());
        dispatch(fetchAllTypes());
        dispatch(fetchAllInputTypes());
        dispatch(fetchAllGroups());
    }, [dispatch]);

    useEffect(() => {
        setOfficeFormattedSettings(formatDerivedSettings(false, userAccessLevel, useAsOffice, officeSettings, groupTypes));
    }, [groupTypes, userAccessLevel, officeSettings, useAsOffice]);

    useEffect(() => {
        setMemberFormattedSettings(formatDerivedSettings(true,1, useAsMember, memberSettings, groupTypes));
    }, [groupTypes, userAccessLevel, memberSettings, useAsMember]);

    useEffect(() => {
        if (memberMlsId) {
            console.log('fetching settings for ' + memberMlsId)
            dispatch(fetchGeneralSettings(memberMlsId));
        }
        if (officeMlsId) {
            dispatch(fetchOfficeSettings(officeMlsId));
        }
    }, [dispatch, memberMlsId, officeMlsId]);

    /*
     * Hopefully this is temporary and we can get the groups to populate the setting types
     */
    useEffect(() => {
        let temp: {id: number, groupTypes: any}[] = [];
        let promises: Promise<AxiosResponse<any>>[] = [];
        if (groups.length) {
            groups.forEach((group) => {
                promises[group.id] = getGroupTypes(group.id);
            })
        }
        Promise.all(promises)
            .then((res) => {
                res.forEach((r, i) => {
                    if (r) {
                        temp.push({
                            id: i,
                            groupTypes: r.data.results,
                        });
                    }
                })
            })
            .then(() => {
                setGroupTypes(temp)
            })
            .then(() => {
                setIsLoading(false);
            })
    }, [groups]);

    let subTitle = '';
    let description = '';

    if (isLoading) {
        return <Loader />
    }

    if (userAccessLevel >= 2) {
        // they're an office or admin, show the tabbed view
        subTitle = 'Settings on this page will determine your member/office experience.';
        description = 'Member settings apply to individuals in your brokerage, including yourself. To choose your office settings, use the "Office Settings" tab.';
        return (
            <ContentContainer title="Member/Office Settings" subTitle={subTitle} description={description}>
                <NavigationPrompt when={dirty}>
                    {({isActive, onConfirm, onCancel}) => (
                        <Prompt message={"Are you sure you want to leave without saving?"} when={dirty}/>
                    )}
                </NavigationPrompt>
                <Tabs section="generalSettings" rootPath={path.replace("/:urlTab?", "")}>
                    <div data-label="Member Settings">
                        <div className="space-y-6 sm:space-y-5 max-w-4xl">
                            <MemberSettings
                                userFormattedSettings={memberFormattedSettings}
                                groupTypes={groupTypes}
                                dirty={dirty}
                                setDirty={setDirty}
                                mlsId={memberMlsId}
                                setMlsId={setMemberMlsId}
                                setUseAs={setUseAsMember}
                                useAs={useAsMember}
                            />
                        </div>
                    </div>
                    <div data-label="Office Settings">
                        <div className="space-y-6 sm:space-y-5 max-w-4xl">
                            <OfficeSettings
                                userFormattedSettings={officeFormattedSettings}
                                groupTypes={groupTypes}
                                dirty={dirty}
                                setDirty={setDirty}
                                mlsId={officeMlsId}
                                setMlsId={setOfficeMlsId}
                                setUseAs={setUseAsOffice}
                                useAs={useAsOffice}
                                reloadMemberSettings={reloadMemberDerivedSettings}
                            />
                        </div>
                    </div>
                </Tabs>
            </ContentContainer>
        );
    } else {
        // they're an agent, so show just member settings
        subTitle = 'Settings on this page will determine your member experience.';
        description = 'If your broker has chosen your office settings, a red "lock" icon will appear next to that setting. You cannot change locked settings.';
        return (
            <ContentContainer title="Member Settings" subTitle={subTitle} description={description}>
                <NavigationPrompt when={dirty}>
                    {({isActive, onConfirm, onCancel}) => (
                        <Prompt message={"Are you sure you want to leave without saving?"} when={dirty}/>
                    )}
                </NavigationPrompt>
                <MemberSettings
                    userFormattedSettings={memberFormattedSettings}
                    groupTypes={groupTypes}
                    dirty={dirty}
                    setDirty={setDirty}
                    mlsId={memberMlsId}
                    setMlsId={setMemberMlsId}
                    useAs={useAsMember}
                    setUseAs={setUseAsMember}
                />
            </ContentContainer>
        )
    }
}

export default GeneralSettings;