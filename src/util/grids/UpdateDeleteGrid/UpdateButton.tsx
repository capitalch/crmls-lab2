import React from 'react'
import { EditIcon1 } from '../../../components/widgets/icons/EditIcon1'

const UpdateButton = ({onClick}:{onClick:() => void}) => {
  return (
    <button 
      type='button' 
      onClick={onClick}
      // className='btn btn-light text-success btn-sm ml-2 mr-2'
    >
      <EditIcon1 className="h-6 w-6 text-green-400 hover:text-green-500" />
    </button>
  )
}

export default UpdateButton

