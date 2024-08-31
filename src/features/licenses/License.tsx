import React from 'react'
import { GenericHeader } from '../../components/GenericHeader/GenericHeader'
import Tabs from '../../components/tabs/Tabs'
import FormikInput from '../../util/controls/formikInput'
import { StandardSelect } from '../../components/StandardSelect/StandardSelect'
import { AstrixComp } from '../../components/widgets/AstrixComp'
import Loader from '../../components/widgets/Loader'
import useLicense from './LicenseHook'
import { fetchMembershipResourseWithId } from '../../adapters'
import LookupInput from '../../components/LookupInput'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LinkInput from '../../util/controls/link'
import { ILicense } from './licenseInterface'
import CloseButton from '../../util/controls/closeButton'
import { license_resource_name } from './Licenses'

const License = () => {
  const {resource:license, loading}:{resource:ILicense, loading:boolean}= useLicense()
  const inputClassName = 'w-1/2 p-2'
   
  if(loading || !license)
      return  <div className="fixed z-10 top-1/2 left-1/2 pl-20"><Loader /></div>

  return <div className="flex flex-col w-full mb-32 sm:mb-16 animate-fade">
      {(loading) && <div className="fixed z-10 top-1/2 left-1/2 pl-20"><Loader /></div>}
      <div className="w-full border-b flex px-2 bg-secondary">
        <GenericHeader 
            title={`${license?.licenseNumber}`}
            subTitle="CRMLS License" 
        />
        <CloseButton resource={license_resource_name}/>
      </div>
      <div className="mx-4">
          <div key='license-details' data-label='Details' >
            <div className="flex flex-wrap">
                  
                      <FormikInput
                          fieldName="licenseNumber"
                          label="License Number"
                          type="text" 
                          value={license?.licenseNumber}
                      />
                  
                  
                      <LookupInput 
                        resource='LicenseTypeLookups'
                        value={license?.licenseTypeID}
                        label='License Type'
                        fieldName='LicenseTypeID'
                      />
                  
                  
                      <LookupInput 
                        resource='LicenseStatusLookups'
                        value={license?.licenseStatusID}
                        label='License Status'
                        fieldName='LicenseTypeID'
                      />
                  
                  
                    <FormikInput
                        fieldName="expirationDate"
                        label="Expiration Date"
                        type="text" 
                        value={dayjs(license?.expirationDate).format('MM-DD-YYYY')}
                    />
                  {(license.firstName || license.lastName) && 
                  <>
                   {license.firstName && <>
                        {
                          license.contactId ? <LinkInput 
                            id={'firstName'}
                            label='First Name'
                            link={`/contacts/edit/${license?.contactId}`}
                            value={license?.firstName}
                          /> : 
                          <FormikInput
                              fieldName="firstName"
                              label="First Name"
                              type="text" 
                              value={license?.firstName}
                          />
                        }
                    </>
                    }
                    {
                      license.contactId ? <LinkInput 
                        id={'lastName'}
                        label='Last Name'
                        link={`/contacts/edit/${license?.contactId}`}
                        value={license?.lastName}
                      /> : 
                      <FormikInput
                          fieldName="lastName"
                          label={license.licenseTypeID === 1 ? "Corporation Name" : "Last Name"}
                          type="text" 
                          value={license?.lastName}
                      />
                    }
                  </>
                  }
                  {license.officeName && <div className={`${inputClassName}`}>
                    <LinkInput 
                      id={'officeId'}
                      label='Office'
                      link={`/offices/view/${license?.officeId}`}
                      value={license?.officeName}
                    />
                  </div>}
                  {license.brokerageFirmName && <div  className={`${inputClassName}`} >
                    <LinkInput 
                      id={'brokerageFirmId'} 
                      label='Brokerage Firm' 
                      link={`/brokerageFirms/view/${license?.brokerageFirmId}`} 
                      value={license?.brokerageFirmName} 
                    />
                  </div>}
            </div>
          </div>
      </div>
  </div>
}

export default License

const inputClassName = 'w-full text-sm mt-2 h-8 border-1 border-gray-200 hover:border-gray-300 block w-20 p-3'
