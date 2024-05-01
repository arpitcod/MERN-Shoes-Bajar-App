import React from 'react'
import { Link } from 'react-router-dom'
// import HomePage from './HomePage' 
import '../pages/ErrorPage.css';
// import HomePage from './HomePage'
// import Image from '../public/images/error_page.png';


const ErrorPage = () => {
  return (
    <>
         {/* <img src={Image}></img> */}
       <div className='Error_page_container'>
          <div className='Error_title'>
                <h1>404 page not found</h1>

                <Link to='/' className='Go_link'>Go Back</Link>
          </div>
       </div>  
    </>
  )
}

export default ErrorPage 