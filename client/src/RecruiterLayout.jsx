import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router";
import { toast } from "react-toastify";
import { toastOptions } from "./utils";
import { logout } from "./store/features/auth/authSlice";
import Navbar from "./components/navbar";

function RecruiterLayout(){
    const {role, isLoggedIn} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(role!="recruiter")
        {
            toast.error("Something went wrong... Please try again !",toastOptions);
            navigate("/")
        }
    })
    return (
        <>
       {/* <h1>
            Recruiter - Landing Page
            {isLoggedIn?<button onClick={()=>dispatch(logout())}>Logout</button>:<></>}
            
       </h1> */}
       <Navbar/>
       <div className="flex">
        <section className="flex-1 w-2/8">
          <ul>
            <li>
              <button
                
                className="block py-2 px-4 text-lg hover:bg-gray-700 rounded"
              >
                Add Job
              </button>
            </li>
            <li>
              <button
               
                className="block py-2 px-4 text-lg hover:bg-gray-700 rounded"
              >
                Manage Job
              </button>
            </li>
            <li>
              <button
                
                className="block py-2 px-4 text-lg hover:bg-gray-700 rounded"
              >
                View Application
              </button>
            </li>
          </ul>
        </section>
       <div className="w-6/8 px-72">
        <Outlet/>
       </div>
       </div>
        
       
       </>
    )
}


export default RecruiterLayout;