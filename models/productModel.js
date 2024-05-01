import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },

    slug:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean,

    },
    brand:{
        type:String,
        required:true
    },

    color:{
        type:Array,
        required:true
    },

    size:{
        type:Array,
        required:true 
    }
    

},{timestamps:true})

export default mongoose.model('Products' ,productSchema)