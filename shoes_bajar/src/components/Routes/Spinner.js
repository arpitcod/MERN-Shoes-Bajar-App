import React, { useEffect, useState} from 'react'
import './Spinner.css'
import { useNavigate } from 'react-router-dom'



// const SpinnerLoading = ({path ='login'}) => {
const SpinnerLoading = ({path ='login'}) => {
  const [count ,setCount] =useState(1);
  const navigate =useNavigate();

   useEffect(()=>{
      const interval =setInterval(() => {
        setCount((counting) => --counting);
      },2000);
      count === 0 && navigate(`/${path}`) 
      // count === 0 && navigate(`/${path}`) 

      return () =>clearInterval(interval);
   },[count, navigate,path])
 

  

  return (
    <div> 
       <div className="loader" />

    </div>
  )
}

export default SpinnerLoading