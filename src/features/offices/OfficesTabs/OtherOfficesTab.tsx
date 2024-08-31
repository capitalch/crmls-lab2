import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { SelectableGrid } from "../../../components/SelectableGrid/SelectableGrid"
import { store } from "../../../app/store"
import { useEffect } from "react"
import { emit } from "../../../util/ibuki"
import { QueryLoader } from "../../../components/QueryLoader/QueryLoader"
import { PatchDataClaimUnClaimArgsType, patchDataClaimUnClaim } from "../../../components/QueryHelper/QueryHelperSlice"
import { FilterOptionsType } from "../../../components/SelectableGrid/filters/SelectableGridFilters"

function OtherOfficesTab({ aorID, name }: OtherOfficesTabType) {
    const currentName = name + 'OtherOffices'
    const RESOURCE = 'offices'
    const link = `${RESOURCE}/edit`
    const criteria = [{
        field: 'aorID',
        op: 6,
        values: [aorID]
    }]
    return (<div>
        <SelectableGrid
            name={currentName}
            columns={getColumns()}
            filters={getFilters()}
            resource="Offices"
            preSelectedIDs={[]}
            UserControl={() => <ClaimControl name={currentName} />}
            criteria={criteria}
            ibukiMessageForQueryAndReset={currentName + 'refresh'}
            link={link} />
    </div>)

    function getColumns() {
        return (
            [
                {
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
                    isIgnoreInSearch: true,
                },
                {
                    field: 'brokerageFirmName',
                    entityField: 'BrokerageFirm.Name',
                    headerText: 'Brokerage Firm',
                    width: 100
                },
            ]
        )
    }

    function getFilters(): FilterOptionsType[] {
        const filters: FilterOptionsType[] = [
            {
                controlType: 'text',
                name: 'officeCode',
                filterFieldName: 'officeCode',
                displayName: 'Office Code'
            },
            {
                controlType: 'text',
                name: 'mainOfficeCode',
                filterFieldName: 'mainOfficeCode',
                displayName: 'Main Office Code',
            },
            {
                controlType: 'text',
                name: 'zip',
                filterFieldName: 'zip',
                displayName: 'Zip'
            },
            {
                controlType: 'select',
                name: 'status',
                resource: 'OfficeStatusLookups',
                filterFieldName: 'officeStatusID', // 'officeStatusLookupID',
                displayName: 'Status'
            },
            {
                controlType: 'editableSelect',
                name: 'brokerageFirm',
                resource: 'BrokerageFirms',
                displayName: 'Brokerage Firm',
                filterFieldName: 'brokerageFirmID'
            },
        ]
        return (filters)
    }
}
export { OtherOfficesTab }

type OtherOfficesTabType = {
    aorID: string,
    name: string
}

function ClaimControl({ name, }: { name: string }) {
    const dispatch = useDispatch()
    const currentName = name + 'ClaimControl'
    const selectedIDs: string[] = store.getState()?.selectableGrid?.[name]?.selectedIDs;
    const claimUnClaimFlag = useSelector((state: any) => state?.queryHelper[currentName]?.claimUnClaimFlag)

    useEffect(() => {
        if (claimUnClaimFlag !== undefined) {
            emit(name + 'refresh')
        }
    }, [claimUnClaimFlag, name])

    return (<div>
        <button disabled={!!!selectedIDs?.length} onClick={handleClaim} className="border-2 px-2 shadow-sm h-7 text-sm font-medium rounded-md bg-red-400 hover:bg-red-600 hover:border-red-700 border-red-600 focus:outline-none focus:ring-1 text-white disabled:opacity-40 disabled:pointer-events-none disabled:cursor-default">Claim</button>
        <QueryLoader name={currentName} />
    </div>)

    function handleClaim() {
        if (!_.isEmpty(selectedIDs)) {
            const args: PatchDataClaimUnClaimArgsType = {
                name: currentName,
                resource: 'Offices',
                data: selectedIDs,
                isClaim: true
            }
            dispatch(patchDataClaimUnClaim(args))
        }
    }
}