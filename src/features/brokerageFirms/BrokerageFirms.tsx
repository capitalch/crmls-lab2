import { useState } from 'react';
import MyBrokerageFirms from './SubComponents/MyBrokerageFirms/MyBrokerageFirms';
import OtherBrokerageFirms from './SubComponents/OtherBrokerageFirms/OtherBrokerageFirms';
import { GenericHeader } from '../../components/GenericHeader/GenericHeader';
import { NTab, NTabs } from '../../components/ntabs/NTabs';
import { setSelectedIDs } from '../../components/SelectableGrid/SelectableGridSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BF_MY_NAME } from './SubComponents/MyBrokerageFirms/useMyBrokerageFirm';
import { BF_OTHER_NAME } from './SubComponents/OtherBrokerageFirms/useOtherBrokerageFirms';
import { nTabsStore } from '../../components/ntabs/NTabsStore';
import NewButton from '../../util/controls/newButton';

export const brokerageFirm_resource_name = 'brokerageFirms'

const BrokerageFirms = (props:any) => {
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const aorID = useSelector((state: any) => state?.user?.profile?.aor?.id)

    
    const clearSelectedIds = (name:string) => {
        const args: any = { name: name, selectedIDs: [] }
        dispatch(setSelectedIDs(args))
    }

    const reloadGrids = () => {
        clearSelectedIds(BF_MY_NAME)
        clearSelectedIds(BF_OTHER_NAME)
        setRefresh(true)
        setTimeout(()=>{
            setRefresh(false)
        },50)
    }
        
    return (
        <>
            <div className="w-full border-b flex px-2 bg-secondary">
                <GenericHeader 
                    title="Brokerage Firms" 
                    subTitle="CRMLS Brokerage Firms" 
                />
                <NewButton resource={brokerageFirm_resource_name}/>
            </div>
            <NTabs selectedTabIndex={nTabsStore.offices.selectedTabIndex}>
                <NTab key="myBrokerageFirms" label="My Firms" tabIndex={0}>
                    <MyBrokerageFirms aorID={aorID} isReloading={refresh} reloadGrid={reloadGrids}/>
                </NTab>
                <NTab key="otherBrokerageFirms" label="Other Firms" tabIndex={1}>
                    <OtherBrokerageFirms aorID={aorID} isReloading={refresh} reloadGrid={reloadGrids}/>
                </NTab>
            </NTabs>
        </>
    )
}

export default BrokerageFirms



