import { useParams } from 'react-router'
import { BasicGridQueryPanel } from '../../../components/BasicGrid/BasicGridQueryPanel'
import { BasicGrid } from '../../../components/BasicGrid/BasicGrid'
import { QueryLoader } from '../../../components/QueryLoader/QueryLoader'
import { useSelector } from 'react-redux'

const aor_dbas_grid_name = 'aor_dbas_grid'
const aor_dbas_resource_name = 'dbas'

const AorDBAs = () => {
    const aorID = useSelector((state: any) => state?.user?.profile?.aor?.id)
    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <BasicGridQueryPanel
                name={aor_dbas_grid_name}
                columns={getColumns()}
                filters={[]}
                resource={aor_dbas_resource_name}
                criteria={[{
                    field: "aorId",
                    op: 0,
                    values: [aorID]
                }]}
                className="mt-4"
            />
            <BasicGrid
                name={aor_dbas_grid_name}
                columns={getColumns()}
                resource={aor_dbas_resource_name}
                link={`dbas/edit`}
                criteria={[{
                    field: "aorId",
                    op: 0,
                    values: [aorID]
                }]}
                className='mt-4 ml-4 mr-4'
            />
            <QueryLoader name={aor_dbas_grid_name} />
        </div>
    )
}

export default AorDBAs

function getColumns() {
    return (
        [
            {
                field: 'name',
                headerText: 'Name',
                width: 100,
            },
            {
                field: 'address1',
                headerText: 'Address',
                width: 100,
            },
            {
                field: 'city',
                headerText: 'City',
                width: 100,
            },
            {
                field: 'zip',
                headerText: 'Zip',
                width: 100,
            },
            {
                field: 'brokerageName',
                headerText: 'Brokerage Firm',
                entityField: 'brokerageFirm.Name',
                width: 100,
            },
        ]
    )
}
