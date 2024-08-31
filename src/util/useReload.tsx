import { useEffect, useState } from 'react'

const useReload = (...reloadFactors:string[]) =>  {
    const [isReloading, setIsReloading] = useState(false)

    useEffect(() => {
        quickRemountComponenet()
    },[...reloadFactors])

    const quickRemountComponenet = () => {
        setIsReloading(true)
        setTimeout(()=>{
            setIsReloading(false)
        },50)
    }
    return ({
        isReloading,
        reaload:quickRemountComponenet
    })
}

export default useReload