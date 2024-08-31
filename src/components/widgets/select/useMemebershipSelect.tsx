import React, { useEffect, useState } from 'react'
import { Option } from '../../../Interfaces'
import { MembershipSelectProps } from './MemebersipSelect'
import { fetchAllMembershipData } from '../../../adapters'

const useMemebershipSelect = ({resource, criteria=[], keyField, valueField, id}:MembershipSelectProps) => {
    const [options, setOptions] = useState<Option[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<{isError:boolean, message:string}>({isError:false, message:"Something went worng"})

    const fetchBasedOnCriteria = async ():Promise<any>  => {
        try{
        const response =  await fetchAllMembershipData({ resource, criteria})
        return response
        }catch(e){
            return []
        }
    }


    const fetchAndSetOptions = async () =>{
            try{
                const results = await fetchBasedOnCriteria()
                const options:Option[]|[] = results?.map((details:any)=> {
                    return ({
                        value:details[keyField],
                        label:details[valueField]
                    })
                })
                setOptions(options)
                setLoading(false)
            }catch(e){
                setError({isError:false, message:"Something went worng"})
                setLoading(false)
                console.log(e)
            }        

    }

    useEffect(()=>{
        fetchAndSetOptions()
    },[id])
    
    return ({
        options,
        loading,
        error
    })
}

export default useMemebershipSelect