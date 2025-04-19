import { useDispatch } from "react-redux";
// import { addCategoryFilterOption, removeCategoryFilterOption } from "../store/features/filters/filtersSlice";


function JobFilterOptions({className="",filterType="Filter Type", filterOptions=[],addFilterOptionHandler, removeFilterOptionHandler})
{
    const dispatch = useDispatch();

    return (
    <section className={`${className}`}>
        <p className="font-medium text-lg py-4">Search By <span>{filterType}</span></p>
        <ul className="space-y-4 text-gray-600">
        {
            filterOptions.map((filterOption,index)=>(
                <li className="flex gap-3 items-center" key={index}>
                    <input type="checkbox" onChange={(event)=>{
                        if(event.target.checked){
                            dispatch(addFilterOptionHandler(filterOption))
                        }
                        else{
                            dispatch(removeFilterOptionHandler(filterOption));
                        }
                    }}/>
                    <span className="capitalize text-sm">{filterOption}</span>
                </li>
            ))
        }
        </ul>
    </section>
    )
}


export default JobFilterOptions;