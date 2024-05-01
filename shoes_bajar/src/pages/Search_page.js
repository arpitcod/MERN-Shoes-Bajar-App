import React from 'react'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router-dom';

const Search_page = () => {

    const [values,setValues] =useSearch();
    const navigate =useNavigate();
  return (
    <div className='main_search_container'>
          <div className='search_title_box'>
             <h2>Search Results</h2>
             <h6>{values?.results.length < 1 ? "no products found" : `found ${values?.results.length}`}</h6>
          </div>
         <div>
         {
                values?.results.map(p =>(
                 
                <div className="products_card_box" key={p._id}>
                       <img src={`http://localhost:2914/api/product/product-image/${p._id}`} alt={p.name} className='product_img'  onClick={() => navigate(`/product/${p.slug}`)}/>
                    <div className="w3-container w3-center">
                        <p>{p.name}</p>
                        {/* <p>{p.description.substring(0,30)}...</p> */}
                        <p>{p.description}</p>
                        <p>Rs.{p.price}</p>
                    </div>
                </div>
                  

                )) 
            }
         </div>
    </div>
  )
}

export default Search_page