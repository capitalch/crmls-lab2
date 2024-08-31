import { useEffect, useRef, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { MembershipMessages, MembershipRegEx } from '../../../util/MembershipMessages'
import { useParams } from 'react-router-dom'
import Toast, { SmallToast } from "../../../components/widgets/Toast"
import { useAppDispatch } from '../../../app/hooks'
import { searchAors, updateAor } from '../aorSlice'
import { useSelector } from 'react-redux'
import { fetchMembershipResourseWithId } from '../../../adapters'

export const serviceName = 'membershipv3';

const useAOR = () => {

    const [error, setError] = useState<{isError:boolean, message:string}>({isError:false, message:"Something went worng"})
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const aorTitle = useRef("CRMLS AOR")
    const { id }:any = useParams()
    const dispatch = useAppDispatch();
    const webAddressRegExp = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
    const aorID = useSelector((state: any) => state?.user?.profile?.aor?.id)


    useEffect(()=>{
        fetchAOR()
    },[aorTitle])

    const fetchAOR = async() => {
        try{
            const aor = await fetchMembershipResourseWithId('aors', aorID)
            aorTitle.current = aor?.name
            formik.setValues(aor)
            setIsLoading(false)
        }catch{
            setError({...error, isError:true})
        }
    }
    
    const formik = useFormik({
        initialValues: {
            id:'',
            name:'',
            shortName:'',
            description:'',
            primaryContactId:'',
            phone:'',
            address1:'',
            address2:'',
            city:'',
            state:'',
            zip:'',
            stateAssociation:'',
            logoUrl:'',
            logoImageContent:null,
            webAddress:'',
            complianceEmail:'',
            marketingEmail:'',
            alertEmail:'',
            region:'',
            optOut:false,
        },
        validateOnMount: true,
        onSubmit: (values, actions) => {handleOnSubmit(values)},
        validationSchema: Yup.object({
           name: Yup.string().required(MembershipMessages.required),
           shortName:Yup.string().required(MembershipMessages.required),
           primaryContactId:Yup.string().required(MembershipMessages.required),
           address1: Yup.string().required(MembershipMessages.required),
           city: Yup.string().required(MembershipMessages.required),
           zip: Yup.string().required(MembershipMessages.required).matches(/\b\d{5}\b/, MembershipMessages.zip5Digit),
           state:Yup.string().required(MembershipMessages.required),
           phone: Yup.string()
                .required(MembershipMessages.required)
                .matches(MembershipRegEx.phoneRegExp.shouldBeSeparatedWithHiphen, MembershipMessages.phoneNoFormat)
                .matches(MembershipRegEx.phoneRegExp.doestStartWithOneOrZero, MembershipMessages.phoneFormatNotZeroOrOne),
           webAddress: Yup.string().matches(webAddressRegExp, 'Please enter a valid web address'),
           region: Yup.string()
                .matches(MembershipRegEx.regionRegExp, MembershipMessages.regionBetweenOneAndThirtyTwo)
        })
    })

    const  handleOnSubmit = async (values: any) => {
         
        try {
            setIsSubmitting(true)
            await dispatch(
                updateAor({id, ...values, isDeleted:false})
            )
            confirmAndRedirect()
        } catch (error: any) {
            setIsSubmitting(false)
            setError({...error, isError:true});
        }

        function confirmAndRedirect () {
            setIsSubmitting(false)
            SmallToast.fire({
                icon: 'success',
                'title': "AOR Updated"
            })
            // actions.validateForm()
        }
    }
  return ({
    formik, 
    aor:formik.values,
    isLoading, 
    isSubmitting,
    title:aorTitle.current,
    handleOnSubmit
})
}

export default useAOR

