const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const { adminRegisterStudent, loginStudent, getStudentProfile, getAllStudentByAdmin, getStudent, getStudentByAdmin, studentUpdateProfile, adminUpdateStudent } = require("../../controller/students/studentsCtrl");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");



const studentRouter = express.Router();

studentRouter.post("/admin/register",isLogin,isAdmin,adminRegisterStudent);
studentRouter.post("/login",isLogin,isAdmin,loginStudent);
studentRouter.get("/profile",isStudentLogin,isStudent,getStudentProfile);

studentRouter.get("/admin",isLogin,isAdmin,getAllStudentByAdmin);
studentRouter.get("/:studentID/admin",isLogin,isAdmin,getStudentByAdmin);
studentRouter.put("/update",isStudentLogin,isStudent,studentUpdateProfile);
studentRouter.put("/:studentID/update/admin",isLogin,isAdmin,adminUpdateStudent);









module.exports = studentRouter;
