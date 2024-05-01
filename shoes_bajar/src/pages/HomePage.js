import React, { useEffect, useState } from 'react'
// import Header from '../components/Layout/Header.js'
// import Footer from '../components/Layout/Footer.js'
import './HomePage.css'
import { useAuth } from '../context/auth'
// import { useData } from '../context/DataAuth'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Price';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify';

const HomePage = () => {
  const {token} =useAuth()
  // const {userDT,setUserDt} = useData();
  
  
  //navigate.................................................
  const navigate =useNavigate();
  //usecart
  const [cart,setCart] = useCart();

  const [products ,setProducts] = useState([]);
  const [categories ,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total,setTotal] =useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(1);




// get categoris

const getAllCategory = async () =>{
  try {
     const {data} =await axios.get('http://localhost:2914/api/category/getall-category')

     if(data.success){
      setCategories(data.category);
    
      // console.log(data.category)
     }

  } catch (error) {
    console.log(error)
    // toast.error("something went wrong in getting category")
  }
};

useEffect(() =>{
  getAllCategory();
  getTotal();
},[])
 

     // get all products
     const getAllProducts = async () =>{
      try {
        setLoading(true)
          const {data} = await axios.get(`http://localhost:2914/api/product/product-list/${page}`,products,{
            headers: {
                'Authorization': `${token}`
              }
        })
        setLoading(false)
        setProducts(data.products)
  
      } catch (error) {
        setLoading(false)
        console.log(error)
        // toast.error("something went wrong in getting category")
      }
    };
  

    // get total count 
    const getTotal = async () =>{
      try {
          const {data} = await axios.get('http://localhost:2914/api/product/product-count')
          setTotal(data?.total)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() =>{
      if (page === 1) return;
      loadMore();
    },[page])
    //loading more
    const loadMore = async () =>{
      try {
        setLoading(true)
        const {data} = await axios.get(`http://localhost:2914/api/product/product-list/${page}`)
        setLoading(false)
        setProducts([...products,...data?.products])
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    //filter category

    const handleFilter = (value,id) =>{
      let all = [...checked];
      if (value) {
         all.push(id); 

      } else {
        all= all.filter((c) => c !== id);
        
      }
      setChecked(all);
      // let data = JSON.stringify(id)
    }
    // console.log(radio)
    useEffect(() =>{
      if(!checked.length || !radio.length) getAllProducts();
    },[])

    useEffect(() =>{
      if(checked.length || radio.length) filterProduct();
    },[checked,radio])

    //get filter products.........................................................................
    const filterProduct = async () =>{
      try {
         const {data} = await axios.post('http://localhost:2914/api/product/product-filter',{checked,radio,}); 
        //  const {data} = await axios.post('http://localhost:2914/api/product/product-filter',checked,radio,{
           
        //    headers:{
        //      "Authorization" :`${token}`
        //     }
            
        //   })
          setProducts(data?.products);
          //  console.log(data.products)

      } catch (error) {
        console.log(error)
      }
    }

  return (
   <>

    <div className='Homepage_container'>
      {/* filter side ................................... */} 
       <div className='filter_category_box'> 
           <div className='filter_category_title'>
               <h1>Category</h1>
                
                {/* category......................... filtering */}
             <div className='category_box'>
                {
                  categories?.map((c) => (
                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)} className='select_category'>
                      {c.name} 
                      {/* {`(${c.slug.length})`}  */}
                    </Checkbox>
                  ))
                }
              </div>

             {/* // price filter  */}
             <div className='price_category_box'>
                <h1>Price</h1>
                <Radio.Group onChange={e => setRadio(e.target.value)}className='select_category'>
                {/* <Radio.Group onChange={e => setRadio(e.target.value)}> */}
                {
                  Prices?.map((p) => (
                    <div key={p._id} className=''>
                        <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))
                }
                </Radio.Group>
             </div>
             {/* <div className='price_category_box'>
                 <button>Reset Filter</button>
             </div>
                */}
           </div>
       </div>

{/* products side ................................... */}
        <div className='products_box'>
          {/* {JSON.stringify(radio,null)} */}
              <div className='products_title'>
                <h1>All products</h1>
            </div>

            <div className='main_all_products_container'>
                {/* <h1>products</h1> */}
              {/* get products............................................................. */}
                {
                products?.map(p =>(
                 
                <div className="products_card_box" key={p._id}>
                       <img src={`http://localhost:2914/api/product/product-image/${p._id}`} alt={p.name} className='product_img'  onClick={() => navigate(`/product/${p.slug}`)}/>
                    <div className="products_card_box_dtls">
                       <p>{p.brand  }</p>
                        <p>{p.name}</p>
                        {/* <p>{p.description.substring(0,30)}...</p> */}
                        {/* <p>{p.description}</p> */}
                        <p>Rs.{p.price}</p>
                        {/* <p>Rs.{p.gender}</p> */}
                        <button className='cart_btn' 
                        onClick={()=>{ setCart([...cart,p]);localStorage.setItem('cart',JSON.stringify([...cart,p]));toast.success("Item added in cart")}}>Add To Cart</button>
                    </div>
                    {console.log(p)}
                </div>
                  
                     
                )) 
            }

            {/* loading btn................................................................................ */}
            <div className='loading-btn'>
               {/* {total} */}
               {
                products && products.length < total && (
                  <button onClick={(e) =>{
                    e.preventDefault();
                    setPage(page + 1);
                  }}>
                     {loading ? "loading..." :"loadmore...."}
                  </button>
                )
               }
            </div>
            </div>
        </div>        
    </div>
   </>
  )
}

export default HomePage