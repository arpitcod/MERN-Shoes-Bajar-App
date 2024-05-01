import { comparePassword, hashPassword } from "../helpers/auth_helper.js";
import userModel from "../models/userModel.js";
import  Jwt from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
export const registerController = async (rq,rs) =>{


    try {
       const {name,email,password,phone,address,answer}= await rq.body  
        //validation
        
        if(!name){
            return rs.send({message:'Name is required '});
        }
        if(!email){
            return rs.send({message:'Email is required '});
        }
        if(!password){
            return rs.send({message:'Password is required '});
        }
        if(!phone){
            return rs.send({message:'Phone no is required '});
        }
        if(!address){
            return rs.send({message:'Address is required '});
        }
        if(!answer){
            return rs.send({message:'Answer is required '});
        }
        // if(!name){
        //     return rs.send({error:'name is required '});
        // }

             //check user 
        const exisitingUser =await userModel.findOne({email})
        
        //exisiting user
      if(exisitingUser){

        return rs.status(200).send({
            success:false,
            message:'Already Register please login',
        })
      }

      const hashedPassword =await hashPassword(password)

      //save
      const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save();

      rs.status(201).send({
        success:true,
        message:'User Register Sucessfully',
        user,
      });

    } catch (error) {
        console.log(error);
         rs.status(500).send({
            success:false,
            message:"Error in Registration",
            error,
         })
    }
 
};


// export default {registerController};
export const loginController = async (rq ,rs) =>{
    try {
         const {email, password}=rq.body

         //validation
         if(!email || !password){
              return rs.status(404).send({
                success:false,
                message:"invalid email or password"
              });
         }
        
         const user= await userModel.findOne({email});
         if(!user){
            return rs.status(404).send({
                success:false,
                message:" email is not registered"
            })
         }

         const match= await comparePassword(password,user.password)
           if(!match){
             return rs.status(401).send({
                success:false,
                message:"invalid password"
                
              })
           } 
             //token
             const token = await Jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
             rs.status(200).send({
                success:true,
                message:"login successfully",
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    address:user.address,  
                    role:user.role,
                },
                token,
             })

    } catch (error) {
        console.log(error);
        rs.status(500).send({
            success:true,
            message:"error in login",
            error
        })
    };

};

//forgot password
export const forgotPasswordController =async(rq,rs) =>{
    try {
         const {email,answer,newPassword} = rq.body
         if (!email) {
            rs.status(400).send({message:"Email is required"})
         }
         if (!answer) {
            rs.status(400).send({message:"Answer is required"})
            
         }
         if (!newPassword) {
             rs.status(400).send({message:"New Password is required"})
         }
        
         //check 
         const user = await userModel.findOne({email,answer})
         if (!user) {
            rs.status(404).send({
                success:false,
                message:"Wrong Email And Answer"
                

            })
            
         }
        //  new password hashed 
         const hashed =await hashPassword(newPassword);
         await userModel.findByIdAndUpdate(user._id,{ password:hashed });
           rs.status(201).send({
            message:"Password changed",
            success:true
           })
           
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
};


//test controller

export const testController=(rq,rs) =>{
    // console.log("protected route");
    rs.send("protected route");
};
 
// update profile controller 
export const updateProfileController = async (rq,rs) =>{
    // return "API called succwessfully"
    try {
        const {name,email,password,phone,address} =rq.body;
        const user = await userModel.findById(rq.user._id);

        // password
        if(password && password.length < 6){
            return rs.json({error:"password is required and 6 character long"});
        }
        const hashedPassword =password ? await hashedPassword(password):undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            rq.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },{new:true}
        );
        rs.status(200).send({
            success:true,
            message:"profile updated successfully ",
            updatedUser,
        });
        
    } catch (error) {
        console.log(error)
        rs.status(400).send({
            success:false,
            error,
            message:"error in update controller"
        })
    }
}

export const getOrdersController = async (rq,rs) =>{ 
    try {
        const orders = await orderModel.find({buyer:rq.user_id})
        .populate("products","-image")
        .populate("buyer","name");
        rs.json(orders);

    
} catch (error) {
    console.log(error)
    rs.status(500).send({
        success:false,
        message:"error while getting orders",
        error
    })
}}
 