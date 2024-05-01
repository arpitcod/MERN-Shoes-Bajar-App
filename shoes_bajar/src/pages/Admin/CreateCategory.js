import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import './CreateCategory.css'
import CategoryForm from '../../components/Form/CategoryForm'
import { useData } from '../../context/DataAuth'
import { useAuth } from '../../context/auth'
import './CreateCategory.css'

// import {} from 'antd'; 
import {Modal} from 'antd'

//get all categorys

const CreateCategory = () => {
  
  const [categorys,setCategorys] = useState([]);
  const [name,setName] =useState("")
  const {userDT} =useData()
  const {token} =useAuth()

  //modal
  const [visible, setVisible] = useState(false);
  const[updatedName,setUpdatedName] =useState('');
  const [selected ,setSelected] =useState(null);
  
  //handle form
  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const {data} = await axios.post('http://localhost:2914/api/category/create-category',{name},{

        
      headers: {
       'Authorization': `${token}`
     },
      })
      
      
      // const {data} = await fetch('http://localhost:2914/api/category/create-category',{name},{
           
      //      method:"POST",
      //      headers:{
      //       Authorization: `${token}`

      //     },
       

      // })
       console.log("your userDT",{data})
        
      if(data?.success){ 
        toast.success(`${name} Category is created`)
        // const res_data = await data.json();
        // console.log(data)
        // setCategorys(data);
        getAllCategory();
      }else{
        toast.error(data?.message);
        console.log('handle submit error')
      }

    } catch (error) {
      console.log(error)
      toast.error("something went wrong on input form")
    }
  }

  const getAllCategory = async () =>{
    try {
       const {data} =await axios.get('http://localhost:2914/api/category/getall-category')

       if(data.success){
        setCategorys(data.category);
      
        // console.log(data.category)
       }

    } catch (error) {
      console.log(error)
      toast.error("something went wrong in getting category")
    }
  };

  useEffect(() =>{
    getAllCategory();
  },[])
 
  // category update handle 
  const updateHandle = async (e) =>{
       e.preventDefault()
       try {

         const {data} = await axios.put(`http://localhost:2914/api/category/update-category/${selected._id}`,{name:updatedName},{
          headers: {
            'Authorization': `${token}`
          },
         })
         if (data.success) {
         toast.success("category updated");
         setSelected(null);
         setUpdatedName('');
         setVisible(false);
         getAllCategory();
          
         } else {
           toast.error(data.message)       
         }
       } catch (error) {
         toast.error("something went wrong")
       }
  }

  //delete category
  const deleteHandle = async (pid) =>{
      
       try {

         const {data} = await axios.delete(`http://localhost:2914/api/category/delete-category/${pid}`,{
          headers: {
            'Authorization': `${token}`
          },
         })
         if (data.success) {
         toast.success('category successfully deleted');
        //  toast.success(`${data?.category?.name} is deleted`);
          getAllCategory();
          // console.log(`deleted ,${JSON.stringify(data)}`)
          
         } else {
           toast.error(data.message)       
         }
       } catch (error) {
         toast.error("something went wrong")
       }
  }
 
  return (
    <>
     <AdminMenu />
     <div className='category_container'>
     <h1>manage category</h1>

     <div className='category_form'>
       <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
       </div>

  <div className="tableContainer">
   <table className="table">
    <tbody>
      <tr>
        <th className='table-th'>Name</th>
        <th className='table-th'>Actions</th>
       
      </tr>

        {
        categorys?.map((c) =>(
           
            <tr key={c._id}>
               <td className='table-td'>{c.name}</td>
               <td>
                 <button className='table-btn' onClick={() => {setVisible(true) ; setUpdatedName(c.name); setSelected(c)}} >Edit</button>
                
                 <button className='table-btn-del'onClick={() => {deleteHandle(c._id)}}>Delete</button>
                 
                 
                 
               </td>
              </tr>
           
        ))
        }
    
    </tbody>
    </table>
    <div>

      <Modal onCancel={() => setVisible(false)} footer={null} visible={visible} >
        <CategoryForm value={updatedName} setValue = {setUpdatedName} handleSubmit={updateHandle}/>
      </Modal>
    </div>
</div>
</div>

    </>
  )
}

export default CreateCategory