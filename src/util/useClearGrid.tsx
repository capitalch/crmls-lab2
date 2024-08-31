
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedIDs } from '../components/SelectableGrid/SelectableGridSlice'
import { useParams } from 'react-router'

const useGrid = ({gridName, fieldName, resource, reloadingDependencies }:UseGridProps) => {
    const [isReloading, setIsReloading] = useState(false)
    const { id }: any = useParams()
    const isNew = !id
    const dispatch = useDispatch()
    const resource_data = useSelector((state: any) => state?.queryHelper[resource || ""]?.contents)
    const reloadingDependenciesArray = reloadingDependencies ? [...reloadingDependencies] : []
    
    const clearGrid = () =>{
        const args: any = { name: gridName, selectedIDs: [] }
        dispatch(setSelectedIDs(args))
    }
    
    const quickRemountComponenet = () => {
        setIsReloading(true)
        setTimeout(()=>{
            setIsReloading(false)
        },50)
    }

    const updateGrid = () =>{
        if(!isNew){
            const args: any = { name: gridName, selectedIDs: fieldName && resource_data?.[fieldName] }
            dispatch(setSelectedIDs(args))
        }
    }

    // useLayoutEffect(() => {
    //     clearGrid()
    //     quickRemountComponenet()
    // }, [...reloadingDependenciesArray])

    useEffect(()=>{
        fieldName && updateGrid()
        return clearGrid
    },[JSON.stringify(resource_data)]) //JSON.stringify(resource_data)

    return ({
        isReloading,
        reaload:quickRemountComponenet
    })
}

export default useGrid

interface UseGridProps {gridName:string; fieldName?:string; resource?:string; reloadingDependencies?:string[]}