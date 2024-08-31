import { FormikProps, useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react'
import { Team } from '../../TeamsInterface';
import { teams_primary_bf_fieldname } from './PrimaryBrokerageFirmSelector';
import { compact, uniq } from 'lodash';
import { teams_bf_fieldName } from './TeamBrokerageFirms';
import { team_members_fieldname } from '../Members/TeamMembers';

const usePrimaryBrokerageFirmChange = (reloadGrid:() => void, updateGrid:(bf_ids:string[])=>void) => {
    const teamFormik:FormikProps<Team> = useFormikContext();
    const {primaryBrokerageFirmID, brokerageFirmIDs} = teamFormik.values
    // this is for the single use of filtering out the previous primaryBrokerageFirmID
    // when primaryBrokeageFirmID is set to null
    const previousPrimaryBrokerageFirmID = useRef(primaryBrokerageFirmID)

    //on primary brokerage firm change add it to total brokerage firm list (select it in the brokerage firm tab)
    useEffect(()=>{
        if(primaryBrokerageFirmID){
            //on primary brokerage firm change add it to total brokerage firm list (select it in the brokerage firm tab)
            const concatinatedFirms = uniq(compact([...(brokerageFirmIDs ?? []), primaryBrokerageFirmID]))
            teamFormik.setFieldValue(teams_bf_fieldName, concatinatedFirms)
            updateGrid(concatinatedFirms)
            reloadGrid()
            clearTeamMembers_OnPrimaryBrokerageFirmIDChange()
            previousPrimaryBrokerageFirmID.current = primaryBrokerageFirmID
        }else{
            // *IF primary brokerage firm id deleted
            // unselect the primary brokerage firm from brokerage firm tabs
            // const firmsWithoutThePreviousPrimaryFirm = brokerageFirmIDs?.filter(firmId => firmId !== previousPrimaryBrokerageFirmID.current)
            // teamFormik.setFieldValue(teams_bf_fieldName, firmsWithoutThePreviousPrimaryFirm)
            // firmsWithoutThePreviousPrimaryFirm && updateGrid(firmsWithoutThePreviousPrimaryFirm)
        }
        // //clearing team member on primaryBrokerageFirmID change
        // teamFormik.setFieldValue(team_members_fieldname, [])
        setPreviousPrimaryBrokerageFirmID(primaryBrokerageFirmID)
    },[primaryBrokerageFirmID])

    useEffect(() =>{
        if(primaryBrokerageFirmID){
            // on brokerageFirmsIDs update
            // *IF brokerageFirmIDs do not contain the exsting primary brokerageFirm id
            // clear the primary brokerage firm id
            const containsPrimaryBFId = brokerageFirmIDs?.includes(primaryBrokerageFirmID)
            if(!containsPrimaryBFId){
                teamFormik.setFieldValue(teams_primary_bf_fieldname, "")
                // setPreviousPrimaryBrokerageFirmID("")
            }
        }
    },[brokerageFirmIDs])

    const setPreviousPrimaryBrokerageFirmID = (primaryBrokerageFirmID:string | undefined) => {
        if(primaryBrokerageFirmID){
            previousPrimaryBrokerageFirmID.current = primaryBrokerageFirmID
        }
    }

    const clearTeamMembers_OnPrimaryBrokerageFirmIDChange = () => {
        // if( primaryBrokerageFirmID !== previousPrimaryBrokerageFirmID.current){
            //clearing team member on primaryBrokerageFirmID change
            // teamFormik.setFieldValue(team_members_fieldname, [])
        // }
    }

}

export default usePrimaryBrokerageFirmChange