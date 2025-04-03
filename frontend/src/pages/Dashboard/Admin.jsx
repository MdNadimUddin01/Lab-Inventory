import React from 'react'
import {Outlet} from "react-router-dom"
import Sidebar from '../../components/Dashboard/Admin/Sidebar'


function Admin() {
  return (
    <div>
      <div className="min-h-screen rounded-3xl  bg-white flex">
      {/* <div className=" overflow-hidden shadow-xl flex"> */}
        <div className='w-64 text-white shadow-xl rounded-3xl '><Sidebar /></div>
        
        
        {/* Main Content - Outlet will render child routes here */}
        <div className="flex  item-center justify-center p-6 w-full">
          <Outlet />
        </div>
      {/* </div> */}
    </div>

    </div>
  )
}

export default Admin
