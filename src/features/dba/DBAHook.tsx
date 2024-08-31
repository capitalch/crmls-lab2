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
import { dba_resource_name } from "./Dbas";
import {
	MembershipMessages,
	MembershipRegEx,
} from "../../util/MembershipMessages";
import * as Yup from "yup";
import moment from "moment";
import { SaveTypesEnum } from "../../util/helpers";

function useDBA() {
	const [error, setError] = useState<{ isError: boolean; message: string }>({
		isError: false,
		message: "Something went worng",
	});
	const [refresh, setRefresh] = useState<boolean>(false);
	const title = useRef("");
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const { id }: any = useParams();
	const history = useHistory();

	const isNew = !id;
	const dba = useSelector(
		(state: any) => state?.queryHelper[dba_resource_name]?.contents
	);

	useLayoutEffect(() => {
		updateDateFetchedData();
	}, [dba, isNew]);

	useEffect(() => {
		startDataFetch();
	}, [refresh]);

	const startDataFetch = () => {
		if (!isNew) {
			setIsLoading(true);
			dispatch(
				fetchDataOnId({
					id: id,
					name: dba_resource_name,
					resource: dba_resource_name,
				})
			);
		}
	};

	const updateDateFetchedData = () => {
		if (!!dba && !isNew) {
			title.current = dba.name;
			formik.setValues(dba);
		}
		setIsLoading(false);
	};

	const handleOnSubmit = async (values: any, actions: any) => {
		try {
			const res = await updateDBA();
			confirmAndRedirect(res);
		} catch (error: any) {
			Toast.fire({
				icon: "error",
				title: error?.response?.data?.message,
			});
			console.log("Error while updating DBA", error?.response?.data);
			setError({ ...error, isError: true });
		}

		function confirmAndRedirect(res: any) {
			SmallToast.fire({
				icon: "success",
				title: `DBA ${isNew ? "Created" : "Updated"}`,
			});
			if (values.saveType === SaveTypesEnum.SaveAndNew) {
				history.push(`/dbas/new`);
				actions.resetForm();
			} else if (values.saveType === SaveTypesEnum.SaveAndClose) {
				history.push(`/dbas`);
			} else {
				// update
				history.push(
					`/dbas/edit/${id && !(id === "undifined") ? id : res.data.id}`
				);
				refreshRecord();
			}
			// actions.validateForm()
			actions.setSubmitting(false);
		}
		async function updateDBA() {
			if (isNew) {
				return await createMembershipResourse("dbas", formik.values);
			} else {
				return await updateMembershipResourse("dbas", formik.values);
			}
		}
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			address1: "",
			address2: "",
			city: "",
			zip: "",
			stateID: "",
			phone: "",
			brokerageFirmID: "",
			licenseNumber: "",
			expirationDate: undefined,
			activeDate: undefined,
			licensesIDs: [],
			officesIDs: [],
		},

		onSubmit: handleOnSubmit,
		validationSchema: Yup.object({
			name: Yup.string().required(MembershipMessages.required),
			address1: Yup.string().required(MembershipMessages.required),
			city: Yup.string().required(MembershipMessages.required),
			zip: Yup.string()
				.required(MembershipMessages.required)
				.matches(/\b\d{5}\b/, MembershipMessages.zip5Digit),
			stateID: Yup.string().required(MembershipMessages.required),
			expirationDate: Yup.date()
				.required(MembershipMessages.required)
				.typeError("This field is required with correct format")
				.test(
					"is-one-day-more-than-active",
					"Expiration date must be after active date",
					function (expirationDate: any) {
						const activeDate = this.parent.activeDate;
						const activeDateObj = moment(activeDate);
						const expirationDateObj = expirationDate && moment(expirationDate);
						return expirationDateObj
							? expirationDateObj.isAfter(activeDateObj, "day")
							: false;
					}
				),
			activeDate: Yup.date()
				.typeError("This field is required with correct format")
				.required(MembershipMessages.required)
				.test(
					"is-one-day-less-than-current-date",
					"Active date cannot be after current date",
					function (activeDate: any) {
						const currentDate = moment();
						return activeDate
							? !moment(activeDate).isAfter(currentDate, "day")
							: false;
					}
				),
			phone: Yup.string()
				.required("This field is required")
				.matches(
					MembershipRegEx.phoneRegExp.shouldBeSeparatedWithHiphen,
					MembershipMessages.phoneNoFormat
				)
				.matches(
					MembershipRegEx.phoneRegExp.doestStartWithOneOrZero,
					MembershipMessages.phoneFormatNotZeroOrOne
				),
			brokerageFirmID: Yup.string().required(MembershipMessages.required),
			licensesIDs: Yup.array()
				.required(MembershipMessages.required)
				.min(1, MembershipMessages.minOneLicenseRequired),
		}),
	});

	const refreshRecord = () => {
		setRefresh(!refresh);
	};

	return {
		formik,
		error,
		loading: isLoading,
		title: title.current,
		isNew,
	};
}

export default useDBA;
