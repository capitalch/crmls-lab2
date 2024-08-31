import clsx from 'clsx'
import { useState } from 'react'
import { nTabsStore } from './NTabsStore'
import _ from 'lodash'

function NTabs({ className, children, selectedTabIndex = 0, storePropName = 'offices', persistTabIndex = true }: { className?: string, children: any, selectedTabIndex?: number, storePropName?: string, persistTabIndex?: boolean }) {
    const [activeTabLabel, setActiveTabLabel] = useState(children[selectedTabIndex]?.props?.label || '')

    return (<div className={clsx(className, 'flex flex-col mt-4')}>
        {getTabHeader()}
        {getTabContents()}
    </div>)

    function getActiveClassName(child: any): string {
        const clsName = (activeTabLabel === child.props.label) ? 'border-b-2 border-blue-400 font-medium' : 'text-slate-400'
        return (clsName)
    }

    function getTabContents() {
        if(!_.isArray(children)){
            return <></>
        } 
        const tabContents: any[] = children.map((child: any) =>
            (child.props.label === activeTabLabel) && child.props.children
        )
        return (<div className=''>{tabContents}</div>)
    }

    function getTabHeader() {
        if(!_.isArray(children)){
            return <></>
        } 
        const tabLabels: any[] = children.map((child: any,) => {
            return (
                <button key={child.props.label} className={clsx(getActiveClassName(child), child.props.className, 'py-2 px-4 mb-4 pb-4')}
                    onClick={(e: any) => handleClick(e, child.props.label, child.props.tabIndex)}>
                    {child.props.label}
                </button>
            )
        })
        return (<div className='flex gap-2'>{tabLabels}</div>)
    }

    function handleClick(e: any, newActiveTabLabel: string, tabIndex: number) {
        e.preventDefault()
        setActiveTabLabel(newActiveTabLabel)

        if (persistTabIndex && storePropName) {
            nTabsStore[storePropName].selectedTabIndex = tabIndex
        }
    }

}
export { NTabs }

function NTab({ label, children, tabIndex = 0, className = '' }: { label: string, children: any, tabIndex?: number, className?: string }) {
    
    return (<div className="hidden">
        {children}
    </div>)
}
export { NTab }