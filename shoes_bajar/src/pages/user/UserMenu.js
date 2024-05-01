import React from 'react'
import { NavLink } from 'react-router-dom'
import './UserMenu.css'

const UserMenu = () => {
  return (
    <>
    <div className='List_grp'>
    <h1>Dashboard</h1>
          {/* <h1>Admin Panel</h1> */}
          <NavLink to='/dashboard/user/profile' className='Nav-link'>profile</NavLink>
          <NavLink to='/dashboard/user/orders' className='Nav-link'>orders</NavLink>
          
       </div>
    </>
  )
}

export default UserMenu