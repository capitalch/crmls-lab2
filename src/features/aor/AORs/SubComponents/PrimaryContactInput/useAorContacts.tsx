import React, { useEffect, useState } from 'react'
import Criteria from '../../../../../Interfaces/Criteria'
import { AOR, ContactAorsFetchResult, ContactOption } from '../../aorInterface'
import { fetchPrimaryContactData } from '../../../aorSlice'
import { useAppDispatch } from '../../../../../app/hooks'

const useAorContacts = ({currentAor}:{currentAor:AOR}) => {
    const [contacts, setContacts] = useState<ContactOption[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<{isError:boolean, message:string}>({isError:false, message:"Something went worng"})
    const dispatch = useAppDispatch();

    const fetchBasedOnCriteria = async ():Promise<any>  => {
        const associateStaffId = "11"
        const aorCriteria:Criteria = {
            field:"aorId",
            op:0,
            values:[currentAor?.["id"]]
        }
        const membershipCriteria:Criteria = {
            field:"contact.memberTypeID",
            op:0,
            values:[associateStaffId]
        }
        try{
        const response =  await dispatch(fetchPrimaryContactData({ resource:"ContactAors", criteria:[aorCriteria, membershipCriteria]}))
        return response.payload
        }catch(e){
            return []
        }
    }

   

    const fetchAndSetAorContacts = async () =>{
            try{
                const results = await fetchBasedOnCriteria()
                const associateStaff = results
                const contacts:ContactOption[]|[] = associateStaff?.map((contactDetails:any)=> {
                    return ({
                        value:contactDetails.contactId,
                        label:`${contactDetails.contact?.firstName} ${contactDetails.contact?.lastName}`
                    })
                })
                setContacts(contacts)
                setLoading(false)
            }catch(e){
                setError({isError:false, message:"Something went worng"})
                setLoading(false)
                console.log(e)
            }        

    }

    useEffect(()=>{
        if(currentAor.id){
            fetchAndSetAorContacts()
        }
    },[currentAor.id])
    
    return ({
        contacts,
        loading,
        error
    })
}

export default useAorContacts