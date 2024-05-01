import React from 'react'
import Header from './Header'
import Footer from './Footer'
// import Header from '../../layout/Header'
// import Footer from '../../layout/footer';


export const Layout = (props) => {
  return (
   <>
      <Header />
     {/* <main> {props.children}</main>
     <h1>layout</h1> */}

       <Footer />
  
   </>
  )
}

export default Layout