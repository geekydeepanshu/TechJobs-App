import { useState } from 'react';
import './App.css';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/features/auth/authSlice';
import Navbar from './components/navbar';


function App() {
  const {isLoggedIn} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const logoutHandler = ()=>{
    dispatch(logout())
  }
  return (
    <>
    <Navbar/>
      <h1>Tech-Jobs-App</h1>
      <p>Home Page</p>
      <div>
         {/* { !isLoggedIn && <div>
            <Link to="/user-login">User Login</Link>
            <Link to="/recruiter-login">Recruiter Login</Link>
            </div>
            }
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>} */}

      </div>
    </>
  )
}

export default App
