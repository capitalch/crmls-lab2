import { useParams } from 'react-router'
import { BasicGridQueryPanel } from '../../../components/BasicGrid/BasicGridQueryPanel'
import { BasicGrid } from '../../../components/BasicGrid/BasicGrid'
import { QueryLoader } from '../../../components/QueryLoader/QueryLoader'
import { useSelector } from 'react-redux'
import { OperationCriterias } from '../../../Interfaces/Criteria'

const aor_contacts_resource_name = 'contacts'

const AorContacts = ({ showOnlyMembers = false }: { showOnlyMembers?: boolean }) => {
    const aor_contacts_grid_name = showOnlyMembers ? 'aor_members _grid' : 'aor_contacts_grid'
    const aorID = useSelector((state: any) => state?.user?.profile?.aor?.id)
    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <BasicGridQueryPanel
                name={aor_contacts_grid_name}
                columns={getColumns(showOnlyMembers)}
                orderBy={[{ field: "firstName", direction: "Asc" }]}
                filters={[]}
                resource={aor_contacts_resource_name}
                criteria={[{
                    field: "aorId",
                    op: 0,
                    values: [aorID]
                },
                {
                    field: "contactTypeID",
                    op: showOnlyMembers ? OperationCriterias.Equal : OperationCriterias.NotEqual,
                    values: ["1"]
                }
                ]}
                className="mt-4"
                />
            <BasicGrid
                name={aor_contacts_grid_name}
                columns={getColumns(showOnlyMembers)}
                resource={aor_contacts_resource_name}
                orderBy={[{ field: "firstName", direction: "Asc" }]}
                link={`${showOnlyMembers ? 'members' : 'contacts'}/edit`}
                criteria={[{
                    field: "aorId",
                    op: 0,
                    values: [aorID]
                }]}
                className='mt-4 ml-4 mr-4'
            />
            <QueryLoader name={aor_contacts_grid_name} />
        </div>
    )
}

export default AorContacts

function getColumns(showOnlyMembers?: boolean) {
    return (
        [
            {
                field: 'firstName',
                headerText: 'First Name',
                width: 100,
            },
            {
                field: 'lastName',
                headerText: 'Last Name',
                width: 100,
            },
            ...(showOnlyMembers ? [{
                field: 'memberTypeName',
                entityField: 'memberType.Name',
                headerText: 'Member Type',
                width: 60,
            },
            {
                field: 'memberStatus',
                entityField: 'memberStatusEntity.Name',
                headerText: 'Status',
                width: 70,
            }] : []),
            {
                field: 'loginId',
                headerText: 'Login Id',
                width: 80,
            },
            {
                field: 'email',
                entityField: 'emails.EmailAddress',
                headerText: 'Email',
                width: 80,
            },
            {
                field: 'officeCode',
                entityField: 'contactOffices.office.officeCode',
                headerText: 'Office Code',
                width: 70
            },
            {
                field: 'mainOfficeCode',
                entityField: 'contactOffices.office.mainOfficeCode',
                headerText: 'Main Office Code',
                width: 70
            },
        ]
    )
}