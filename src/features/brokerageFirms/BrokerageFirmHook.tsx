import { useFormik } from "formik";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast, { SmallToast } from "../../components/widgets/Toast";
import {
	createMembershipResourse,
	updateMembershipResourse,
} from "../../adapters";
import { useHistory, useParams } from "react-router";
import { fetchDataOnId } from "../../components/QueryHelper/QueryHelperSlice";
import { bf_resource_name } from "./SubComponents/MyBrokerageFirms/MyBrokerageFirms";
import * as Yup from "yup";
import {
	MembershipMessages,
	MembershipRegEx,
} from "../../util/MembershipMessages";
import { SaveTypesEnum } from "../../util/helpers";
import {
	resetSelectableGrid,
	resetSelectedIDs,
	setSelectedIDs,
} from "../../components/SelectableGrid/SelectableGridSlice";
import { bf_offices_gridName } from "./SubComponents/Tabs/Offices/BrokerageFirmOfficesSelectable";
import {
	bf_contacts_gridName,
	bf_members_gridName,
} from "./SubComponents/Tabs/Members/BrokerageFirmMembers";
import { bf_designatedOfficers_gridName } from "./SubComponents/Tabs/LicensedOfficers/BrokerageFirmDesignatedOfficers";
import { bf_licenses_gridName } from "./SubComponents/Tabs/Licenses/BrokerageFirmLicensesSelectable";
import { bf_dba_gridName } from "./SubComponents/Tabs/Dba/BrokerageFirmDBAsSelectable";

function useBrokerageFirms() {
	const [error, setError] = useState<{ isError: boolean; message: string }>({
		isError: false,
		message: "Something went worng",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [refresh, setRefresh] = useState(true);
	const dispatch = useDispatch();
	const { id }: any = useParams();
	const brokerageFirm = useSelector(
		(state: any) => state?.queryHelper[bf_resource_name]?.contents
	);
	const aorID = useSelector((state: any) => state?.user?.profile?.aor?.id);
	const history = useHistory();
	const BFTitle = useRef("New Brokerage Firm");

	const setTitle = (title: string | undefined | null) => {
		if (title && id) {
			BFTitle.current = title;
		} else {
			BFTitle.current = "New Brokerage Firm";
		}
	};
	useLayoutEffect(() => {
		if (!!brokerageFirm && id) {
			formik.setValues(brokerageFirm);
			setIsLoading(false);
		}
		setTitle(brokerageFirm?.name);
	}, [JSON.stringify(brokerageFirm)]);

	useEffect(() => {
		if (id)
			dispatch(
				fetchDataOnId({
					id: id,
					name: bf_resource_name,
					resource: bf_resource_name,
				})
			);

		return clearGrids;
	}, [refresh]);

	const handleOnSubmit = async (values: any, actions: any) => {
		try {
			setIsLoading(true);
			const res = await updateBrokerageFirmIDs();
			confirmAndRedirect(res);
		} catch (error: any) {
			Toast.fire({
				icon: "error",
				title: error?.response?.data?.message,
			});
			console.log("Error while updating brokerage firm", error?.response?.data);
			setError({ ...error, isError: true });
		} finally {
			setIsLoading(false);
		}

		function confirmAndRedirect(res: any) {
			Toast.fire({
				icon: "success",
				title: "Brokerage Firm Updated",
			});
			SmallToast.fire({
				icon: "success",
				title: `Brokerage Firm ${!id ? "Created" : "Updated"}`,
			});
			if (values.saveType === SaveTypesEnum.SaveAndNew) {
				history.push(`/${bf_resource_name}/new`);
				actions.resetForm();
				formik.validateForm();
				clearGrids();
			} else if (values.saveType === SaveTypesEnum.SaveAndClose) {
				history.push(`/${bf_resource_name}`);
			} else {
				// update
				history.push(
					`/${bf_resource_name}/edit/${
						id && !(id === "undifined") ? id : res.data.id
					}`
				);
			}
			setRefresh(!refresh);
		}

		async function updateBrokerageFirmIDs() {
			if (!id) {
				return await createMembershipResourse(bf_resource_name, {
					...formik.values,
					primaryAorID: aorID,
					billableAorID: aorID,
				});
			} else {
				return await updateMembershipResourse(bf_resource_name, formik.values);
			}
		}
	};

	const clearGrids = () => {
		[
			bf_offices_gridName,
			bf_members_gridName,
			bf_contacts_gridName,
			bf_designatedOfficers_gridName,
			bf_licenses_gridName,
			bf_dba_gridName,
		].forEach((gridName) => {
			const args: any = { name: gridName };
			dispatch(resetSelectableGrid(args));
			// const args: any = { name: gridName, selectedIDs:undefined }
			// dispatch(setSelectedIDs(args))
		});
	};

	const formik = useFormik({
		initialValues: {
			dbaIDs: [],
			primaryAorID: "",
			billableAorID: "",
			secondaryAorIDs: [],
			designatedOfficerIDs: [],
			officesIDs: undefined,
			mainOfficeID: "",
			brands: [],
			saveType: "",
			systemOfRecordID: "",
		},
		validateOnMount: true,
		onSubmit: handleOnSubmit,
		validationSchema: Yup.object({
			name: Yup.string().required(MembershipMessages.required),
			// primaryAorID: Yup.string().required(MembershipMessages.required),
			// billableAorID: Yup.string().required(MembershipMessages.required),
			// mainOfficeID:Yup.string().required("One main office is required to be selected").nullable(),
			address1: Yup.string().required(MembershipMessages.required),
			city: Yup.string().required(MembershipMessages.required),
			stateID: Yup.string().required(MembershipMessages.required),
			zip: Yup.string()
				.required(MembershipMessages.required)
				.matches(/\b\d{5}\b/, MembershipMessages.zip5Digit),
			phone: Yup.string()
				.required(MembershipMessages.required)
				.matches(
					MembershipRegEx.phoneRegExp.shouldBeSeparatedWithHiphen,
					MembershipMessages.phoneNoFormat
				)
				.matches(
					MembershipRegEx.phoneRegExp.doestStartWithOneOrZero,
					MembershipMessages.phoneFormatNotZeroOrOne
				),

			licensesIDs: Yup.array()
				.required(MembershipMessages.required)
				.min(1, MembershipMessages.minOneLicenseRequired),
			// secondaryAorIDs: Yup.array().test(
			//     'secondaryAorIDs',
			//     "Primary and billable AORs cannot also be secondary AOR",
			//     function (secondaryAorIDs) {
			//         const primaryAorID = this.parent.primaryAorID
			//         const billableAorID = this.parent.billableAorID
			//         const someAorsAreDuplicate = [primaryAorID, billableAorID].some(aor => secondaryAorIDs?.includes(aor))
			//         return !someAorsAreDuplicate
			//     }
			// ),
		}),
	});

	return {
		formik,
		error,
		loading: isLoading,
		title: BFTitle.current,
	};
}

export default useBrokerageFirms;
