import { useRef } from "react";
import {AddJobDescription} from "./index";
import { useForm } from "react-hook-form";
function AddJobForm(){
    const {register, handleSubmit, watch, setValue, formState:{errors}} = useForm();
    const quillRef = useRef();
    const jobDescription = watch("jobDescription");
    const submitHandler = (data)=>{
        console.log(data)
        console.log("Quill Ref:",quillRef.current?.getSemanticHTML())
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
            title:"Beginner level",
            value:"beginner",
        },
        {
            id:2,
            title:"Intermediate level",
            value:"intermediate",
        },
        {
            id:3,
            title:"Senior level",
            value:"senior",
        },

    ]

    return(
        <div className="">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                <label className="input-label" htmlFor={"job-title"} >Job Title*</label>
                <input 
                    type="text" 
                    id="job-title"
                    className="input-feild-text"
                    {...register("jobTitle",{
                        required:"Title required!",
                        minLength:{value:5,message:"Title must be 5 characters long"},
                        maxLength:{value:24,message:"Title should not exceed 24 characters"}
                    })}/>
                     {errors.jobTitle && (<p className="error-msg">{errors.jobTitle?.message}</p>)}
                </div>
                {/* Job Description Rich text editor container */}
                <label className="input-label" htmlFor={"job-description"} >Job Description*</label>
                <div>
                    <AddJobDescription
                        id="job-description"
                        
                        ref={quillRef}
                        onTextChange={()=>setValue("jobDescription",quillRef.current?.getSemanticHTML())}/>    
                </div> 
                <div> 
                <div>
                <label  htmlFor={"job-category"} >Job Category*</label>
                    <select 
                        id="job-category"
                        className="input-feild-text"
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
                <label  htmlFor={"job-location"} >Job Location*</label>
                    <select 
                        id="job-location"
                        className="input-feild-text"
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
                <label  htmlFor={"job-level"} >Job Level*</label>
                    <select 
                        id="job-level"
                        className="input-feild-text"
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
                        className="input-feild-text"
                        {...register("jobSalary")} />
                </div>
                {errors.jobSalary && (<p className="error-msg">{errors.jobSalary?.message}</p>)}
                <button type="submit" className="form-submit-button">ADD</button>
            </form>
        </div>
    )
}


export default AddJobForm;