import { useDispatch, useSelector } from "react-redux"
import { GenericHeader } from "../../components/GenericHeader/GenericHeader"
import { useContext, useEffect, useState } from "react"
import { fetchData } from "../../components/QueryHelper/QueryHelperSlice"
import _ from 'lodash'
import { NTab, NTabs } from "../../components/ntabs/NTabs"
import { QueryLoader } from "../../components/QueryLoader/QueryLoader"
import { nTabsStore } from "../../components/ntabs/NTabsStore"
import { MyMembersTab } from "./MembersTabs/MyMembersTab"
import { OtherMembersTab } from "./MembersTabs/OtherMembersTab"
import { NewButton } from "../../components/widgets/NewButton"
import { MembersStore } from "./MembersStore"
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext"

function Members() {
    const NAME = 'members-selectable-grid-view'
    const dispatch = useDispatch()
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const [, setRefresh] = useState({})
    MembersStore.refreshMembers = setRefresh
    const aorID: string = useSelector((state: any) => {
        const rows: any[] = state?.queryHelper?.[NAME]?.contents
        const aorID: string = _.isEmpty(rows) ? '' : rows?.[0]?.id
        return (aorID)
    })

    useEffect(() => {
        const args: any = { name: NAME, resource: 'Aors' }
        dispatch(fetchData(args))
    }, [dispatch])

    if (aorID) {
        globalContext.app.aorID = aorID //stored aorID globally, which is only one or unique for the current user
    }
    return (<div>
        <div className="flex items-center bg-secondary justify-between">
            <GenericHeader title="Members" subTitle="CRMLS members" />
            {<NewButton resource="members" className="mr-4" link = "/newMember" />}
        </div>
        {aorID && <NTabs selectedTabIndex={nTabsStore.members.selectedTabIndex} storePropName="members">
            <NTab label='My Members' tabIndex={0}>
                <MyMembersTab aorID={aorID} name={NAME} />
            </NTab>
            <NTab label='Other Members' tabIndex={1}>
                <OtherMembersTab aorID={aorID} name={NAME} />
            </NTab>
        </NTabs>}
        <QueryLoader name={NAME} />
    </div>)
}
export { Members }