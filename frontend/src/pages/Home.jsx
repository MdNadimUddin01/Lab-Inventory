import React from 'react'
import Header from '../components/Common/Header'
import LandingPage from '../components/Home/LandingPage'
import SignupForm from '../components/Common/SignupForm'
import LoginForm from '../components/Common/LoginForm'
import {Outlet} from "react-router-dom"
import toast, {Toaster} from "react-hot-toast"

function Home() {
  
  return (
    <div className=' w-screen '>
      
       <Header></Header>
      <div>
        <Outlet></Outlet>
      </div>
      <Toaster/>
      
    </div>
  )
}

export default Home
