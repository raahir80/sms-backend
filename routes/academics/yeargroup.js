const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const {
  createYearGroup,
  getYearGroup,
  getYearGroups,
  updateYeaGroup,
  deleteYearGroup,
} = require("../../controller/academics/yearGroups");

const yearGroupRouter = express.Router();

yearGroupRouter
  .route("/")
  .post(isLogin, isAdmin, createYearGroup)
  .get(isLogin, isAdmin, getYearGroups);

// academicYearRouter.post('/',isLogin,isAdmin,createAcademicYear);
// academicYearRouter.get('/',isLogin,isAdmin,getAcademicYears);

yearGroupRouter
  .route("/:id")
  .get(isLogin, isAdmin, getYearGroup)
  .put(isLogin, isAdmin, updateYeaGroup)
  .delete(isLogin, isAdmin, deleteYearGroup);

// academicYearRouter.get('/:id',isLogin,isAdmin,getAcademicYear);
// academicYearRouter.put('/:id',isLogin,isAdmin,updateAcademicYear);
// academicYearRouter.delete('/:id',isLogin,isAdmin,deleteAcademicYear);

module.exports = yearGroupRouter;
