import { TemplateIcon } from "@heroicons/react/outline"
import { InformationCircleIcon, StarIcon } from "@heroicons/react/solid"
import EditIcon from "../icons/EditIcon"
import { ReactComponentElement, ReactElement, useRef } from "react"

interface IimageUploadProps{
    existingImageURL:string
    placeHolder:string
    id:string
    disabled:boolean
    formik?:any
}

const ImageUploader = ({existingImageURL, id, disabled, formik, placeHolder, ...props}:IimageUploadProps) => {

    const imageInput = useRef<any>(null)

    const onImageClick = () => {
        imageInput.current && imageInput.current.click()
    }

    const handleFileChange = (event:any) => {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.onload = (e:any) => {
          const base64String = e.target.result; // The Base64 string
          formik.setFieldValue(id, base64String);
        };
        reader.readAsDataURL(file);
    };
      
  return <div className="flex" onClick={onImageClick} style={{width:"18rem", cursor:"pointer"}}>
        <input
            {...props}
            id={id}
            type="file"
            disabled={disabled}
            onChange={handleFileChange}
            style={{display:'none'}}
            ref={imageInput}
        />
        
        {!(formik.values[id] || existingImageURL) && <div
            className="inline-flex justify-center items-center h-10 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-tertiary disabled:pointer-events-none disabled:cursor-not-allowed"
            >
        {placeHolder}
        </div>}
      { (formik.values[id] || existingImageURL) && <>
        <img src={formik.values[id] || existingImageURL} style={{height:"3rem", maxWidth:"12rem"}}/>
        <div 
            style={{
                display: "flex",
                backgroundColor: "white",
                width: "22px",
                paddingLeft: "3px",
                paddingRight: "2px",
                paddingBottom: "1px",
                height: "25px",
                position: "relative",
                top: "2rem",
                boxShadow: "0px 1px 6px #888888",
                alignItems: "center"
            }}
            className="hover:bg-gray-200"
        >
            <EditIcon style={{ width: "100%",  } }/>
        </div>
      </>}
  </div>
  
}

export default ImageUploader