import _ from 'lodash'
import { Link } from 'react-router-dom'

const LinkTagsSyncFusion = ({details, link, value}:{details:any, link:string | undefined, value?:string}) => {
    const templateWithLinkedTags = warpValueWithLinkTags()
    return templateWithLinkedTags

    function warpValueWithLinkTags(){
        const fieldName = details.column.field
        const fieldValue:string = _.get(details, fieldName, '-')
        if (link) {
            const lnk = `/${link}/${details.id}`
            return <Link to={lnk} className="hover:text-blue-500">{value || fieldValue}</Link>
        } 
        return  <span>{fieldValue}</span>
    }    
 
}

export default LinkTagsSyncFusion