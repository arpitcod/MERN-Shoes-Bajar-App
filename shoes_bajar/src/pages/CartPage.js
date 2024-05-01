import React, { useEffect, useState } from 'react'
import './CartPage.css'
import { useCart } from '../context/Cart'
import { useData } from '../context/DataAuth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { toast } from 'react-toastify'

const CartPage = () => {
    const{userDT,setUserDt} = useData()
    const [cart,setCart] = useCart();
    const{token} = useAuth();

    const [clientToken,setClientToken] =useState("");
    const [ instance,setInstance] =useState("");
    const [loading,setLoading] =useState(false);


    const navigate = useNavigate();

      //total price
      const totalPrice = () =>{
        try {
          let total =0;
          cart?.map((items) =>{
            total = total + items.price;
          })
          return total; 
        } catch (error) {
          console.log(error)
        }
      }

    //remove item
    const removeCartItem = (pid) =>{
      try {
         let myCart= [...cart]
         let index=myCart.findIndex((item) => item._id === pid);
         myCart.splice(index,1);
         setCart(myCart);
         localStorage.setItem('cart',JSON.stringify(myCart))
      } catch (error) {
        console.log(error)
      }
    }

    //get paymentgatway
    const getToken =async () =>{
      try {
        const {data} = await axios.get('http://localhost:2914/api/product/braintree/token')
        setClientToken(data?.clientToken)
        console.log("cart token",data)
      } catch (error) {
        console.log(error)
      }

      
    }
    useEffect(()=>{
      getToken();
    },[token])

    //handle payments

  //   const handlePayment = async () => {
  //     try {
  //         setLoading(true);
  //         const { nonce } = await instance.requestPaymentMethod();
  //         const { data } = axios.post('http://localhost:2914/api/product/braintree/payment', {
  //             nonce,
  //             cart
  //         });
  //         if (data.success) {
  //           console.log("handlePayment success", data);
  //           setLoading(false);
  //           localStorage.removeItem("cart");
  //           setCart([]);
  //           navigate("/dashboard/user/orders");
  //           toast.success("Payment completed successfully");
            
  //         } else {
  //           console.log("handlePayment error", data);
  //         }
  //     } catch (error) {
  //         console.error("handlePayment error:", error);
  //         setLoading(false);
  //         toast.error("An error occurred while processing the payment");
  //     }
  // };
  
  //   const handlePayment = async () => {
  //     try {
  //         setLoading(true);
  //         const { nonce } = await instance.requestPaymentMethod();
  //         const { data } =  axios.post('http://localhost:2914/api/product/braintree/payment', {
  //             nonce,
  //             cart
  //         });
  //         // console.log("handlePayment success", setCart);
  //         console.log("handlePayment success", data);
  //         setLoading(false);
  //         localStorage.removeItem("cart");
  //         setCart([]);
  //         navigate("/dashboard/user/orders");
  //         toast.success("Payment completed successfully");
  //     } catch (error) {
  //         console.error("handlePayment error:", error);
  //         setLoading(false);
  //         toast.error("An error occurred while processing the payment");
  //     }
  // };
  
 
    const handlePayment = async() =>{
      try {
        setLoading(true)
        const { nonce } = await instance.requestPaymentMethod();
        // const { nonce } = await instance.requestPaymentMethod();
        const {data} = await axios.post('http://localhost:2914/api/product/braintree/payment',{
          nonce,cart
        });
        
        console.log("handlepayment true",data)
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("payment completed successfully");
      } catch (error) {
        console.log("handle payment error",error);
        setLoading(false);
      }
    }

  // useEffect(()=>{
  //       setInstance();
  // },[clientToken])
  return (
    <div className='main_cart_container'>
        <h1>{`hello ${userDT?.token && userDT?.user?.name}`}</h1>
        <h1>total {cart?.length ? `you have ${cart?.length} items`:'your cart is empty'}</h1>
        <h4>{userDT?.token ? "":'please login to checkout'}</h4>

        <div className='cart_items_box'>
            <div className='cart_side_1_box'>
                  {/* <p>hare krishna</p> */}
                  {
                    cart?.map((p) =>(
                      <div className='cart_items_box' key={p._id}> 
                        <div className='cart_itmes'>
                            <div className='items_img'>
                                {/* <img src={`http://localhost:2914/api/product/product-image/${p._id}`} alt={p.name} className='product_img'  onClick={() => navigate(`/product/${p.slug}`)}/> */}
                                <img src={`http://localhost:2914/api/product/product-image/${p._id}`} alt={p.name} className='product_img'/>

                            </div>
                            <div className='items_dtl'>
                                <p>{p.name}</p>
                                <p>{p.description}</p>
                                <p>Rs.{p.price}</p>
                                <button onClick={()=>removeCartItem(p._id)}>Remove</button>

                            </div>
                        </div>

                      </div>
                    ))
                  }
            </div>
            <div className='cart_side_2_box'>
               <h3>Cart Summary</h3>
               <h6>Total | Chekout | Payment</h6>
               <hr></hr>
               <h4>Total:{totalPrice()}</h4>
               {
                userDT?.user?.address ? (
                  <>
                  <div className='cart_put_addrs'>
                     <h4>Current address</h4>
                     <h5>{userDT?.user?.address}</h5>
                     <button onClick={()=> navigate('/dashboard/user/profile')}>update address</button>
                     {console.log('cartpage',userDT?.token)}
                  </div>
                  </>
                ):(
                  <div className='cart_put_addrss_2'>
                     {userDT?.token ? (
                      <>
                        <button onClick={()=> navigate('/dashboard/user/profile')}>update address</button>
                        {console.log('cartpage',token)}
                      </>
                        
                      ) :(
                        
                        <button onClick={()=>navigate('/login')}>please login to checkout</button>
                        // <button onClick={()=>navigate('/login',{state:"/cart"})}>please login to checkout</button>
                        
                      )
                     }
                  </div>
                )
               }
               <div className='main_payment_getway_box'>
                {
                  !clientToken || !cart?.length ? ("") :(
                    <>
                  <DropIn 
                   options={{
                    authorization:clientToken,
                    // vaultManager: true,
                    // paypal:{
                    //   flow:"vault"
                    // }
                   }}
                   onInstance={(instance) => setInstance(instance)}
                  />
                  <button 
                  onClick={handlePayment}
                  disabled={!token||loading || !instance || !userDT?.user?.address}
                  >{loading ? "processing...." : "make payment"}</button>
                    </>
                  )
                }
               </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage