import { useParams } from "react-router-dom"
import { OperationCriterias } from "../../../../../Interfaces/Criteria"
import SimpleSFGrid from "../../../../../util/grids/SimpleSyncGrid/SimpleSFGrid"
import useFetchData from "../../../../../util/hooks/useFetchData"
import { getFirmMemberColumns } from "./BrokerageFirmMembers"
import { TabTitle } from "../../../../../components/widgets/TabTitle"

const BrokerageFirmMembersView = ({ showOnlyMembers }: { showOnlyMembers?: boolean }) => {
    const { id }: any = useParams()

    const { data } = useFetchData({
        resource: "Contacts",
        criteria: [
            {
                field: "contactTypeID",
                op: showOnlyMembers ? OperationCriterias.Equal : OperationCriterias.NotEqual,
                values: ["1"]
            },
            {
                field: "contactBrokerageFirms.brokerFirmId",
                op: OperationCriterias.Equal,
                values: [id]
            }
        ],
        orderField: "firstName",
    })

    return (
        <>
            <div className="mx-4"><TabTitle title={`Associate  ${showOnlyMembers ? 'Members' : 'Contacts'}`}/></div>
            <SimpleSFGrid
                data={data}
                columns={getFirmMemberColumns(false)}
            />
        </>
    )
}

export default BrokerageFirmMembersView