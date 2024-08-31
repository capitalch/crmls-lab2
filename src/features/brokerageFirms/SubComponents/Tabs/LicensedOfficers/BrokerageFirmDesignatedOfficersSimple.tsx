
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { fetchData } from "../../../../../components/QueryHelper/QueryHelperSlice"
import { SimpleGrid } from "../../../../../components/simpleGrid/SimpleGrid"
import { bf_resource_name } from "../../MyBrokerageFirms/MyBrokerageFirms"
import { useParams } from "react-router"
import { columns } from "./BrokerageFirmDesignatedOfficers"
import { TabTitle } from "../../../../../components/widgets/TabTitle"

const BFDesignatedOfficersSimpleTab =  () => {
    const dispatch = useDispatch()
    const { id }:any = useParams()
    const NAME = 'bf-designatedOfficers-tab'
    const brokerageFirm: any = useSelector((state: any) => state?.queryHelper[bf_resource_name]?.contents)
    const data: any[] = useSelector((state: any) => state?.queryHelper[NAME]?.contents) || []

    useEffect(() => {
        if (_.isEmpty(brokerageFirm?.dbaIDs)) {
            return
        }
        const gridPayload: any = {
            pageSize: 1000, 
            orderBy: [{ field: 'firstName', direction: 'Asc' }],
        }
        dispatch(fetchData({
            name: NAME,
            resource: `Contacts/officers/available/${id}`,
            queryPayload: gridPayload
        }))

    }, [dispatch])

    return (
        <div>
            <div className="mx-4"><TabTitle title="Associate Officers" /></div>
            <SimpleGrid columns={columns} data={data} />
        </div>
    )

}
export default BFDesignatedOfficersSimpleTab

