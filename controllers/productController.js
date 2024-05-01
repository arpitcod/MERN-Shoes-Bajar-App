import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'
// import { count } from "console"
import orderModel from "../models/orderModel.js";
// import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import dotenv from 'dotenv';

dotenv.config();

//payment getway
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
  console.log(process.env.BRAINTREE_MERCHANT_ID);
console.log(process.env.BRAINTREE_PUBLIC_KEY);
console.log(process.env.BRAINTREE_PRIVATE_KEY);


export const createProductController = async (rq,rs) =>{
    try {
        const {name,gender,slug,description,price,category,quantity,shipping,brand,color,size} =rq.fields
        const {image} =rq.files

        //validation
        switch (true) {
            case !name:
                return rs.status(500).send({error:'name is required'})
            case !gender:
                return rs.status(500).send({error:'name is required'})
            case !description:
                return rs.status(500).send({error:'description is required'})
            case !price:
                return rs.status(500).send({error:'price is required'})
            case !category:
                return rs.status(500).send({error:'category is required'})
            case !quantity:
                return rs.status(500).send({error:'quantity is required'})
            case !brand:
                return rs.status(500).send({error:'brand is required'})
            case !color:
                return rs.status(500).send({error:'color is required'})
            case !size:
                return rs.status(500).send({error:'size is required'})
            case image && image.size > 100000:
                return rs.status(500).send({error:'image is required and should be less then 1mb'})
                
            
// new products model
        }
        const Products = new productModel({...rq.fields,slug:slugify(name)})
        if(image){
            Products.image.data = fs.readFileSync(image.path)
            Products.image.contentType = image.type;
        }
        await Products.save()
        rs.status(201).send({
            success:true,
            message:"product created successfully",
            Products,
        })
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            error,
            message:"error in creating product"
        })
    }
}

// getting all products
export const getProductController = async(rq,rs) =>{
    try {
        const products =await productModel
        .find({})
        .populate('category')
        .select('-image')
        .limit(10)
        .sort({createdAt:-1}
            )
        rs.status(200).send({
            success:true,
            message:'all products',
            totalProducts:products.length,
            products,
        })
        
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error in getting products",
            error
        })
    }
}

//get single product
export const getSinleProductController = async (rq,rs) =>{

    try {
        const product = await productModel
        .findOne({slug:rq.params.slug})
        .select('-image').populate('category');

        rs.status(200).send({
            success:true,
            message:"single product fetched",
            product
        })
        
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error in getting product",
            error
        })
        
    }
}

// getting image

export const productImageController = async(rq,rs) =>{

    try {
        const product =await productModel.findById(rq.params.pid).select('image')
        if (product.image.data) {
            rs.set('Content-type', product.image.contentType)
            return rs.status(200).send(product.image.data)
            
        }
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error in getting image",
            error
        })
    }
}

//delete product controller

export const deleteProductController = async(rq,rs) =>{

    try {
        await productModel.findByIdAndDelete(rq.params.pid).select('-image')
        rs.status(200).send({
            success:true,
            message:"product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error while deleting product",
            error
        })
    }
}

//update product 

export const updateProductController = async (rq,rs) =>{

    try {
        const {name,gender,slug,description,price,category,quantity,shipping,brand,color,size} =rq.fields
        const {image} =rq.files 

        //validation
        switch (true) {
            case !name:
                return rs.status(500).send({error:'name is required'})
            case !gender:
                return rs.status(500).send({error:'name is required'})
            case !description:
                return rs.status(500).send({error:'description is required'})
            case !price:
                return rs.status(500).send({error:'price is required'})
            case !category:
                return rs.status(500).send({error:'category is required'})
            case !quantity:
                return rs.status(500).send({error:'quantity is required'})
            case !brand:
                return rs.status(500).send({error:'brand is required'})
            case !color:
                return rs.status(500).send({error:'color is required'})
            case !size:
                return rs.status(500).send({error:'size is required'})
            case image && image.size > 100000:
                return rs.status(500).send({error:'image is required and should be less then 1mb'})
                
            

        }
        const Products = await productModel.findByIdAndUpdate(rq.params.pid,
            {...rq.fields, slug:slugify(name)},{new:true})
        if(image){
            Products.image.data = fs.readFileSync(image.path)
            Products.image.contentType = image.type;
        }
        await Products.save()
        rs.status(201).send({
            success:true,
            message:"product updated successfully",
            Products,
        })
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error in update product",
            error,
        })
    }
}


//filter product controller
export const productFilterController = async (rq,rs) =>{
   try {
    const {checked ,radio} = rq.body
    let args = {};
    if(checked.length > 0) args.category =checked;
    if(radio.length) args.price = {$gte: radio[0] ,$lte:radio[1]};

    const products = await productModel.find(args);
    rs.status(200).send({
        success:true,
        products,
    });
   } catch (error) {
    console.log(error)
    rs.status(400).send({
        success:false,
        message:"Error while filtering products ",
        error
    })
   }
}



// product count controller 

export const productCountController = async (rq,rs) =>{

    try {
      const total = await productModel.find({}).estimatedDocumentCount()
      rs.status(200).send({
        success:true,
        total
      })        
    } catch (error) {
        console.log(error)
        rs.status(400).send({
            success:false,
            message:"error in product count",
            error

        })
        

    }
}


// product page list base 


export const productListController = async (rq,rs) =>{
    try {
        const perPage = 6;
        const page =rq.params.page ? rq.params.page : 1;

        const products = await productModel.find({})
        .select('-image')
        .skip((page -1) * perPage)
        .limit(perPage)
        .sort({createdAt: -1});
        rs.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error),
        rs.status(500).send({
            success:false,
            message:"error in per page control"
        })
    }
}



// search product controller

export const searchProductController = async (rq,rs) =>{
    try {
        const { keyword } = rq.params ;
        const result = await productModel.find({
            $or:[
                {name:{ $regex: keyword,$options: "i"}},
                {description:{ $regex: keyword,$options: "i"}}
            ]
        }).select("-image");
        rs.json(result); 
        
    } catch (error) {
        console.log(error)
        rs.status(400).send({
            success:false,
            error,
            message:"error in search product api"
        })
        
    }
}


// men products controller 
export const menProductsController = async (rq,rs) =>{
    try {
        const perPage = 6;
        const page =rq.params.page ? rq.params.page : 1;

        const products = await productModel.find({gender:"men"})
        .select('-image')
        .skip((page -1) * perPage)
        .limit(perPage)
        .sort({createdAt: -1});
        rs.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error),
        rs.status(500).send({
            success:false,
            message:"error in per page control"
        })
    }
}
// womem products controller 
export const womenProductsController = async (rq,rs) =>{
    try {
        const perPage = 6;
        const page =rq.params.page ? rq.params.page : 1;

        const products = await productModel.find({gender:"women"})
        .select('-image')
        .skip((page -1) * perPage)
        .limit(perPage)
        .sort({createdAt: -1});
        rs.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error),
        rs.status(500).send({
            success:false,
            message:"error in per page control"
        })
    }
}
// kids products controller 
export const kidsProductsController = async (rq,rs) =>{
    try {
        const perPage = 6;
        const page =rq.params.page ? rq.params.page : 1;

        const products = await productModel.find({gender:"kids"})
        .select('-image')
        .skip((page -1) * perPage)
        .limit(perPage)
        .sort({createdAt: -1});
        rs.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error),
        rs.status(500).send({
            success:false,
            message:"error in per page control"
        })
    }
}
// // men products controller 
// export const menProductsController = async (rq,rs) =>{
//     try {
//         // const demoCheck = await productModel.find({})
//         // const {gender} =rq.params
//         const demoCheck = await productModel.find({gender:"men"})
//         .select("-image")
//         .populate() 

//         rs.status(200).send({
//             success:true,
//             demoCheck
            
//         })
//     } catch (error) {
//         rs.status(400).send({
//             success:false,
//             error,
//             message:"error in men products"
//         })
//     }
// }


// sample make controller 
export const checkingProductsController = async (rq,rs) =>{
    try {
        // const demoCheck = await productModel.find({})
        const demoCheck = await productModel.find({gender:"women"})
        .select("-image")
        .populate() 

        rs.status(200).send({
            success:true,
            demoCheck
            
        })
    } catch (error) {
        rs.status(400).send({
            success:false,
            error,
            message:"error in checking products"
        })
    }
}


// similar product conreoller  cid=category id and pid=product ids

// export const relatedProductController = async (rq,rs) =>{
//      try {
//          const {cid ,pid} =rq.params;
//          const products =await productModel.find({
//             category:cid,
//             _id:{$ne:pid},
//          })
//          .select('-image')
//          .limit(3)
//          .populate('category');
//          rs.status(200).send({
//             success:true,
//             products,
//          })
//      } catch (error) {
//         console.log(error)
//         rs.status(400).send({
//             success:false,
//             message:"error while getting in  related product",
//             error
//         })

//      }
// }


//payment getway controller
//token
// Client Token Controller
export const braintreeTokenController = (rq, rs) => {
    gateway.clientToken.generate({}, function (error, response) {
        if (error) {
            console.error("Error generating client token:", error);
            rs.status(500).send(error);
        } else {
            rs.send(response);
        }
    });
};

// // Payment Controller
// export const braintreePaymentController = async (rq, rs) => {
//     try {
//         const { cart, nonce } = rq.body;
//         const total = cart.reduce((acc, item) => acc + item.price, 0);

//         gateway.transaction.sale({
//             amount: total,
//             paymentMethodNonce: nonce,
//             options: {
//                 submitForSettlement: true,
//             },
//         }, async function (error, result) {
//             if (result) {
//                 // Assuming 'orderModel' is Mongoose model
//                 const order = new orderModel({
//                     products: cart,
//                     payment: result,
//                     buyer: rq.user._id
//                 });
//                 await order.save();
//                 rs.json({ ok: true });
//                 console.log("Transaction successful:", result);
//             } else {
//                 console.error("Transaction failed:", error);
//                 rs.status(500).send(error);
//             }
//         });
//     } catch (error) {
//         console.error("Error in payment controller:", error);
//         rs.status(500).send(error);
//     }
// };

// export const braintreeTokenController = async (rq,rs) =>{
//     try {
//         await gateway.clientToken.generate({},function(error,result){
//             if (error) {
//                 rs.status(500).send(error);
//             } else {
//                 rs.send(result); 
//             }
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }

// //payment
export const braintreePaymentController = async (rq,rs) =>{
    try {
        const {cart,nonce} =rq.body;
        let total =0;
        cart.map((i)=>{
            total +=i.price;
        });

        let newTransaction= gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true,
            },
        },
    function (error,result){
              if (result) {
                const order = new orderModel({
                   products:cart,
                   payment:result,
                   buyer:rq.user._id 
                }).save()
                rs.json({ok:true})
                rs.json(order)
                // rs.status(201).send({
                //     success:true,
                //     message:"order send",
                //     order
                // })
                console.log("from product controller",result)
              } else {
                rs.status(500).send(error);
              }
        })
    } catch (error) {
        console.log(error)
    }
}



// export const braintreePaymentController = async (rq, rs) => {
//     try {
//         const { cart, nonce } = rq.body;
//         let total = 0;
//         cart.map((item) => {
//             total += item.price;
//         });

//         const newTransaction = await gateway.transaction.sale({
//             amount: total,
//             paymentMethodNonce: nonce,
//             options: {
//                 submitForSettlement: true,
//             },
//         });

//         if (newTransaction.success) {
//             const order = new orderModel({
//                 products: cart,
//                 payment: newTransaction,
//                 buyer: rq.user._id
//             });

//             await order.save();

//             rs.json({ ok: true });
//             console.log(order);
//         } else {
//             throw new Error('Transaction failed');
//         }
//     } catch (error) {
//         console.error(error);
//         rs.status(500).send(error.message || 'Internal Server Error');
//     }
// };
