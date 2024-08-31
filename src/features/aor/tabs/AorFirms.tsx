import { useParams } from 'react-router'
import { BasicGridQueryPanel } from '../../../components/BasicGrid/BasicGridQueryPanel'
import { BasicGrid } from '../../../components/BasicGrid/BasicGrid'
import { QueryLoader } from '../../../components/QueryLoader/QueryLoader'
import { useSelector } from 'react-redux'
import { BFListColumns } from '../../brokerageFirms/SubComponents/MyBrokerageFirms/MyBrokerageFirms'

const aor_brokeragefirms_grid_name = 'aor_brokeragefirms_grid'
const aor_brokeragefirms_resource_name = 'brokeragefirms'

const AorFirms = () => {
    const aorID = useSelector((state: any) => state?.user?.profile?.aor?.id)
    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <BasicGridQueryPanel
                name={aor_brokeragefirms_grid_name}
                columns={BFListColumns}
                filters={[]}
                resource={aor_brokeragefirms_resource_name}
                criteria={[{
                    field: "aorId",
                    op: 0,
                    values: [aorID]
                }]}
                className="mt-4"
            />
            <BasicGrid
                name={aor_brokeragefirms_grid_name}
                columns={BFListColumns}
                resource={aor_brokeragefirms_resource_name}
                link={`brokerageFirms/view`}
                criteria={[{
                    field: "aorId",
                    op: 0,
                    values: [aorID]
                }]}
                className='mt-4 ml-4 mr-4'
            />
            <QueryLoader name={aor_brokeragefirms_grid_name} />
        </div>
    )
}

export default AorFirms
