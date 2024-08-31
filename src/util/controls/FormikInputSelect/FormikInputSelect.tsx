import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { FormikProps, useFormikContext } from "formik";
import Criteria, { OperationCriterias } from "../../../Interfaces/Criteria";
import Select from "react-select";
import { debounce } from "lodash";
import { AstrixComp } from "../../../components/widgets/AstrixComp";
import { ErrorComp } from "../../../components/widgets/ErrorComp";

const FormikSelect = ({
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
		const selectedData = data.find(
			(item: any) => item[primaryIdentifier] === selectedOption.value
		);
		!preventDefault &&
			formik.setFieldValue(fieldName, selectedData?.[primaryIdentifier] || "");
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
			/>
			<div className="mt-1">
				{formik?.touched?.[fieldName] && formik?.errors?.[fieldName] ? (
					<ErrorComp error={formik?.errors?.[fieldName]} />
				) : null}
			</div>
		</div>
	);

	function transformToSelectOptions(originalData: any[]): SelectOption[] {
		return [
			{ value: "", label: placeholder },
			...originalData.map((item) => ({
				value: item?.[primaryIdentifier],
				label: displayTemplate
					? displayTemplate(item)
					: displayField
					? item?.[displayField]
					: item?.name,
			})),
		];
	}

	function transFormValueToSelectOption(value: string): SelectOption[] {
		const selectedData = data.find(
			(item: any) => item[primaryIdentifier] === value
		);
		return data.length && value
			? [
					{
						value,
						label: displayTemplate
							? displayTemplate(selectedData)
							: displayField
							? selectedData?.[displayField]
							: selectedData?.name || "",
					},
			  ]
			: [{ value: "", label: placeholder }];
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
			control: (defaultStyles: any, state: any) => ({
				...defaultStyles,
				backgroundColor: "transparent",
			}),
			singleValue: (defaultStyles: any, state: any) => ({
				...defaultStyles,
				color: "#545454 !important",
			}),
		};
	}
};

export default FormikSelect;

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
}
