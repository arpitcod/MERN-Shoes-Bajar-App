import React, { createContext, useContext, useEffect, useState } from 'react'


 const DataContext = createContext();
  const DataAuth = ({children}) => {

    const [userDT,setUserDt] = useState(()=>{
      const storedData = localStorage.getItem('userDT');
      return storedData ? JSON.parse(storedData) : { user: null, token: '' };
       
    })
    // / Update localStorage whenever userDT changes
  useEffect(() => {
    localStorage.setItem('userDT', JSON.stringify(userDT));
  }, [userDT]);

    // const [userDT,setUserDt] = useState({
      
    //     user:null,
    //     token:""
    // })
         //  userLogout   
      //    const userLogout = () =>{
      //     setUserDt("");
      //      return localStorage.removeItem("token");
      // }
      
  return (
      <DataContext.Provider value={{userDT,setUserDt}}>
        {children}
          {/* <pre>{JSON.stringify(userDT?.user?.role)}</pre> */}
          {/* {console.log('data',{userDT})} */}
      </DataContext.Provider>
  )
}

 const useData = () => useContext(DataContext)


 export {DataAuth,useData}
