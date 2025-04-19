import {SearchBox} from "../components"

function SearchBanner({className}){
    return (
        <div className={`${className} bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl`}>
            {/* <div> */}
                <h2 className="text-4xl mb-4">Over 10,000+ jobs to apply</h2>
                <p className="px-5 mb-8 text-md font-light">Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
                <SearchBox/>
            {/* </div> */}
        </div>
    )
}

export default SearchBanner;