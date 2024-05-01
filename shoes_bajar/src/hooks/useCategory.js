import axios from "axios";
import { useEffect, useState } from "react";




export default function useCategory(){
    const [categories ,setCategories] = useState([])

      
    //get category
    const getCategories = async (rq,rs) =>{
        try {
         const {data} = await axios.get('http://localhost:2914/api/category/get-category');
         setCategories(data?.category)  
         console.log('from use category page',data)          
        } catch (error) {
            console.log(error)

        }
    };

    useEffect(() =>{
        getCategories();
    },[])
       return categories;  
}