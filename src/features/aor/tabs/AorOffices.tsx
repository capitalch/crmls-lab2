import { useParams } from 'react-router'
import { BasicGridQueryPanel } from '../../../components/BasicGrid/BasicGridQueryPanel'
import { BasicGrid } from '../../../components/BasicGrid/BasicGrid'
import { QueryLoader } from '../../../components/QueryLoader/QueryLoader'
import { useSelector } from 'react-redux'

const aor_offices_grid_name = 'aor_offices_grid'
const aor_offices_resource_name = 'Offices'

const AorOffices = () => {
    const aorID = useSelector((state: any) => state?.user?.profile?.aor?.id)
    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <BasicGridQueryPanel
                name={aor_offices_grid_name}
                columns={getColumns()}
                filters={[]}
                resource={aor_offices_resource_name}
                criteria={[{
                    field: "aorId",
                    op: 0,
                    values: [aorID]
                }]}
                className="mt-4"
            />
            <BasicGrid
                name={aor_offices_grid_name}
                columns={getColumns()}
                resource={aor_offices_resource_name}
                link={`offices/view`}
                criteria={[{
                    field: "aorId",
                    op: 0,
                    values: [aorID]
                }]}
                className='mt-4 ml-4 mr-4'
            />
            <QueryLoader name={aor_offices_grid_name} />
        </div>
    )
}

export default AorOffices

function getColumns() {
    return ([{
        field: 'name',
        headerText: 'Name',
        width: 100,
    },
    {
        field: 'officeCode',
        headerText: 'Office Code',
        width: 80,
    },

    {
        field: 'mainOfficeCode',
        headerText: 'Main Office Code',
        width: 80,
    },
    {
        field: 'address1',
        headerText: 'Address 1',
        width: 150,
    },
    {
        field: 'city',
        headerText: 'City',
        width: 60,
    },
    {
        field: 'zip',
        headerText: 'Zip',
        width: 60,
    },
    {
        field: 'status',
        entityField: 'OfficeStatusLookup.DisplayName',
        headerText: 'Status',
        width: 60,
    },
    {
        field: 'brokerageFirmName',
        entityField: 'BrokerageFirm.Name',
        headerText: 'Brokerage Firm',
        width: 100,
    },
    ])
}
