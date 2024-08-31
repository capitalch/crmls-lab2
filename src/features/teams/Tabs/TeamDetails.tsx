import { FormikProps, useFormikContext } from "formik";
import { GenericHeader } from "../../../components/GenericHeader/GenericHeader";
import Loader from "../../../components/widgets/Loader";
import FormikInput from "../../../util/controls/formikInput";
import { Team } from "../TeamsInterface";
import dayjs from "dayjs";
import FormikSelect from "../../../util/controls/FormikInputSelect/FormikInputSelect";
import { OperationCriterias } from "../../../Interfaces/Criteria";
import { team_members_fieldname } from "./Members/TeamMembers";
import { teams_bf_fieldName } from "./BrokerageFirm/TeamBrokerageFirms";
import { compact, uniq } from "lodash";
import useTeamMembersRemovedWarning from "./BrokerageFirm/TeamMembersRemovedHandler/useTeamMembersRemovedWarning";
import { teams_primary_bf_fieldname } from "./BrokerageFirm/PrimaryBrokerageFirmSelector";

const TeamDetails = ({
	updateBFRefreshToken,
}: {
	updateBFRefreshToken: () => void;
}) => {
	const teamFormik: FormikProps<Team> = useFormikContext();
	const isReadOnly = teamFormik.values.isReadOnly;
	const { values: team, setFieldValue } = teamFormik;
	const { openPrimaryBrokerageFirmChangeAlert } =
		useTeamMembersRemovedWarning();

	const clearBrokerageFirmDependencies = async (primaryBrokerageFirm: any) => {
		// updating primary firm and team member role is been taken care by the hook
		const result = await openPrimaryBrokerageFirmChangeAlert({
			formik: teamFormik,
			newPrimaryFirmID: primaryBrokerageFirm?.id,
		});
		if (!result?.hasBeenCancelled) {
			const newBrokerageFirmIdsList = uniq(
				compact([
					...(teamFormik?.values[teams_bf_fieldName] || []),
					primaryBrokerageFirm?.id || "",
				])
			);
			primaryBrokerageFirm?.id &&
				setFieldValue(teams_bf_fieldName, newBrokerageFirmIdsList);
			// setFieldValue(teams_primary_bf_fieldname, primaryBrokerageFirm?.id)
			// setFieldValue(team_members_fieldname, [])
		}
	};

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			<div className="mx-4">
				<div key="teams-details" data-label="Details">
					<div className="flex flex-wrap">
						<FormikInput
							fieldName="name"
							label="Name"
							type="text"
							value={team?.name}
							required={true}
							disabled={isReadOnly}
						/>
						<FormikSelect
							resource="BrokerTeamStatusLookups"
							fieldName="brokerTeamStatusLookupID"
							label="Status"
							required={true}
							disabled={isReadOnly}
						/>
						<FormikSelect
							resource="brokerageFirms"
							fieldName="primaryBrokerageFirmID"
							label="Primary Brokerage Firm"
							isTypeAhead={true}
							preventDefault={true}
							onChange={clearBrokerageFirmDependencies}
							required={true}
							disabled={isReadOnly}
						/>
						<FormikInput
							fieldName="activeDate"
							label="Active Date"
							type="date"
							value={getDate(teamFormik.values.activeDate)}
							required={true}
							disabled={isReadOnly}
						/>
						<FormikSelect
							resource="dbas"
							fieldName="dbaid"
							label="DBA"
							criteria={[
								{
									field: "brokerageFirmID",
									op: OperationCriterias.Equal,
									values: [teamFormik?.values?.primaryBrokerageFirmID || ""],
								},
							]}
							disabled={
								!teamFormik?.values?.primaryBrokerageFirmID || isReadOnly
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeamDetails;

const getDate = (date: string | undefined) => {
	let formattedDate: any;
	try {
		// const originalDate = new Date(date);
		formattedDate = date && date.split("T")[0];
	} finally {
		return formattedDate;
	}
};
