const express = require("express");
const { adminRegisterTeacher, loginTeacher, getAllTeacherAdmin, getTeacherByAdmin, getTeacherprofile, teacherUpdateProfile, adminUpdateTeacher } = require("../../controller/staff/teacherCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");


const teacherRouter = express.Router();

teacherRouter.post("/admin/register",isLogin,isAdmin,adminRegisterTeacher);
teacherRouter.post("/login",isLogin,isAdmin,loginTeacher);
teacherRouter.get("/admin",isLogin,isAdmin,getAllTeacherAdmin);
teacherRouter.get("/profile",isTeacherLogin,isTeacher,getTeacherprofile);
teacherRouter.get("/:teacherID/admin",isLogin,isAdmin,getTeacherByAdmin);
teacherRouter.put("/:teacherID/update",isTeacherLogin,isTeacher,teacherUpdateProfile);
teacherRouter.put("/:teacherID/update/admin",isLogin,isAdmin,adminUpdateTeacher );





module.exports = teacherRouter;
