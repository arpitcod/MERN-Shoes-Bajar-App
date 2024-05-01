import express from "express"
import { isAdmin, require_sign_in } from "../middlewares/auth_middleware.js"
import { braintreePaymentController, braintreeTokenController, checkingProductsController, createProductController, deleteProductController, getProductController, getSinleProductController, kidsProductsController, menProductsController, productCountController, productFilterController, productImageController, productListController, searchProductController, updateProductController, womenProductsController } from "../controllers/productController.js"
import formidable from "express-formidable"



const router = express.Router()

//routes http://localhost:2914/api/product/create-product
router.post('/create-product',require_sign_in,isAdmin,formidable(), createProductController)


//get all products http://localhost:2914/api/product/get-product
router.get('/get-product',getProductController)

// single product http://localhost:2914/api/category/single-category/kids-games
router.get('/get-product/:slug',getSinleProductController)

//get image http://localhost:2914/api/product/product-image/65d4f7efe7704b6019a838bf
router.get('/product-image/:pid',productImageController)

//delete product 
router.delete("/delete-product/:pid", deleteProductController)

//update product http://localhost:2914/api/product/update-product/65d4f7efe7704b6019a838bf
router.put('/update-product/:pid',require_sign_in,isAdmin,formidable(), updateProductController)

//filter products
router.post('/product-filter',productFilterController)

//product count
router.get('/product-count' ,productCountController)

// per page product
router.get('/product-list/:page',productListController)

//search product  http://localhost:2914/api/product/search/${values.keyword}
router.get('/search/:keyword',searchProductController)

// only men gender products shoeswing    http://localhost:2914/api/product/men-products/men
router.get('/men-products/:gender' ,menProductsController)

//only women products showing
router.get('/women-products/:gender' ,womenProductsController)

//only kids products showing
router.get('/kids-products/:gender' ,kidsProductsController)

// demo cheking  http://localhost:2914/api/product/checking-products
router.get('/checking-products' ,checkingProductsController)

//payment routes
//token

router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',require_sign_in,braintreePaymentController)

//similar product
// router.get('/related-product/:pid/:cid',relatedProductController)

export default router