export function MemberCaseDetails({ caseId }: { caseId: string }) {
    return (<div>Case #: {caseId || 'No caseId'}</div>)
}