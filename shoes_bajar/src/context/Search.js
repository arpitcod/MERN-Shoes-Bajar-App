import React, { createContext, useContext, useState } from 'react'


 const SearchContext = createContext();
  const SearchAuth = ({children}) => {

    const [auth,setAuth] = useState({
        
        keyword:"",
        results:[],
    })
      
  return (
      <SearchContext.Provider value={[auth,setAuth]}>
        {children}
          {/* <pre>{JSON.stringify(userDT?.user?.role)}</pre> */}
          {console.log('search_data',{auth})}
      </SearchContext.Provider>
      
  )
}

 const useSearch = () => useContext(SearchContext)


 export {SearchAuth,useSearch}
