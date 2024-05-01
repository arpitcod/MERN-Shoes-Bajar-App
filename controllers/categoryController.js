import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async (rq,rs) =>{

    try {
        const {name} =rq.body
        if (!name) {
            return rs.status(401).send({
                message:"name is required"
            })

        }
        const existingCategory = await categoryModel.findOne({name})
        if (existingCategory) {
            return rs.status(200).send({
                success:true,
                message:"category already exist",
            })
        } 

        //new document create  
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        rs.status(201).send({
            success:true,
            message:"new category created",
            category
        })

    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error in category",
            error,
        });
        
    }
};


// update category 

export const updateCategoryController = async (rq,rs) =>{

    try {
        const {name} =rq.body
        const {id} =rq.params
        const category =await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

        rs.status(200).send({
            success:true,
            message:"category updated successfully"
        })
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            error,
            message:"error while updating category"
        })
    }
}


//categoryController getting all categories

export const categoryController = async (rq,rs) =>{

    try {
   const category =await categoryModel.find({})
   rs.status(200).send({
    success:true,
    message:"all categorys list",
    category,
   })

    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error while getting all categories",
            error
        })
    }
}


//single category controller
export const singleCategoryController =async (rq,rs) =>{

    try {
        // const {slug} = rq.params
        const category = await categoryModel.findOne({slug:rq.params.slug})
        rs.status(200).send({
            success:true,
            message:"get single category successfully",
            category

        })
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            error,
            message:"error while getting single category"
        })
    }
}


//delete category controller

export const deleteCategoryController = async (rq,rs) =>{

    try {
        const {id} =rq.params
        await categoryModel.findByIdAndDelete(id)
        rs.status(200).send({
            success:true,
            message:"category delete successfully"
        })
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            error,
            message:"error while deleting category"
        })
    }
}