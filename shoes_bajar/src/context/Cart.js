import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartAuth = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem('cart');
    if (existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartAuth, useCart };

// import React, { createContext, useContext, useEffect, useState } from 'react'


//  const CartContext = createContext();
//   const CartAuth = ({children}) => {

//     const [cart,setCart] = useState([])

//     useEffect(() =>{
//       let existingCartItem = localStorage.getItem('cart');
//       if(existingCartItem) setCart(JSON.parse(existingCartItem));
//     },[])
      
//   return (
//       <CartContext.Provider value={[cart,setCart]}>
//         {children}
//           {/* <pre>{JSON.stringify(userDT?.user?.role)}</pre> */}
//           {console.log('cart_data',{cart})}
//       </CartContext.Provider>
      
//   )
// }

//  const useCart = () => useContext(CartContext)


//  export {CartAuth,useCart}
