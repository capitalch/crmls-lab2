import React from "react"

function ZipCode({setFieldValue, ...props}:any) {
    return (
        <input type='text' {...props} onChange={handleOnChange} />
    )

    function handleOnChange(event: any) {
        const formatted = formatZipCode(event.target.value)
        setFieldValue(props.name, formatted)
        props?.onChange(formatted);
    }

    function formatZipCode(number: string) {
        let cleaned = ('' + number).replace(/\D/g, '')
        if (cleaned.length > 5) {
            cleaned = cleaned.substring(0, 5)
        }
        return (cleaned)
    }
}
export { ZipCode }

