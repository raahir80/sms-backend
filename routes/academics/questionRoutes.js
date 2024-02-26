const express = require("express");
const { createQuestions, getQuestions, getQuestion, updateQuestion } = require("../../controller/academics/questionsCtrl");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");

const questionRouter = express.Router();



questionRouter.post("/:examID",isTeacherLogin,isTeacher,createQuestions);
questionRouter.get("/",isTeacherLogin,isTeacher,getQuestions);

questionRouter.get("/:id",isTeacherLogin,isTeacher,getQuestion);

questionRouter.put("/:id",isTeacherLogin,isTeacher,updateQuestion);

module.exports= questionRouter;