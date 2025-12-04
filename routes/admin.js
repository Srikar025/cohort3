const {Router}=require("express")
const adminRouter=Router();
const {adminModel}=require("../db");
const jwt =require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}= require("../config")


adminRouter.post("/signup",async function(req,res){
    const {email,password,firstname,lastname}=req.body
    await adminModel.create({

        email :email,
        password:password,
        firstname:firstname,
        lastname:lastname,
     })

    res.json({
        message:"use signed up successfully"
    })
})

adminRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;

    const admin= await adminModel.findOne({
        email:email,
        password:password
    })


    if (admin){

        const token=jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD);
        // do  cookie logic
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }    




    res.json({
        message:"signin endpoint"
    })
})
adminRouter.post("/course",adminMiddleware, async function(req,res){
    const adminId=req.userId;

    const{title,description,imageUrl,price,creatorId}=req.body;
    await courseModel.create({
        title,desciption,imageUrl,price,creatorId
    })

    res.json({
        message:"signin endpoint"
    })
})
adminRouter.put("/",function(req,res){
    res.json({
        message:"signin endpoint"
    })
})
adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message:"signin endpoint"
    })
})
module.exports={
    adminRouter:adminRouter
}