import { useDispatch } from "react-redux"
import { SelectableGrid, SelectableGridColumnType } from "../../../components/SelectableGrid/SelectableGrid"
import { FilterOptionsType } from "../../../components/SelectableGrid/filters/SelectableGridFilters"
import { store } from "../../../app/store"
import { emit } from "../../../util/ibuki"
import { QueryLoader } from "../../../components/QueryLoader/QueryLoader"
import { PatchDataClaimUnClaimArgsType, patchDataClaimUnClaim } from "../../../components/QueryHelper/QueryHelperSlice"
import _ from "lodash"

function OtherMembersTab({ aorID, name }: OtherMembersTabType) {
    const currentName = name + 'OtherMembers'

    const link = `members/edit`
    const criteria = [{
        field: 'aorID',
        op: 6,
        values: [aorID]
    }, {
        field: 'contactTypeID',
        op: 0,
        values: ['1']
    }]

    const orderBy: any[] = [{ field: 'firstName', direction: 'Asc' }]

    return (<div>
        <SelectableGrid
            name={currentName}
            columns={getColumns()}
            filters={getFilters()}
            resource="Contacts"
            preSelectedIDs={[]}
            orderBy={orderBy}
            UserControl={() => <ClaimControl name={currentName} />}
            criteria={criteria}
            link={link}
            ibukiMessageForQueryAndReset={currentName + 'refresh'} />
    </div>)

    function getColumns(): SelectableGridColumnType[] {
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
                {
                    field: 'memberTypeName',
                    entityField: 'memberType.Name',
                    headerText: 'Member Type',
                    width: 60,
                    isIgnoreInSearch: true
                },
                {
                    field: 'memberStatus',
                    entityField: 'memberStatusEntity.Name',
                    headerText: 'Status',
                    width: 70,
                    isIgnoreInSearch: true
                },
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
                    width: 70,
                    isIgnoreInSearch: true
                },
                {
                    field: 'mainOfficeCode',
                    entityField: 'contactOffices.office.mainOfficeCode',
                    headerText: 'Main Office Code',
                    width: 70,
                    isIgnoreInSearch: true
                },
            ]
        )
    }

    function getFilters(): FilterOptionsType[] {
        return ([
            {
                controlType: 'text',
                name: 'officeCode',
                filterFieldName: 'officeCode',
                entityFieldName: 'contactOffices.office.officeCode',
                displayName: 'Office Code'
            },
            {
                controlType: 'text',
                name: 'mainOfficeCode',
                filterFieldName: 'mainOfficeCode',
                entityFieldName: 'contactOffices.office.mainOfficeCode',
                displayName: 'Main Office Code',
            },
            {
                controlType: 'select',
                name: 'memberStatus',
                resource: 'MemberStatusLookups',
                filterFieldName: 'memberStatusID',
                displayName: 'Status'
            },
        ])
    }
}
export { OtherMembersTab }

type OtherMembersTabType = {
    aorID: string | undefined
    name: string
}

function ClaimControl({ name, }: { name: string }) {
    const dispatch: any = useDispatch()
    const currentName = name + 'ClaimControl'
    const selectedIDs: string[] = store.getState()?.selectableGrid?.[name]?.selectedIDs;

    return (<div>
        <button disabled={!!!selectedIDs?.length} onClick={handleClaim} className="border-2 px-2 shadow-sm h-7 text-sm font-medium rounded-md bg-red-400 hover:bg-red-600 hover:border-red-700 border-red-600 focus:outline-none focus:ring-1 text-white disabled:opacity-40 disabled:pointer-events-none disabled:cursor-default">Claim</button>
        <QueryLoader name={currentName} />
    </div>)

    async function handleClaim() {
        if (!_.isEmpty(selectedIDs)) {
            const args: PatchDataClaimUnClaimArgsType = {
                name: currentName,
                resource: 'Contacts',
                data: selectedIDs,
                isClaim: true
            }
            await dispatch(patchDataClaimUnClaim(args)).unwrap()
            emit(name + 'refresh')
        }
    }
}