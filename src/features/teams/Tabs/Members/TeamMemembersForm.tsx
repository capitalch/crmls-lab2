import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
// import SearchTeamMemeber, { SelectOption } from './SearchTeamMemeber'
import { FormikProps, useFormik, useFormikContext } from 'formik'
import TeamMemeberRolesInput from './TeamMemeberRolesInput'
import TeamMemberDetails from './TeamMemberDetails'
import { Team, TeamMemberWithRoles } from '../../TeamsInterface'
import { MembershipMessages } from '../../../../util/MembershipMessages'
import { GRID_ACTION_TYPES } from '../../../../util/grids/constants/UpdateDeleteGridConstant'
import { UpdateDeleteFormProps } from '../../../../util/grids/UpdateDeleteGrid/UpdateDeleteGrid'
import FormControls from '../../../../util/grids/UpdateDeleteGrid/FormControls'
import FormikSelect from '../../../../util/controls/FormikInputSelect/FormikInputSelect'
import { OperationCriterias } from '../../../../Interfaces/Criteria'
import SearchTeamMemeber from './SearchTeamMemeber'
import { TEAMS_CONSTANTS } from '../../../../util/constants/membership_constants'


// interface TeamMembersForm extends UpdateDeleteFormProps{
//     currentRecord:TeamContact
//     setCurrentRecord: React.Dispatch<React.SetStateAction<TeamContact>>
//     allRecords:TeamContact[]
//     setAllRecords: React.Dispatch<React.SetStateAction<TeamContact[]>>
// }

export const team_memebers_grid_name = 'teams_members'

const TeamMembersForm = ({currentRecord,setCurrentRecord, id:primaryKey, allRecords, setAllRecords ,onAddOrUpdate}:UpdateDeleteFormProps) =>  {
    
    //using the id prop is optional, it is made available for convinience
    //it is the same key that you pass to UpdateAndDeleteGrid
    //one can use directly the primary identifier field (here "contactID")
    const id = primaryKey 
    const teamFormik:FormikProps<Team> = useFormikContext();
    const editMode:string = currentRecord.mode || GRID_ACTION_TYPES.add
    const teamMemberFormik= useFormik<TeamContact>({
        initialValues: {
            id:'',
            contactID:'',
            roleIDs: [],
            concatenatedRoleNames: "",
            contactLicenseNumber:"",
            contactLicenseType:"",
            firstName:"",
            lastName:""
        },
        validateOnMount:true,
        validateOnChange:true,
        validationSchema: Yup.object({
            id:Yup.string()
            .test(
                'is-duplicate',
                MembershipMessages.duplicateTeamContact,
                (id) => {
                    const updateMode = currentRecord.mode === GRID_ACTION_TYPES.update
                    if(updateMode) return true
                    const isDuplicate = allRecords.some((teamContact:TeamContact) => id && (teamContact.id === id || teamContact.contactID === id))
                    return !isDuplicate
                }
            ),
            contactID:Yup.string()
            .required('Select a valid member')
            .test(
                'is-duplicate',
                MembershipMessages.duplicateTeamContact,
                (contactID) => {
                    const updateMode = currentRecord.mode === GRID_ACTION_TYPES.update
                    if(updateMode) return true
                    const isDuplicate = allRecords.some((teamContact:TeamContact) => contactID && (teamContact.id === contactID || teamContact.contactID === contactID))
                    return !isDuplicate
                }
            ),
            roleIDs:Yup.array().required("A least one role is required").min(1, "A least one role is required")
            .test(
                'test-more-than-one-leader',
                MembershipMessages.noMoreThanOneLeader,
                (roleIDs:any) => {
                    // const isDuplicate = allRecords.some((teamContact:TeamContact) => currentRecord.contactID && (teamContact.id === currentRecord.contactID || teamContact.contactID === currentRecord.contactID))
                    // if(i)
                    const teamMemberWithRoles:TeamMemberWithRoles[] =  teamFormik?.values?.teamMemberWithRoles || []
                    const teamLeader = teamMemberWithRoles && teamMemberWithRoles.find((item:TeamMemberWithRoles) => item.concatenatedRoleNames?.includes(TEAMS_CONSTANTS.teamLeaderRoleName));
                    const roleIDsContainsLeader = roleIDs?.some((role:number) => role === TEAMS_CONSTANTS.teamLeaderRoleId)
                    const isNotTheTeamLeader = currentRecord.contactID !== teamLeader?.contactID
                    return !(teamLeader && isNotTheTeamLeader && roleIDsContainsLeader)
            })
        }),
        onSubmit: (values, actions) => {

        },
        onReset: (values, actions) => {
            setCurrentRecord({})
            teamMemberFormik.setValues(teamMemberFormik.initialValues)
        }
    })
    
    
    const onSelectContactRoles = (rolesOptions:any[]) => {
        const roleDetail = convertOptionsToRoleObject(rolesOptions)
        setCurrentRecord((prevRecord:TeamContact) => {
            const newTeamMemeberDetails = {
                ...prevRecord,
                ...roleDetail
            }
            teamMemberFormik.setValues(newTeamMemeberDetails)
            return newTeamMemeberDetails
        })
    }

    const { setValues }: any = teamMemberFormik

    const clearFormAndGrid = () => {
        teamMemberFormik.resetForm()
        setCurrentRecord({})
        setAllRecords([])
    }

    useEffect(()=>{
        if(!currentRecord[id]){
            teamMemberFormik.resetForm()
            return
        }
        // get rid of previous errors when current record changes or mode change
        teamMemberFormik.setErrors({})
        setValues(currentRecord)
    },[currentRecord[id], editMode])

    useEffect(()=>{
        //* on change of primaryBrokerageFirm all teams data is to be erased
        //but when initially form is loading it acts as a change in primaryBrokerageFirmID (undefined --> <value>)
        //that would erase team members after load
        //to avoid that we are checking if teamMemberWithRoles roles is also empty
        //as teamMemberWithRoles roles is cleared up (PrimaryBrokerageFirmSelector.tsx and TeamDetails.tsx(brokerage firm onChange))
        teamFormik.values.primaryBrokerageFirmID && !teamFormik.values.teamMemberWithRoles?.length && clearFormAndGrid()
    },[teamFormik.values.primaryBrokerageFirmID, teamFormik.values.teamMemberWithRoles]) 

    return <div className="mr-5 mb-5" style={{minWidth:"25rem"}}>
        <div className='flex justify-end items-center mb-1'>
            <FormControls 
                formik={teamMemberFormik}
                onAddOrUpdate={onAddOrUpdate}
                currentRecord={currentRecord}
            />
        </div>

        <SearchTeamMemeber  
            formik={teamMemberFormik}
            onChange={(contact:any) => {
                setCurrentRecord({...contact, contactID:contact.id})
            }}
            selectedMember={currentRecord}
            disabled={currentRecord.mode === GRID_ACTION_TYPES.update}
        />
        <TeamMemberDetails 
            onLicenseTypeChange={(type) => {
                setCurrentRecord((prevRecord:TeamContact) => ({
                    ...prevRecord,
                    contactLicenseType:type
                }))
            }}
            contact={currentRecord}
        />
        <TeamMemeberRolesInput
            formik={teamMemberFormik}
            primaryFirmID={teamFormik.values.primaryBrokerageFirmID}
            onChange={onSelectContactRoles}
            currentRecord={currentRecord}
        />
    </div>

    
}

export default TeamMembersForm

function convertOptionsToRoleObject(options:any[]) {
    const concatenatedRoleNames = options.map(item => item.label).join(', ');
    const roleIDs = options.map(item => item.value);
    return {
        concatenatedRoleNames,
        roleIDs
    };
}

export interface TeamContact {
    contactLicenseNumber: string
    concatenatedRoleNames: string
    roleIDs:number[]
    contactLicenseType:string
    firstName: string
    lastName: string
    contactID: string
    id: string
  }
  



