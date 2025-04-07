import { JobTitleBanner,JobDetailView ,Navbar ,Footer } from "../components";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils";


function JobDetailViewPage(){
    const [isLoading, setIsLoading] = useState(true);
    const [job, setJob] = useState({});
    const {jobId} =  useParams();
    useEffect(()=>{
         getJobById();
    },[])

    const getJobById = async()=>{
     try{
         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/getjobbyid`,{
             jobId
         })
         if(response.status==200){
             setJob(response.data?.job);
             setIsLoading(false);
         }
     }
     catch(error){
         if(error.response.status>=500 && error.response.status<=599){
             toast.error(error.response.statusText,toastOptions); 
         }
         else {
             toast.error(error.response?.data?.message,toastOptions);
         }  
     }
    }


    return(
    <>
        <Navbar/>
        {(isLoading)?(<>Loading...</>): (
        <div className="">
            <JobTitleBanner job={job} />
            <JobDetailView job={job}/>
        </div>
    )}
        <Footer/>
    </>)

    
}


export default JobDetailViewPage;