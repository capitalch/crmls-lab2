import { useHistory } from "react-router"
import { PlusIcon } from "@heroicons/react/solid";
import { formattedProfile, userState } from "../user/selectors";
import { useSelector } from "react-redux";
import { User } from "oidc-client";
import { GenericHeader } from "../../components/GenericHeader/GenericHeader";
import { BasicGridSearch } from "../../components/BasicGrid/BasicGridSearch";
import { BasicGridFilters, FilterOptionsType } from "../../components/BasicGrid/BasicGridFilters";
import { BasicGrid } from "../../components/BasicGrid/BasicGrid";
import { BasicGridQueryPanel } from "../../components/BasicGrid/BasicGridQueryPanel";
import { QueryLoader } from "../../components/QueryLoader/QueryLoader";
import NewButton from "../../util/controls/newButton";

export const dba_resource_name = 'dbas'
const dba_simple_grid_name = 'dba-basic-grid-view'

function DBAs() {
    // const formatedUserProfile: userState = useSelector(formattedProfile)
    // const isNewButtonVisible = formatedUserProfile.isCrmlsAorAdmin || formatedUserProfile.isCrmlsAdmin
    // ControlSet={isNewButtonVisible ? () => <NewButton resource={RESOURCE} /> : () => <></>}

    return (
        <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <div className="w-full">
                <GenericHeader 
                    title="DBAs" 
                    subTitle="CRMLS DBAs" 
                    ControlSet={() => <NewButton resource="dbas"/>} 
                />
            </div>
            <BasicGridQueryPanel 
                name={dba_simple_grid_name} 
                columns={getColumns()} 
                filters={getFilters()} 
                resource={dba_resource_name} 
                className="mt-4"    
            />
            <BasicGrid 
                name={dba_simple_grid_name} 
                columns={getColumns()} 
                resource={dba_resource_name} 
                link={`${dba_resource_name}/edit`}
                className='mt-4 ml-4 mr-4' 
            />
            <QueryLoader name={dba_simple_grid_name} />
        </div>
    )

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

    function getFilters(): FilterOptionsType[] {
        const filters: FilterOptionsType[] = [
            {
                controlType: 'text',
                name: 'zip',
                filterFieldName: 'zip',
                displayName: 'Zip'
            },
            {
                controlType: 'text',
                name: 'city',
                filterFieldName: 'city',
                displayName: 'City'
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
export { DBAs }

// function NewButton({ resource }: { resource: string }) {
//     const history = useHistory()
//     return (<button onClick={handleClick} className="order-0 h-8 w-20 inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3">
//         <PlusIcon className="text-white w-5 pr-1 " />
//         New
//     </button>)

//     function handleClick() {
//         history.push(`/${resource}/new`)
//     }
// }
// export { NewButton }