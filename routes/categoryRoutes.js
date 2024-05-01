import express from 'express'
import { isAdmin, require_sign_in } from '../middlewares/auth_middleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'



const router =express.Router();

//routes
router.post('/create-category', require_sign_in,isAdmin,createCategoryController)

// update category jyare update karvu hoy tyare put use thase 
router.put('/update-category/:id',require_sign_in,isAdmin,updateCategoryController)

//get all category http://localhost:2914/api/category/getall-category
router.get('/getall-category',categoryController)

//single category 
router.get('/single-category/:slug',singleCategoryController)

//delete category delete means delete category 
router.delete('/delete-category/:id',require_sign_in,isAdmin,deleteCategoryController)


export default router;