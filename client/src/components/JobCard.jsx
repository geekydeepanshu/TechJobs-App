import googleLogo from "../assets/google.png";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import parse from "html-react-parser"


function JobCard(props){
    const {isLoggedIn} = useSelector(state=>state.auth)
    // {console.table([title,level,location,description])}
    {console.log(props)}
    return (
    <div className="border p-6 shadow rounded">
        {/* <div className="flex justify-start items-center">
            <img className="h-8" src={googleLogo} alt="company logo" />
            <h4 className="text-lg mx-2 font-medium">{"Google"}</h4>
        </div>
        <div>
            <h3 className="font-medium text-xl mt-2">{jobTitle}</h3>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">{jobLevel}</span>
            <span className="bg-red-50 border border-red-200 px-4 py-1.5 rounded">{jobLocation}</span>
        </div>
        {/* <p className="text-gray-500 text-sm mt-4 truncate">{parse(jobDescription)}</p> 
        <div className="mt-4 flex gap-4 text-sm">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" >Learn More...</button>
            <button className="text-gray-500 border border-gray-500 rounded px-4 py-2">{isLoggedIn?"Apply Now":"Login to Continue"}</button>
        </div> */}
    </div>);
}


export default JobCard;