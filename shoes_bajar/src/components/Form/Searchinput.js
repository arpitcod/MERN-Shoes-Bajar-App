import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Searchinput.css'
// import { useData } from '../../context/DataAuth';

const Searchinput = () => {
      const [values,setValues] = useSearch();
      // const  {userDT} =useData();
      const navigate =useNavigate();

     const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
             const {data} = await axios.get(`http://localhost:2914/api/product/search/${values.keyword}`);
             setValues({...values, results:data});
             navigate("/Search");    
             console.log('try',values)       
        } catch (error) {
            console.log(error) 
            console.log("catch",values) 
        }
     } 

  return ( 
    <div className='main_search_box'>
       <form role='search' onSubmit={handleSubmit}>
            <input type="search" 
            placeholder="Search.." 
            name="search"
            value={values.keyword} 
            onChange={(e) => setValues({ ...values, keyword:e.target.value})}/>
            <button type="submit" className='search_btn'>Search</button>
        </form>

    </div>
  )
}

export default Searchinput