import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useData } from "./DataAuth";



// data added in login file 

export const AuthContext =createContext();

export const AuthProvider = ({children}) =>{

     
    // getting token usestate
     const [token,setToken] = useState(localStorage.getItem("token"));
    //  const [data,setData] =useState(null)
    const {userDT,setUserDt} = useData();

    // useEffect(() =>{
    //     const data = localStorage.getItem("userDT")
    //     if (data) {
    //         const parseData = JSON.parse(data)

    //         setUserDt({
    //             ...userDT,
    //             user:parseData.user,
    //             token:parseData.token,
    //             // data:response
    //         })
    //     }
    // },[userDT])

     
      
    const storeTokenLS = (serverToken) =>{ 
        // console.log("your token",serverToken)
             
        // setUserDt(serverToken);
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
        // return localStorage.setItem("token",serverToken);
    }

   //default axios
    axios.defaults.headers.common["Authorization"]= userDT?.user?.role.token;
  
     
    
 


        //  userLogout   
    const userLogout = () =>{
        setToken("");
         return localStorage.removeItem("token");
    }
   
    return (
        <AuthContext.Provider value={{storeTokenLS,token,setToken,userLogout}}>
            {children}
        </AuthContext.Provider>   
    ); 
}


export const useAuth =() =>{
    return(
        useContext(AuthContext)
    )
}





