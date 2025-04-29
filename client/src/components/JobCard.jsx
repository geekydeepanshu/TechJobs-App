import googleLogo from "../assets/google.png";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import parse from "html-react-parser"
import { useNavigate } from "react-router";

function JobCard({
    job={
    title:"Software Engineer",
    location:"Hyderabad",
    level:"Junior Level",
    description:"Join our technology team as a Cloud Engineer, where you will be responsible for designing and managing our cloud infrastructure. You will collabora!"
}}){
    const {isLoggedIn} = useSelector(state=>state.auth)
    const navigate = useNavigate();
    return (
    <div key={job._id} className="m-4 border-2 border-gray-200 p-4 shadow rounded-md max-w-2xs">
        <div className="flex justify-start items-center mb-2">
            <img className="h-8" src={googleLogo} alt="company logo" />
            <h4 className="text-lg mx-2 font-medium text-gray-500">{"Google"}</h4>
        </div>
        <div>
            <h3 className="font-medium text-xl mt-2 text-gray-700">{job?.title || "Job Title"}</h3>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="bg-red-50 border border-red-200 px-4 py-1.5 rounded capitalize">{job?.location || "Location"}</span>
            <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded capitalize">{job?.level || "Level"}</span>
        </div>
        <div className="text-gray-500 text-sm mt-4 text-start">{parse(job?.description?.slice(0,160)|| "")}</div> 
        <div className="mt-4 flex gap-4 text-sm box-border">
            <button className="bg-blue-600 text-white py-2 rounded h-9 w-52 text-xs" onClick={()=>{navigate(`/view-job/${job._id}`)}} >Learn More...</button>
            <button className="text-gray-500 border border-gray-500 rounded  w-62 py-2 h-9" onClick={()=>{navigate("/user-login")}}>{isLoggedIn?"Apply Now":"Login to Continue"}</button>
        </div>
    </div>);
}


export default JobCard;