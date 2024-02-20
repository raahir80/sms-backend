const express = require("express");
const {
  createAcademicYear,
  getAcademicYears,
  getAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controller/academics/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicYearRouter = express.Router();

academicYearRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicYear)
  .get(isLogin, isAdmin, getAcademicYears);

// academicYearRouter.post('/',isLogin,isAdmin,createAcademicYear);
// academicYearRouter.get('/',isLogin,isAdmin,getAcademicYears);

academicYearRouter
  .route("/")
  .get(isLogin, isAdmin, getAcademicYear)
  .put(isLogin, isAdmin, updateAcademicYear)
  .delete(isLogin, isAdmin, deleteAcademicYear);

// academicYearRouter.get('/:id',isLogin,isAdmin,getAcademicYear);
// academicYearRouter.put('/:id',isLogin,isAdm  in,updateAcademicYear);
// academicYearRouter.delete('/:id',isLogin,isAdmin,deleteAcademicYear);

module.exports = academicYearRouter;
