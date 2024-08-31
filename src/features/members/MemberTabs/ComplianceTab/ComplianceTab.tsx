import { useParams } from "react-router";
import _ from 'lodash'
import { SelectableGrid, SelectableGridColumnType } from "../../../../components/SelectableGrid/SelectableGrid";
import { FilterOptionsType } from "../../../../components/SelectableGrid/filters/SelectableGridFilters";
import { ExclamationIcon } from "../../../../components/widgets/icons/ExclamationIcon";
import { MembershipMessages } from "../../../../util/MembershipMessages";
import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import { MemberCaseDetails } from "./MemberCaseDetails";

export function ComplianceTab({name}:{name:string}) {
    // const instanceName: string = 'members-compliance'
    const [isSlidingPaneOpen, setIsSlidingPaneOpen] = useState(false)
    const [caseId, setCaseId] = useState('')
    let { id }: any = useParams()
    // search on edita tesoro: '44621ccd-a2d7-48e7-aecb-83d79b3a4955'
    return (<div>
        {id ? <SelectableGrid
            allowSearch={false}
            apiNameType="compliance"
            allowSelection={false}
            columns={getColumns()}
            criteria={[{ field: 'memberId', op: 0, values: [id] }]}
            // criteria={[{ field: 'memberId', op: 0, values: ['44621ccd-a2d7-48e7-aecb-83d79b3a4955'] }]}
            filters={getFilters()}
            name={name}
            orderBy={[{ field: 'createdOn', direction: 'Desc' }]}
            resource='ComplianceCases'
        /> : <div><h5>{MembershipMessages.notApplicableForNewMember}</h5></div>}
        <SlidingPane isOpen={isSlidingPaneOpen} title='Case Details' onRequestClose={handlePaneClose}>
            <MemberCaseDetails caseId={caseId} />
        </SlidingPane>
    </div>)

    function DrillDownWrapper(props: any) {
        return (
            <a className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                    const caseId = props.id
                    if (caseId) {
                        setIsSlidingPaneOpen(true)
                        setCaseId(caseId)
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

    function getColumns(): SelectableGridColumnType[] {
        return ([
            {
                field: 'caseNumber',
                headerText: 'Case ID',
                width: 60,
                templateFn: (props: any) => generalTemplateFn(props, props.caseNumber)
            },
            {
                field: 'listingId',
                headerText: 'Listing ID',
                width: 60,
                templateFn: (props: any) => generalTemplateFn(props, props.listingId)
            },
            {
                field: 'memberName',
                headerText: 'Agent',
                width: 100,
                templateFn: (props: any) => generalTemplateFn(props, props.memberName)
            },
            {
                field: 'violations',
                headerText: 'Rules',
                width: 200,
                templateFn: rulesTemplateFn
            },
            {
                field: 'reportIds',
                headerText: 'Reports',
                width: 60,
                templateFn: reportsTemplateFn,
            },
            {
                field: 'assignName',
                headerText: 'Assignee',
                width: 100,
                templateFn: (props: any) => generalTemplateFn(props, props.assignName)
            },
            {
                field: 'status',
                headerText: 'Disposition',
                width: 60,
                templateFn: (props: any) => generalTemplateFn(props, props.status)
            },
            {
                field: 'unseenChanges',
                headerText: 'Alert',
                width: 60,
                templateFn: alertTemplateFn
            }
        ])
    }

    function getFilters(): FilterOptionsType[] {
        const filters: FilterOptionsType[] = [
            {
                controlType: 'text',
                name: 'caseNumber',
                filterFieldName: 'caseNumber',
                displayName: 'Case ID'
            },
            {
                controlType: 'text',
                name: 'listingId',
                filterFieldName: 'listingId',
                displayName: 'Listing ID'
            },
            {
                controlType: 'select',
                name: 'disposition',
                filterFieldName: 'status',
                displayName: 'Disposition',
                selectOptionsArray: [
                    { value: 'Assigned', name: 'Assigned' },
                    { value: 'Closed', name: 'Closed' },
                    { value: 'Pending', name: 'Pending' },
                    { value: 'UnAssigned', name: 'UnAssigned' },
                ]
            }
        ]
        return (filters)
    }

    function handlePaneClose() {
        setIsSlidingPaneOpen(false)
    }

    function alertTemplateFn(props: any) {
        let ret: any = ''
        if (props?.unseenChanges) {
            ret = <span>
                <ExclamationIcon className="ml-.5 text-lg text-red-400" />
            </span>
        } else {
            ret = <span className="ml-2">
                -
            </span>
        }
        return (
            <DrillDownWrapper {...props}>
                {ret}
            </DrillDownWrapper>
        )
    }

    function reportsTemplateFn(props: any) {
        const reportIds = props.reportIds
        const ret: any =  (reportIds ? reportIds.length : 'None')
        return (
            <DrillDownWrapper {...props}>
                {ret}
            </DrillDownWrapper>
        )
    }

    function rulesTemplateFn(props: any) {
        let ret: any = ''
        const violations: any[] = props?.violations
        if ((!_.isEmpty(violations)) && violations.length > 0) {
            const violationsList: string[] = violations.reduce((acc, violation) => {
                if (violation?.mlsRule?.ruleNumber) {
                    if (violation?.mlsRule?.ruleTitle) {
                        const ruleNumber: string = violation.mlsRule.ruleNumber
                        const ruleTitle: string = violation.mlsRule.ruleTitle
                        acc.push(`${ruleNumber} ${ruleTitle}`)
                    }
                }
                return acc
            }, [] as any[])
            const vList: any[] = violationsList.map((violation, index) => <div className='' key={index}>{violation}</div>)
            ret = (<div className='flex flex-column flex-wrap p-1' data-bs-toggle="tooltip" data-bs-placement="top">{vList}</div>)
            return (
                <DrillDownWrapper {...props}>
                    {ret}
                </DrillDownWrapper>
            )
        }

        return (ret)
    }
}