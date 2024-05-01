import Express  from "express";
import {registerController ,loginController, testController, forgotPasswordController, updateProfileController, getOrdersController} from "../controllers/auth_controller.js";

import { isAdmin, require_sign_in } from "../middlewares/auth_middleware.js";

//router object

const router =Express.Router();


//routing
//register || method post

router.post("/register",registerController)


//login ||post
router.post("/login",loginController)
// router.get("/login",loginController)

//forgot password
router.post("/forgot-password",forgotPasswordController)

//test route
router.get("/test", require_sign_in, isAdmin, testController);

// protected user route auth
router.get("/user-auth" ,require_sign_in, (rq,rs) =>{
    rs.status(200).send({ok:true});
    console.log({ok:true});
}) 

// protected admin route auth
router.get("/admin-auth" ,require_sign_in,isAdmin, (rq,rs) =>{
    rs.status(200).send({ok:true});
    console.log({ok:true});
})

router.put('/profile', require_sign_in,updateProfileController);

//orders 
router.get("/orders",require_sign_in, getOrdersController)

export default router;