import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './ProductDetails.css'

const ProductDetails = () => {
    //useparams
    const params = useParams();

    const [product,setProduct] = useState([]);

      useEffect(() =>{
          if(params?.slug){
            getProduct();
          } 
      },[params?.slug]);
        
      //get product
     const getProduct = async () =>{
        try {
            const {data} = await axios.get(`http://localhost:2914/api/product/get-product/${params.slug}`)
            setProduct(data?.product)

        } catch (error) {
             console.log(error)
        }
     }

  return (
    <div className='main_product_details_contianer'>
             {/* <h1>ProductDetails</h1> */}
        <div className='product_dtl_box'>
            <div className='product_dtl_side_1'>
                <img src={`http://localhost:2914/api/product/product-image/${product._id}`} alt={product.name}/>
            </div>
            <div className='product_dtl_side_2' >
                 <h6>brand:{product.brand}</h6>
                 <h6>name:{product.name}</h6>
                 <h6>description:{product.description}</h6>
                 <h6>Rs.{product.price}</h6>
                 <h6 >category:{product.category?.name}</h6>
                 <h6>quantity:{product.quantity}</h6>
                 <h6>color:{product.color}</h6>
                 <h6>size: {product.size}</h6>
                 {/* <button>Add to cart</button> */}
            </div>
        </div>
         {console.log(JSON.stringify(product))}
    </div>
  )
}

export default ProductDetails