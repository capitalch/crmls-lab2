import { StarIcon } from '@heroicons/react/solid'
import React from 'react'

const LabelWarning = ({text, children}:{text?:string, children?:any}) => {
  return <label className="ml-10 text-red-400 bg-yellow-50 px-2 py-1 rounded-sm flex items-center text-8rem w-1/3">
    <StarIcon className="h-4 w-6 mr-1" /> {text || children}
</label>
}

export default LabelWarning