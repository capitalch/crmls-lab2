import clsx from "clsx"
import { GenericHeader } from "../../components/GenericHeader/GenericHeader"
import { MiscArgsType, SelectableGrid, SelectableGridColumnType } from "../../components/SelectableGrid/SelectableGrid"
import { useHistory } from "react-router"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { profile_url } from "../../adapters";
import { BackButton } from "../../components/widgets/BackButton"
import _ from "lodash"
import { PatchDataClaimUnClaimArgsType, patchDataClaimUnClaim, resetQueryData, } from "../../components/QueryHelper/QueryHelperSlice"
import Toast from "../../components/widgets/Toast"
import { resetSelectableGrid } from "../../components/SelectableGrid/SelectableGridSlice"
import { useAppDispatch } from "../../app/store"

function NewContact() {
    const instanceName = 'newContact'
    const history = useHistory()
    const dispatch: any = useAppDispatch()

    const meta: any = useRef({
        licenseNo: '',
        email: '',
        isSearchClicked: false
    })
    const pre: any = meta.current

    const selectedIDs = useSelector((state: any) => {
        const ids: string[] = state?.selectableGrid[instanceName]?.selectedIDs
        return (ids)
    })
    const rows = useSelector((state: any) => {
        const rows: any[] = state?.queryHelper[instanceName]?.contents
        return (rows)
    })

    const isClaimSelectedContactVisible = selectedIDs?.length > 0
    const isCreateNewContactVisible = ((rows?.length || 0) === 0) && (pre.isSearchClicked)
    const isSearchDisabled = (!pre.licenseNo.trim()) && (!pre.email.trim())

    const orderBy: any[] = [{ field: 'firstName', direction: 'Asc' }]
    const btnClassName = 'focus:outline-none h-8 items-center rounded-md border border-transparent px-4 font-medium shadow-md focus:ring-2 focus:ring-offset-2'
    const [, setRefresh] = useState({})

    const miscArgs: MiscArgsType = {
        doQuery: (payload?: any, absoluteUrl?: string | undefined) => () => { }
    }

    const criteria: any[] = [
        {
            field: 'contactTypeID',
            op: 6,
            values: ['1']
        }
    ]

    // On page load do the cleanup
    useEffect(() => {
        const args: any = { name: instanceName }
        return (() => { //cleanup
            dispatch(resetQueryData(args))
            dispatch(resetSelectableGrid(args))
        })
    }, [])

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between bg-secondary">
                <GenericHeader title="New Contact Validation" subTitle="CRMLS new contact validation" />
                <div className="flex gap-2">
                    <BackButton link="/contacts" className="mr-8" />
                </div>
            </div>
            <div className="m-6 flex flex-col">
                <div className="flex justify-between">
                    <label className="font-semibold">Search existing contacts with following license number or email address</label>
                    {((rows?.length || 0) > 0) && <span className="text-red-500 mr-3">Contact or member already exists</span>}
                </div>
                <div className="mt-6 flex gap-4">
                    <input autoFocus type="search" value={pre.licenseNo} onChange={onChangeLicenseNo} className="h-8 rounded-md border-gray-200 pr-2 text-sm" placeholder='Give License Number' />
                    <input type="search" value={pre.email} onChange={onChangeEmail} className="h-8 rounded-md border-gray-200 pr-2 text-sm" placeholder='Give Email address' />
                    <button disabled={isSearchDisabled} onClick={handleOnSearchLicenseNoOrEmail} className={clsx(btnClassName, 'bg-green-400 ml-4 hover:bg-green-500  focus:ring-green-400 focus:bg-green-500 focus:text-white text-white disabled:bg-gray-300 disabled:cursor-not-allowed')}>Search</button>
                    <span className="ml-auto">
                        {isClaimSelectedContactVisible && <button onClick={handleOnClaimContact} className={clsx(btnClassName, 'bg-blue-400 hover:bg-blue-500  focus:ring-blue-400 focus:bg-blue-500 focus:text-white text-white mr-3')}>Claim selected contact</button>}
                        {isCreateNewContactVisible && <button onClick={onCreateNewContact} className={clsx(btnClassName, 'bg-indigo-400 hover:bg-indigo-500  focus:ring-indigo-400 focus:bg-indigo-500 focus:text-white text-white mr-3')}>Create new contact</button>}
                    </span>
                </div>
                <SelectableGrid
                    className="-ml-1 mt-6"
                    criteria={criteria}
                    name={instanceName}
                    resource="Contacts"
                    columns={getColumns()}
                    orderBy={orderBy}
                    isSingleRowSelectable={true}
                    miscArgs={miscArgs}
                    isPanelVisible={false}
                    preSelectedIDs={[]}
                    rowDataBoundCallback={rowDataBoundCallback}
                    loadDataOnInit={false}
                    link="contacts/edit"
                />
            </div>
        </div>)

    function getColumns(): SelectableGridColumnType[] {
        return (
            [
                {
                    field: 'firstName',
                    headerText: 'First Name',
                    width: 100,
                },
                {
                    field: 'lastName',
                    headerText: 'Last Name',
                    width: 100,
                },
                {
                    field: 'email',
                    headerText: 'Email',
                    width: 80,
                },
                {
                    field: 'contactLicenseNumber',
                    headerText: 'License No',
                    width: 80,
                },
                {
                    field: 'contactLicenseType',
                    headerText: 'License Type',
                    width: 60,
                },
                {
                    field: 'isClaimedByLoggedInAor',
                    headerText: 'Claimed',
                    width: 60,
                    templateFn: (props: any) => {
                        const ret = props.isClaimedByLoggedInAor ? 'Yes' : 'No'
                        return (ret)
                    },
                },
            ])
    }

    function handleOnSearchLicenseNoOrEmail() {
        pre.isSearchClicked = true
        const licenseNo = pre.licenseNo.trim()
        const email = pre.email.trim()
        const absoluteUrl: string = `${profile_url}api/app/contacts/UniquenessSearch/q?licenseNumber=${licenseNo}&emailAddress=${email}`
        miscArgs.doQuery(undefined, absoluteUrl)
    }

    function onChangeEmail(e: any) {
        pre.isSearchClicked = false
        pre.email = e.target.value
        setRefresh({})
        const args: any = { name: instanceName }
        dispatch(resetQueryData(args))
    }

    function onChangeLicenseNo(e: any) {
        pre.isSearchClicked = false
        pre.licenseNo = e.target.value
        setRefresh({})
        const args: any = { name: instanceName }
        dispatch(resetQueryData(args))
    }

    async function handleOnClaimContact() {
        const toastTitle = 'Contact claimed'
        if (!_.isEmpty(selectedIDs)) {
            const args: PatchDataClaimUnClaimArgsType = {
                name: instanceName,
                resource: 'Contacts',
                data: selectedIDs,
                isClaim: true
            }
            await dispatch(patchDataClaimUnClaim(args)).unwrap()
            Toast.fire({
                icon: 'success',
                title: toastTitle
            })
            setTimeout(() => history.replace('/Contacts'), 100)
            // Does not push into history
        }
    }

    function onCreateNewContact() {
        history.replace('/contacts/new')
    }

    function rowDataBoundCallback(args: any) {
        // Row is not selectable when the contact is already claimed by logged in AOR
        if (args?.data?.isClaimedByLoggedInAor) {
            args.isSelectable = false
        }
    }

}
export { NewContact }
