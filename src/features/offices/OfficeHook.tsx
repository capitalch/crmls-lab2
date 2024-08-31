import { useFormik } from "formik";
import * as Yup from 'yup';
import _ from 'lodash'
import { MembershipMessages } from "../../util/MembershipMessages";
import { useHistory, useParams } from "react-router";
import { store, useAppDispatch } from "../../app/store";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchData, fetchDataOnId, insertData, resetQueryHelper, updateData } from "../../components/QueryHelper/QueryHelperSlice";
import { SaveTypesEnum, formatPhoneNumber } from "../../util/helpers";
import { resetSelectableGrid, setSelectedIDs } from "../../components/SelectableGrid/SelectableGridSlice";
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext";
import Swal from "sweetalert2";
import Toast from "../../components/widgets/Toast";

// N.B: Formik validateOnMount does extra renders of this component 6 times
export function useOffice() {
    let { id }: any = useParams()
    const RESOURCE = 'offices'
    const dispatch = useAppDispatch()
    const history = useHistory()
    const toastTitle = window.location.pathname.includes("new") ? "New office created" : "Office updated"
    const name = 'office-query'
    const contactsTabName = 'office-contacts-tab'
    const membersTabName = 'office-members-tab'
    const branchManagersTabName = 'office-division-branch-managers-tab'
    const licensesTabName = 'office-licenses-tab'
    const globalContext: GlobalContextType = useContext(GlobalContext) // global store using context api

    const officeData: any = useSelector((state: any) => {
        const officeData: any = state?.queryHelper?.[name]?.contents
        return (officeData)
    })

    useEffect(() => {
        if (id) {
            dispatch(fetchDataOnId({ id: id, name: name, resource: RESOURCE }))
        }
        return (() => { // cleanup
            const args0: any = { name: name }
            dispatch(resetQueryHelper(args0))
            const args1: any = { name: licensesTabName }
            dispatch(resetSelectableGrid(args1))
            const args2: any = { name: branchManagersTabName }
            dispatch(resetSelectableGrid(args2))
            const args3: any = { name: membersTabName }
            dispatch(resetSelectableGrid(args3))
            const args4: any = { name: contactsTabName }
            dispatch(resetSelectableGrid(args4))
            globalContext.office.isReadOnly = false
        })
    }, [dispatch, id])

    useEffect(() => {
        if (!_.isEmpty(officeData)) {
            populateData()
        }
    }, [officeData])

    const formik = useFormik({
        initialValues: {
            primaryAorID: ''
            , name: ''
            , officeCode: ''
            , mainOfficeCode: ''
            , phone: ''
            , address1: ''
            , address2: ''
            , city: ''
            , stateID: ''
            , zip: ''
            , brokerageFirmID: ''
            , dbaid: ''
            , brandID: ''
            , officeCompEmail: ''
            , officeTypeID: ''
            , branchManagerIDs: []
            , contactIDs: []
            , memberIDs: []
            , licenseIDs: []
            , systemOfRecordID: 1
        }
        , validateOnMount: true // 6 extra renders due to this, But it is required
        , validateOnChange: true
        , validateOnBlur: true
        , onSubmit: (values, actions) => { handleOnSubmit(values, actions) }
        , validationSchema: Yup.object({
            name: Yup.string().required(MembershipMessages.required)
            , officeCode: Yup.string().required(MembershipMessages.required)
            , brokerageFirmID: Yup.string().required(MembershipMessages.required)
            , phone: Yup.string().required(MembershipMessages.required).matches(/\d{3}-\d{3}-\d{4}$/, MembershipMessages.phoneNoFormat).matches(/^[^01].*/, MembershipMessages.phoneFormatNotZeroOrOne)
            , address1: Yup.string().required(MembershipMessages.required)
            , city: Yup.string().required(MembershipMessages.required)
            , stateID: Yup.string().required(MembershipMessages.required)
            , zip: Yup.string().required(MembershipMessages.required).matches(/\b\d{5}\b/, MembershipMessages.zip5Digit)
            , officeCompEmail: Yup.string().required(MembershipMessages.required).matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, MembershipMessages.emailInvalid)
            , officeTypeID: Yup.string().required(MembershipMessages.required)
            , memberIDs: Yup.array().test('test-required', 'Sales office error', (memberIDs: any) => {
                return (true) // At present no validation
            })
            , licenseIDs: Yup.array().test('test-required', MembershipMessages.minOneLicenseRequired, (licenseIDs: any) => {
                let ret = true
                if (_.isEmpty(licenseIDs)) {
                    ret = false
                }
                return (ret)
            })
            , branchManagerIDs: Yup.array().test('test-required', MembershipMessages.minOneBranchManagerRequired, (branchManagerIDs: any) => {
                let ret = true
                if (_.isEmpty(branchManagerIDs)) {
                    ret = false
                }
                return (ret)
            })
        })
    })

    const { setFieldValue, setSubmitting, setValues, values }: any = formik

    useEffect(() => {
        handleOnChangeBrokerageFirm(values.brokerageFirmID || '00000000-0000-0000-0000-000000000000')
    }, [values.brokerageFirmID])

    const licenseIDs = useSelector((state: any) => {
        const licenseIDs: string[] = state?.selectableGrid[licensesTabName]?.selectedIDs
        return (licenseIDs)
    })

    const contactIDs = useSelector((state: any) => {
        const contactIDs: string[] = state?.selectableGrid[contactsTabName]?.selectedIDs
        return (contactIDs)
    })

    const memberIDs = useSelector((state: any) => {
        const memberIDs: string[] = state?.selectableGrid[membersTabName]?.selectedIDs
        return (memberIDs)
    })

    const branchManagerIDs = useSelector((state: any) => {
        const branchManagerIDs: string[] = state?.selectableGrid[branchManagersTabName]?.selectedIDs
        return (branchManagerIDs)
    })

    async function handleOnChangeBrokerageFirm(value: string) {
        const crit: any = [
            {
                "field": "brokerageFirmID",
                "op": 0,
                "values": [
                    value || '00000000-0000-0000-0000-000000000000'
                ]
            }
        ]
        globalContext.office.standardSelect['brandID'](crit)
        globalContext.office.standardSelect['dbaid'](crit)
    }

    async function handleOnSubmit(values: any, actions: any) {
        const isValidMemberIDs = await isValidOneSalesPersonOneOffice()
        if (!isValidMemberIDs) {
            // show alert message
            Swal.fire({ icon: 'error', title: 'Salesperson is associated to another office', html: MembershipMessages.oneOfficeOneSalesPerson })
            actions.setSubmitting(false)
            return
        }
        const payload = {
            ...values,
            "primaryAorID": values.primaryAorID || undefined,
            "brokerageFirmID": values.brokerageFirmID || undefined,
            "dbaid": values.dbaid || undefined,
            "brokerageFirmBrandID": values.brandID || undefined,
            "name": values.name || undefined,
            "officeCode": values.officeCode || undefined,
            "mainOfficeCode": values.mainOfficeCode || undefined,
            "phone": values.phone || undefined,
            "address1": values.address1 || undefined,
            "address2": values.address2 || undefined,
            "city": values.city || undefined,
            "stateID": values.stateID || undefined,
            "zip": values.zip || undefined,
            "primaryContact": values.primaryContact || undefined,
            "officeCompEmail": values.officeCompEmail || undefined,
            "officeTypeID": values.officeTypeID || undefined,
            "branchManagerIDs": values.branchManagerIDs || undefined,
            "contactIDs": values.contactIDs || undefined,
            "memberIDs": values.memberIDs || undefined,
            "licenseIDs": values.licenseIDs || undefined,
            "systemOfRecordID": values.systemOfRecordID || 1,
        }
        try {
            if (id) { //update
                await dispatch(updateData({
                    name: name,
                    id: id,
                    resource: RESOURCE,
                    payload: payload
                })).unwrap()
            } else { // insert
                payload.primaryAorID = globalContext.app.aorID
                const res: any = await dispatch(insertData({
                    name: name,
                    payload: payload,
                    resource: RESOURCE
                })).unwrap()
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

    function onChangeDbaid(value: string) {
        setFieldValue('name', value)
    }

    async function isValidOneSalesPersonOneOffice() {
        let ret = true
        if (_.isEmpty(memberIDs)) {
            return (ret)
        }
        const searchCriteria: any[] = [
            {
                "field": "id",
                "op": 0,
                "values": memberIDs //["8f6cae40-913d-4879-45b1-08dbed19b8a6", "4a2bf12e-ee61-4fb7-b9bb-5f0f5d01c101"]
            }
        ]
        const fields: string[] = ['memberTypeName', 'officeCode']
        const res: any = await dispatch(fetchData(
            {
                name: name
                , resource: 'Contacts'
                , queryPayload: { pageId: 0, pageSize: 10000, searchCriteria, fields: fields }
            })).unwrap()
        // const res: any = await fetchData({ resource: 'Contacts', payload: { pageId: 0, pageSize: 10000, searchCriteria, fields: fields } })
        const results: any[] = res?.data?.results
        if (!_.isEmpty(results)) { // If there is a contact selected which is of memberTypeName = Salesperson and has an existing officeCode (means already associated with an office) then not allowed
            const isThereAny = results.some((result: any) => ((result.memberTypeName === 'Salesperson') && (result.officeCode)))
            if (isThereAny) {
                ret = false
            }
        }
        return (ret)
    }

    function populateData() {
        setValues({
            ...officeData,
            primaryAorID: officeData['primaryAorID'],
            name: officeData['name'],
            officeCode: officeData['officeCode'],
            mainOfficeCode: officeData['mainOfficeCode'],
            primaryContact: officeData['primaryContact'],
            phone: officeData['phone'] ? formatPhoneNumber(officeData['phone']) : undefined,
            address1: officeData['address1'],
            address2: officeData['address2'],
            city: officeData['city'],
            stateID: officeData['stateID'],
            zip: officeData['zip'],
            brokerageFirmID: officeData['brokerageFirmID'],
            dbaid: officeData['dbaid'],
            brandID: officeData['brokerageFirmBrandID'],
            officeCompEmail: officeData['officeCompEmail'],
            officeTypeID: officeData['officeTypeID'],
            branchManagerIDs: officeData['branchManagerIDs'] || [],
            contactIDs: officeData['contactIDs'] || [],
            memberIDs: officeData['memberIDs'] || [],
            licenseIDs: officeData['licenseIDs'] || [],
            systemOfRecordID: officeData['systemOfRecordID'],
        })
        populateSelectedIds()
        globalContext.office.isReadOnly = (officeData['systemOfRecordID'] === 1) ? false : true
    }

    function populateSelectedIds() {
        const args0: any = { name: membersTabName, selectedIDs: officeData['memberIDs'] }
        dispatch(setSelectedIDs(args0))
        const args1: any = { name: branchManagersTabName, selectedIDs: officeData['branchManagerIDs'] }
        dispatch(setSelectedIDs(args1))
        const args2: any = { name: licensesTabName, selectedIDs: officeData['licenseIDs'] }
        dispatch(setSelectedIDs(args2))
        const args3: any = { name: contactsTabName, selectedIDs: officeData['contactIDs'] }
        dispatch(setSelectedIDs(args3))
    }

    function postSubmit() {
        setSubmitting(false) // It is crucial to manually set the value of 'isSubmitting' to false in order to ensure its accuracy. Formik does not automatically reset 'isSubmitting' to false after submission. This manual step is necessary as 'isSubmitting' is utilized to disable buttons during form submission to prevent double submissions. Once the submission is initiated, the button is disabled, and upon completion, it is re-enabled.
        if (values.saveType === SaveTypesEnum.SaveAndNew) {
            id = undefined
            history.push(`/${RESOURCE}`)
            history.push(`/${RESOURCE}/new`)
        } else if (values.saveType === SaveTypesEnum.SaveAndClose) {
            history.push(`/${RESOURCE}`)
        } else {
            history.push(`/${RESOURCE}/edit/${id}`)
            const args: any = {
                id: id,
                name: name,
                resource: RESOURCE
            }
            dispatch(fetchDataOnId(args))
        }
    }

    return ({
        branchManagerIDs
        , branchManagersTabName
        , formik
        , handleOnChangeBrokerageFirm
        , licenseIDs
        , licensesTabName
        , contactIDs
        , contactsTabName
        , memberIDs
        , membersTabName
        , officeData
        , onChangeDbaid
    })
}