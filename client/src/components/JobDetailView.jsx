import JobCard from "./JobCard";
import parse from "html-react-parser";

function JobDetailView({job}){
      
    return (
        <div className="mx-auto w-screen px-3">
        <div className="container mx-auto flex justify-between items-start ">
            <div className="w-9/12 text-wrap">
                <h2 className="my-2 text-xl font-bold">Job Description</h2>
                <p className="w-[520px]">
                    { parse (job.description)}
                </p>
            </div>
            <section className="w-3/12">
                <h2>More jobs from Google</h2>
                <JobCard />
                
            </section>
        </div>
        </div>
    )
 }

export default JobDetailView;