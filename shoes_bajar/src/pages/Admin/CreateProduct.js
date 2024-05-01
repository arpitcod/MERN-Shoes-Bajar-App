import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import {Select} from 'antd'
import './CreateProduct.css'
// import e from 'cors'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const {Option} =Select


const CreateProduct = () => {
      const navigate = useNavigate();
  const [name,setName] = useState('');
  const [gender,setGender] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [categories,setCategories] = useState([]);
  const [category,setCategory] = useState('');
  const [quantity,setQuantity] = useState('');
  const [image,setImage] = useState('');
  const [shipping,setShipping] = useState('');
  const [brand,setBrand] = useState('');
  const [color,setColor] = useState('');
  const [size,setSize] = useState('');

  const {token} =useAuth();

  // get all category
  const getAllCategory = async () =>{
    try {
       const {data} =await axios.get('http://localhost:2914/api/category/getall-category')

       if(data?.success){
        setCategories(data?.category);
      
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

  //handle product craete onclick
 const handleProductCreate = async (e) =>{
  e.preventDefault()
  try {
    const productData = new FormData()

  productData.append("name",name);
  productData.append("gender",gender);
  productData.append("image",image);
  productData.append("category",category);
  productData.append("description",description);
  productData.append("price",price);
  productData.append("quantity",quantity);
  productData.append("brand",brand);
  productData.append("color",color);
  productData.append("size", size);

  const {data} = await axios.post('http://localhost:2914/api/product/create-product',productData ,{
    headers: {
      'Authorization': `${token}`
    }
  });

  if (data?.success) {
    toast.success("Product Created Successfully")
    navigate('/dashboard/admin/products')
  }else{
    toast.error(data?.message)
  }

  } catch (error) {
    console.log(error)
      toast.error("something went wrong")
  }
  
 }
  return (
    <>
    <AdminMenu />
    <div className='main_create_product_container'>
        <h1>CreateProduct</h1>
          <div className='Product_create_search_box'>
              <Select 
              variant="borderless"
              // bordered={false}
              placeholder={'select a category'}
              size='large'
              showSearch className='Product_select'
              onChange={(value) =>{setCategory(value)}}>

                {categories?.map(c =>(
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
              <div className='Main_img_uploder'>
                 <label className='img_uploder_lbl'>
                  {image ? image.name :"Upload Photo"}
                    <input type='file'
                    name='image'
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden/>
                 </label>

                 {image && (
                  <div className='product_img_box'>
                     <img 
                        src={URL.createObjectURL(image)}
                        alt='Product_image'
                        height={'300px'}
                        className='product_img'
                     />
                  </div>
                 )}

                 <div className='product_uplod_form'>
                      <input type='text' 
                      placeholder='Enter a Product Name'
                      value={name}
                      className='input_product'
                      onChange={(e) => setName(e.target.value)}/>
                 </div>
                 <div className='product_uplod_form'>
                      <input type='text' 
                      placeholder='Enter a Product Gender'
                      value={gender}
                      className='input_product'
                      onChange={(e) => setGender(e.target.value)}/>
                 </div>
                 <div className='product_uplod_form'>
                      <input type='text' 
                      placeholder='Enter a Product description'
                      value={description}
                      className='input_product'
                      onChange={(e) => setDescription(e.target.value)}/>
                 </div>
                 <div className='product_uplod_form'>
                      <input type='number' 
                      placeholder='Enter a Product price'
                      value={price}
                      className='input_product'
                      onChange={(e) => setPrice(e.target.value)}/>
                 </div>
                 <div className='product_uplod_form'>
                      <input type='number' 
                      placeholder='Enter a Product quantity'
                      value={quantity}
                      className='input_product'
                      onChange={(e) => setQuantity(e.target.value)}/>
                 </div>
                 <div className='product_uplod_form'>
                      <input type='text' 
                      placeholder='Enter a Product brand'
                      value={brand}
                      className='input_product'
                      onChange={(e) => setBrand(e.target.value)}/>
                 </div>
                 <div className='product_uplod_form'>
                      <input type='text' 
                      placeholder='Enter a Product color'
                      value={color}
                      className='input_product'
                      onChange={(e) => setColor(e.target.value)}/>
                 </div>
                 <div className='product_uplod_form'>
                      <input type='text' 
                      placeholder='Enter a Product size'
                      value={size}
                      className='input_product'
                      onChange={(e) => setSize(e.target.value)}/>
                 </div>
                 <div className='product_uplod_form'>
                      {/* <input type='text' 
                      placeholder='Enter a Product shipping'
                      value={name}
                      className='input_product'
                      onChange={(e) => setName(e.target.value)}/> */}
                      <Select 
                          variant="border" 
                          placeholder={'select a Shipping'}
                          size='large'
                          showSearch className='input_product_Shipping'
                          // showSearch className='Product_select'
                         id='input_shipping'
                          onChange={(value) =>{setShipping(value)}}>

                         <Option value='0'>No</Option>
                         <Option value='1'>Yes</Option>
                       
                      </Select>
                 </div>
                <div>
                  <button onClick={handleProductCreate} className='prdct_cr_btn'>Create Product</button>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default CreateProduct