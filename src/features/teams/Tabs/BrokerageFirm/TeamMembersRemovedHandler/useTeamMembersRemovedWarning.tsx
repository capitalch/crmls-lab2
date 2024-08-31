import { FormikProps, useFormikContext } from "formik";
import { Team, TeamMemberWithRoles } from "../../../TeamsInterface";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TeamMemberRemovalModal from "./TeamMemberRemovalModal";
import ReactDOM from "react-dom";
import { isEqual, uniq } from "lodash";
import { teams_bf_fieldName } from "../TeamBrokerageFirms";
import { team_members_fieldname } from "../../Members/TeamMembers";
import PrimaryFirmRemovalModal from "./PrimaryBrokeageFirmChangeModal";
import { TEAMS_CONSTANTS } from "./../../../../../util/constants/membership_constants";
import { teams_primary_bf_fieldname } from "../PrimaryBrokerageFirmSelector";

export const teamMember_brokerageFirm_fieldname = "brokerageFirmIDs";

const useTeamMembersRemovedWarning = () => {
	// const [showModal, setShowModal] = useState(false)
	// const formik: FormikProps<Team> = useFormikContext();

	const getMembersToBeRemoved = ({
		newBrokerageFirmIdsList,
		formik,
	}: {
		newBrokerageFirmIdsList: string[];
		formik: FormikProps<Team>;
	}) => {
		const currentMembers = formik?.values?.teamMemberWithRoles || [];
		// for every team member present
		const membersToBeRemoved = currentMembers?.filter(
			// check whether new brokeragefirm id has nothing common with member's brokerage firm id
			(member) =>
				member?.[teamMember_brokerageFirm_fieldname]?.every(
					(firmId) => !newBrokerageFirmIdsList?.includes(firmId)
				)
		);
		const remainingTeamMembers = currentMembers?.filter(
			(member) =>
				!membersToBeRemoved
					?.map((member) => member.contactID)
					.includes(member.contactID)
		);

		return { membersToBeRemoved, remainingTeamMembers };
	};

	const getMemberWithTeamLeaderRole = (formik: FormikProps<Team>) => {
		const teamLeader = formik?.values?.teamMemberWithRoles?.find((member) =>
			member.concatenatedRoleNames?.includes(TEAMS_CONSTANTS.teamLeaderRoleName)
		);
		return teamLeader;
	};

	const removeTeamLeaderRoleFromCurrentMembers = (
		formik: FormikProps<Team>,
		teamLeader: TeamMemberWithRoles
	) => {
		const removeTeamLeaderRoleName = (rolesString: string | undefined) => {
			return rolesString
				?.split(", ")
				.filter((role) => role !== TEAMS_CONSTANTS.teamLeaderRoleName)
				.join(", ");
		};

		const newTeamMemebers = formik?.values?.teamMemberWithRoles?.map(
			(member) => {
				if (member.contactID === teamLeader.contactID) {
					return {
						...member,
						roleIDs: member.roleIDs?.filter(
							(id) => !(id === TEAMS_CONSTANTS.teamLeaderRoleId)
						),
						concatenatedRoleNames: removeTeamLeaderRoleName(
							member.concatenatedRoleNames
						),
					};
				}
				return member;
			}
		);

		formik.setFieldValue(team_members_fieldname, newTeamMemebers || []);
	};

	const openRemovingTeamMembersAlert = async ({
		newBrokerageFirmIdsList,
		formik,
	}: {
		newBrokerageFirmIdsList: string[];
		formik: FormikProps<Team>;
	}): Promise<{ hasBeenCancelled: boolean } | undefined> => {
		// not doing anything when newBrokerageFirmIdsList is undefined
		// newBrokerageFirmIdsList is set to undefined when loading the grid
		if (!newBrokerageFirmIdsList) return { hasBeenCancelled: false };

		const updateBrokerageFirm_and_RemoveTeamMemebers = (
			remainingTeamMembers: TeamMemberWithRoles[]
		) => {
			// updating the brokerageFirmIDs
			const isAlreadyInSync = isEqual(
				newBrokerageFirmIdsList,
				formik.values.brokerageFirmIDs
			);
			newBrokerageFirmIdsList &&
				!isAlreadyInSync &&
				formik.setFieldValue(
					teams_bf_fieldName,
					uniq([...(newBrokerageFirmIdsList ?? [])])
				);

			//updating the team members
			formik.setFieldValue(team_members_fieldname, remainingTeamMembers);
		};

		const { membersToBeRemoved, remainingTeamMembers } = getMembersToBeRemoved({
			newBrokerageFirmIdsList,
			formik,
		});

		if (membersToBeRemoved.length) {
			return Swal.fire({
				html: '<div id="teamMemberRemovalModal"></div>',
				allowOutsideClick: false,
				didOpen: () => {
					ReactDOM.render(
						<TeamMemberRemovalModal membersToBeRemoved={membersToBeRemoved} />,
						document.getElementById("teamMemberRemovalModal")
					);
				},
				// icon: 'info',
				showCancelButton: true,
				confirmButtonText: "Proceed",
				cancelButtonText: "Cancel",
				customClass: {
					title: "text-xl",
					popup: "w-1/2 swal_bigPopup",
				},
			}).then((result) => {
				if (result.isConfirmed) {
					updateBrokerageFirm_and_RemoveTeamMemebers(remainingTeamMembers);
					return { hasBeenCancelled: false };
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					return { hasBeenCancelled: true };
				}
			});
		} else {
			newBrokerageFirmIdsList &&
				updateBrokerageFirm_and_RemoveTeamMemebers(remainingTeamMembers);
		}

		// return ({hasBeenCancelled})
	};

	const openPrimaryBrokerageFirmChangeAlert = async ({
		formik,
		newPrimaryFirmID,
	}: {
		formik: FormikProps<Team>;
		newPrimaryFirmID?: string;
	}): Promise<{ hasBeenCancelled: boolean } | undefined> => {
		const teamLeader = getMemberWithTeamLeaderRole(formik);

		if (teamLeader) {
			return Swal.fire({
				html: '<div id="primaryFirmChnageModal"></div>',
				allowOutsideClick: false,
				didOpen: () => {
					ReactDOM.render(
						<PrimaryFirmRemovalModal memberWhoseRoleToBeRemoved={teamLeader} />,
						document.getElementById("primaryFirmChnageModal")
					);
				},
				// icon: 'info',
				showCancelButton: true,
				confirmButtonText: "Proceed",
				cancelButtonText: "Cancel",
				customClass: {
					title: "text-xl",
					popup: "w-1/3 swal_bigPopup",
				},
			}).then((result) => {
				if (result.isConfirmed) {
					removeTeamLeaderRoleFromCurrentMembers(formik, teamLeader);
					formik.setFieldValue(teams_primary_bf_fieldname, newPrimaryFirmID);
					clearDBAID();
					return { hasBeenCancelled: false };
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					return { hasBeenCancelled: true };
				}
			});
		} else {
			formik.setFieldValue(teams_primary_bf_fieldname, newPrimaryFirmID);
			clearDBAID();
		}

		function clearDBAID() {
			formik.setFieldValue("dbaid", "");
		}
	};

	return { openRemovingTeamMembersAlert, openPrimaryBrokerageFirmChangeAlert };
};

export default useTeamMembersRemovedWarning;
