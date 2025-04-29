import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { isObjectEmpty } from "../utils";
import { AddJobForm } from "../components";

function JobEditPage(){
    const {jobId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [jobNotExsist, setIsJobNotExsist] = useState(false);
    const [job, setJob] = useState({});
    useEffect(()=>{
        getJob()
    },[])

    const getJob = async()=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/getjobbyid`,{
                jobId
            })
            if(response.status==200){
                setJob(response.data?.job);
                setIsLoading(false);
            }
            else{
                setIsJobNotExsist(true);
            }
        }
        catch(error){
            if(error.response.status>=400 && error.response.satus <=499)
                toast.error(error.response?.data?.message);
            else    
                toast.error(error.response?.message)
        }
    }

    {console.log(job)}

    if(isLoading)
            return(<>...Loading</>)
    else    
            return(isObjectEmpty(job)?(<>Sorry! Job you are looking for not found on the server.</>):(
                <AddJobForm job={job}/>
            ))
}


export default JobEditPage;