const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { getClassLevel, createClassLevel, getClassLevels, updateClassLevel, deleteClassLevel } = require("../../controller/academics/classLevel");
const { getProgram, createProgram, getPrograms, updateProgram, deleteProgram } = require("../../controller/academics/program");



const programRouter = express.Router();

programRouter
  .route("/")
  .post(isLogin, isAdmin, createProgram)
  .get(isLogin, isAdmin, getPrograms);

// academicYearRouter.post('/',isLogin,isAdmin,createAcademicYear);
// academicYearRouter.get('/',isLogin,isAdmin,getAcademicYears);

programRouter
  .route("/:id")
  .get(isLogin, isAdmin, getProgram)
  .put(isLogin, isAdmin, updateProgram)
  .delete(isLogin, isAdmin, deleteProgram);

// academicYearRouter.get('/:id',isLogin,isAdmin,getAcademicYear);
// academicYearRouter.put('/:id',isLogin,isAdmin,updateAcademicYear);
// academicYearRouter.delete('/:id',isLogin,isAdmin,deleteAcademicYear);

module.exports = programRouter;
