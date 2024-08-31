import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { FormikProps, useFormikContext } from "formik";
import Criteria, { OperationCriterias } from "../../../Interfaces/Criteria";
import Select from "react-select";
import { debounce } from "lodash";
import { AstrixComp } from "../../../components/widgets/AstrixComp";
import { ErrorComp } from "../../../components/widgets/ErrorComp";

const FormikMultiSelect = ({
	fieldName,
	label,
	primaryIdentifier: id,
	resource,
	criteria = [],
	orderField,
	displayField,
	displayTemplate,
	formik: propsFormik,
	onChange: propsOnChange,
	required = false,
	isTypeAhead = false,
	className,
	disabled = false,
	preventDefault = false,
	method,
	isMulti = false,
}: FormikSelectProps) => {
	const [searchText, setSearchText] = useState("");
	const contextFormik = useFormikContext();
	const formik: FormikProps<any> = propsFormik || contextFormik;
	const primaryIdentifier = id || "id";
	const { getFieldProps } = formik;
	const placeholder = `Select ${label}`;

	const { data } = useFetchData({
		resource,
		criteria,
		orderField,
		searchCriteria:
			searchText && isTypeAhead
				? [
						{
							field: displayField ?? "name",
							op: OperationCriterias.Contains,
							values: [searchText],
						},
				  ]
				: [],
		method,
	});

	const handleInputChange = debounce((inputValue) => {
		setSearchText(inputValue);
	}, 300);

	const handleChange = (selectedOption: any) => {
		const selectedData = selectedOption.map((option: any) => option.value);
		!preventDefault && formik.setFieldValue(fieldName, selectedData);
		propsOnChange && propsOnChange(selectedData);
	};

	return (
		<div className={className || "w-1/2 p-2"}>
			<label className="font-medium text-sm" htmlFor={id}>
				{label} {required ? <AstrixComp /> : null}
			</label>
			<Select
				{...getFieldProps(fieldName)}
				inputId={fieldName}
				options={transformToSelectOptions(data)}
				value={transFormValueToSelectOption(formik.values?.[fieldName])}
				onInputChange={handleInputChange}
				onChange={handleChange}
				placeholder={placeholder}
				styles={getStyle()}
				className={`mt-1 ${disabled ? "bg-gray-200" : ""}`}
				isDisabled={disabled}
				isMulti={isMulti}
			/>
			<div className="mt-1">
				{formik?.touched?.[fieldName] && formik?.errors?.[fieldName] ? (
					<ErrorComp error={formik?.errors?.[fieldName]} />
				) : null}
			</div>
		</div>
	);

	function transformToSelectOptions(originalData: any[]): SelectOption[] {
		return originalData?.map((item) => formatDataToReactSelectOptions(item));
	}

	function transFormValueToSelectOption(value: string[]): SelectOption[] {
		const selectedData = data?.filter((item: any) =>
			value?.includes(item[primaryIdentifier])
		);
		const selectedOptions =
			data.length && value
				? selectedData?.map((item: any) => formatDataToReactSelectOptions(item))
				: [];

		return selectedOptions;
	}

	function formatDataToReactSelectOptions(item: any): SelectOption {
		return {
			value: item?.[primaryIdentifier],
			label: displayTemplate
				? displayTemplate(item)
				: displayField
				? item?.[displayField]
				: item?.name,
		};
	}

	function getStyle() {
		return {
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
			}),
		};
	}
};

export default FormikMultiSelect;

export interface SelectOption {
	value: string;
	label: string;
}

export interface FormikSelectProps {
	fieldName: string;
	label: string;
	primaryIdentifier?: string;
	formik?: any;
	resource: string;
	criteria?: Criteria[];
	orderField?: string;
	displayTemplate?: (data: any) => string;
	displayField?: string;
	required?: boolean;
	isTypeAhead?: boolean;
	onChange?: (e: any) => void;
	className?: string;
	disabled?: boolean;
	preventDefault?: boolean;
	method?: "get" | "post";
	isMulti?: boolean;
}
