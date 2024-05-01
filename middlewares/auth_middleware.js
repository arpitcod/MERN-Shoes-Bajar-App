import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected routes token base

export const require_sign_in = async (rq,rs,next) =>{

    try {
        const decode =await Jwt.verify(rq.headers.authorization,process.env.JWT_SECRET);
        rq.user = decode;
        next();
        
    } catch (error) {
        console.log(error);
    }
};

//admin access

export const isAdmin = async (rq,rs,next) =>{
    try {
        const user =await userModel.findById(rq.user._id)
        if(user.role !== 1){
            return rs.status(401).send({
                success:false,
                message:"unauthorized access"
            })
        }
        
        else{
            next();
        };
        
    } catch (error) {
        console.log(error);
        rs.status(401).send({
            success:false,
            error,
            message:"error in admin  middlware",
        })
    }
}

