import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import SpinnerLoading from './Spinner'
import { useData } from '../../context/DataAuth'


const PrivateRoute = () => {
    const [ok,setOk] =useState(false);
    const { token,setToken} =useAuth();
    const {userDT,setUserDt} = useData();

    useEffect( () =>{
        const authCheck = async () =>{
            const response = await axios.get('/api/auth/user-auth');
            
            if (response.data.ok) {
                setOk(true);
               
            } else {
                setOk(false);
                
              
            }
            
        
        };
        // if (userDT?.data?.token) authCheck();
        if (userDT?.data?.token) authCheck();
    },[userDT?.data?.token]);
    // },[userDT?.data?.token]);

  return  userDT?.token? <Outlet /> : <SpinnerLoading /> 
//   return  userDT?.token? <Outlet /> : <SpinnerLoading /> 
}

export default PrivateRoute