import { useState, useEffect } from 'react'
import useAOR from './AORs/AorHook';
import AorDetails from './AORs/SubComponents/AorDetails';
import { GenericHeader } from '../../components/GenericHeader/GenericHeader';
import Tabs from '../../components/tabs/Tabs';
import AorMessage from '../systemNotification/AorMessage';
import AorMessages from '../systemNotification/AorMessages';
import Loader from "../../components/widgets/Loader"
import SimpleTabs, { Tab } from '../../util/controls/tabs';
import AorOffices from './tabs/AorOffices';
import AorFirms from './tabs/AorFirms';
import AorDBAs from './tabs/AorDBAs';
import AorContacts from './tabs/AorContacts';

const Aor = (props: any) => {

    const { formik, isLoading, isSubmitting, title, handleOnSubmit } = useAOR()
    const { handleSubmit, values } = formik
    const [titleObj, setTitleObj] = useState({ title: "CRMLS AOR", subTitle: "CRMLS AOR" })
    const createNewAorMessage = props.location.pathname.includes("new")
    const messageId = props?.match?.params?.messageId;
    
    useEffect(() => {
        const titleObj = getTitle(title, createNewAorMessage, messageId)
        setTitleObj(titleObj)
    }, [createNewAorMessage, title, messageId])

    if (isLoading)
        return <div className="fixed z-10 top-1/2 left-1/2 "><Loader /></div>

    return (
        <>
            <GenericHeader title={titleObj.title} subTitle={titleObj.subTitle} />
            <SimpleTabs tabs={[{ name: "AOR Details" }, { name: "Messages" }]} formik={formik} className="crmls-tab-list">
                <div key="" data-label="AOR Details" >
                    {/* <form onSubmit={handleSubmit}> */}
                        <div className="portlet-box portlet-fullHeight border0 shadow-sm mb-30">
                            <SimpleTabs tabs={getTabDetails()} formik={formik} className='crmls-tab-list mx-4'>
                                <AorDetails formik={formik} handleSubmit={handleOnSubmit} />
                                <AorContacts showOnlyMembers={true} />
                                <AorContacts />
                                <AorFirms />
                                <AorDBAs />
                                <AorOffices />
                            </SimpleTabs>
                        </div>
                    {/* </form> */}
                </div>
                <div key="messages" data-label="Messages">
                    {!createNewAorMessage && !messageId ? <AorMessages {...props} /> : <AorMessage {...props} />}
                </div>
            </SimpleTabs>
            {isSubmitting && <div className="fixed z-10 top-1/2 left-1/2 "><Loader /></div>}
        </>
    )

    function getTabDetails(): (Tab | null)[] {
        return [
            { name: 'Details', keepMounted: true },
            { name: 'Members' },
            { name: 'Contacts' },
            { name: 'Brokerage Firms' },
            { name: 'DBAs' },
            { name: 'Offices' }
        ]
    }
}

export default Aor

const getTitle = (title: string, createNewAorMessage: boolean, messageId: string) => {
    if (createNewAorMessage) {
        return ({
            title: "New AOR Message",
            subTitle: "Use the form below to send a message out to all of your AOR members."
        })
    } else if (messageId) {
        return ({
            title: "Update AOR Message",
            subTitle: "Use the form below to send a message out to all of your AOR members."
        })
    } else {
        return ({
            title,
            subTitle: "CRMLS AOR"
        })
    }
}


