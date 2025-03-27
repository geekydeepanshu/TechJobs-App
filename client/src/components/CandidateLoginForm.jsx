import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import {login} from "../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../utils";
import { useState } from "react";
import { assets } from "../assets/assets";

function CandidateLoginForm(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showPasswordHandler = ()=>{
        setShowPassword((prevState)=>!prevState)
    }

    const submitHandler = async(data)=> {
        const {email, password} = data;
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
                {
            email,
            password,
                })
                if(response.status == 200)
                {
                    toast.success(response.data?.message,toastOptions); 
                    dispatch(login({role:response.data?.user?.role, userInfo:response.data?.user, token: response.data?.token}));  
                    navigate("/");
                }
                else{
                    toast.error(response.data?.message.toastOptions);
                }
        }
        catch(error){
            console.log("Error:",error)
            if(error.status == 400)
                toast.error(error.response?.data?.message,toastOptions)
            else{
                toast.error(error.message)
            }
        }
      }
    return (
        <div className="page-wrapper">
        <div className="form-wrapper">
        <div className="heading-container">
            <h1 className="main-heading">Sign in to Job Portal</h1>
            <h2 className="sub-heading">Welcome back! Please sign in to continue</h2>
        </div>
        <p className="hr-line"></p>
        <form className="form-container" onSubmit={handleSubmit(submitHandler)}>
        <div className="input-feild-group">
        <label className="input-label" htmlFor={"email"} >Email*</label>
            <input
            type="text"
            id="email"
            className="input-feild-text"
            placeholder="Enter your email address"
            {...register("email",{required:"email required!",
                pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email address!"

                }
            })}/>
             {errors.email && (<p className="error-msg">{errors.email?.message}</p>) }
             <label className="input-label" htmlFor={"password"} >Password*</label>
             <div className="inline-block border-1 border-gray-300 rounded-md px-3 h-9 w-92 relative py-1">
             <input
            type={showPassword?"text":"password"}
            id="password"
            className="inline-block focus:ring-0 focus:outline-0 w-80"
            placeholder="Enter your password"
            {...register("password",{required:"password required!"})}/>
            <button className="inline-block absolute right-3" onClick={showPasswordHandler} type="button"><img className="h-6 w-6 inline-block" src={showPassword?assets.hide_password_icon:assets.show_password_icon}/></button>   
            </div>
            </div>
            <button type="submit" className="form-submit-button">Continue ➤</button>
        </form>
        <div>
            <p className="auth-navigation-msg">Don't have an account? <Link to="/user-registration" className="auth-navigation-link">Sign up </Link></p>  
        </div>
        </div>
        </div>
    )
}


export default CandidateLoginForm;