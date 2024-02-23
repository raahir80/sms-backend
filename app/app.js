const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const adminRouter= require("../routes/staff/adminRoute");
const {globalErrorHandler,notFoundErr} = require("../middlewares/globalErrorHandler");
const academicYearRouter = require("../routes/academics/academicYear");
const academicTermRouter = require("../routes/academics/academicTerm");
const classLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
const subjectRouter = require("../routes/academics/subject");
const yearGroupRouter = require("../routes/academics/yeargroup");
const teacherRouter = require("../routes/staff/teachers");
const examRouter = require("../routes/academics/exam");


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
app.use("/api/v1/academic-terms",academicTermRouter);
app.use("/api/v1/class-levels",classLevelRouter);
app.use("/api/v1/programs",programRouter);
app.use("/api/v1/subjects",subjectRouter);
app.use("/api/v1/year-groups",yearGroupRouter);
app.use("/api/v1/teachers",teacherRouter);
app.use("/api/v1/exams",examRouter);






// Error middlewares
app.use(notFoundErr);   
app.use(globalErrorHandler);

module.exports = app;