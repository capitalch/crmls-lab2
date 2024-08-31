import React, { useState } from 'react'
import Select from 'react-select'
// import { SelectOption } from './SearchTeamMemeber';
import { TeamContact } from './TeamMemembersForm';
import { FormikProps } from 'formik';
import useFetchData from '../../../../util/hooks/useFetchData';
import { AstrixComp } from '../../../../components/widgets/AstrixComp';
import { ErrorComp } from '../../../../components/widgets/ErrorComp';
import { SelectOption } from '../../../../util/controls/FormikInputSelect/FormikInputSelect';
import { getSelectStyle } from './SearchTeamMemeber';

const TeamMemeberRolesInput = ({formik, onChange, currentRecord, primaryFirmID}:{formik:FormikProps<TeamContact>, onChange: (asd:any) => void, currentRecord:TeamContact, primaryFirmID?:string}) => {

    const {data:teamMemberRoles, loading} = useFetchData({
        resource:`BrokerTeamRoles/${formik.values.contactID}/eligible/primaryBrokerageFirm/${primaryFirmID}`, 
        use_q:false,
        method:'get'
    })

    const {touched, errors, getFieldProps} = formik
    const disabled = !formik.values.contactID

    return   <div className="form-group">
        <label className="font-medium text-sm mx-2" htmlFor={'roleIDs'}>Member Roles <AstrixComp /></label>
        <Select
            {...getFieldProps('roleIDs')}
            inputId={'roleIDs'}
            options={transformToSelectOptions(teamMemberRoles, currentRecord)}
            isDisabled={disabled}
            styles={getSelectStyle(disabled)}
            className='mx-2 mt-2'
            isMulti
            placeholder="Selete Member Roles"
            onChange={onChange}
            value={getTeamMemberRoleOptions(currentRecord, teamMemberRoles)}
            // onChange={handleChange}
        />
        {touched.roleIDs && errors.roleIDs ? <ErrorComp error={errors.roleIDs} /> : null}

    </div>
}

export default TeamMemeberRolesInput

function transformToSelectOptions(originalData: any[], teamMember:TeamContact): SelectOption[] {
    let options = originalData.map(item => ({
        value: item.id,
        label: `${item.name}`
    }));
    return options
}

function getTeamMemberRoleOptions(teamMember:TeamContact, teamMemberRoles:any[]) {
    let options:SelectOption[] = [];

    if (teamMember.concatenatedRoleNames && teamMember.roleIDs) {
      teamMember.roleIDs.forEach((id:any, index:any) => {
        const role = teamMemberRoles.find(role => role.id === id)
        options.push({ value: id, label: role?.name });
      });
    }
    return options
}
  