import React, { JSXElementConstructor, useEffect, useState } from 'react'
import useMemebershipSelect from './useMemebershipSelect';
import { FormCustomComponentProps } from '../../../Interfaces';
import Criteria from '../../../Interfaces/Criteria';

export interface MembershipSelectProps extends FormCustomComponentProps {
	disabled: boolean | undefined;
	resource:string
	label:string
	keyField:string
	valueField:string
	criteria?:Criteria[]
}
const MemebrshipSelect:JSXElementConstructor<MembershipSelectProps> = (props) => {
	
	const {
        options,
        loading:isLoading,
        error
    } = useMemebershipSelect(props)
	
	// const {resource, label, keyField, valueField, criteria, ...inputProps} = props

	// if(isLoading) 
		// return <ThemeLoader height={30} width={30} />
		
	return (
		<select 
			{...props}
		>
			{
				options && options.length > 0 ?
				[
					<option value="" key={"placeholder"}>Select {props.label}</option>, 
					...options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)
				]:
				<option value="">Select {props.label}</option>
			}

		</select>
	);
}

export default MemebrshipSelect