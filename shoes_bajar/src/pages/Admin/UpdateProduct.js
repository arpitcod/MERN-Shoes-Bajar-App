
import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import {Select} from 'antd'
import './CreateProduct.css'
// import e from 'cors'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const {Option} =Select

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params  =useParams();

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

    const [id,setId] =useState("");


  
    const {token} =useAuth();
  
  // get single product
  const getSingleProduct = async () =>{
          try {
            const {data} =await axios.get(`http://localhost:2914/api/product/get-product/${params.slug}`)
            setName(data.product.name)
            setGender(data.product.gender)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setBrand(data.product.brand)
            setColor(data.product.color)
            setSize(data.product.size)
            setCategory(data.product.category._id)

          } catch (error) {
            console.log(error)
          }
  }

  useEffect(() =>{
    getSingleProduct();
  },[])

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
  
    //handle product update onclick
   const hadnleProductUpdate = async (e) =>{
    e.preventDefault()
    try {
      const productData = new FormData()
  
    productData.append("name",name);
    productData.append("gender",gender);
    image && productData.append("image",image);
    productData.append("category",category);
    productData.append("description",description);
    productData.append("price",price);
    productData.append("quantity",quantity);
    productData.append("brand",brand);
    productData.append("color",color);
    productData.append("size", size);
  
        //  product update ......
    const {data} = await axios.put(`http://localhost:2914/api/product/update-product/${id}`,productData ,{
      headers: {
        'Authorization': `${token}`
      }
    });
  
    if (data?.success) {
      toast.success("Product Updated Successfully")
      navigate('/dashboard/admin/products')
    }else{
      toast.error(data?.message)
    }
  
    } catch (error) {
      console.log(error)
        toast.error("something went wrong")
    }
    
   }
   
  //  delete product .............................
const handleDeleteProduct = async () =>{
    
  try {
    let ans = window.prompt("are you sure want to delete this product")
    if (!ans) {return}
    const {data} = await axios.delete(`http://localhost:2914/api/product/delete-product/${id}`,{
      headers: {
        'Authorization': `${token}`
      }
    });
    toast.success("Product Deleted Successfully")
    navigate('/dashboard/admin/products') 
    
  } catch (error) {
     console.log(error)
     toast.error("something went wrong")
  }
}
  return (
    <>
      <AdminMenu />
    <div className='main_create_product_container'>
        <h1>update product</h1>
          <div className='Product_create_search_box'>
              <Select 
              variant="borderless"
              // bordered={false}
              placeholder={'select a category'}
              size='large'
              showSearch className='Product_select'
              onChange={(value) =>{setCategory(value)}}
              value={category}
              >

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

                 {image ? (
                  <div className='product_img_box'>
                     <img 
                        src={URL.createObjectURL(image)}
                        alt='Product_image'
                        height={'300px'}
                        className='product_img'
                     />
                  </div>
                 ):(
                      <div className='product_img_box'>
                     <img 
                        // src={URL.createObjectURL(image)}
                        src={`http://localhost:2914/api/product/product-image/${id}`}
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
                          onChange={(value) =>{setShipping(value)}} 
                          value={shipping ? "yes": "no"} >

                         <Option value='0'>No</Option>
                         <Option value='1'>Yes</Option>
                       
                      </Select>
                 </div>
                <div>
                  <button onClick={hadnleProductUpdate} className='prdct_cr_btn'>Update Product</button>
                  <button onClick={handleDeleteProduct} className='prdct_cr_btn' id='dlt_btn'>Delete Product</button>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default UpdateProduct