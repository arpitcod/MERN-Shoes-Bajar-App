import './App.css';
// import Layout from '../src/components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import ErrorPage from './pages/ErrorPage';
import { Routes,Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Register from './pages/Register';
import Login from './pages/Login.js';
import { LogoutPage } from './pages/LogoutPage.js';
import Dashboard from './pages/user/Dashboard.js';
import PrivateRoute from './components/Routes/Private.js';
import ForgotPassword from './pages/ForgotPassword.js';
// import Admin_Route from './components/Routes/Admin_Route.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import AdminRoute from './components/Routes/Admin_Route.js';
import CreateProduct from './pages/Admin/CreateProduct.js';
import CreateCategory from './pages/Admin/CreateCategory.js';
import Users from './pages/Admin/Users.js';
import Orders from './pages/user/Orders.js';
import Profile from './pages/user/Profile.js';
import Products from './pages/Admin/Products.js';
import UpdateProduct from './pages/Admin/UpdateProduct.js';
import Search_page from './pages/Search_page.js';
import ProductDetails from './pages/ProductDetails.js';
import CategoryPage from './pages/CategoryPage.js';
import MenPage from './pages/MenPage.js';
import WomenPage from './pages/WomenPage.js';
import KidsPage from './pages/KidsPage.js';
import CartPage from './pages/CartPage.js';
// import { DataAuth } from './context/DataAuth.js';




// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';








function App() {
  return (
    <>  
    {/* <DataAuth> */}
       <Header /> 
     {/* use side  */}
        <Routes>
            <Route path="/" element={<HomePage />} />  
            <Route path="/product/:slug" element={<ProductDetails />}/>
            <Route path="/search" element={<Search_page />}/>
            <Route path="/dashboard" element={<PrivateRoute />}>
               <Route path="user" element={<Dashboard />} />         
               <Route path="user/orders" element={<Orders />} />         
               <Route path="user/profile" element={<Profile />} />         
              
            </Route>  

            {/* admin side  */}
            <Route path="/dashboard" element={<AdminRoute />}>
               <Route path="admin" element={<AdminDashboard />} />         
               <Route path="admin/create-category" element={<CreateCategory />} />         
               <Route path="admin/create-product" element={<CreateProduct />} />         
               <Route path="admin/product/:slug" element={<UpdateProduct/>} />         
               <Route path="admin/products" element={<Products />} />         
               <Route path="admin/users" element={<Users />} />         
               {/* <Route path="admin/users/profile" element={<Profile />} />          */}
              
            </Route>  
                   
            <Route path="/register" element={<Register />} />         
            <Route path="/men" element={<MenPage />} />         
            <Route path="/women" element={<WomenPage />} />         
            <Route path="/kids" element={<KidsPage />} />         
            <Route path="/login" element={<Login />} />         
            <Route path="/cartpage" element={<CartPage />} />         
            <Route path="/forgotpassword" element={<ForgotPassword />} />         
            <Route path="/logout" element={<LogoutPage />} />         
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="*" element={<ErrorPage />} />
          
          
        </Routes>
    
              
      {/* <ToastContainer /> */}
        <Footer />
        {/* </DataAuth> */}
    </>
  )
};

export default App;
