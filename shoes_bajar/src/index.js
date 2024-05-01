import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/auth';
import { DataAuth } from './context/DataAuth';
// import './index.css';
import "antd/dist/reset.css";
import { SearchAuth } from './context/Search';
import { CartAuth } from './context/Cart';
// import { DataContext } from './context/DataAuth';
// import Login from './pages/Login';
// import Login from './pages/Login';
// import { UserData } from './pages/Login';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <Login>
  // <DataContext>

  
  <DataAuth>
   <AuthProvider> 
    <SearchAuth>  
     <CartAuth>
    
     <BrowserRouter>
   
    
      <App />
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
       
          />
      {/* <React.StrictMode>
        <App />
      </React.StrictMode> */}
  
     </BrowserRouter>
 
        </CartAuth>
      </SearchAuth>  
    </AuthProvider>
  </DataAuth>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
