import React, { useState } from 'react'
import './Register.css'
// import { response } from 'express';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../context/auth';
// import { useData } from '../context/DataAuth';

// import 'react-toastify/dist/ReactToastify.css';
// import { Form } from 'react-router-dom'


const Register = () => {

  // const[user,setUser] =useState('');
  const[name,setName] =useState('');
  const[email,setEmail] =useState('');
  const[password,setPassword] =useState('');
  const[phone,setPhone] =useState('');
  const[address,setAddress] =useState('');
  const[answer,setAnswer] =useState('');
  
//  const {userDT,setUserDt} =useData();
  // const navigate =useNavigate();

  //store token local storage (auth context)
  const { storeTokenLS } =useAuth();

  
  
  const handle_submit =async (event)=>{
    event.preventDefault()
    console.log({name,email,password,phone,address,answer});
  
    // useNavigate("/")
    // setUser({...user});
    
    // reponse
    try {
      const response = await fetch("http://localhost:2914/api/auth/register",{
        method:"POST",
        headers:{  
          "Content-Type":"application/json",
        },
        body:JSON.stringify({name,email,password,phone,address,answer}),
      }); 
      if (response.ok) {

        const response_data = await response.json();
        console.log("response data ==>",response_data);

      

        //store token local storage (auth context)
        storeTokenLS(response_data.token)
        // console.log(storeTokenLS);
      
        toast.success("Register Successfully, Please login to contiune.")

        // navigate to homepage 
        // navigate('/login');
        
      } else {
        toast.error("Register Failed")
        // alert("register failed ")
      }
    } catch (error) {
      // alert(error) 
      toast.error("invalid registration");
      console.log("register ",error);
    } 
      

          
      }
      
      return (
  <>
      <div className='main_register_container'>
        <div className='register_container_box'>

      
        <div className='register_container'>
           <div className='regi_side_1_box'>
              <h1>Register Form</h1> 
            </div>
           <div className='regi_side_2_box'>


          <form onSubmit={handle_submit} className='register_form'>
            
            {/* <label htmlFor='name'>Name</label>  */}
              <input 
                 type='text'
                 name='name'
                 placeholder='Enter Your Username'
                 id='username'
                 autoComplete='off'
                 required
                 value={name}
                 onChange={(event) => setName(event.target.value)}
                
              /><br></br>
            {/* <label htmlFor='email'>Email</label>  */}
              <input 
                 type='email'
                 name='email'
                 placeholder='Enter Your email'
                 id='email'
                 autoComplete='off'
                 required
                 value={email}
                 onChange={(event) => setEmail(event.target.value)}
                
              /><br></br>
            {/* <label htmlFor='password'>Password</label> */}
              <input 
                 type='password'
                 name='password'
                 placeholder='Enter Your password'
                 id='password'
                 autoComplete='off'
                 required
                 value={password}
                //  maxLength={8}
                 onChange={(event) => setPassword(event.target.value)}
                
              /><br />
            {/* <label htmlFor='phone'>Phone</label> */}
              <input 
                 type='number'
                 name='phone'
                 placeholder='Enter Your phone'
                 id='phone'
                 autoComplete='off'
                 required
                 value={phone}
                 onChange={(event) => setPhone(event.target.value)}
                
              /><br />
            {/* <label htmlFor='address'>Address</label> */}
              <input 
                 type='text'
                 name='address'
                 placeholder='Enter Your address'
                 id='address'
                 autoComplete='off'
                 required
                 value={address}
                 onChange={(event) => setAddress(event.target.value)}
                
              />
            {/* <label htmlFor='answer'>Answer</label> */}
              <input 
                 type='text'
                 name='answer'
                 placeholder='Enter Your Skill'
                 id='answer'
                 autoComplete='off'
                 required
                 value={answer}
                 onChange={(event) => setAnswer(event.target.value)}
                
              />
            
            <button type='submit' className='register_btn'>Register</button>
                              
          
            
            

        
          </form> 
           </div>
        </div>
        </div>
        </div> 
  
  

  

  </>
  )
}

export default Register