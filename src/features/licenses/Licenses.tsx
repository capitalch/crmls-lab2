import { useHistory } from "react-router"
import { PlusIcon } from "@heroicons/react/solid";
import { formattedProfile, userState } from "../user/selectors";
import { useSelector } from "react-redux";
import { User } from "oidc-client";
import { GenericHeader } from "../../components/GenericHeader/GenericHeader";
import { BasicGridSearch } from "../../components/BasicGrid/BasicGridSearch";
import { BasicGridFilters, FilterOptionsType } from "../../components/BasicGrid/BasicGridFilters";
import { BasicGrid, BasicGridColumnType } from "../../components/BasicGrid/BasicGrid";
import { BasicGridQueryPanel } from "../../components/BasicGrid/BasicGridQueryPanel";
import { QueryLoader } from "../../components/QueryLoader/QueryLoader";
import NewButton from "../../util/controls/newButton";
import dayjs from "dayjs";
import LinkTagsSyncFusion from "../../components/BasicGrid/Utils/LinkTagsBasicGrid";
import LicenseName from "./SubComponent/LicenseName";

export const license_resource_name = 'licenses'
const licenses_simple_grid_name = 'licenses-basic-grid-view'

const  Licenses = () => {
    // const formatedUserProfile: userState = useSelector(formattedProfile)
    // const isNewButtonVisible = formatedUserProfile.isCrmlsAorAdmin || formatedUserProfile.isCrmlsAdmin
    // ControlSet={isNewButtonVisible ? () => <NewButton resource={RESOURCE} /> : () => <></>}

    return <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
            <div className="w-full border-b flex px-2 bg-secondary">
                <GenericHeader 
                    title="Licenses" 
                    subTitle="CRMLS Licenses" 
                />
            </div>
            <BasicGridQueryPanel 
                name={licenses_simple_grid_name} 
                columns={getColumns()} 
                filters={getFilters()} 
                resource={license_resource_name} 
                orderBy={[{field: "licenseNumber", direction: "Asc"}]}
                className="mt-4"    
                />
            <BasicGrid 
                name={licenses_simple_grid_name} 
                columns={getColumns()} 
                resource={license_resource_name} 
                orderBy={[{field: "licenseNumber", direction: "Asc"}]}
                link={`${license_resource_name}/edit`}
                className='mt-4 ml-4 mr-4' 
            />
            <QueryLoader name={licenses_simple_grid_name} />
        </div>

}

export default Licenses

export function getColumns(){
  const columns:BasicGridColumnType[] = [
    {
        field: 'licenseNumber',
        headerText: 'License Number',
        width: 80,
    },
    {
        field: "licenseType.name",
        entityField: "licenseType.name",
        headerText: "License Type",
        width: 80,
    },
    {
        field: "licenseStatus.name",
        entityField: "licenseStatus.name",
        headerText: "License Status",
        width: 80,
    },
    {
        field: 'expirationDate',
        headerText: 'Expiration Date',
        customColumnTemplate:(props:any) => {
            const dateValue = dayjs(props.expirationDate).format('MM-DD-YYYY')
            return <LinkTagsSyncFusion 
                    value={dateValue}
                    details={props} 
                    link={`${license_resource_name}/edit`}
                 />
        },
        isIgnoreInSearch:true,
        width: 80,
    },
    {
        field: 'firstName',
        headerText: 'First Name',
        customColumnTemplate:LicenseName,
        width: 80,
    },
    {
        field: 'lastName',
        headerText: 'Last Name',
        customColumnTemplate:LicenseName,
        width: 80,
    },
    {
        field: 'corporationName',
        headerText: 'Corporation Name',
        customColumnTemplate:LicenseName,
        isIgnoreInSearch:true,
        width: 80,
    },
    {
        field: 'officeNameName',
        headerText: 'Office',
        isIgnoreInSearch:true,
        width: 80,
    },
    {
        field: 'brokerageFirmName',
        headerText: 'Brokerage Firm',
        isIgnoreInSearch:true,
        width: 80,
    },
  ]
  return columns
}

function getFilters(): FilterOptionsType[] {
    const filters: FilterOptionsType[] = [
        {
            controlType: 'editableSelect',
            name: 'Authority',
            resource: 'AuthorityTypeLookups',
            displayName: 'Authority',
            filterFieldName: 'authority.id'
        },
        {
            controlType: 'editableSelect',
            name: 'licenseType',
            resource: 'LicenseTypeLookups',
            displayName: 'license Type',
            filterFieldName: 'licenseType.id'
        },
        {
            controlType: 'editableSelect',
            name: 'licenseStatus',
            resource: 'LicenseStatusLookups',
            displayName: 'License Status',
            filterFieldName: 'licenseStatus.id'
        },
        {
            controlType: 'editableSelect',
            name: 'brokerageFirmId',
            resource: 'BrokerageFirms',
            displayName: 'Brokerage Firm',
            filterFieldName: 'brokerageFirmId'
        },
    
    ]
    return (filters)
}