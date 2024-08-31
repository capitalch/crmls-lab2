export interface DBA {
    licensesIDs: string[]
    officesIDs: any[]
    licenseNumber: string
    name: string
    address1: string
    address2: string
    expirationDate: string
    activeDate: string
    brokerageFirmID: string
    city: string
    zip: string
    stateID: number
    phone: string
    isDeleted: boolean
    createdBy: string
    createdOn: string
    id: string
    modifiedOn: string
}

export const Labels:any = {
    name:"Name",
    address1: "Address 1",
    address2:"Address 2",
    city: "City",
    zip: "ZIP",
    stateID:"State",
    phone:"Phone",
    brokerageFirmID: "Brokerage Firm",
    licenseNumber : "License Number",
    expirationDate: "Expiration Date",
    activeDate: "Active Date",
    licensesIDs:"Licenses",
    officeIDs:"Offices"
}