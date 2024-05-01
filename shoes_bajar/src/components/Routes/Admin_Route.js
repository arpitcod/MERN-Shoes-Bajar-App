import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import SpinnerLoading from './Spinner'
import { useData } from '../../context/DataAuth'

const AdminRoute = () => {
    const [ok,setOk] =useState(false);
    const { token,setToken} =useAuth();
    const {userDT,setUserDt} = useData();

    useEffect( () =>{
        const authCheck = async () =>{
            const response =await axios.get('/api/auth/admin-auth');

            // const res_data = response.json();
            // console.log(res_data)
            
            if (response.data.ok) {
                setOk(true);
                console.log('your admin response ==>',response)
               
            } else {
                setOk(false);
                
              
            }
         
        };
        if (userDT?.data?.token) authCheck();
        // if (token?.token) authCheck();
    // },[token?.token]);
    },[userDT?.data?.token]);
    // },[userDT?.data?.token]); 

//   return token? <Outlet /> : <SpinnerLoading /> 
  return userDT?.token? <Outlet /> : <SpinnerLoading path=""/> 
//   return userDT?.data?.ok ? <Outlet /> : <SpinnerLoading path=""/> 


}


export default AdminRoute