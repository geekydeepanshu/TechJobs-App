import {assets} from "../assets/assets.js";
import {useForm} from "react-hook-form";
import {useState} from "react";

function UploadCompanyLogo(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const submitHandler = (data)=>{console.log(data)}
    const handleFileChange = (event)=>{
        const file = event.target.files[0]
        if(file){
            const previewUrl =  URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    }
    return(
    <form onSubmit={handleSubmit(submitHandler)} className="w-80 h-80 rounded-xl border-2 border-black box-border p-4 mx-auto">
        <div className="rounded-full h-32 w-32 border-2 border-black mx-auto mb-6 overflow-clip">
            <img className="" src={imagePreview || assets.image_upload} alt="company-logo-preview" />
        </div>
            <div className="mx-auto text-center text-lg font-medium">
            <p>Choose a profile picture:</p>
            <label htmlFor="logo-input" className="h-8 w-28 inline-block  my-2 text-xs py-2 mx-auto bg-black text-white font-medium rounded-md">Choose Logo</label>
            <input 
            className="h-8  mx-auto  my-4  text-sm font-medium rounded-md hidden" 
            id="logo-input" 
            type="file" 
            accept="image/png, image/jpeg"
            {...register("companyLogo",{required:"Logo required!"})}
            onChange={handleFileChange}/>
            {errors.companyLogo && <p className="text-red-600 text-xs">{errors.companyLogo.message}</p>}
        
        </div>
        <button 
        className="h-8 w-48  my-2 mx-auto block border border-gray-300 text-sm font-medium rounded-md text-white bg-black"
        type="submit">Upload Logo</button>
    </form>
    )
}


export default UploadCompanyLogo;