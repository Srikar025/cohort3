const express=require('express')
const app=express();
const {userRouter}=require("/routes/user")
const {courseRouter}=require("/routes/course")
createUserRoutes(app)
createCourseRoutes(app)

app.use("/user",userRouter);
app.use("/course",courseRouter);






app.listen(3000);