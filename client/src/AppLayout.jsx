import { useState } from 'react';
import './App.css';
import { Link, Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/features/auth/authSlice';
import { Navbar, Footer } from './components';


function App() {
  const {isLoggedIn} = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const logoutHandler = ()=>{
    dispatch(logout())
  }
  return (
    <div className='relative pb-12'>
    <Navbar/>
    <Outlet/>
    <Footer/>  
    </div>
  )
}

export default App
