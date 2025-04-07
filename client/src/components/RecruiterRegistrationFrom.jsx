import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/features/auth/authSlice";
import {toast} from "react-toastify";
import {toastOptions} from "../utils/index";
import { useState } from "react";
import { assets } from "../assets/assets";

function RecruiterRegistrationForm (){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const showPasswordHandler = ()=>{
        setShowPassword((prevState)=>!prevState)
    }
    const submitHandler = async(data)=>{
        try{
            const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recruiter/signup`,{
            companyName:data.company,
            email:data.email,
            password:data.password,
            role:"recruiter"
        })
        if(response.status==201)
        {
            // console.log(response);
            toast.success(response.data.message,toastOptions)
            navigate("/recruiter-login")
        }        
        }catch(error){
            if(error.status>=400 && error.status<=499)
                toast.error(error.response.data.message,toastOptions);
            else
                toast.error(error.response.message,toastOptions);
        }
        
    }
return (
    <div className="page-wrapper">
        <div className="form-wrapper">
        <div className="heading-container">
            <h1 className="main-heading">Recruiter Sign Up</h1>
            <h2 className="sub-heading">Welcome back! Please sign in to continue</h2>
        </div>
        <form className="form-container" onSubmit={handleSubmit(submitHandler)}>
            <div className="input-feild-group">
            <label className="input-label" htmlFor={"company-name"} >Company*</label>
            <input
            type="text"
            id="company-name"
            className="input-feild-text"
            placeholder="Company Name"
            {...register("company",{required:"enter company name",maxLength:{value:16,message:"too long company name"},minLength:{value:4,message:"company name too short"}})}/> 
            {errors.company && (<p className="error-msg">{errors.company?.message}</p>)}   
            <label className="input-label" htmlFor={"email"} >Email*</label>
            <input
            type="text"
            id="email"
            className="input-feild-text"
            placeholder="enter your email id"
            {...register("email",{required:"email required !",
                pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email address!"

                }
            })}/>
            {errors.email && (<p className="error-msg">{errors.email?.message}</p>)}
            <label className="input-label" htmlFor={"password"} >Password*</label>
            <div className="inline-block border-1 border-gray-300  rounded-md px-3 h-9 w-92 relative py-1">
            <input
            type={showPassword?"text":"password"}
            id="password"
            className="inline-block focus:ring-0 focus:outline-0 w-80 text-sm"
            placeholder="enter password"
            {...register("password",{
                required:"password required !",
                maxLength:{value:16,message:"Password should not excced 16 characters"},
                minLength:{value:8,message:"Password must be 8 characters long"},
                validate: {
                    hasUpperCase:value=>/^(?=.*[A-Z]).*$/.test(value) || "Password must contain atleast one uppercase letter",
                    hasNumber: value=>/\d/.test(value) || "Password must contain atleast one number",
                    hasSpecialCharacter: value=>/[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain atleast one special character",
                }
            })}/>
            <button className="inline-block absolute right-3" onClick={showPasswordHandler} type="button"><img className="h-6 w-6 inline-block" src={showPassword?assets.hide_password_icon:assets.show_password_icon}/></button>   
            </div>
            {errors.password && (<p className="error-msg">{errors.password?.message}</p>)}
        </div>
        <p className="hr-line"></p>
        <button type="submit" className="form-submit-button">next</button>
        </form>
        <div>
            <p className="auth-navigation-msg">Already have an account? <Link to="/recruiter-login" className="auth-navigation-link">Login</Link></p>
        </div>
        </div>
    </div>
)
}


export default RecruiterRegistrationForm;