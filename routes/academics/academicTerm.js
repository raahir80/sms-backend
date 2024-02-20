const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const {
  createAcademicTerm,
  getAcademicTerm,
  updateAcademicTerms,
  deleteAcademicTerm,
  getAcademicTerms,
} = require("../../controller/academics/academicTermCtrl");

const academicTermRouter = express.Router();

academicTermRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicTerm)
  .get(isLogin, isAdmin, getAcademicTerms);

// academicYearRouter.post('/',isLogin,isAdmin,createAcademicYear);
// academicYearRouter.get('/',isLogin,isAdmin,getAcademicYears);

academicTermRouter
  .route("/")
  .get(isLogin, isAdmin, getAcademicTerm)
  .put(isLogin, isAdmin, updateAcademicTerms)
  .delete(isLogin, isAdmin, deleteAcademicTerm);

// academicYearRouter.get('/:id',isLogin,isAdmin,getAcademicYear);
// academicYearRouter.put('/:id',isLogin,isAdmin,updateAcademicYear);
// academicYearRouter.delete('/:id',isLogin,isAdmin,deleteAcademicYear);

module.exports = academicTermRouter;
