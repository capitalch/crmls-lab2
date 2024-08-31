import React from 'react'
import ClearIcon from '../../../components/widgets/icons/ClearIcon'

const DeleteButton = ({onClick}:{onClick:() => void}) => {
  return (
    <button 
      type='button' 
      onClick={onClick}
      // className='bg-red-100 text-red-500 px-2 py-1 text-sm rounded border border-gray-300 hover:bg-red-100 focus:outline-none focus:border-red-500 focus:ring focus:ring-red-200'
    >
      <ClearIcon className="ml-6 text-red-400 h-6 w-6 hover:text-red-500" />
    </button>
  )
}

export default DeleteButton
