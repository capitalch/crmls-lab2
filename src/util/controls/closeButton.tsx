import clsx from 'clsx';
import React from 'react'
import { useHistory } from 'react-router';

const CloseButton = ({resource}:{resource:string}) => {
    const isValid = true, isSubmitting = false
    const className = 'h-8 inline-flex items-center px-4 py-1 mr-2 border border-transparent shadow-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1'
    const history = useHistory();
    return (<div className="flex gap-1  items-center ml-auto">
        <button type="button" disabled={(!isValid) || (isSubmitting)}
            onClick={goBack}
            className={`${className} bg-red-400 hover:bg-red-500 focus:ring-green-400 text-white`}>
            Close
        </button>
    </div>)

    function goBack() {
        history.push(`/${resource}`)
    }
}

export default CloseButton