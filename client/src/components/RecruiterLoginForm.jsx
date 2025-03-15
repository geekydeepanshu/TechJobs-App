import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { login } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils";


function RecruiterLogicForm(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = async({email,password})=>{
        try {
            console.log(email,password)
             const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recruiter/Reclogin`,
            {
                email,
                password
            })
            console.log("Response",response)
            if(response.status==200){
                console.log(response);
                dispatch(login(response.data.user))
                toast.success(response.data.message,toastOptions);
                navigate("/recruiter-dashboard");
            }
            } 
        catch (error) 
            {
                console.log("Error",error);
                if(error.status>=400 && error.status<=499)
                    toast.error(error.response?.data?.message,toastOptions);
                else
                    toast.error(error.response?.data?.message || error.message,toastOptions);
            }
     
        
    }
return (
<div className="page-wrapper">
    <div className="form-wrapper">
    <div className="heading-container">
        <h1 className="main-heading">Recruiter Login</h1>
        <h2 className="sub-heading">Welcome back! Please sign in to continue</h2>
    </div>
    <p className="hr-line"></p>
    <form className="form-container" onSubmit={handleSubmit(submitHandler)} >
        <div className="input-feild-group">
        <label className="input-label" htmlFor={"email"} >Email*</label>
        <input
            type="text"
            id="email"
            className="input-feild-text"
            placeholder="enter your email"
            {...register("email",{required:"email required",
                pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email address!"

                }
            })}
            />
            {errors.email && (<p className="error-msg">{errors.email?.message}</p>)}
            <label className="input-label" htmlFor={"password"} >Password*</label>
        <input 
            type="password"
            id="password"
            className="input-feild-text"
            placeholder="enter password" 
            {...register("password",{required:"password required"
            })}/>    
           </div>  
         <p>Forgot Password?</p>
         <p className="hr-line"></p>   
         <button className="form-submit-button" type="submit">login</button>
    </form>
    <div>
        <p className="auth-navigation-msg">Alerady have an account? <Link to="/recruiter-registration" className="auth-navigation-link">Sign Up</Link> </p>
    </div>
    </div>
</div>)
}


export default RecruiterLogicForm;


