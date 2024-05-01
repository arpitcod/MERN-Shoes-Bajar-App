import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useEffect } from "react";


export const LogoutPage =() =>{
    const {userLogout} =useAuth();

    useEffect(() =>{
       userLogout();
    },[userLogout]);

    return <Navigate to={'/'} />;

}

