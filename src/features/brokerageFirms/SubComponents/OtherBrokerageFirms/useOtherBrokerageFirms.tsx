import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Toast from "../../../../components/widgets/Toast";
import { patchMembershipResource } from "../../../../adapters";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

function useOtherBrokerageFirms(reloadGrid: (() => void) | undefined) {
	const [error, setError] = useState<{ isError: boolean; message: string }>({
		isError: false,
		message: "Something went worng",
	});
	const [isLoading, setIsLoading] = useState(true);
	const brokerageFirmIds = useSelector(
		(state: RootState) => state.selectableGrid[BF_OTHER_NAME]?.selectedIDs
	);

	const handleOnSubmit = async (values: any, actions: any) => {
		try {
			await updateBrokerageFirmIDs();
			confirmAndRedirect();
		} catch (error: any) {
			console.log("Error while assigning brokeragefirms", error);
			setError({ ...error, isError: true });
		}

		function confirmAndRedirect() {
			reloadGrid && reloadGrid();
			Toast.fire({
				icon: "success",
				title: "Brokerage Firms Claimed",
			});
		}
		async function updateBrokerageFirmIDs() {
			await patchMembershipResource(
				"BrokerageFirms/claim",
				values.brokerageFirmIds
			);
		}
	};

	const formik = useFormik({
		initialValues: {
			brokerageFirmIds: [],
		},
		onSubmit: handleOnSubmit,
	});

	useEffect(() => {
		formik.setFieldValue("brokerageFirmIds", brokerageFirmIds ?? []);
	}, [JSON.stringify(brokerageFirmIds)]);

	return {
		formik,
		error,
		loading: isLoading,
	};
}

export const BF_OTHER_NAME = "brokerageFirmIds_other";

export default useOtherBrokerageFirms;
