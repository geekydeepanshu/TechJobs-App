import axios from "axios";
import { useRef, useEffect } from "react";
import {AddJobDescription} from "./index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isObjectEmpty, toastOptions } from "../utils";
import { useNavigate } from "react-router";



function AddJobForm({job={}}){
    console.log("job",job);
    const quillRef = useRef();
    const { userInfo,token } = useSelector(state=>state.auth);
    const navigate = useNavigate();
    const {register, handleSubmit, watch, setValue, control, formState:{errors}} = useForm({
        defaultValues:{
            jobTitle:job.title || "",
            jobCategory:job.category||"",
            jobSalary:job.salary||"",
            jobLocation:job.location||"",
            jobLevel:job.level||"",
        }
    });
    useEffect(()=>{
        register("jobDescription",
            {
                required:"Job description required!",
                minLength:{value:200,message:"Job description should have atleast 200 characters"},
                maxLength:{value:10000,message:"Job description should not exceed 10000 characters"}
            })
            if(job){
                const delta = quillRef.current.clipboard.dangerouslyPasteHTML(job.description);
                // quillRef.current.setText(`${job.description}`)
            }
    },[register])

    // const jobDescription = watch("jobDescription");
    
    const submitHandler = async(data)=>{
        // console.log(data)
        // console.log("Quill Ref:",quillRef.current?.getSemanticHTML())
        if(post){
            try{
                // const response = axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/edit-job/${job._id}`)
                console.log(data)
            }
            catch(error){
                if(error.response.status>=400 && error.response.satus <=499)
                    toast.error(error.response?.data?.message);
                else    
                    toast.error(error.response?.message)
            }
        }
        else{
            try {
            const response  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/postjob`,{
                title:data.jobTitle,
                description:data.jobDescription,
                category:data.jobCategory,
                salary:data.jobSalary,
                location:data.jobLocation,
                level:data.jobLevel,
                createdBy:userInfo

            },
        {
            headers:{ Authorization: `Bearer ${token}`}
        });
        // success toast
        // navigate to Manage Jobs
        // console.log(response);
        if(response.status==201){
            toast.success(response.data?.message,toastOptions);
            navigate("/recruiter-dashboard/manage-jobs");
        }
        else{
            toast.success(response.statusText);
        }
        } catch (error) {
            // console.log("Error",error);
            if(error.response.status>=400 && error.response.satus <=499)
                toast.error(error.response?.data?.message);
            else    
                toast.error(error.response?.message)
            // error toast
        }}
        
        
    }

    const jobCategoryOptions = [
        {   
            id:1,
            title:"Programming",
            value:"programming"
        },
        {
            id:2,
            title:"Data Science",
            value:"datascience"
        },
        {
            id:3,
            title:"Designing",
            value:"designing"
        },
        {
            id:4,
            title:"Networking",
            value:"networking"
        },
        {
            id:5,
            title:"Managment",
            value:"managment"
        },
        {
            id:6,
            title:"Marketing",
            value:"marketing"
        },
        {
            id:7,
            title:"Cyber Security",
            value:"cybersecurity"
        },
    ]

    const jobLocationOptions = [
        {
            id:1,
            title:"Banglore",
            value:"banglore"
        },
        {
            id:2,
            title:"Washington",
            value:"washington"
        },
        {
            id:3,
            title:"Hyderabad",
            value:"hyderabad"
        },
        {
            id:4,
            title:"Mumbai",
            value:"mumbai"
        },
        {
            id:5,
            title:"California",
            value:"california"
        },
        {
            id:6,
            title:"Chennai",
            value:"chennai"
        },
        {
            id:7,
            title:"New York",
            value:"newyork"
        }
    ]

    const jobLevelOptions = [
        {
            id:1,
            title:"Junior level",
            value:"junior",
        },
        {
            id:2,
            title:"Medium level",
            value:"mid",
        },
        {
            id:3,
            title:"Senior level",
            value:"senior",
        },

    ]

    return(
            <form className="flex-col container p-6 w-full items-center space-y-4 font-Outfit" onSubmit={handleSubmit(submitHandler)}>
                <div className="w-full">
                <label className="mb-2" htmlFor={"job-title"} >Job Title</label>
                <input 
                    type="text" 
                    id="job-title"
                    className="block w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
                    {...register("jobTitle",{
                        required:"Title required!",
                        minLength:{value:5,message:"Title must be 5 characters long"},
                        maxLength:{value:24,message:"Title should not exceed 24 characters"}
                    })}/>
                     {errors.jobTitle && (<p className="error-msg">{errors.jobTitle?.message}</p>)}
                </div>
                {/* Job Description Rich text editor container */}
                <div className="w-full max-w-lg">
                <label className="my-2" htmlFor={"job-description"} >Job Description*</label>

                    <AddJobDescription
                        id="job-description"
                        ref={quillRef}
                        onTextChange={()=>setValue("jobDescription",quillRef.current?.getSemanticHTML())}/>    
                </div> 
                {errors.jobDescription && <p className="error-msg">{errors.jobDescription?.message}</p>}
                <div className="flex items-center w-full gap-8 max-w-lg"> 
                <div>
                <label className="mb-2"  htmlFor={"job-category"} >Job Category*</label>
                    <select 
                        id="job-category"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded"
                    {...register("jobCategory",{
                        required:"Job category required!"
                    })}>
                        {
                            jobCategoryOptions.map((jobCategoryOption)=><option key={jobCategoryOption.id} value={jobCategoryOption.value}>{jobCategoryOption.title}</option>)
                        }
                    </select>
                    {errors.jobCategory && (<p className="error-msg">{errors.jobCategory?.message}</p>)}
                </div>
                <div>
                <label  className="mb-2" htmlFor={"job-location"} >Job Location*</label>
                    <select 
                        id="job-location"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded"
                        {...register("jobLocation",{
                        required:"Job location required!"
                    })}>
                        {
                            jobLocationOptions.map((jobLocationOption)=><option key={jobCategoryOptions.id} value={jobLocationOption.value}>{jobLocationOption.title}</option>)
                        }
                    </select>
                    {errors.jobLocation && (<p className="error-msg">{errors.jobLocation?.message}</p>)}
                </div>
                <div>
                <label className="mb-2"  htmlFor={"job-level"} >Job Level*</label>
                    <select 
                        id="job-level"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded"
                        {...register("jobLevel",{
                        required:"Job level required!"
                    })}>
                        {
                            jobLevelOptions.map((jobLevelOption)=><option key={jobLevelOption.id} value={jobLevelOption.value}>{jobLevelOption.title}</option>)
                        }
                    </select>
                    {errors.jobLevel && (<p className="error-msg">{errors.jobLevel?.message}</p>)}
                </div>
                </div> 
                <div>
                <label className="input-label" htmlFor={"job-salary"} >Job Salary*</label>
                    <input 
                        id="job-salary"
                        type="number"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
                        {...register("jobSalary",{
                            required:"Salary is required!",
                            min:{value:1000,message:"Salary should be greater than 1000"},
                            max:{value:100000000,message:"Salary should be less than 100000000"}
                        })} />
                </div>
                {errors.jobSalary && (<p className="error-msg">{errors.jobSalary?.message}</p>)}
                <button type="submit" className="w-28 py-3 mt-4 bg-black text-white rounded">{isObjectEmpty(job)?"ADD":"Update"}</button>
            </form>
    )
}


export default AddJobForm;