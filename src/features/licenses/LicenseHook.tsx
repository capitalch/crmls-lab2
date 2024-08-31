import { useEffect, useState } from 'react'
import { fetchDataOnId } from '../../components/QueryHelper/QueryHelperSlice'
import { license_resource_name } from './Licenses'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ILicense } from './licenseInterface'
import { fetchMembershipResourseWithId } from '../../adapters'

const useLicense = () => {
    const [loading, setLoading] = useState(false)
    const [resource, setResource] = useState<any>("")
    const { id }: any = useParams()

    useEffect(()=>{
        setResourceName(id)
    },[])

    const setResourceName = async (id:string) => {
        const data = await fetchMembershipResourseWithId(license_resource_name, id)
        setResource(data)
        setLoading(false)
    }

    return ({
        resource,
        loading
    })
}

export default useLicense
