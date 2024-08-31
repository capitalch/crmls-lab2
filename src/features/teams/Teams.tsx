
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
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons/src/check-box/checkbox.component";

export const teams_resource_name = 'brokerTeams'
const teams_simple_grid_name = 'teams-basic-grid-view'

const Teams = () => {
  // const formatedUserProfile: userState = useSelector(formattedProfile)
  // const isNewButtonVisible = formatedUserProfile.isCrmlsAorAdmin || formatedUserProfile.isCrmlsAdmin
  // ControlSet={isNewButtonVisible ? () => <NewButton resource={RESOURCE} /> : () => <></>}

  return <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
    <div className="w-full border-b flex px-2 bg-secondary">
      <GenericHeader
        title="Teams"
        subTitle="CRMLS Teams"
      />
      <NewButton resource={teams_resource_name} />
    </div>
    <BasicGridQueryPanel
      name={teams_simple_grid_name}
      columns={getColumns()}
      filters={getFilters()}
      resource={teams_resource_name}
      className="mt-4"
    />
    <BasicGrid
      name={teams_simple_grid_name}
      columns={getColumns()}
      resource={teams_resource_name}
      link={`${teams_resource_name}/edit`}
      className='mt-4 ml-4 mr-4'
    />
    <QueryLoader name={teams_simple_grid_name} />
  </div>

}

export default Teams

export function getColumns() {
  const columns = [
    {
      field: 'name',
      headerText: 'Team Name',
      width: 80,
    },
    {
      field: "brokerageFirmName",
      headerText: "Brokerage Firm",
      entityField: 'brokerageFirms.brokerageFirm.name',
      width: 80,
    },
    {
      field: 'isMultiFirmTeam',
      headerText: 'Multi-Firm Team',
      width: 80,
      customColumnTemplate: (props: any) => {
        return <div
          style={{ paddingLeft: '1rem' }}
        >
          <CheckBoxComponent
            checked={props?.isMultiFirmTeam}
            disabled={true}
          />
        </div>
      },
      isIgnoreInSearch: true
    },
    {
      field: "teamLeader",
      headerText: "Team Leader",
      width: 80,
      isIgnoreInSearch: true
    },
    {
      field: "teamEmail",
      entityField: 'emails.EmailAddress',
      headerText: "Team Email Address",
      width: 80,
      // isIgnoreInSearch:true
    },
    {
      field: "teamPhoneNumber",
      headerText: "Team Phone Number",
      entityField: 'phones.phoneNumber',
      width: 80,
    }
  ]
  return columns
}

function getFilters(): FilterOptionsType[] {
  const filters: FilterOptionsType[] = [
    {
      controlType: 'editableSelect',
      name: 'Brokerage Firm',
      resource: 'BrokerageFirms',
      displayName: 'Brokerage Firm',
      filterFieldName: 'brokerageFirms.brokerageFirmID'
    }
  ]
  return (filters)
}