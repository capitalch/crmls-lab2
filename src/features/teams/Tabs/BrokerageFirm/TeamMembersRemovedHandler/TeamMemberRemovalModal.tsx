import React from 'react'
import SimpleSFGrid from '../../../../../util/grids/SimpleSyncGrid/SimpleSFGrid'
import { team_members_columns } from '../../Members/TeamMembers'
import { TeamMemberWithRoles } from '../../../TeamsInterface'
import { ExclamationIcon } from '@heroicons/react/solid'


const TeamMemberRemovalModal = ({ membersToBeRemoved }: { membersToBeRemoved: TeamMemberWithRoles[] }) => {
  return (
    <>
      <h1 className='text-xl text-red-600 text flex justify-center items-center'>
        <ExclamationIcon width={'1.5rem'} /> <span className='ml-2'>Team members would be removed</span>
      </h1>
      <h2 className='m-4 ml-2 text-left'>
        By unselecting the Firms for this Team, Following team members will also be removed from the Team:
      </h2>
      <SimpleSFGrid
        data={membersToBeRemoved}
        columns={team_members_columns}
      />
    </>
  )
}

export default TeamMemberRemovalModal