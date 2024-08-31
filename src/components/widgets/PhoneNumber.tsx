import React from 'react'
import { formatPhoneNumber } from '../../util/helpers';

function PhoneNumber({ setFieldValue, ...props }: any) {
    return (
        <input type='tel' {...props} onChange={handleOnChange} />
    )

    function handleOnChange(event: any) {
        const formatted = formatPhoneNumber(event.target.value);
        setFieldValue(props.name, formatted)
        props?.onChange(formatted);
    }
}
export { PhoneNumber }