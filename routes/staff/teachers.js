const express = require("express");
const { adminRegisterTeacher } = require("../../controller/staff/teacherCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");


const teacherRouter = express.Router();

teacherRouter.post("/admin/register",isLogin,isAdmin,adminRegisterTeacher);


module.exports = teacherRouter;
