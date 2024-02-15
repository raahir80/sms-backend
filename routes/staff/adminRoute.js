const express = require("express");
const { registerAdmCtrl, loginAdminCtrl, getAdminCtrl, updateAdminCtrl, deleteAdminCtrl, adminSuspendTeacherCtrl, adminUnsuspendTeacherCtrl, adminWithdrawTeacherCtrl, adminUnWithdrawTeacherCtrl, adminPublishResultsCtrl, adminUnpublishResultsCtrl, getAdminsCtrl } = require("../../controller/staff/adminCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const adminRouter = express.Router();

// register
adminRouter.post("/register",registerAdmCtrl);

//login
adminRouter.post("/login",loginAdminCtrl);

// get all
adminRouter.get("/",getAdminsCtrl);

//single admin
adminRouter.get("/profile",isLogin,isAdmin,getAdminCtrl);

//update admin
adminRouter.put("/",isLogin,isAdmin,updateAdminCtrl);

//delete admin
adminRouter.delete("/:id",deleteAdminCtrl);

//suspend teacher
adminRouter.put("/suspend/teacher/:id",adminSuspendTeacherCtrl);

//unsuspend teacher
adminRouter.put("/unsuspend/teacher/:id",adminUnsuspendTeacherCtrl)

// withdraw teacher
adminRouter.put("/withdraw/teacher/:id",adminWithdrawTeacherCtrl);


//unwithdraw teacher
adminRouter.put("/unwithdraw/teacher/:id",adminUnWithdrawTeacherCtrl);

//admin publish exam results teacher
adminRouter.put("/publish/exam/:id",adminPublishResultsCtrl);


//admin unpublish exam results teacher
adminRouter.put("/unpublish/exam/:id",adminUnpublishResultsCtrl);

module.exports = adminRouter;