import { useDispatch, useSelector } from "react-redux";
import { OperationCriterias } from "../../../../Interfaces/Criteria";
import { BasicGrid } from "../../../../components/BasicGrid/BasicGrid";
import { FilterOptionsType } from "../../../../components/BasicGrid/BasicGridFilters";
import { BasicGridQueryPanel } from "../../../../components/BasicGrid/BasicGridQueryPanel";
import { QueryLoader } from "../../../../components/QueryLoader/QueryLoader";
import { SelectableGrid } from "../../../../components/SelectableGrid/SelectableGrid";
import Loader from "../../../../components/widgets/Loader";
// import { ClaimButton } from "../OtherBrokerageFirms/OtherBrokerageFirms";
import { formattedProfile } from "../../../user/selectors";
import { useEffect, useState } from "react";
import useGrid from "../../../../util/useClearGrid";
// import { bf_resource_name } from "../MyBrokerageFirms/MyBrokerageFirms";
import {
	setSelectedIDs,
	setShowSelectedRows,
} from "../../../../components/SelectableGrid/SelectableGridSlice";
import { FormikProps, useFormikContext } from "formik";
import { Team } from "../../TeamsInterface";
import useReload from "../../../../util/useReload";
import PrimaryBrokerageFirmSelector from "./PrimaryBrokerageFirmSelector";
import { compact, isEqual, uniq } from "lodash";
import { useParams } from "react-router";
import usePrimaryBrokerageFirmChange from "./usePrimaryBrokerageFirmChange";
import useTeamMembersRemovedWarning from "./TeamMembersRemovedHandler/useTeamMembersRemovedWarning";
import _ from "lodash";
import TeamsBFReadOnly from "./TeamBFReadOnly";

export const teams_bf_resource_name = "brokerageFirms";
export const teams_bf_gridname = "teams_brokerage_firms";
export const teams_bf_fieldName = "brokerageFirmIDs";

function TeamBrokerageFirms({
	brokerageFirmTabRefreshToken,
}: {
	brokerageFirmTabRefreshToken: string;
}) {
	const formik: FormikProps<Team> = useFormikContext();

	const id: string = formik?.values.id || "";
	const isReadOnly = formik?.values.isReadOnly;

	const [syncedAtleastOnce, setSyncedAtleastOnce] = useState(false);
	// const isAorAdmin: boolean = useSelector(formattedProfile)?.isCrmlsAorAdmin
	const selectedIds: any = useSelector(
		(state: any) => state?.selectableGrid[teams_bf_gridname]?.selectedIDs
	);

	const { isReloading } = useReload(brokerageFirmTabRefreshToken, id);

	// The selectable grid is tightly coupled with the query helper and NTabs
	// It is not showing the correct data the first time it loads
	// this hook is updating the redux store with the currenty fetched data
	// also clears the redux store when
	// useGrid({gridName:teams_bf_gridname, fieldName, resource: teams_bf_resource_name})
	const dispatch = useDispatch();

	const updateGrid = (selectedIDs: any[]) => {
		const args: any = { name: teams_bf_gridname, selectedIDs };
		dispatch(setSelectedIDs(args));
	};

	const reloadGrid = () => {
		const args2: any = { name: teams_bf_gridname };
		dispatch(setShowSelectedRows(args2));
	};

	const { openRemovingTeamMembersAlert } = useTeamMembersRemovedWarning();

	const restorePreviousFirms = () => {
		const previousFirms = formik.values.brokerageFirmIDs;
		previousFirms && updateGrid(previousFirms);
		reloadGrid();
	};

	const openTeamRemovalModal = async () => {
		const result = await openRemovingTeamMembersAlert({
			newBrokerageFirmIdsList: selectedIds,
			formik,
		});
		if (result?.hasBeenCancelled) {
			restorePreviousFirms();
		}
	};

	useEffect(() => {
		const formikAndGridSynced = _.isEqual(
			selectedIds,
			formik?.values?.brokerageFirmIDs
		);
		if (formikAndGridSynced && !syncedAtleastOnce) {
			setSyncedAtleastOnce(true);
		}
	}, [selectedIds]);

	useEffect(() => {
		selectedIds && syncedAtleastOnce && !isReadOnly && openTeamRemovalModal();
		// const isAlreadyInSync = isEqual(selectedIds, formik.values.brokerageFirmIDs)
		// selectedIds && !isAlreadyInSync && formik.setFieldValue(teams_bf_fieldName, uniq([...(selectedIds ?? [])]))
		// reloadGrid()
		// uniq is used as there would be duplicated if primaryBrokerageFirm is already present in currentValue
		// not using uniq would not break anything
	}, [selectedIds]);

	usePrimaryBrokerageFirmChange(reloadGrid, updateGrid);

	if (isReloading) {
		<></>;
	}

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			{!isReadOnly ? (
				<SelectableGrid
					name={teams_bf_gridname}
					fieldName={teams_bf_fieldName}
					columns={columns}
					resource={teams_bf_resource_name}
					className="m-4"
					preSelectedIDs={uniq(
						compact([
							...(formik?.values[teams_bf_fieldName] || []),
							formik?.values.primaryBrokerageFirmID || "",
						])
					)}
					// link={`${resource}/view`}
				/>
			) : (
				<TeamsBFReadOnly />
			)}
		</div>
	);
}

export const columns = [
	{
		field: "primaryBrokerageFirmID",
		headerText: "Primary",
		customColumnTemplate: PrimaryBrokerageFirmSelector,
		isIgnoreInPanel: true,
		isIgnoreInSearch: true,
		width: 50,
	},
	{
		field: "name",
		headerText: "Name",
		width: 140,
	},
	{
		field: "address1",
		headerText: "Address",
		width: 100,
	},
	{
		field: "phone",
		headerText: "Phone",
		width: 100,
	},
	{
		field: "emailAddress",
		headerText: "Email",
		width: 100,
	},
	{
		field: "city",
		headerText: "City",
		width: 100,
	},
	{
		field: "zip",
		headerText: "ZIP",
		width: 100,
	},
];

export const BFListfilters: FilterOptionsType[] = [
	{
		controlType: "text",
		name: "zip",
		filterFieldName: "zip",
		displayName: "Zip",
	},
	{
		controlType: "text",
		name: "city",
		filterFieldName: "city",
		displayName: "City",
	},
	{
		controlType: "editableSelect",
		name: "brokerageFirm",
		resource: "BrokerageFirms",
		displayName: "Brokerage Firm",
		filterFieldName: "brokerageFirmID",
	},
];

export default TeamBrokerageFirms;
