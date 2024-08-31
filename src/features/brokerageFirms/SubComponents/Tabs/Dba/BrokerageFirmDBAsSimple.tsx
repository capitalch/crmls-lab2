
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { fetchData } from "../../../../../components/QueryHelper/QueryHelperSlice"
import { SimpleGrid } from "../../../../../components/simpleGrid/SimpleGrid"
import { bf_resource_name } from "../../MyBrokerageFirms/MyBrokerageFirms"
import { columns } from "./BrokerageFirmDBAsSelectable"
import { TabTitle } from "../../../../../components/widgets/TabTitle"

const BFDBAsSimpleTab = () => {
    const dispatch = useDispatch()
    const NAME = 'bf-dbas-tab'
    const brokerageFirm: any = useSelector((state: any) => state?.queryHelper[bf_resource_name]?.contents)
    const data: any[] = useSelector((state: any) => state?.queryHelper[NAME]?.contents) || []

    useEffect(() => {
        if (_.isEmpty(brokerageFirm?.dbaIDs)) {
            return
        }
        const gridPayload: any = {
            pageSize: 1000, 
            orderBy: [{ field: 'name', direction: 'Asc' }],
            searchCriteria: [{
                field: 'id',
                op: 0,
                values: brokerageFirm?.dbaIDs || []
            }]
        }
        dispatch(fetchData({
            name: NAME,
            resource: 'dbas',
            queryPayload: gridPayload
        }))

    }, [dispatch])

    return (
        <div>
            <div className="mx-4"><TabTitle title="Associate DBAs" /></div>
            <SimpleGrid columns={columns} data={data} />
        </div>
    )

}
export default BFDBAsSimpleTab

