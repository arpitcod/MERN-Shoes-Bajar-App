import React from 'react';
import './Header.css'
import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useData } from '../../context/DataAuth';
import Searchinput from '../Form/Searchinput';
import { useCart } from '../../context/Cart';
// import Login from '../../pages/Login';
// import { useLogin } from '../../pages/Login';




const Header = () => {
    const {token} = useAuth();
    const {userDT} = useData();

    const [cart] =useCart();
    

  // useContext using for token 


 
  

    

  return (
    <>

          <div className='Navbar_container'>
               <div className='Logo_name'>
                  <h1>Shoes bajar</h1>
               </div>
               <Searchinput />
            <div className='Nav_links'>
                   <NavLink to='/' className="Nav_link">Home</NavLink>
                   <NavLink to='/men' className="Nav_link">Men</NavLink>
                   <NavLink to='/women' className="Nav_link">Women</NavLink>
                   <NavLink to='/kids' className="Nav_link">Kids</NavLink>
            
                   {
                    token?(<>
                      <NavLink to='/logout' className="Nav_link" >Logout</NavLink> 
                      {/* <NavLink to="/dashboard" className="Nav_link" >Dashboard</NavLink>  */}
                     
                      
                      <NavLink to={`/dashboard/${userDT?.user?.role === 1 ? "admin" :"user"}`} className="Nav_link" >Dashboard</NavLink>
                      {console.log('your header ',userDT)}
                      {console.log('your header ',userDT.token)}
                      
                       </>) :(<>
                      <NavLink to='/register' className="Nav_link">Register</NavLink>
                      <NavLink to='/login' className="Nav_link">Login</NavLink>
                    </>)
                   }
                   <NavLink to='/cartpage' className="Nav_link">Cart ({cart?.length})</NavLink>
                   
                  
               </div>
              

          </div>
    
    </>
  )
}

export default Header
