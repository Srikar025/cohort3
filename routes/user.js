
const {Router}=require("express");
const {userModel}=require("../db");
const userRouter=Router();
const jwt =require("jsonwebtoken");
const {JWT_USER_PASSWORD}= require("../config")



userRouter.post("/signup", async function(req,res){
    const {email , password , firstname , lastname}=req.body;
     // hash the password so plain text pw is not in the db

     // todo;put inside a try catch block
     await userModel.create({

        email :email,
        password:password,
        firstname:firstname,
        lastname:lastname,
     })


    res.json({
        message:"signup succeeded"
    })  
})

userRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    // todo: ideally password should be hashed,and hence you cant compare the user provided password and the database password
    const user= await userModel.findOne({
        email:email,
        password:password
    })
    if (user){
        const token=jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD);
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

})

userRouter.get("/purchases",userMidddleware,async function(req,res){
    const userId=req.userId;

    const purchases= await purchaseModel.find({
        userId,
        courseId
    })
    res.json({
        purchases
      
    })
})


module.exports={
    userRouter:userRouter
}





