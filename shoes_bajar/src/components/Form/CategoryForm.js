
import React from 'react'
import './CategoryForm.css'

const CategoryForm = ({value,setValue,handleSubmit}) => {
   
  return (
    <>
     <form onSubmit={handleSubmit} className='form_container'>
       
        <input type="text"
            id="fname"
            name="fname"
            placeholder='Enter New Category'
            value={value}
            onChange={(e) =>setValue(e.target.value)} />

        <button type='submit' className='sub-btn'>Submit</button>
    </form>     
    
    </>
  )
}

export default CategoryForm