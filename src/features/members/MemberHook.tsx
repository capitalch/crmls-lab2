import { useFormik } from "formik"
import * as Yup from 'yup'
import { MembershipMessages } from "../../util/MembershipMessages"
import { useContext, useEffect, useLayoutEffect } from "react"
import _ from 'lodash'
import { useHistory, useParams } from "react-router"
import { useSelector } from "react-redux"
import { fetchData, fetchDataOnId, insertData, resetQueryData, resetQueryHelper, updateData } from "../../components/QueryHelper/QueryHelperSlice"
import { loadAllRows, resetStandardGridRows } from "../../components/StandardGrid/StandardGridSlice"
import { resetSelectableGrid, setSelectedIDs } from "../../components/SelectableGrid/SelectableGridSlice"
import Toast from "../../components/widgets/Toast"
import { store, useAppDispatch } from "../../app/store"
import { SaveTypesEnum } from "../../util/helpers"
import Swal from "sweetalert2"
import { MembersStore, resetMembersStore } from "./MembersStore"
import { selectPrimaryOffice, deselectPrimaryOffice } from "../../components/PrimaryOffice/PrimaryOfficeSlice"
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext"

function useMember() {
    let { id }: any = useParams()
    const RESOURCE = 'contacts'
    const dispatch = useAppDispatch()
    const history = useHistory()
    const toastTitle = window.location.pathname.includes("new") ? "New member created" : "Member updated"
    const name = 'member-query'
    const addressesTabName = 'member-addresses-tab'
    const phonesTabName = 'member-phones-tab'
    const emailsTabName = 'member-emails-tab'
    const nicknamesTabName = 'member-nicknames-tab'
    const licensesTabName = 'member-licenses-tab'
    const officesTabName = 'member-offices-tab'
    const brokerageFirmsTabName = 'member-brokerage-firms-tab'
    const listingsTabName = 'member-listings-tab'
    const complianceTabName = 'member-compliance-tab'
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const memberData = useSelector((state: any) => {
        const data = state?.queryHelper?.[name]?.contents
        return (data)
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            displayName: '',
            title: '',
            comment: '',
            contactTypeID: '',
            memberTypeID: '',
            photoURL: '',
            profileImage: '',
            contentType: '',
            licenseIDs: [],
            addresses: [],
            phones: [],
            emails: [],
            nicknames: [],
            primaryAorID: '',
            billableAorID: '',
            officesIDs: [],
            brokerageFirmsIDs: [],
            systemOfRecordID: 1,
            mortgageLoanOriginatorNumber: undefined
        },
        validateOnMount: true,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, actions) => { handleOnSubmit(values, actions) },
        validationSchema: Yup.object({
            firstName: Yup.string().test('remove-required-validation-when-licensed', MembershipMessages.required, (firstName: string | undefined) => {
                let ret = false
                const state: any = store.getState()
                const length = state?.selectableGrid?.[licensesTabName]?.selectedIDs?.length || 0
                const isLicenseSelected = (length > 0)
                if (firstName) {
                    ret = true
                } else {
                    if (isLicenseSelected) {
                        ret = true
                    }
                }
                return (ret)
            })
            , lastName: Yup.string().test('remove-required-validation-when-licensed', MembershipMessages.required, (lastName: string | undefined) => {
                let ret = false
                const state: any = store.getState()
                const length = state?.selectableGrid?.[licensesTabName]?.selectedIDs?.length || 0
                const isLicenseSelected = (length > 0)
                if (lastName) {
                    ret = true
                } else {
                    if (isLicenseSelected) {
                        ret = true
                    }
                }
                return (ret)
            })
            , memberTypeID: Yup.string().required(MembershipMessages.required)
            , licenseIDs: Yup.array().test('test-required-if-memberType-agentOrBroker', MembershipMessages.requiredWhenMemberTypeAgentOrBrokerOrSalesPerson, (licenseIDs: any) => {
                let ret = true
                const memberType = MembersStore.memberTypeName || memberData?.memberTypeName
                if (['Broker', 'Agent', 'Salesperson'].includes(memberType)) {
                    if (_.isEmpty(licenseIDs)) {
                        ret = false
                    }
                }
                return (ret)
            })
            , addresses: Yup.array().required(MembershipMessages.required)
                .min(1, MembershipMessages.minOneAddressRequired)
                .test('test-isPrimary', MembershipMessages.onePrimaryAddress, (addresses: any) => {
                    let ret = true
                    const primaryAddress = addresses?.find((address: any) => address.isPrimary)
                    if (!primaryAddress) {
                        ret = false
                    }
                    return (ret)
                })
            , phones: Yup.array().required(MembershipMessages.required)
                .min(1, MembershipMessages.minOnePhoneRequired)
                .test('test-isPrimary', MembershipMessages.onePrimaryPhone, (phones: any) => {
                    let ret = true
                    const primaryPhone = phones?.find((phone: any) => phone.isPrimary)
                    if (!primaryPhone) {
                        ret = false
                    }
                    return (ret)
                })
            , emails: Yup.array().required(MembershipMessages.required)
                .min(1, MembershipMessages.minOneEmailRequired)
                .test('test-isPreferred', MembershipMessages.onePreferredEmail, (emails: any) => {
                    let ret = true
                    const preferredEmail = emails?.find((email: any) => email.isPreferred)
                    if (!preferredEmail) {
                        ret = false
                    }
                    return (ret)
                })
            , officesIDs: Yup.array()
                .test('test-required-if-memberType-agentOrBroker', MembershipMessages.requiredWhenMemberTypeAgentOrBroker, (officesIDs: any) => {
                    let ret = true
                    const memberType = MembersStore.memberTypeName || memberData?.memberTypeName
                    if (['Broker', 'Agent'].includes(memberType)) {
                        if (_.isEmpty(officesIDs)) {
                            ret = false
                        }
                    }
                    return (ret)
                })
                .test('only-one-office-selectable-for-Salesperson', MembershipMessages.oneOfficeOneSalesPerson, (officesIDs: any) => {
                    let ret = true
                    const memberType = MembersStore.memberTypeName || memberData?.memberTypeName
                    if ((memberType === 'Salesperson') && (officesIDs.length > 1)) {
                        ret = false
                    }
                    return (ret)
                })
                .test('test-required-primaryOfficeId', MembershipMessages.primaryOfficeRequiredWhenOfficeSelected, (officesIDs: any) => {
                    let ret = true
                    const state = store.getState()
                    const primaryOfficeId = state.primaryOffice?.member?.primaryOfficeId
                    if (((officesIDs?.length || 0) > 0) && (!primaryOfficeId)) {
                        ret = false
                    }
                    return (ret)
                })
            , brokerageFirmsIDs: Yup.array()
                .test('test-required-if-memberType-agentOrBroker', MembershipMessages.requiredWhenMemberTypeAgentOrBroker, (brokerageFirmsIDs: any) => {
                    let ret = true
                    const memberType = MembersStore.memberTypeName || memberData?.memberTypeName
                    if (['Broker', 'Agent'].includes(memberType)) {
                        if (_.isEmpty(brokerageFirmsIDs)) {
                            ret = false
                        }
                    }
                    return (ret)
                })
                .test('only-one-firm-selectable-for-Salesperson', MembershipMessages.oneBrokerageFirmOneSalesPerson, (brokerageFirmsIDs: any) => {
                    let ret = true
                    const memberType = MembersStore.memberTypeName || memberData?.memberTypeName
                    if ((memberType === 'Salesperson') && (brokerageFirmsIDs.length > 1)) {
                        ret = false
                    }
                    return (ret)
                })
            , mortgageLoanOriginatorNumber: Yup.number()
                .typeError(MembershipMessages.invalidMLONumber)
                .positive(MembershipMessages.invalidMLONumber)
                .test('required-when-member-type-loan-originator', MembershipMessages.requiredWhenMemberTypeLoanOriginator, (mortgageLoanOriginatorNumber: any) => {
                    let ret = true
                    const memberType = MembersStore.memberTypeName
                    if (memberType === 'Mortgage Loan Originator') {
                        if (!mortgageLoanOriginatorNumber) {
                            ret = false
                        }
                    }
                    return (ret)
                })
        })
    })

    const { setValues, values, resetForm, setSubmitting }: any = formik

    useEffect(() => { //reset values
        const args: any = { name: name }
        dispatch(resetQueryData(args))
        dispatch(resetQueryHelper(args))
        const args1: any = {}
        dispatch(resetStandardGridRows(args1))
        dispatch(resetSelectableGrid(args))
        resetForm()
        resetMembersStore()
        // Cleanup primaryOffice
        const args3: any = { name: 'contact' }
        dispatch(deselectPrimaryOffice(args3))
        return (() => {
            // Cleanup member
            globalContext.member.isReadOnly = false
            // Reset selectable grids
            const args1: any = { name: licensesTabName }
            const args2: any = { name: officesTabName }
            const args3: any = { name: brokerageFirmsTabName }
            const args4: any = { name: name }
            const args5: any = { name: listingsTabName }
            const args6: any = { name: complianceTabName }
            dispatch(resetSelectableGrid(args1))
            dispatch(resetSelectableGrid(args2))
            dispatch(resetSelectableGrid(args3))
            dispatch(resetQueryData(args4))
            dispatch(resetQueryData(args5))
            dispatch(resetQueryData(args6))
        })
    }, [dispatch])

    useEffect(() => {
        const args: any = {
            id: id,
            name: name,
            resource: RESOURCE
        }
        if (id) { //Only in edit moede
            dispatch(fetchDataOnId(args))
        }
    }, [dispatch, id])

    useLayoutEffect(() => {
        if (!_.isEmpty(memberData)) {
            if (id) {
                populateData()
            }
        }
    }, [memberData])

    function getCleanedData() {
        const addresses: any[] = _.cloneDeep(values.addresses)
        addresses.forEach((address: any) => {
            address.state = undefined
            address.addressType = undefined
            address.index = undefined
        });

        const phones: any[] = _.cloneDeep(values.phones)
        phones.forEach((phone) => {
            phone.phoneType = undefined
            phone.index = undefined
        })

        const emails: any[] = _.cloneDeep(values.emails)
        emails.forEach((email) => {
            email.emailClass = undefined
            email.index = undefined
        })

        const nknames: any[] = _.cloneDeep(values.nicknames) || []
        const nicknames = nknames.map((nk: any) => nk.nickname)

        return ({ addresses, phones, emails, nicknames })
    }

    async function handleOnSubmit(values: any, actions: any) {
        const { addresses, emails, phones, nicknames } = getCleanedData()
        const state = store.getState();
        const primaryOfficeId = state?.primaryOffice?.member?.primaryOfficeId || undefined
        const payload: MemberPayloadOptions = {
            ...values,
            firstName: values.firstName,
            middleName: values.middleName,
            lastName: values.lastName,
            displayName: values.displayName,
            title: values.title,
            comment: values.comment,
            contactTypeID: '1',
            memberTypeID: values.memberTypeID || undefined,
            photoURL: values.photoURL || undefined,
            profileImage: values.profileImage || undefined,
            contentType: values.profileImage ? 'image/jpeg;base64' : undefined,
            licenseIds: values.licenseIDs,
            addresses: addresses,
            phones: phones,
            emails: emails,
            nicknames: nicknames,
            primaryAorId: id ? values?.primaryAorID : globalContext.app.aorID,
            billableAorId: id ? values?.billableAorID : globalContext.app.aorID,
            officeIds: values.officesIDs,
            brokerageFirmIds: values.brokerageFirmsIDs,
            primaryOfficeId: primaryOfficeId,
            systemOfRecordID: values.systemOfRecordID || 1,
            mortgageLoanOriginatorNumber: values.mortgageLoanOriginatorNumber || undefined
        }
        console.log(JSON.stringify(payload))
        const isUnique: boolean = await isUniqueMember()
        if (!isUnique) {
            actions.setSubmitting(false)
            return
        }
        try {
            if (id) {// update
                await dispatch(updateData({
                    name: name,
                    id: id,
                    resource: RESOURCE,
                    payload: payload
                })).unwrap();
            } else { // insert
                const res: any = await dispatch(insertData({
                    name: name,
                    payload: payload,
                    resource: RESOURCE
                })).unwrap();
                id = res?.data?.id
            }
            const state: any = store.getState()
            if (state?.queryHelper?.[name]?.isDataSaved) {
                Toast.fire({
                    icon: 'success',
                    'title': toastTitle,
                })
                postSubmit()
            }
        } catch (e: any) {
            console.log(e)
        }
    }

    async function isUniqueMember() {
        let ret = true
        const firstName = values['firstName']
        const lastName = values['lastName']
        const memberTypeID = values['memberTypeID']
        const crit = [
            {
                field: 'firstName',
                op: 0,
                values: [firstName]
            },
            {
                field: 'lastName',
                op: 0,
                values: [lastName]
            },
            {
                field: 'memberTypeID',
                op: 0,
                values: [memberTypeID]
            }
        ]
        if (id) { //for edit
            crit.push({
                field: 'id',
                op: 6,
                values: [id]
            })
        }

        const res: any = await dispatch(fetchData({ name: name, resource: RESOURCE, doNotSetContents: true, queryPayload: { pageId: 0, pageSize: 50, criteria: crit } }))
        if (res?.payload?.data?.results && res?.payload?.data?.results.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate member',
                html: MembershipMessages.duplicateMember
            })
            ret = false
        }
        return (ret)
    }

    function postSubmit() {
        const BACKTO = 'members'
        setSubmitting(false) // It is crucial to manually set the value of 'isSubmitting' to false in order to ensure its accuracy. Formik does not automatically reset 'isSubmitting' to false after submission. This manual step is necessary as 'isSubmitting' is utilized to disable buttons during form submission to prevent double submissions. Once the submission is initiated, the button is disabled, and upon completion, it is re-enabled.
        const args: any = { name: 'member' }
        dispatch(deselectPrimaryOffice(args))
        if (values.saveType === SaveTypesEnum.SaveAndNew) {
            id = undefined
            history.push('/newMember')
        } else if (values.saveType === SaveTypesEnum.SaveAndClose) {
            history.push(`/${BACKTO}`)
        } else {
            history.push(`/${BACKTO}/edit/${id}`)
            const args: any = {
                id: id,
                name: name,
                resource: RESOURCE
            }
            dispatch(fetchDataOnId(args))
        }
    }

    function populateData() {
        let nicknames = []
        // nicknames is available as array of strings. Convert it to array of objects for compatibilty purpose
        if (memberData?.nicknames && (memberData?.nicknames.length > 0)) {
            nicknames = memberData.nicknames.map((x: string) => ({ nickname: x }))
        }
        setValues({
            ...memberData,
            firstName: memberData['firstName'],
            middleName: memberData['middleName'],
            lastName: memberData['lastName'],
            displayName: memberData['displayName'],

            title: memberData['title'],
            comment: memberData['comment'],
            contactTypeID: memberData['contactTypeID'],
            memberTypeID: memberData['memberTypeID'],
            memberTypeName: memberData['memberTypeName'],
            photoURL: memberData['photoURL'],
            licenseIDs: memberData['licenseIds'],
            addresses: memberData['addresses'],
            phones: memberData['phones'],
            emails: memberData['emails'],
            nicknames: nicknames,
            primaryAorID: memberData['primaryAorId'],
            billableAorID: memberData['billableAorId'],
            officesIDs: memberData['officeIds'],
            brokerageFirmsIDs: memberData['brokerageFirmIds'],
            systemOfRecordID: memberData['systemOfRecordID'],
            mortgageLoanOriginatorNumber: memberData['mortgageLoanOriginatorNumber']
        })
        loadAddressesDataAndIndex()
        loadPhonesDataAndIndex()
        loadEmailsDataAndIndex()
        loadNicknamesDataAndIndex()
        const args1: any = { name: licensesTabName, selectedIDs: memberData['licenseIds'] }
        dispatch(setSelectedIDs(args1))
        const args2: any = { name: officesTabName, selectedIDs: memberData['officeIds'] }
        dispatch(setSelectedIDs(args2))
        const args3: any = { name: brokerageFirmsTabName, selectedIDs: memberData['brokerageFirmIds'] }
        dispatch(setSelectedIDs(args3))
        const args4: any = { name: 'member', id: memberData['primaryOfficeId'] }
        dispatch(selectPrimaryOffice(args4)) // to display the primaryOfficeId as checkbox in Offices tab
        globalContext.member.isReadOnly = (memberData['systemOfRecordID'] === 1) ? false : true
    }

    function loadAddressesDataAndIndex() {
        const args: any = {
            name: addressesTabName,
            allRows: _.cloneDeep(memberData['addresses'] || []).map((item: any, index: number) => {
                const row = {
                    isPrimary: item.isPrimary || false,
                    address1: item.address1,
                    address2: item.address2,
                    city: item.city,
                    stateID: item.stateID,
                    stateName: item.stateName,
                    zipcode: item.zipcode,
                    addressTypeID: item.addressTypeID,
                    addressTypeName: item.addressTypeName,
                    index: index + 1,
                    id: item.id || undefined
                }
                return (row)
            })
        }
        dispatch(loadAllRows(args))
        MembersStore[addressesTabName] = {}
        MembersStore[addressesTabName]['origRows'] = _.cloneDeep(args.allRows)
    }

    function loadPhonesDataAndIndex() {
        const args: any = {
            name: phonesTabName,
            allRows: _.cloneDeep(memberData['phones'] || []).map((item: any, index: number) => {
                const row = {
                    isPrimary: item.isPrimary || false,
                    phone: item.phone,
                    extension: item.extension,
                    phoneTypeID: item.phoneTypeID,
                    phoneTypeName: item.phoneTypeName,
                    index: index + 1,
                    id: item.id || undefined
                }
                return (row)
            })
        }
        dispatch(loadAllRows(args))
        MembersStore[phonesTabName] = {}
        MembersStore[phonesTabName]['origRows'] = _.cloneDeep(args.allRows)
    }

    function loadEmailsDataAndIndex() {
        const args: any = {
            name: emailsTabName,
            allRows: _.cloneDeep(memberData['emails'] || []).map((item: any, index: number) => {
                const row = {
                    isPreferred: item.isPreferred || false,
                    emailAddress: item.emailAddress,
                    emailClassID: item.emailClassID,
                    emailClassName: item.emailClassName,
                    index: index + 1,
                    id: item.id || undefined
                }
                return (row)
            })
        }
        dispatch(loadAllRows(args))
        MembersStore[emailsTabName] = {}
        MembersStore[emailsTabName]['origRows'] = _.cloneDeep(args.allRows)
    }

    function loadNicknamesDataAndIndex() {
        const args: any = {
            name: nicknamesTabName,
            allRows: _.cloneDeep(memberData['nicknames'] || []).map((item: any, index: number) => {
                const row = {
                    nickname: item,
                    index: index + 1,
                }
                return (row)
            })
        }
        dispatch(loadAllRows(args))
        MembersStore[nicknamesTabName] = {}
        MembersStore[nicknamesTabName]['origRows'] = _.cloneDeep(args.allRows)
    }

    return ({ formik, name, addressesTabName, phonesTabName, emailsTabName, nicknamesTabName, memberData, licensesTabName, officesTabName, brokerageFirmsTabName, listingsTabName, complianceTabName })
}
export { useMember }

type MemberPayloadOptions = {
    id?: string
    createdBy?: string
    modifiedBy?: string
    firstName: string
    middleName: string
    lastName: string
    displayName: string
    title: string
    comment: string
    contactTypeID: string | undefined
    memberTypeID: string | undefined
    photoURL: string | undefined
    profileImage: string | undefined
    contentType: string | undefined
    licenseIds: string[]
    addresses: MemberAddressType[]
    phones: MemberPhoneType[]
    emails: MemberEmailType[]
    nicknames: MemberNicknamesType[]
    primaryAorId: string | undefined
    billableAorId: string | undefined
    officeIds: string[]
    brokerageFirmIds: string[]
    primaryOfficeId: string | undefined
    systemOfRecordID: number
    mortgageLoanOriginatorNumber: number | undefined
}

type MemberAddressType = {
    id?: string
    address1: string
    address2: string
    city: string
    stateID: number
    zipcode: string
    addressTypeID: number
}

type MemberPhoneType = {
    id?: string
    phone: string
    extension: string
    isPrimary: boolean
    phoneTypeID: number
}

type MemberEmailType = {
    id?: string
    emailAddress: string
    emailClassID: number
    isPreferred: boolean
}

type MemberNicknamesType = {
    id?: string
    nickname: string
}

