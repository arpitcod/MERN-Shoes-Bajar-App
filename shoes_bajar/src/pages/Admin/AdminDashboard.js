import React from 'react'
import AdminMenu from './AdminMenu'
import './AdminDashboard.css'
// import { useAuth } from '../../context/auth'
import { useData } from '../../context/DataAuth'

const AdminDashboard = () => {

  const {userDT} = useData();
  return (
    <>
  
    <div className='Admin_dash_container'>
          <div className='Admin_dash_data'>
             <AdminMenu />
          </div>

          <div className='admin_details'>
              <h3>Admin Name: {userDT?.user?.name}</h3>
              <h3>Admin Email: {userDT?.user?.email}</h3>
              <h3>Admin Contact: {userDT?.user?.phone}</h3>
           
          </div>
    </div>


    </>
  )
}

export default AdminDashboard