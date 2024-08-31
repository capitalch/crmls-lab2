import { useSelector } from "react-redux"
import Loader from "../widgets/Loader"

function QueryLoader({ name }: { name: string }) {
    let isLoading = useSelector((state: any) => state?.queryHelper[name]?.isLoading)
    isLoading = (isLoading === undefined) ? false : isLoading
    if (isLoading) {
        return (<div className="fixed z-10 top-1/2 left-1/2 "><Loader /></div>)
    }
    return (<></>)
}
export { QueryLoader }