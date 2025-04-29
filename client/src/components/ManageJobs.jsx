import { dateToString, toastOptions } from "../utils";
import {useSelector} from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

function ManageJobs(){
    const [isLoading, setIsLoading]  = useState(false);
    const [jobs, setJobs] = useState([]);
    let reload = false;
    const { userInfo,token } = useSelector(state=>state.auth);
    const navigate = useNavigate();


    useEffect(()=>{ 
        setIsLoading(true);
        setJobs(getAllJobsByRecruiter());
    },[reload])
    const getAllJobsByRecruiter = async()=>{
        try{
             const response =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/getalljobsbyrectruiter`,{
                recruiterId:userInfo._id})
                if(response.status==200){
                    setJobs(response.data?.jobs);
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

    const editJob = (jobId)=>{
        navigate(`../edit-job/${jobId}`);
    }

    const deleteJob = async(jobId)=>{
        try{
            const response =  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/delete/${jobId}`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            console.log(response);
            if(response.status==200){
                reload = true;
                toast.success(response.data?.message,toastOptions);
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




    if(isLoading)
    {
        return (<>Loading...</>)
    }
    else
    {
        return(
        // <p>Manage Jobs</p>
        <section className="p-4">
            <table >
                <thead >
                    <tr className="border-1 border-black px-2 inline-block">
                        <th className="w-10 inline-block">#</th>
                        <th className="w-62 inline-block">Job Title</th>
                        <th className="w-36 inline-block">Date</th>
                        <th className="w-36 inline-block">Location</th>
                        <th className="w-36 inline-block">Applications</th>
                        <th className="w-24 inline-block">Visible</th>
                        <th className="w-24 inline-block">Edit Job</th>
                        <th className="w-24 inline-block">Delete Job</th>
                    </tr>
                </thead>
                <tbody>
                        {
                                jobs.map((job,index)=>{
                                return(
                                   
                                <tr key={index} className="border-1 border-black px-2 block">
                                    <td className="w-10  text-center inline-block">{index+1}</td>
                                    <td className="w-62 text-center inline-block"><Link className="hover:text-blue-500" to={`/view-job/${job._id}`}>{job.title}</Link></td>
                                    <td className="w-36 text-center inline-block">{dateToString(job.createdAt)}</td>
                                    <td className="w-36 text-center inline-block capitalize">{job.location}</td>
                                    <td className="w-36 text-center inline-block">{job.applicants|| 12 + index}</td>
                                    <td className="w-24 text-center inline-block"><input type="checkbox" /></td>
                                    <td className="w-24 text-center inline-block"><button onClick={()=>editJob(job._id)}> <img className="h-5" src={assets.edit_icon_with_underline} alt="edit icon underline" /></button></td>
                                    <td className="w-24 text-center inline-block" ><button onClick={()=>deleteJob(job._id)}><img className="h-4" src={assets.bin_icon}/></button></td>

                                </tr>)
                            })
                        }
                </tbody>
            </table>
        </section>
    ); 
}
}

export default ManageJobs;