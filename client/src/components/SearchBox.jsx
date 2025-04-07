import { useForm } from "react-hook-form";
import { assets } from "../assets/assets";

function SearchBox(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const submitHandler = (data)=>{
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(submitHandler)} className="text-black mx-auto h-12 w-3/7 space-x-2 rounded-xl flex justify-between items-center px-2 bg-white">
            <div className="flex items-center">
                <img className="h-5" src={assets.search_icon} alt="search icon" />
                <input
                 type="text"
                 placeholder="Title"
                 className="h-10 focus:outline-0 focus:bg-white pl-2"
                 {...register("jobSearchFilter",{
                    required:"Job title required!",
                    minLength:{value:5, message:"Job title too short!"},
                    maxLength:{value:24, message:"Job title too long!"}
                 })}/>
            </div>
            <div className="flex items-center ">
                <img className="h-5" src={assets.location_icon} alt="location icon" />
                <input
                 type="text"
                 placeholder="Location"
                 className="h-10 focus:outline-0 pl-2 focus:bg-white"
                 {...register("jobLocatonFilter",{
                    required:"Job location required!",
                    minLength:{value:3, message:"Job location too short!"},
                    maxLength:{value:16, message:"Job location too long!"}
                 })}/>
            </div>
            <button type="submit" className="w-1/4 h-10 rounded-md bg-blue-600 text-white text-sm">Search</button>
        </form>
    )
}

export default SearchBox;