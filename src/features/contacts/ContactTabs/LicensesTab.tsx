import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { SelectableGrid, SelectableGridColumnType } from "../../../components/SelectableGrid/SelectableGrid";
import { syncFusionDateFormatter } from "../../../util/helpers";
import { useEffect } from "react";
import { TabTitle } from "../../../components/widgets/TabTitle";

function LicensesTab({ formik, name }: LicensesTabType) {
    const { setFieldValue, } = formik
    const { id }: any = useParams()
    const urlPart = `available/contacts/${id}/q` // urlPart is to restrict licenses to specific licenses which are available to a contact based on contactID

    const licenseIDs = useSelector((state: any) => {
        const licenseIDs: string[] = state?.selectableGrid[name]?.selectedIDs
        return (licenseIDs)
    })

    useEffect(() => {
        setFieldValue('licenseIDs', licenseIDs)
    }, [licenseIDs])

    return (<div className="flex flex-col ml-4 mr-4" >
        <TabTitle title="Associate Licenses" />
        <SelectableGrid
            className="-mx-2 mt-4"
            name={name}
            resource="Licenses"
            columns={getLicensesTabColumns()}
            fieldName="licenseIDs"
            orderBy={[{ field: 'firstName', direction: 'Asc' }]}
            preSelectedIDs={licenseIDs}
            urlPart={urlPart}
        />
    </div>)

    function isLicenseTypeCorporation(props: any) {
        let ret = false
        if (props?.licenseType?.name) {
            if (props.licenseType.name === 'Corporation') {
                ret = true
            }
        }
        return (ret)
    }

    function getLicensesTabColumns(): SelectableGridColumnType[] {
        return (
            [
                {
                    field: 'licenseNumber',
                    headerText: 'License Number',
                    width: 80,
                },
                {
                    field: 'firstName',
                    templateFn: (props: any) => {
                        if (isLicenseTypeCorporation(props)) {
                            return ('-')
                        } else {
                            return (props?.firstName ? props.firstName : '-')
                        }
                    },
                    headerText: 'First Name',
                    width: 80,
                },
                {
                    field: 'lastName',
                    templateFn: (props: any) => {
                        if (isLicenseTypeCorporation(props)) {
                            return ('-')
                        } else {
                            return (props?.lastName ? props.lastName : '')
                        }
                    },
                    headerText: 'Last Name',
                    width: 100,
                },
                {
                    // field: 'lastName',
                    // For selectableGrid search to work, field: 'some value' is required. Otherwise the search gives error
                    // If template and "field" both are present then on selection of a row certain column values disappear
                    // So I have provided "entityField" instead of "field". It just works fine
                    entityField: 'lastName',
                    templateFn: (props: any) => {
                        if (isLicenseTypeCorporation(props)) {
                            return (props?.lastName || '')
                        } else {
                            return ('-')
                        }
                    },
                    headerText: 'Corporation Name',
                    width: 120,
                },
                {
                    field: 'licenseType.name',
                    headerText: 'License Type',
                    width: 80,
                },
                {
                    field: 'licenseStatus.name',
                    headerText: 'License Status',
                    width: 80,
                },
                {
                    field: 'authorityName',
                    entityField: 'authority.name',
                    headerText: 'Authority Name',
                    width: 80,
                    // customColumnTemplate:(props:any)=><button className="bg-blue-100 px-2">test</button>
                },
                {
                    field: 'expirationDate',
                    headerText: 'Expiration Date',
                    width: 80,
                    valueAccessor: syncFusionDateFormatter,
                    isIgnoreInSearch: true,
                },
                {
                    field: 'effectiveDate',
                    headerText: 'Effective Date',
                    width: 80,
                    valueAccessor: syncFusionDateFormatter,
                    isIgnoreInSearch: true,
                },
                {
                    field: 'brokerageFirmName',
                    entityField: 'brokerageFirms.brokerageFirm.name',
                    headerText: 'Brokerage Firm',
                    width: 100
                },
            ]
        )
    }
}

export { LicensesTab }

type LicensesTabType = {
    formik: any
    name: string
}