import { useEffect, useState } from 'react'
import { fetchMembershipResourseWithId } from '../adapters'
import FormikInput from '../util/controls/formikInput'

const LookupInput = ({resource, value, label, fieldName, entityFieldName, isLink}:{resource:string, value:string|number, label:string,fieldName:string, entityFieldName?:string, isLink?:boolean}) => {
    const [name, setName] = useState("")

    const  setResourceName = async () => {
        const data = await fetchMembershipResourseWithId(resource, value)
        entityFieldName ? setName(data?.[entityFieldName]) :  setName(data?.name)
    }

    useEffect(()=>{
        setResourceName()
    },[value, resource])

    return (
        <FormikInput
            fieldName={fieldName}
            label={label}
            type="text" 
            value={name}
        />
    )
}

export default LookupInput