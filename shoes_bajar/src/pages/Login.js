import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';
// import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import "./Login.css"
import { useData } from '../context/DataAuth';







const Login = () => {
  // const URL="";
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  // const[data ,setData] = useState('')
  const {userDT,setUserDt} = useData();


  //  navigate
  const navigate =useNavigate();
  
  //store token local storage (auth context)
  const { storeTokenLS} = useAuth();
  
  
 
   
  const handleSubmit =async (event) =>{
      event.preventDefault();
      console.log({email,password});

      try {
        const response =await fetch("http://localhost:2914/api/auth/login",{
        // const response =await fetch("/api/auth/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({email,password}),
        });
  
        console.log(response);
        // console.log('your userDt ==>',userDT)
        // console.log('your userDt ==>',)
         
        if (response.ok) {
          const response_data = await response.json();
          console.log("your response data" ,response_data);
          console.log("your response" ,response);
          
         

          setUserDt({
            ...userDT,
            user:response_data.user,
            token:response_data.token,
            data:response
          })
            // localStorage.setItem("userDT",JSON.stringify([...userDT,userDT.data]));     
          // localStorage.setItem("token",response_data.token);
          
          // console.log("your second",response_data.user.role);
          

          // if (response_data.user.role === 1) {
          //   navigate('/dashboard/admin')
            
          // } else {
          //   navigate('/dashboard/user')
            
          // }

          //store token local storage (auth context)
          storeTokenLS(response_data.token)
          

            

          toast.success("Login successfull")
          // alert("Login successfull");

          //  
          navigate('/')
 
          
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
     <div className='main_login_container'>
      <div className='Login_container'>
        <div className='side_1_box'>
              {/* <h1>hello{userDT?.user?.name}</h1> */}
             <h1>User Login</h1>
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

             {/* <label htmlFor='password'>Password</label> */}
             <input 
               type='password'
               name='password'
               placeholder='Password'
               required
               autoComplete='off'
               id='password'
               onChange={(event) =>setPassword(event.target.value)}
               value={password}
               
             />
             
             <NavLink to='/forgotpassword' className='forgot_pass_link'>Forgot Password?</NavLink> 
             
              <br></br>
             {/* <button type='button' className='Login_btn' onClick={() => navigate('/forgotpassword')}>Forgot Password</button> */}
             <button type='submit' className='Login_btn'>Login</button>
         </form>
      </div>
    </div>
    </div>

         

    </>
  )
 
}




export default Login