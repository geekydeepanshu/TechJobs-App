import { JobFilterOptions, JobTitleBanner, JobCard, SearchBanner, TrustedCompaniesBanner } from "../components";
import {addCategoryFilterOption, addLocationFilterOption, removeCategoryFilterOption, removeLocationFilterOption} from "../store/features/filters/filtersSlice";

import { useGetJobsQuery } from "../store/features/api/apiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LandingPage(){
    const categoryFilterOption = ["programming", "data science", "designing", "networking", "managment", "marketing", "cyber security"];
    const locationFilterOption = ["banglore", "washington", "hyderabad", "mumbai", "california"]
    const {data, isError, isLoading, isSuccess} = useGetJobsQuery();
    const [jobs, setJobs] = useState([]);
    const {categoryFilters, locationFilters} = useSelector(state=>state.filters)
    useEffect(() => {
        if (data?.jobs) {
            if(!categoryFilters.length && !locationFilters.length){
                setJobs(data.jobs);
            }
            else{
                const filteredJobs = data.jobs.filter((job) => {
                    const matchesCategory = categoryFilters.some((category) => category === job.category);
                    const matchesLocation = locationFilters.some((location) => location === job.location);
                    return matchesCategory || matchesLocation;
                });
                setJobs(filteredJobs);
            }
        }
    }, [categoryFilters, locationFilters, data]);

    console.log(jobs);
    return (
        <div className="py-4">
            <div className="container mx-auto">
            <SearchBanner className={"my-4"}/>
            <TrustedCompaniesBanner/>
            </div>
            <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
                <div className="w-full lg:w-1/4 bg-white px-4">
                    <JobFilterOptions 
                        filterType={"Category"} 
                        filterOptions={categoryFilterOption} 
                        addFilterOptionHandler={addCategoryFilterOption} 
                        removeFilterOptionHandler={removeCategoryFilterOption}
                        />
                    <JobFilterOptions 
                        className="pt-14"
                        filterType={"Location"} 
                        filterOptions={locationFilterOption} 
                        addFilterOptionHandler={addLocationFilterOption} 
                        removeFilterOptionHandler={removeLocationFilterOption}/>
                
                </div>
                <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                    <h3 className="font-medium text-3xl py-2" id="job-list">Latest jobs</h3>
                    <p className="mb-8">Get your desired job from top companies</p>
                    <div className="flex flex-wrap">
                       {
                        (isLoading)?(<>Loading...</>):(
                            jobs.map((job,index)=><JobCard key={index} job={job}/>)
                        )
                       }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default LandingPage;