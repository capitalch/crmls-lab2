import React, { JSXElementConstructor, useEffect, useState } from 'react'
import useAorContacts from './useAorContacts';
import { AOR, AorFormComponentProps } from '../../aorInterface';


const AorContactSelector:JSXElementConstructor<AorFormComponentProps> = (props) => {
	
	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value) {
			props.setFieldValue("primaryContactId", e.target.value);
			props.onChange(e.target.value);
		}
	};
	
	const {
        contacts,
        loading:isLoading,
        error
    } = useAorContacts({currentAor:props.values})

	// if(isLoading) 
		// return <ThemeLoader height={30} width={30} />
	
	return (
		<select 
			id={props.id} 
			onBlur={props.onBlur} 
			value={props.value} 
			onChange={onChange} 
			className={props.className}
			disabled={props.disabled}
		>
			{
				contacts.length > 0 && props.values.id?
				contacts.map(contact => <option value={contact.value} key={contact.value}>{contact.label}</option>):
				<option value="">AOR does not have any contact</option>
			}

		</select>
	);
}

export default AorContactSelector