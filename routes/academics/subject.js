const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { getSubject, createSubject, getSubjects, updateSubject, deleteSubject } = require("../../controller/academics/subjects");

const subjectRouter = express.Router();


subjectRouter.post('/:programID',isLogin, isAdmin, createSubject)
subjectRouter.get("/",isLogin, isAdmin, getSubjects);

// academicYearRouter.post('/',isLogin,isAdmin,createAcademicYear);
// academicYearRouter.get('/',isLogin,isAdmin,getAcademicYears);

subjectRouter.get("/:id",isLogin, isAdmin, getSubject)
subjectRouter.put("/:id",isLogin, isAdmin, updateSubject)
subjectRouter.delete("/:id",isLogin, isAdmin, deleteSubject);

// academicYearRouter.get('/:id',isLogin,isAdmin,getAcademicYear);
// academicYearRouter.put('/:id',isLogin,isAdmin,updateAcademicYear);
// academicYearRouter.delete('/:id',isLogin,isAdmin,deleteAcademicYear);

module.exports = subjectRouter;
