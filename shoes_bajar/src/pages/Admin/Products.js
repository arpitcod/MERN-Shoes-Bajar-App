import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import './Products.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products ,setProducts] = useState([]);

    const{token} =useAuth();

  //get all products

  const getAllProducts = async () =>{
    try {
        const {data} = await axios.get('http://localhost:2914/api/product/get-product',products,{
            headers: {
                'Authorization': `${token}`
              }
        })
        setProducts(data.products)

    } catch (error) {
        toast.error("something went wrong")
    }
  }

  useEffect(() => {
        getAllProducts();
  },[])
   return (
    <>
        <AdminMenu/>
    <div className='Main_products_container'>
        <div>
            <h1>all product list</h1>
            <div className='main_products_container'>
            {
                products?.map(p =>(
                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                <div className="main_products_card_box" >
                       <img src={`http://localhost:2914/api/product/product-image/${p._id}`} alt={p.name} className='product_img'/>
                    <div className="w3-container w3-center">
                        <p>{p.name}</p>
                        <p>{p.description}</p>
                    </div>
                </div> 
                    </Link>

                ))
            }
            </div>
        </div>
    </div>
    </>
  )
}

export default Products