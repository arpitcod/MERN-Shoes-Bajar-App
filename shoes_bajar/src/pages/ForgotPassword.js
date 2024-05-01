import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useAuth } from '../context/auth';
// import 'react-toastify/dist/ReactToastify.css';
// import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {
      
  const [email,setEmail] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [answer,setAnswer] = useState('');

  //  navigate
  const navigate =useNavigate();

  //store token local storage (auth context)
//  const { storeTokenLS } = useAuth();
  
 const handleSubmit =async (event) =>{
    event.preventDefault();
    console.log({email,newPassword,answer});

    try {
      const response =await fetch("http://localhost:2914/api/auth/forgot-password",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email,answer, newPassword}),
      });
      console.log(response);
       
      if (response.ok) {
        const response_data = await response.json();
        console.log("your response data" ,response_data);
        
        //store token local storage (auth context)
        // storeTokenLS(response_data.token)

          //  localStorage.setItem("token",response_data.token);

        toast.success("Password Changed Pls Login again")
        // alert("Login successfull");
        navigate("/login");

        
      }else {
        toast.error("Login failed ")
        // alert("Login failed ")
      }
    } catch (error) {
      // alert(error)
      toast.error(error)
      console.log("login ",error);
    } 
      
}
  return (
    <>
        <div className='Login_container'>
        <div className='side_1_box'>
             <h1>Reset Password</h1>
        </div>
        <div className='side_2_box'>
          <form onSubmit={handleSubmit} className='Login_form'>
             {/* <label htmlFor='email'>Email</label> <br></br> */}
             <input 
               type='email'
               name='email'
               placeholder='Email'
               required
               autoComplete='off'
               id='email'
               onChange={(event) =>setEmail(event.target.value)}
               value={email}
             />
             <input 
               type='text'
               name='text'
               placeholder='Enter Your Skill'
               required
               autoComplete='off'
               id='answer'
               onChange={(event) =>setAnswer(event.target.value)}
               value={answer}
             />

             {/* <label htmlFor='password'>Password</label> */}
             <input 
               type='password'
               name='password'
               placeholder='New Password'
               required
               autoComplete='off'
               id='newPassword'
               onChange={(event) =>setNewPassword(event.target.value)}
               value={newPassword}
             />
             {/* <NavLink to='/forgotpassword' className='forgot_pass_link'>Forgot Password</NavLink>  */}
             
              <br></br>
             {/* <button type='button' className='Login_btn' onClick={() => navigate('/forgotpassword')}>Forgot Password</button> */}
             <button type='submit' className='Login_btn'>Reset</button>
         </form>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword