import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, NavLink } from "react-router";
import { toast } from "react-toastify";
import { toastOptions } from "./utils";
import { logout } from "./store/features/auth/authSlice";
import Navbar from "./components/Navbar";
import { assets } from "./assets/assets";
import { Footer } from "./components";

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
       <div className="flex h-screen">
        <section className="w-1/5 border-r-1 border-r-gray-300">
          <ul className="py-2">
            <li className="mx-2">
              <img className="inline-block mx-2" src={assets.add_icon}/>
              <NavLink
                to={"add-job"}
                className={({isActive})=>`${isActive?"text-blue-400":""} inline-block py-1 px-2 text-lg  rounded`}
              >
                Add Job
              </NavLink>
            </li>
            <li className="mx-2">
              <img className="inline-block mx-2" src={assets.home_icon} alt="" />
            <NavLink
                to={"manage-jobs"}
                className={({isActive})=>`${isActive?"text-blue-400":""} inline-block py-1 px-2 text-lg rounded`}
              >
                Manage Job
              </NavLink>
            </li>
            <li className="mx-2">
              <img className="inline-block mx-2" src={assets.person_tick_icon}/>
            <NavLink
                to={"view-applications"}
                className={({isActive})=>`${isActive?"text-blue-400":""} inline-block py-1 px-2 text-lg  rounded`}
              >
                View Application
              </NavLink>
            </li>
          </ul>
        </section>
       <div className="">
        <Outlet/>
       </div>
       </div>
       </>
    )
}


export default RecruiterLayout;