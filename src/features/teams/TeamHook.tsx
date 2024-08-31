import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { teams_resource_name } from "./Teams";
import { SmallToast } from "../../components/widgets/Toast";
import { SaveTypesEnum } from "../../util/helpers";
import { useFormik } from "formik";
import { fetchDataOnId } from "../../components/QueryHelper/QueryHelperSlice";
import {
	createMembershipResourse,
	fetchMembershipResourseWithId,
	updateMembershipResourse,
} from "../../adapters";
import { Team, TeamContact } from "./TeamsInterface";
import { MembershipMessages } from "../../util/MembershipMessages";
import { teams_bf_gridname } from "./Tabs/BrokerageFirm/TeamBrokerageFirms";
import {
	resetSelectedIDs,
	setSelectedIDs,
} from "../../components/SelectableGrid/SelectableGridSlice";

const useTeam = ({ id, isReadOnly }: { id?: string; isReadOnly?: boolean }) => {
	const [data, setData] = useState(initialTeamValue);
	const [error, setError] = useState<{ isError: boolean; message: string }>({
		isError: false,
		message: "Something went worng",
	});
	const [refresh, setRefresh] = useState<boolean>(false);
	const previousPrimaryBrokerageFirmID = useRef("");
	const dispatch = useDispatch();
	const title = useRef("");
	const [isLoading, setIsLoading] = useState(true);
	const { id: urlId }: any = useParams();
	const teamId = id || urlId;
	const history = useHistory();
	const isNew = !teamId;

	const brokerageFirmTabRefreshToken = useRef(0);
	const updateBFRefreshToken = () => {
		brokerageFirmTabRefreshToken.current = Date.now();
	};

	useEffect(() => {
		fetchData(teamId);

		return () => {
			const args: any = { name: teams_bf_gridname };
			dispatch(resetSelectedIDs(args));
		};
	}, [refresh]);

	const fetchData = async (id: string) => {
		try {
			const Team = await fetchMembershipResourseWithId(teams_resource_name, id);
			setData(Team);
			updateFetchedData(Team);
			updateBFRefreshToken();
		} finally {
			setIsLoading(false);
		}
	};

	const updateFetchedData = (team: Team) => {
		if (!!team && !isNew) {
			title.current = team.name ?? "";
			formik.setValues(team);
			formik.setFieldValue("isReadOnly", !!isReadOnly);
		}
	};

	const handleOnSubmit = async (values: any, actions: any) => {
		try {
			const res = await updateTeam();
			confirmAndRedirect(res);
		} catch (error: any) {
			SmallToast.fire({
				icon: "error",
				title: error?.response?.data?.message,
			});
			console.log("Error while updating team", error?.response?.data);
			setError({ ...error, isError: true });
		}

		function confirmAndRedirect(res: any) {
			SmallToast.fire({
				icon: "success",
				title: `Team ${isNew ? "Created" : "Updated"}`,
			});
			if (values.saveType === SaveTypesEnum.SaveAndNew) {
				const clearBrokerageFirms = () => {
					const args: any = { name: teams_bf_gridname };
					dispatch(resetSelectedIDs(args));
				};
				history.push(`/${teams_resource_name}/new`);
				actions.resetForm();
				formik.validateForm();
				clearBrokerageFirms();
			} else if (values.saveType === SaveTypesEnum.SaveAndClose) {
				history.push(`/${teams_resource_name}`);
			} else {
				// update
				history.push(
					`/${teams_resource_name}/edit/${
						teamId && !(teamId === "undifined") ? teamId : res.data.id
					}`
				);
				refreshRecord();
			}
			// actions.validateForm()
			actions.setSubmitting(false);
		}
		async function updateTeam() {
			if (isNew) {
				return await createMembershipResourse(
					teams_resource_name,
					formik.values
				);
			} else {
				return await updateMembershipResourse(
					teams_resource_name,
					formik.values
				);
			}
		}
	};

	const formik = useFormik({
		initialValues: initialTeamValue,
		validateOnMount: true,
		validateOnChange: true,
		onSubmit: handleOnSubmit,
		validationSchema: Yup.object({
			name: Yup.string()
				.required(MembershipMessages.required)
				.matches(/^[^\s].*$/, MembershipMessages.noStartWithSpace),
			primaryBrokerageFirmID: Yup.string().required(
				MembershipMessages.required
			),
			brokerTeamStatusLookupID: Yup.string().required(
				MembershipMessages.required
			),
			activeDate: Yup.date()
				.typeError("This field is required with correct format")
				.required(MembershipMessages.required),
			teamMemberWithRoles: Yup.array()
				.required(MembershipMessages.twoLicensedMembersRequired)
				.min(2, MembershipMessages.twoLicensedMembersRequired)
				.test(
					"test-no-zero-role-member",
					MembershipMessages.noZeroRoleLeader,
					(teamMemberWithRoles: any) => {
						return (
							teamMemberWithRoles &&
							!teamMemberWithRoles.some(
								(item: TeamContact) => item.roleIDs.length === 0
							)
						);
					}
				)
				.test(
					"test-two-licensed-memeber",
					MembershipMessages.twoLicensedMembersRequired,
					(teamMemberWithRoles: any) => {
						const teamMemberWithLicense =
							teamMemberWithRoles &&
							teamMemberWithRoles.filter(
								(member: TeamContact) => member.contactLicenseNumber
							);
						return teamMemberWithRoles && teamMemberWithLicense.length > 1;
					}
				)
				.test(
					"test-team-leader",
					MembershipMessages.teamLeaderRequired,
					(teamMemberWithRoles: any) => {
						return (
							teamMemberWithRoles &&
							teamMemberWithRoles.some((item: TeamContact) =>
								item.concatenatedRoleNames?.includes("Team Leader")
							)
						);
					}
				),
			emails: Yup.array()
				.required(MembershipMessages.emailLeaderRequired)
				.min(1, MembershipMessages.emailLeaderRequired),
		}),
	});

	const refreshRecord = () => {
		setRefresh(!refresh);
	};

	return {
		formik,
		error,
		data,
		loading: isLoading,
		title: title.current,
		updateBFRefreshToken,
		brokerageFirmTabRefreshToken: brokerageFirmTabRefreshToken.current,
		isNew,
	};
};

export default useTeam;

const initialTeamValue: Team = {
	// phones: [],

	// rolePhones: [],
	emails: [],
	// roleEmails: [],
	brokerageFirmIDs: undefined,
	primaryBrokerageFirmID: "",
	licenseIDs: [],
	teamMemberWithRoles: [],
	// isMultiFirmTeam: false,
	name: "",
	brokerTeamStatusLookupID: "",
	activeDate: "",
	// inactiveDate: null,
	dbaid: "",
	// isDeleted: false,
	// createdBy: '',
	// createdOn: null,
	// id: '',
	// modifiedBy: '',
	// modifiedOn: null,
};
