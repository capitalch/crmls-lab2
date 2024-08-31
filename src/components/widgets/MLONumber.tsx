export function MLONumber({ setFieldValue, ...props }: any) {
    return (
        <input type='text' {...props} onChange={handleOnChange} />
    )

    function handleOnChange(event: any) {
        const formatted = formatMLONumber(event.target.value)
        setFieldValue(props.name, formatted)
        props?.onChange(formatted);
    }

    function formatMLONumber(number: string) {
        let cleaned = ('' + number).replace(/\D/g, '')
        if (cleaned.length > 9) {
            cleaned = cleaned.substring(0, 9)
        }
        if (cleaned.startsWith('0')) {
            cleaned = cleaned.substring(1)
        }
        return (cleaned)
    }
}