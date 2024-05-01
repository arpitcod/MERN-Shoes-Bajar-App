import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu';
import { toast } from 'react-toastify';
import './Profile.css'
import { useData } from '../../context/DataAuth';
// import { useAuth } from '../context/auth';
import axios from 'axios';
import { useAuth } from '../../context/auth';
// import { token } from 'morgan';



const Profile = () => {
  // const { storeTokenLS } =useAuth();
  const {userDT,setUserDt} = useData();
  const{token} = useAuth();
  
  const[name,setName] =useState('');
  const[email,setEmail] =useState('');
  const[password,setPassword] =useState('');
  const[phone,setPhone] =useState('');
  const[address,setAddress] =useState('');
  
  
  // useEffect(() =>{
  //   const {name,email,phone,address} = userDT?.user;

  //   setName(name);
  //   setEmail(email);
  //   // setPassword(password)
  //   setPhone(phone);
  //   setAddress(address);
    
  // },[userDT?.user])
  
  // useEffect(() =>{
  //   const {name,email,phone,address} = userDT?.user;

  //   setName(name);
  //   setEmail(email);
  //   // setPassword(password)
  //   setPhone(phone);
  //   setAddress(address);
    
  // },[userDT?.user])
  
  

  const handle_submit = async (event)=>{
    event.preventDefault();
    console.log({name,email,password,phone,address});
  
    // useNavigate("/")
    // setUser({...user});
    
    // reponse
    // try {
    //   const {data} =await axios.put("http://localhost:2914/api/auth/profile",{
    //     name,
    //     email,
    //     password,
    //     phone,
    //     address
    //   });
    try {
      const {data} = await fetch("http://localhost:2914/api/auth/profile",{
        method:"PUT",
        headers:{  
          "Content-Type":"application/json",
          'Authorization': await token,
        },
        body:JSON.stringify({name,email,password,phone,address}),
      });
      if (data?.error) {
           
        toast.error(data?.error);
        console.log('if profile data',data)
        // toast.success("Register Successfully, Please login to contiune.")
        // const response_data = await response.json();
        // console.log("response data ==>",response_data);

      
         //store token local storage (auth context)
        // storeTokenLS(response_data.token)
        // console.log(storeTokenLS);
        
      } else {
        // toast.error("Register Failed")
        // alert("register failed ")

        setUserDt({...userDT,user:data?.updatedUser});
        let ls =localStorage.getItem('userDT');
        ls=JSON.parse(ls);
        ls.user=data.updatedUser;
        localStorage.setItem("userDT",JSON.stringify(ls));
        toast.success("profile updated successfully");
        console.log('else profile data',data)
        
      

      }
    } catch (error) {
      // alert(error) 
      toast.error("something went wrong");
      console.log(error);
      // console.log('else profile data',data)
    } 
      

          
      }
  return (
    <>
    <UserMenu />
    <div className='main_register_container'>
        <div className='register_container'>
           <div className='regi_side_1_box'>
              <h1>Update Profile</h1> 
              {/* <h1>welcome{userDT?.user.name}</h1> */}
            </div>
           <div className='regi_side_2_box'>
             {/* <p>{userDT.name}</p>
             <p>{userDT.email}</p>
             <p>{userDT.phone}</p>
             <p>{userDT.address}</p>
             <p>{}</p> */}

          <form onSubmit={handle_submit} className='register_form'>
            
            {/* <label htmlFor='name'>Name</label>  */}
              <input 
                 type='text'
                 name='name'
                 placeholder='Enter Your Username'
                 id='username'
                 autoComplete='off'
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
                //  disabled
                 value={email}
                //  onChange={(event) => !event.target.disabled && setEmail(event.target.value)}
                 onChange={(event) => setEmail(event.target.value)}
                
              /><br></br>
            {/* <label htmlFor='password'>Password</label> */}
              <input 
                 type='password'
                 name='password'
                 placeholder='Enter Your password'
                 id='password'
                 autoComplete='off'
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
                 value={address}
                 onChange={(event) => setAddress(event.target.value)}
                
              />
            {/* <label htmlFor='answer'>Answer</label> */} 
            <button type='submit' className='register_btn'>Update</button>
                              
          
            
            

        
          </form> 
           </div>
        </div>
        </div> 
  
  
    </>
  )
}

export default Profile