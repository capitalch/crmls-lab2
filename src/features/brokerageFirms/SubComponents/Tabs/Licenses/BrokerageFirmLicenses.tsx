
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { fetchData } from "../../../../../components/QueryHelper/QueryHelperSlice"
import { SimpleGrid } from "../../../../../components/simpleGrid/SimpleGrid"
import { bf_resource_name } from "../../MyBrokerageFirms/MyBrokerageFirms"
import { TabTitle } from "../../../../../components/widgets/TabTitle"

const BFLicensesTab = () => {
    const dispatch = useDispatch()
    const NAME = 'bf-license-tab'
    const brokerageFirm: any = useSelector((state: any) => state?.queryHelper[bf_resource_name]?.contents)
    const data: any[] = useSelector((state: any) => state?.queryHelper[NAME]?.contents) || []

    useEffect(() => {
        if (_.isEmpty(brokerageFirm?.licensesIDs)) {
            return
        }
        const gridPayload: any = {
            pageSize: 1000, 
            orderBy: [{ field: 'firstName', direction: 'Asc' }],
            searchCriteria: [{
                field: 'id',
                op: 0,
                values: brokerageFirm?.licensesIDs || []
            }]
        }
        dispatch(fetchData({
            name: NAME,
            resource: 'licenses',
            queryPayload: gridPayload
        }))

    }, [brokerageFirm, dispatch])

    return (
        <div>
            <div className="mx-4"><TabTitle title="Associate Licenses" /></div>
            <SimpleGrid columns={getLicensesColumns()} data={data} />
        </div>
    )

}
export default BFLicensesTab

export function getLicensesColumns() {
    return (
        [

            {
                field: 'licenseNumber',
                headerText: 'License Number',
                width: 80,
            },
            {
                field: 'licenseType.name',
                headerText: 'License Type',
                width: 80,
            },
            {
                field: 'firstName',
                headerText: 'First Name',
                width: 100,
            },
            {
                field: 'lastName',
                headerText: 'Last Name',
                width: 80,
            },
            {
                field: 'licenseStatus.name',
                headerText: 'Status',
                width: 80,
            },
        ]
    )
}
