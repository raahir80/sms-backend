const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { getClassLevel, createClassLevel, getClassLevels, updateClassLevel, deleteClassLevel } = require("../../controller/academics/classLevel");

const classLevelRouter = express.Router();

classLevelRouter
  .route("/")
  .post(isLogin, isAdmin, createClassLevel)
  .get(isLogin, isAdmin, getClassLevels);

// academicYearRouter.post('/',isLogin,isAdmin,createAcademicYear);
// academicYearRouter.get('/',isLogin,isAdmin,getAcademicYears);

classLevelRouter
  .route("/")
  .get(isLogin, isAdmin, getClassLevel)
  .put(isLogin, isAdmin, updateClassLevel)
  .delete(isLogin, isAdmin, deleteClassLevel);

// academicYearRouter.get('/:id',isLogin,isAdmin,getAcademicYear);
// academicYearRouter.put('/:id',isLogin,isAdmin,updateAcademicYear);
// academicYearRouter.delete('/:id',isLogin,isAdmin,deleteAcademicYear);

module.exports = classLevelRouter;
