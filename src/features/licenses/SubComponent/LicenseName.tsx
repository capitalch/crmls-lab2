import React, { useEffect } from 'react'
import { ILicense } from '../licenseInterface'
import { BasicGridColumnType } from '../../../components/BasicGrid/BasicGrid'

interface IProps extends ILicense {
    column: BasicGridColumnType
}

interface IPropsList {
  object: IProps
}

const LicenseName = (props:IProps | IPropsList | any) => {
    const columnDetails = props.object || props

    const getName = () => {
      switch(columnDetails.column?.field){
        case "corporationName" : return columnDetails.licenseType?.name === "Corporation" ? columnDetails.lastName : "-"
        case "lastName" :  return columnDetails.licenseType?.name === "Corporation" ?  "-" : columnDetails.lastName 
        case "firstName" :  return columnDetails.firstName || "-"
        default: return "-"
      }
    }
  return getName() || "-"
}

export default LicenseName