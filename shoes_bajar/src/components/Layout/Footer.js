import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
   <>
       <div className='Footer_container'>
               
          {/* <h1 className='Footer_txt'>welcome to my website</h1> */}
          <div className='Footer_links'>
             <Link to='/about' className='Footer_link'>About</Link>  
             <Link to='/contact' className='Footer_link'>Contact</Link>  
             <Link to='/policy' className='Footer_link'>Privacy Policy</Link>  
          </div> 

          
               
        </div>
   </>
  )
}

export default Footer