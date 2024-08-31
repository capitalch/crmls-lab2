import React from 'react'
import SimpleSFGrid from '../../../../../util/grids/SimpleSyncGrid/SimpleSFGrid'
import { team_members_columns } from '../../Members/TeamMembers'
import { TeamMemberWithRoles } from '../../../TeamsInterface'
import { ExclamationIcon } from '@heroicons/react/solid'


const PrimaryFirmRemovalModal = ({ memberWhoseRoleToBeRemoved }: { memberWhoseRoleToBeRemoved: TeamMemberWithRoles }) => {
  return (
    <>
      <h1 className='text-xl text-red-600 text flex justify-center items-center'>
        <ExclamationIcon width={'1.5rem'} /> <span className='ml-2'>Team leader will be removed</span>
      </h1>
      <h2 className='m-4 ml-2 text-left'>
        By changing the primary brokerage firm member 
        <strong>{` ${memberWhoseRoleToBeRemoved.firstName} ${memberWhoseRoleToBeRemoved.lastName} `}</strong> 
        would be <strong>removed as team leader</strong>.
      </h2>
    </>
  )
}

export default PrimaryFirmRemovalModal