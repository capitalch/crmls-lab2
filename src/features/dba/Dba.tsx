import { useDispatch, useSelector } from "react-redux";
import { GenericHeader } from "../../components/GenericHeader/GenericHeader";
import { useParams } from "react-router";
import { useEffect } from "react";
import { fetchDataOnId } from "../../components/QueryHelper/QueryHelperSlice";
import Loader from "../../components/widgets/Loader";
import ActionBar from "../brokerageFirms/SubComponents/BrokerageFirmActionBar";
import { dba_resource_name } from "./Dbas";
import useDBA from "./DBAHook";
import DBADetailsTab from "./Tabs/DbaDetails";
import DbaLicensesTab, { dba_licenses_fieldName } from "./Tabs/DbaLicenses";
import DbaOffices, { dba_offices_fieldName } from "./Tabs/DbaOffices";
import { FormikProps } from "formik";
import { DBA as IDBA, Labels } from "./DbaInterface";
import Toast from "../../components/widgets/Toast";
import Tabs from "../../util/controls/tabs";

// import { OfficeOtherOfficesTab } from "./to-be-removed-OfficeOtherOfficesTab"

function DBA() {
	const { formik, loading, title, isNew } = useDBA();
	const { values: dba, errors } = formik;
	const errorsInDetailsPage =
		Object.keys(errors).filter((key) => key !== dba_licenses_fieldName).length >
		0;

	if (loading)
		return (
			<div className="fixed z-10 top-1/2 left-1/2 pl-20">
				<Loader />
			</div>
		);

	return (
		<div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
			{(formik.isSubmitting || loading) && (
				<div className="fixed z-10 top-1/2 left-1/2 pl-20">
					<Loader />
				</div>
			)}
			<GenericHeader
				title={
					isNew
						? "New DBA"
						: `${title}${
								dba.licenseNumber ? ` ( License #: ${dba.licenseNumber} )` : ""
						  }`
				}
				subTitle="Update CRMLS DBA"
				toShowGlobalValidationMessage={true}
				formik={formik}
				ControlSet={() => (
					<ActionBar
						formik={formik}
						isValid={formik.isValid}
						handleOnActionSave={async () => {
							showValidationIssue(formik);
							formik.handleSubmit();
						}}
						resource={dba_resource_name}
					/>
				)}
			/>
			<div>
				<Tabs
					tabs={tabs}
					formik={formik}
					errorFields={[errorsInDetailsPage ? "details" : ""]}
				>
					<DBADetailsTab />
					<DbaOffices />
					<DbaLicensesTab />
				</Tabs>
			</div>
		</div>
	);
}
export default DBA;

const showValidationIssue = (formik: any) => {
	if (Object.keys(formik.errors).length > 0) {
		const errorhtml = Object.keys(formik.errors).map((key: string) => {
			return `<p><strong>${Labels[key]}: </strong>${formik.errors?.[key]}</p>`;
		});
		Toast.fire({
			icon: "error",
			title: "Some fields are not valid",
			html: errorhtml.join(""),
		});
	}
};

const tabs = [
	{ name: "Details", id: "details" },
	{ name: "Offices", id: dba_offices_fieldName, required: true },
	{ name: "Licenses", id: dba_licenses_fieldName, required: true },
];
