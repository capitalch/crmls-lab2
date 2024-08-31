import { useDispatch, useSelector } from "react-redux"
import { GenericHeader } from "../../components/GenericHeader/GenericHeader"
import { useContext, useEffect, useState } from "react"
import { fetchData } from "../../components/QueryHelper/QueryHelperSlice"
import _ from 'lodash'
import { MyContactsTab } from "./ContactsTabs/MyContactsTab"
import { OtherContactsTab } from "./ContactsTabs/OtherContactsTab"
import { NTab, NTabs } from "../../components/ntabs/NTabs"
import { QueryLoader } from "../../components/QueryLoader/QueryLoader"
import { nTabsStore } from "../../components/ntabs/NTabsStore"
import { NewButton } from "../../components/widgets/NewButton"
import { ContactsStore } from "./ContactsStore"
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext"

function Contacts() {
    const [, setRefresh] = useState({})
    const NAME = 'contacts-selectable-grid-view'
    const dispatch = useDispatch()
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const aorID: string = useSelector((state: any) => {
        const rows: any[] = state?.queryHelper?.[NAME]?.contents
        const aorID: string = _.isEmpty(rows) ? '' : rows?.[0]?.id
        return (aorID)
    })
    ContactsStore.refreshContacts = setRefresh
    if (aorID) {
        globalContext.app.aorID = aorID //stored aorID globally, which is only one or unique for the current user
    }
    

    useEffect(() => {
        const args: any = { name: NAME, resource: 'Aors' }
        dispatch(fetchData(args))
    }, [dispatch])

    return (<div>
        <div className="flex items-center bg-secondary justify-between">
            <GenericHeader title="Contacts" subTitle="CRMLS contacts" />
            {<NewButton resource="Contacts" className="mr-4" link="/newContact" />}
        </div>
        {aorID && <NTabs selectedTabIndex={nTabsStore.contacts.selectedTabIndex} storePropName="contacts">
            <NTab label='My Contacts' tabIndex={0}>
                <MyContactsTab aorID={aorID} name={NAME} />
            </NTab>
            <NTab label='Other Contacts' tabIndex={1}>
                <OtherContactsTab aorID={aorID} name={NAME} />
            </NTab>
        </NTabs>}
        <QueryLoader name={NAME} />
    </div>)
}
export { Contacts }