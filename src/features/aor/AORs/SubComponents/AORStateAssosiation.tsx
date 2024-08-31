import React, { useEffect, useState } from 'react'
import Criteria from '../../../../Interfaces/Criteria'
import { useAppDispatch } from '../../../../app/hooks';
import { fetchPrimaryContactData } from '../../aorSlice';

const AORStateAssosiationInput = ({setFieldValue, ...props}:any) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
            fetchAndSetStateAssociation()
    }, [props.values.state])

    const fetchAndSetStateAssociation = async () => {
        try{
            if(props.values.state){
                setLoading(true)
                const criteria:Criteria = {
                    field:"value",
                    op:0,
                    values:[props.values.state]
                } 
                const response =  await dispatch(fetchPrimaryContactData({ resource:"StateAssociationLookups", criteria:[criteria]}))
                setFieldValue(props.id, response.payload[0].name)
                // setStateAssociation(response.results[0].name)
            }else{
                setFieldValue(props.id, "")
            }
        }catch(e){
            console.log('Error while fetching stateAssociation for AOR: ', e)
        }finally{
            setLoading(false)
        }
    }
    // if(loading) 
	// 	return <ThemeLoader height={30} width={30} />

    return (
        <input type='text' {...props} disabled className='bg-gray-300' style={{border:"none"}}/>
    )
}

export default AORStateAssosiationInput