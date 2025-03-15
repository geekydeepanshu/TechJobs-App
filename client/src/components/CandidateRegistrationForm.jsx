import {useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils";

function CandidateRegistrationForm(){
  const {register, handleSubmit, formState:{ errors }} = useForm();
  let navigate = useNavigate();

  const submitHandler = async(data)=> {
    const {firstName, lastName, email, password} = data;
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
            {
        firstname:firstName,
        lastname:lastName,
        email,
        password,
            })
            if(response.status == 201){
                toast.success(response.data?.message,toastOptions)
                navigate("/user-login")
            }
            else
                toast.error(response.data?.message.toastOptions);
            
        console.log(response);    
    }
    catch(error){
        console.log("Error:",error)
        if(error.status >=400 && error.status <=499)
            toast.error(error.response?.data?.message,toastOptions);
        else  if(error.status >=500 && error.status <=599)
            toast.error(error.response?.statusText,toastOptions);
        else
        toast.error(error.response,toastOptions)
    }
    // console.log(data);
  }
return (
<div className="page-wrapper">
    <div className={`form-wrapper ${errors?"scale-100":""}`}>
    <div className="heading-container">
        <h1 className="main-heading">Create your account</h1>
        <h2 className="sub-heading">Welcome! Please fill in the details to get started.</h2>
    </div>
    <p className="hr-line"></p>
    <form className={` form-container`} onSubmit={handleSubmit(submitHandler)}>
        <div className="input-feild-group">
        <div className="input-horizontal-group">
        <label className="input-label" htmlFor={"firstName"} >First Name*</label>
        <input  
          type="text"
          id="firstName"
          className="input-feild-text"
          placeholder="enter you first name"
          {...register("firstName",{
                                    required:"First name required!", 
                                    maxLength:{value:24,message:"First name should be less than 24 characters"},
                                    minLength:{value:3,message:"First name should be more than 3 characters"}
                                })}
          />
          {errors.firstName && (<p className="error-msg">{errors.firstName?.message}</p>)}
          <label className="input-label" htmlFor={"lastName"} >Last Name*</label>
          <input  
          type="text"
          id="lastName"
          className="input-feild-text"
          placeholder="enter your last name"
          {...register("lastName",{
                                    required:"Last name required!", 
                                    maxLength:{value:24,message:"Last name should be less than 24 characters"},
                                    minLength:{value:3,message:"Last name should be more than 3 characters"}
                                })}
          />
          {errors.lastName && (<p className="error-msg">{errors.lastName?.message}</p>)}
          </div>
          <label className="input-label" htmlFor={"email"} >Email*</label>
          <input
            type="text"
            id="email"
            className="input-feild-text"
            placeholder="enter your email"
            {...register("email",{required:"email required !",
                pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email address!"

                }
            })}/>
            {errors.email && (<p className="error-msg">{errors.email?.message}</p>)}
            <label className="input-label" htmlFor={"password"} >Password*</label>
            <input
            type="password"
            id="password"
            className="input-feild-text"
            placeholder="enter your password"
            {...register("password",{required:"password required !",
                maxLength:{value:16,message:"Password should not excced 16 characters"},
                minLength:{value:8,message:"Password must be 8 characters long"},
                validate: {
                    hasUpperCase:value=>/^(?=.*[A-Z]).*$/.test(value) || "Password must contain atleast one uppercase letter",
                    hasNumber: value=>/\d/.test(value) || "Password must contain atleast one number",
                    hasSpecialCharacter: value=>/[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain atleast one special character",
                }
               
            })}/>
            {errors.password && (<p className="error-msg">{errors.password?.message}</p>)}
        </div>
        <p className="hr-line"></p>
        <button type="submit" className="form-submit-button">Continue ➤</button>
    </form>
    <div>
        <p className="auth-navigation-msg">Already have an account? <Link to="/user-login" className="auth-navigation-link">Sign in</Link></p>
    </div>
    </div>
</div>
);
}


export default CandidateRegistrationForm;