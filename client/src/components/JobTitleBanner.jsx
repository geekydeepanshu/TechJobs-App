import {assets} from "../assets/assets";

function JobTitleBanner({job}){
    return (
    <div className="w-11/12 h-56 border-1 mx-auto border-blue-400 bg-blue-50 rounded-md  p-10 flex justify-between items-center box-border my-4">
        <div className="flex items-center">
            <div className="h-28 w-28 bg-white border-1 border-gray-300 rounded-xl py-9 px-2 mr-5 ">
                <img className="h-8" src={assets.accenture_logo} alt="company logo" />
            </div>
            <div className="flex flex-col ">
                <h1 className="text-4xl font-semibold  text-gray-800">{job.title}</h1>
                <div className="flex  mt-3 space-x-4">
                    <div className="flex">
                        <img className="mr-2" src={assets.suitcase_icon} alt="suitcase logo" />
                        <span>Google</span>
                    </div>
                    <div className="flex"> 
                        <img className="mr-2" src={assets.location_icon} alt="location logo" />
                        <span>{job.location}</span>
                    </div>
                    <div  className="flex">
                        <img className="mr-2" src={assets.person_icon} alt="person logo" />
                        <span>{job.level}</span>
                    </div>
                    <div className="flex">
                        <img className="mr-2" src={assets.money_icon} alt="money logo" />
                        <span>CTC: {job.salary}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center">
            <button className="h-10 text-sm w-42 bg-blue-600 text-white rounded-sm mb-1">Apply Now</button>
            <p className="text-gray-600 text-xs">Posted 5 months ago</p>
        </div>
    </div>    
    
)}


export default JobTitleBanner;