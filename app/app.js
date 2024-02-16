const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const adminRouter= require("../routes/staff/adminRoute");
const {globalErrorHandler,notFoundErr} = require("../middlewares/globalErrorHandler");
const academicYearRouter = require("../routes/academics/academicYear");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}))
app.use(express.json()); // pass incoming json data
// app.use((req,res,next)=>{
//     console.log(`${req.method} ${req.originalUrl}`);
// });


// let user ={
//     name:"Rakesh Katariya",
//     isAdmin:false,
//     isLogin:false
// }

// const isLogin =(req,res,next) => {
//     if(user.isLogin){
//         next();
//     }else {
//         res.status(401).json(
//             {msg:"Unauthorized"})
//     }
// }

// const isAdmin =(req,res,next) => {
//     if(user.isAdmin){
//         next();
//     }else {
//         res.status(401).json(
//             {msg:"Unauthorized, you are not an admin"})
//     }
// }
 
//app.use(isLogin,isAdmin);
// parse application/json
// app.use(bodyParser.json());

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

//admin register
app.use("/api/v1/admins",adminRouter);
app.use("/api/v1/academic-years",academicYearRouter);


// Error middlewares
app.use(notFoundErr);
app.use(globalErrorHandler);

module.exports = app;