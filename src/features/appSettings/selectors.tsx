import {RootState} from "../../app/store";

export const selectAppSettings = (state: RootState) => state.appSettings.entities;
export const selectOfficeAppSettings = (state: RootState) => state.appSettings.officeEntities;

export type accessControlSchema = {
    contactId: string,
    memberMlsId: string,
    aorShortName: string,
    applicationId: string,
    applicationName: string,
    applicationNameShort: string,
    officeId: string,
    officeMlsId: string,
    mainOfficeId: string,
    mainOfficeMlsId: string,
    accessControl: boolean,
    accessLevel: number,
}