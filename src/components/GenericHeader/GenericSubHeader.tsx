import { FC } from "react"

function GenericSubHeader({ControlSet}:GernericSubHeaderOptionsType) {
  
return(<div className="ml-auto py-2 sm:py-4 mr-4">
    <ControlSet  />
</div>)
}
export { GenericSubHeader }

type GernericSubHeaderOptionsType = {
    ControlSet: FC
}