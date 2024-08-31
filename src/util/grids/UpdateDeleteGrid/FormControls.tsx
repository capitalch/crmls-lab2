import { FormikProps } from 'formik'
import React from 'react'
import { GRID_ACTION_TYPES } from '../constants/UpdateDeleteGridConstant'
import { GridAddOrUpdateEvent } from './UpdateDeleteGrid'
import _ from 'lodash'
import ResetIcon from '../../../components/widgets/icons/ResetIcon'
import { PlusIcon } from '@heroicons/react/solid'

const FormControls = ({formik, onAddOrUpdate, currentRecord}:FormControlsProps) => {
    
    const editMode:string = currentRecord.mode || GRID_ACTION_TYPES.add

    return (
        <>
            <button 
                type='button' 
                className='flex items-center justify-between text-gray-700 bg-transparent border-2 border-gray-300 hover:bg-gray-100 hover:text-gray-900 py-1 px-3 rounded mr-2'
                onClick={() => formik.resetForm()}
                ><ResetIcon /> <p className='ml-1'>Reset</p></button>
            <button
                disabled={(!formik?.isValid)}
                className={`flex items-center justify-between text-gray-700 
                ${formik?.isValid ? 'bg-transparent' : 'bg-gray-200'}
                 border-2 border-green-300
                 hover:${!formik?.isValid ? 'bg-gray-200' : 'bg-green-100'}
                  hover:text-gray-900 py-1 px-3 rounded`}
                type="button"
                onClick={() => {
                    onAddOrUpdate({type:editMode, record:formik.values})
                    formik.resetForm()
                }}>
                <PlusIcon width={'1.25rem'}/> <p className='ml-2'>{_.startCase(editMode)}</p>
            </button>
        </>
    )
}

export default FormControls

interface FormControlsProps{
    formik:FormikProps<any>  
    onAddOrUpdate: GridAddOrUpdateEvent 
    currentRecord:Partial<{mode:string | undefined}>
}