import {  useParams } from "react-router"
import { SelectableGrid, SelectableGridColumnType } from "../../../../components/SelectableGrid/SelectableGrid"
import { MembershipMessages } from "../../../../util/MembershipMessages"
import { syncFusionDateFormatter, syncFusionNumberFormatter } from "../../../../util/helpers"
import SlidingPane from "react-sliding-pane"

import { MemberListing } from "./MemberListing"
import { useState } from "react"

export function ListingsTab({ loginId, name }: { loginId: string, name: string }) {
    const [isSlidingPaneOpen, setIsSlidingPaneOpen] = useState(false)
    const [listingId, setListingId] = useState('')
    let { id }: any = useParams()
    // search on edita tesoro
    // const location: any = useLocation()
    // const seachParams = new URLSearchParams(location.search)
    // const loginId: string = seachParams.get('loginId') || 'loginIdNotFound' // The loginIdNotFound is used because this will never have any value

    return (
        <div>
            {id ? <SelectableGrid
                allowSearch={false}
                apiNameType="crib"
                allowSelection={false}
                columns={getColumns()}
                filters={getFilters()}
                name={name}
                orderBy={[
                    {
                        "field": "ModificationTimestamp",
                        "direction": 0
                    }
                ]}
                criteria={[{
                    "field": "ListAgentMlsId",
                    "op": 0,
                    "values": [
                        loginId
                    ]
                }]}
                resource='Property_CrossProperty'
            /> : <div><h5>{MembershipMessages.notApplicableForNewMember}</h5></div>}
            <SlidingPane isOpen={isSlidingPaneOpen} title='Listing Details' onRequestClose={handlePaneClose}>
                <MemberListing listingId={listingId} />
            </SlidingPane>
        </div>)

    function DrillDownWrapper(props: any) {
        return (
            <a className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                    const listingId = props.listingId
                    if (listingId) {
                        setIsSlidingPaneOpen(true)
                        setListingId(listingId)
                    }
                }}>
                {props.children}
            </a>
        )
    }

    function generalTemplateFn(props: any, value: string) {
        let val: string = value
        if (props.column.valueAccessor) {
            val = props.column.valueAccessor(props.column.field, props) || '-'
        }
        return (
            <DrillDownWrapper {...props}>
                {val}
            </DrillDownWrapper>
        )
    }

    function getAssembledAddress(field: string, data: any) {
        return `${data['streetDirPrefix'] || ''} ${data['streetNumberNumeric'] || ''} ${data['streetName'] || ''} ${data['streetSuffix'] || ''} ${data['streetSuffixModifier'] || ''} ${data['unitNumber'] || ''} ${data['city'] || ''} ${data['stateOrProvince'] || ''} ${data['postalCode'] || ''}`
    }

    function getColumns(): SelectableGridColumnType[] {
        return ([
            {
                field: 'listingId',
                headerText: 'Listing ID',
                width: 60,
                templateFn: (props: any) => generalTemplateFn(props, props.listingId)
            },
            {
                field: 'address',
                headerText: 'Address',
                width: 200,
                valueAccessor: getAssembledAddress,
                templateFn: (props: any) => generalTemplateFn(props, props.address)
            },
            {
                field: 'propertyType',
                headerText: 'Property Type',
                width: 60,
                templateFn: (props: any) => generalTemplateFn(props, props.propertyType)
            },
            {
                field: 'listPrice',
                headerText: 'List Price',
                width: 60,
                valueAccessor: syncFusionNumberFormatter,
                textAlign: 'Right',
                templateFn: (props: any) => generalTemplateFn(props, props.listPrice)
            },
            {
                field: 'OriginalEntryTimestamp',
                headerText: 'Entry Date',
                width: 60,
                valueAccessor: syncFusionDateFormatter,
                textAlign: 'Center',
                templateFn: (props: any) => generalTemplateFn(props, props.OriginalEntryTimestamp)
            },
            {
                field: 'onMarketDate',
                headerText: 'On Market Date',
                width: 60,
                valueAccessor: syncFusionDateFormatter,
                textAlign: 'Center',
                templateFn: (props: any) => generalTemplateFn(props, props.onMarketDate)
            },

        ])
    }

    function getFilters() {
        return ([])
    }

    function handlePaneClose() {
        setIsSlidingPaneOpen(false)
    }
}