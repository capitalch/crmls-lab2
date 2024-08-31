function RegionInput({ setFieldValue, ...props }: any) {
    return (
        <input type='text' {...props} onChange={handleOnChange} />
    )

    function handleOnChange(event: any) {
        const formatted = formatRegion(event.target.value);
        setFieldValue(props.name, formatted)
        props?.onChange(formatted);
    }
}
export { RegionInput }

function formatRegion(number: string): string {
    // Remove all non-digit characters
    let cleaned = number.replace(/\D/g, '');

    // Ensure the length of the cleaned string is not more than 5
    if (cleaned.length > 2) {
        cleaned = cleaned.substring(0, 2);
    }

    return cleaned;
}