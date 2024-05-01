import React from 'react'
import { NavLink } from 'react-router-dom'
import './AdminMenu.css'

const AdminMenu = () => {
  return (
    <>
       <div className='List_grp'>
          <h1>Admin Panel</h1>
          <NavLink to='/dashboard/admin/create-category' className='Nav-link'>Create Category</NavLink>
          <NavLink to='/dashboard/admin/create-product' className='Nav-link'>Create Product</NavLink>
          <NavLink to='/dashboard/admin/products' className='Nav-link'>Products</NavLink>
          <NavLink to='/dashboard/admin/users' className='Nav-link'>Users</NavLink>
       </div>
    </>
  )
}

export default AdminMenu