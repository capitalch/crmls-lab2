import React, { useEffect } from 'react'
import { TeamContact } from './TeamMemembersForm'
import ThemeLoader from '../../../../components/widgets/ThemeLoader'
import useFetchData from '../../../../util/hooks/useFetchData'
import { OperationCriterias } from '../../../../Interfaces/Criteria'
import FormikInput from '../../../../util/controls/formikInput'

const TeamMemberDetails = ({contact, onLicenseTypeChange}:{contact:TeamContact, onLicenseTypeChange:(type:string) => void}) => {

    const {data:licenses, loading:isLicenseTypeLoading} = useFetchData({
        resource:'Licenses', 
        criteria:[{
            field:"licenseNumber",
            op:OperationCriterias.Equal,
            values:[contact.contactLicenseNumber]
        }],
        orderField:'firstName'
    })

    useEffect(()=>{
        onLicenseTypeChange(licenses?.[0]?.licenseType?.name)
    },[licenses?.[0]?.licenseType?.name])

    return (
        <div>
            <div className="form-group">
                <FormikInput 
                    fieldName={'contactLicenseNumber'}
                    type="text" 
                    label='License Number'
                    value={contact?.contactLicenseNumber ? `${contact?.contactLicenseNumber}` : ""}
                    className='w-full p-2'
                    disabled={true}
                />
            </div>
            <div className="form-group">
                {!isLicenseTypeLoading ?  <FormikInput 
                    fieldName={'licenseType'}
                    type="text" 
                    label='License Type'
                    value={licenses?.[0]?.licenseType?.name || ""}
                    className='w-full p-2'
                    disabled={true}
                /> : <ThemeLoader height={30} width={30} />}
            </div>

        </div>
    )
}

export default TeamMemberDetails