<<<<<<< Updated upstream
=======
import { useSelector } from "react-redux";
import {assets} from "../assets/assets";
import { Link } from "react-router";

function Navbar(){
    const {isLoggedIn, role, userInfo} =  useSelector(state=>state.auth);
return (
    <nav className="flex flex-row justify-between items-center mx-3 pt-2 pb-1 border-b-1 border-b-gray-300">
        <div className="inline-block">
            <img src={assets.logo} alt="tech jobs logo" />
        </div>
        <div className="">
            {
                isLoggedIn?(
                    <div className="flex items-center justify-end space-x-4"> 
                        <div>
                        <p className="text-lg">Welcome, <span>{role=="recruiter"?userInfo.companyName:role=="jobseeker"?userInfo.name:"Error"}</span></p></div>
                        <div className="inline-block h-1/2">
                        <img src={assets.profile_img} className="w-8 h-8 rounded-full object-cover" alt="person_icon" />
                    </div>
                    </div>    
                  
                ):(
                <div className="flex-row justify-between items-center">
                    <div>
                    <span className="mx-2">
                        <Link to="/user-login">User Login</Link>
                    </span>
                    <span className="mx-2">
                        <Link to="/recruiter-login">Recruiter Login</Link>
                    </span>
                    </div>
                    
                </div>)
            }
        </div>
    </nav>
)
}


export default Navbar;
>>>>>>> Stashed changes
