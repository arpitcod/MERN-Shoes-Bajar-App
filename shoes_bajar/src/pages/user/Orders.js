import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { json } from 'react-router-dom';
import "./Orders.css"

const Orders = () => {

  const [orders,setOrders] = useState([]);
  const{token} = useAuth();

  const getOrders = async () =>{
    try {
        const {data} = await axios.get("http://localhost:2914/api/auth/orders");
        setOrders(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(token) getOrders();
  },[token])
  return (
    <>
    <UserMenu />
    <div>
        <h1>All Orders</h1>
         <p>{JSON.stringify(orders)}</p>
         <div>
         <h1>Product Orders</h1>
          <div className='main_orders_controller'>
           {/* {
            orders?.map((o,i) =>{
            
            return(
            
            )
            })
           } */}
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>status</th>
                  <th>buyer</th>
                  <th>orders</th>
                  <th>payment</th>
                  <th>quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>BataBoysWhiteSneakers</td>
                  <td>2</td>
                  <td>220</td>
                  <td>John Doe</td>
                  <td>Delivered</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>ADIDAS-Unisex-Kids-Sports-Shoes</td>
                  <td>1</td>
                  <td>1500</td>
                  <td>Jane Smith</td>
                  <td>Processing</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>BataBoysWhiteSneakers</td>
                  <td>1</td>
                  <td>500</td>
                  <td>Jane Smith</td>
                  <td>Processing</td>
                </tr>
                </tbody>
            </table>
          </div>


         </div>
    </div>
    </>
  )
}

export default Orders