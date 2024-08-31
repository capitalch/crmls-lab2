import { GenericHeader } from "../../components/GenericHeader/GenericHeader"
import { useDispatch, useSelector, } from "react-redux";
import { QueryLoader } from "../../components/QueryLoader/QueryLoader";
import { useContext, useEffect } from "react";
import _ from 'lodash'
import { fetchData } from "../../components/QueryHelper/QueryHelperSlice";
import { NTab, NTabs } from "../../components/ntabs/NTabs";
import { MyOfficesTab } from "./OfficesTabs/MyOfficesTab";
import { OtherOfficesTab } from "./OfficesTabs/OtherOfficesTab";
import { nTabsStore } from "../../components/ntabs/NTabsStore";
import { NewButton } from "../../components/widgets/NewButton";
import { GlobalContext, GlobalContextType } from "../../app/GlobalContext";

function Offices() {
    const NAME = 'offices-selectable-grid-view'
    const dispatch = useDispatch()
    const globalContext: GlobalContextType = useContext(GlobalContext)
    const aorID: string = useSelector((state: any) => {
        const rows: any[] = state?.queryHelper?.[NAME]?.contents
        const aorID: string = _.isEmpty(rows) ? '' : rows?.[0]?.id

        return (aorID)
    })
    if (aorID) {
        globalContext.app.aorID = aorID //stored aorID globally, which is only one or unique for the current user
    }
    useEffect(() => {
        const args: any = { name: NAME, resource: 'Aors' }
        dispatch(fetchData(args))
    }, [dispatch])

    return (<div>
        <div className="flex items-center bg-secondary justify-between">
            <GenericHeader title="Offices" subTitle="CRMLS offices" />
            {<NewButton resource="offices" className="mr-4" />}
        </div>
        {aorID && <NTabs selectedTabIndex={nTabsStore.offices.selectedTabIndex}
            storePropName="offices">
            <NTab label='My Offices' tabIndex={0}>
                <MyOfficesTab name={NAME} aorID={aorID} />
            </NTab>
            <NTab label='Other Offices' tabIndex={1}>
                <OtherOfficesTab name={NAME} aorID={aorID} />
            </NTab>
        </NTabs>}
        <QueryLoader name={NAME} />
    </div>)

}
export { Offices }