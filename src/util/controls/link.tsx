import React from 'react'
import { Link } from 'react-router-dom'

const LinkInput = ({link, value, label, id, className}:{link:string, value:string, label:string, id:string|number, className?:string}) => {
  const inputClassName = 'w-full text-sm mt-2 h-8 !border-1 !border-gray-200 hover:border-gray-300 block w-20 p-3'

  return (
    <div className={className || 'w-1/2 p-2'}>
        <label className="font-medium text-sm" htmlFor={`${id}`}>{label}</label>
        <div className={`${inputClassName} flex items-center`} style={{border:"solid rgba(229, 231, 235,1) 1px"}}>
            <Link 
                to={link} 
                id={`${id}`}
                className={`text-blue-500 hover:text-blue-700`}
            >
                {value}
            </Link>
        </div>
    </div>
  
  )
}

// <a 
//                 onClick={() => window.location.pathname = link} 
//                 id={`${id}`}
//                 className={`text-blue-500 hover:text-blue-700`}
//             >
//                 {value}
//             </a>

export default LinkInput