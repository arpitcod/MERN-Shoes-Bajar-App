import React from 'react'
import UserMenu from './UserMenu'
import { useData } from '../../context/DataAuth'
import './Dashboard.css'

const Dashboard = () => {
  const {userDT}= useData()
  return (
    <>
     
      <div className='User_dash_container'>
          <div className='User_dash_data'>
             <UserMenu />
          </div>

          <div className='user_details'>
              <h3>User Name: {userDT?.user?.name}</h3>
              <h3>User Email: {userDT?.user?.email}</h3>
              <h3>User Address: {userDT?.user?.address}</h3>
           
          </div>
    </div>
    </>
  )
}

export default Dashboard