import { useEffect } from "react";
import { SelectableGrid } from "../../../components/SelectableGrid/SelectableGrid";
import { TabTitle } from "../../../components/widgets/TabTitle";
import { syncFusionDateFormatter } from "../../../util/helpers";
import { useSelector } from "react-redux";

export function LicensesTab({ formik, name, selectedIDs }: { formik: any, name: string, selectedIDs?: string[] }) {
    const { errors, setFieldValue } = formik
    const licenseIDs = useSelector((state: any) => {
        const licenseIDs: string[] = state?.selectableGrid[name]?.selectedIDs
        return (licenseIDs)
    })

    useEffect(() => {
        setFieldValue('licenseIDs', licenseIDs)
    }, [licenseIDs])

    return (<div className="flex flex-col ml-4 mr-4">
        <TabTitle title="Associate Licenses" customError={(errors?.licenseIDs) ? errors?.licenseIDs : ''} />
        <SelectableGrid
            className="-mx-2 mt-4"
            name={name}
            resource="Licenses"
            columns={getLicensesTabColumns()}
            fieldName="licenseIDs"
            orderBy={[{ field: 'firstName', direction: 'Asc' }]}
            preSelectedIDs={selectedIDs}
        // urlPart={urlPart}
        />
    </div>)

    function getLicensesTabColumns(): any[] {
        return (
            [
                {
                    field: 'licenseNumber',
                    headerText: 'License Number',
                    width: 80,
                },
                {
                    field: 'firstName',
                    template: (props: any) => {
                        if (isLicenseTypeCorporation(props)) {
                            return ('-')
                        } else {
                            return (props?.firstName || '')
                        }
                    },
                    headerText: 'First Name',
                    width: 80,
                },
                {
                    field: 'lastName',
                    template: (props: any) => {
                        if (isLicenseTypeCorporation(props)) {
                            return ('-')
                        } else {
                            return (props?.lastName || '')
                        }
                    },
                    headerText: 'Last Name',
                    width: 80,
                },
                {
                    entityField: 'lastName',
                    template: (props: any) => {
                        if (isLicenseTypeCorporation(props)) {
                            return (props?.lastName || '')
                        } else {
                            return ('-')
                        }
                    },
                    headerText: 'Corporation Name',
                    width: 160,
                },
                {
                    field: 'licenseType.name',
                    // entityField: "licenseType.name",
                    headerText: "Type",
                    width: 80,
                },
                {
                    field: 'nickname',
                    headerText: 'Nick Name',
                    width: 80,
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
                // {
                //     field: 'id',
                //     isPrimaryKey: true,
                //     headerText: 'ID',
                //     visible: false,
                // },
            ]
        )
    }

    function isLicenseTypeCorporation(props: any) {
        let ret = false
        if (props?.licenseType?.name) {
            if (props.licenseType.name === 'Corporation') {
                ret = true
            }
        }
        return (ret)
    }
}