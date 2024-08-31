import React, { useEffect, useMemo, useState } from 'react'
import Criteria from '../../Interfaces/Criteria'
import { fetchAllMembershipData, fetchMembershipData } from '../../adapters'

const useFetchData = ({resource, criteria = [], orderField, searchCriteria, use_q=true, method}:{
    resource:string, 
    criteria?:Criteria[], 
    orderField?:string, 
    searchCriteria?:Criteria[]
    use_q?:boolean,
    method?:'get' | 'post'
}) => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const memoizedCriteria = useMemo(() => JSON.stringify(criteria), [criteria]);
    const memoizedSearchCriteria = useMemo(() => JSON.stringify(searchCriteria), [searchCriteria]);
    useEffect(()=>{
        fetchData()
    }, [memoizedCriteria, memoizedSearchCriteria, resource])

    const fetchData = async () =>{
        try{
            let inputData:any
            switch (method) {
                case "get":
                    inputData = await fetchMembershipData(resource)
                    break
            
                default:
                    inputData = await fetchAllMembershipData({
                        resource, 
                        criteria, 
                        orderBy:orderField ? [{ field: orderField || "", direction: 'Asc' }] : [],
                        searchCriteria
                    })
                    break
            }
            setData(inputData)
        }catch(e){
            setData([])
            console.log(e)
        }finally{
            setLoading(false)
        }
    }


    return ({
        data,
        loading
    })
}

export default useFetchData