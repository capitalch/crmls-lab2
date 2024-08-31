import React, { useEffect, useState } from "react";

import { debounce } from "lodash";
import Select from "react-select";
import { TeamContact } from "./TeamMemembersForm";
import { FormikProps, useFormikContext } from "formik";
import { Team } from "../../TeamsInterface";
import useFetchData from "../../../../util/hooks/useFetchData";
import Criteria, { OperationCriterias } from "../../../../Interfaces/Criteria";
import { ErrorComp } from "../../../../components/widgets/ErrorComp";
import { AstrixComp } from "../../../../components/widgets/AstrixComp";
import { fetchMembershipResourseWithId } from "../../../../adapters";
import { teamMember_brokerageFirm_fieldname } from "../BrokerageFirm/TeamMembersRemovedHandler/useTeamMembersRemovedWarning";

const SearchTeamMemeber = ({
	formik,
	onChange,
	selectedMember,
	disabled,
}: {
	formik: FormikProps<TeamContact>;
	selectedMember: TeamContact;
	onChange: (contact: TeamContact) => void;
	disabled: boolean;
}) => {
	const [searchContactText, setSearchContactText] = useState("");
	const teamFormik: FormikProps<Team> = useFormikContext();
	const teamMemberFormik = formik;
	const { touched, errors, getFieldProps } = teamMemberFormik;
	const { data: brokerageFirmContacts, loading } = useFetchData({
		resource: "Contacts",
		criteria: [
			{
				field: "contactBrokerageFirms.brokerFirmId",
				op: OperationCriterias.Equal,
				values: teamFormik.values.brokerageFirmIDs || [],
			},
		],
		orderField: "firstName",
		searchCriteria: getContactSearchCriteria(searchContactText),
	});

	const handleInputChange = debounce((inputValue) => {
		setSearchContactText(inputValue);
	}, 300);

	const fetchContactFirms = async (contactId: string) => {
		const contactData = await fetchMembershipResourseWithId(
			"Contacts",
			contactId
		);
		return contactData?.brokerageFirmIds;
	};
	const handleChange = async (selectedOption: any) => {
		const selectedContact = brokerageFirmContacts.find(
			(contact: any) => contact.id === selectedOption.value
		);
		const contactFirms = await fetchContactFirms(selectedContact.id);
		onChange({
			...selectedContact,
			[teamMember_brokerageFirm_fieldname]: contactFirms,
		});
	};

	return (
		<div className="form-group">
			<label className="font-medium text-sm mx-2" htmlFor={"id"}>
				Member Name <AstrixComp />
			</label>
			<Select
				{...getFieldProps("id")}
				inputId="id"
				options={transformToSelectOptions(brokerageFirmContacts)}
				value={transformToSelectOptionsOnlyName([selectedMember])}
				isDisabled={disabled}
				styles={getSelectStyle(disabled)}
				className="mx-2 mt-2"
				onInputChange={handleInputChange}
				onChange={handleChange}
				placeholder="Search for a contact..."
			/>
			{touched.id && (errors.id || errors.contactID) ? (
				<ErrorComp error={errors.id || errors.contactID} />
			) : null}
		</div>
	);
};

export default SearchTeamMemeber;

export interface SelectOption {
	value: string;
	label: string;
}

function transformToSelectOptions(originalData: any[]): SelectOption[] {
	return [
		{ value: "", label: "Select Member" },
		...originalData.map((item) => ({
			value: item.id,
			label: `${item.firstName || ""} ${item.lastName || ""} ${
				item.contactLicenseNumber ? "- " + item.contactLicenseNumber : ""
			}`,
		})),
	];
}
function transformToSelectOptionsOnlyName(originalData: any[]): SelectOption[] {
	return originalData.map((item) =>
		item.id || item.contactID
			? {
					value: item.id || item.contactID,
					label:
						item.firstName || item.lastName
							? `${item.firstName || ""} ${item.lastName || ""}`
							: "",
			  }
			: { value: "", label: "Select Member" }
	);
}

const contactFieldNames = [
	"firstName",
	"lastName",
	"memberStatusEntity.Name",
	"loginId",
	"emails.emailAddress",
	"contactAors.aor.name",
	"contactOffices.office.officeCode",
	"contactOffices.office.mainOfficeCode",
	"licenseMembers.License.LicenseNumber",
];

const getContactSearchCriteria = (searchText: string) => {
	let searchCriteria: Criteria[] = [];
	if (searchText) {
		searchCriteria = contactFieldNames.map((field) => ({
			field,
			op: OperationCriterias.Contains,
			values: [searchText],
		}));
	}
	return searchCriteria;
};

export const getSelectStyle = (disabled: boolean) => ({
	input: (base: any) => ({
		...base,
		"input:focus": {
			boxShadow: "none",
		},
	}),
	option: (defaultStyles: any, state: any) => ({
		...defaultStyles,
		paddingTop: "2px",
		paddingBottom: "2px",
		fontSize: "14px",
		fontWeight: "normal",
	}),
	valueContainer: (defaultStyles: any, state: any) => ({
		...defaultStyles,
		fontSize: "14px",
		backgroundColor: disabled ? "#e9ecef" : "transparent",
	}),
	control: (defaultStyles: any) => ({
		...defaultStyles,
		backgroundColor: disabled ? "#e9ecef" : "transparent",
	}),
});
