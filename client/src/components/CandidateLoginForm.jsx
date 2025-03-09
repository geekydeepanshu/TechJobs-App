import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import {login} from "../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../utils";

function CandidateLoginForm(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                    dispatch(login(response.data?.user));  
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
             <input
            type="password"
            id="password"
            className="input-feild-text"
            placeholder="Enter your password"
            {...register("password",{required:"password required!"})}/>
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