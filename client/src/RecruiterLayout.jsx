import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { toastOptions } from "./utils";
import { logout } from "./store/features/auth/authSlice";

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
       <h1>
            Recruiter - Landing Page
            {isLoggedIn?<button onClick={()=>dispatch(logout())}>Logout</button>:<></>}
       </h1>
    )
}


export default RecruiterLayout;