function TabTitle({ title, formik = {}, errorFieldName = '', customError = '' }: TabTitleType) {
    const { errors } = formik
    return (<div className="flex flex-col">
        <div className="flex gap-4 items-center">
            <span className="font-medium">{title}</span>
            {<span className="text-red-400 text-sm mt-0.5">{errors?.[errorFieldName] || customError}</span>}
        </div>
        {/* Horizontal line at bottom */}
        <div className="flex-1 border-t-2 border-gray-100 mt-4"></div>
    </div>)
}
export { TabTitle }

type TabTitleType = {
    title: string
    formik?: any
    errorFieldName?: string
    customError?: string | undefined | string[]
}