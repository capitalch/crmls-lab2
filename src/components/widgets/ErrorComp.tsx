import React from 'react'

function ErrorComp({ error }: any) {
    return (<div className='text-red-400 text-sm'>{error}</div>)
}
export { ErrorComp }