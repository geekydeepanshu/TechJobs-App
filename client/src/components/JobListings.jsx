import axios from "axios";
import { useEffect, useState } from "react";
import {JobCard} from "../components"

function JobListings(){
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>async()=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/getalljobs`);
        if(response.status==200){
            setJobs(response.data?.jobs);
            setIsLoading(false);
            // console.log(response,response.data.jobs,jobs);
        }
    },[])
    return (
        <>{isLoading?(
            <p>Loading! Please wait ...</p>
        ):(
            <div>
                {console.log("jobs",jobs)}
                {jobs.map((job)=>{return (<JobCard key={job._id} props={job}/>)})}
            </div>
        )}</>
    )
}

export default JobListings;