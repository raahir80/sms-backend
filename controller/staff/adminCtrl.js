const Admin = require("../../model/Staff/Admin")
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");

// @desc Admin register
// Route POST /api/admins/register
// @access private
exports.registerAdmCtrl= AsyncHandler(async(req,res)=>{
    const {name,email,password} =req.body;
        // Check if email exist
        const adminFound=await Admin.findOne({email});
        if(adminFound){
            throw new Error("Admin Exists");
        }    
        //register
        const user = await Admin.create({
            name,email,password
        });
        return res.json({data:user});
});

// @desc Admin login
// Route POST /api/v1/admins/login
// @access private
exports.loginAdminCtrl =AsyncHandler(async (req,res)=>{

    const {email,password} =req.body;
           // find user
        const user = await Admin.findOne({email});
        if(!user){
            return res.json({message:'Invalid login credentials'})
        }

        if(user && (await user.verifyPassword(password))){  
            const token = generateToken(user._id);
          
            const verify = verifyToken(token);
            return res.json({data:generateToken(user._id)});
        }else{
            //console.log(user);  
            return res.json({message:"Invalid login credentials"});
        }
});

// @desc get all admins
// Route GET /api/v1/admins
// @access private
exports.getAdminsCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"All admins"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc get single admin:
// Route GET /api/v1/admins/:id
// @access private

exports.getAdminCtrl = (req,res)=>{
    try{
        console.log(req.userAuth);
        res.status(201).json({
            status:"success",
            data:"single admin"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc update admin
// Route PUT /api/v1/admins/:id
// @access private
exports.updateAdminCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"update admin"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc delete admin
// Route DELETE /api/v1/admins/:id
// @access private
exports.deleteAdminCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"admin deleted"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc suspend teacher
// Route PUT /api/v1/admins/suspend/teacher:id
// @access private
exports.adminSuspendTeacherCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"admin suspended teacher"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc unsuspend teacher
// Route PUT /api/v1/admins/unsuspend/teacher:id
// @access private
exports.adminUnsuspendTeacherCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"admin unsuspended teacher"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc withdraw teacher
// Route PUT /api/v1/admins/withdraw/teacher:id
// @access private
exports.adminWithdrawTeacherCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"admin withdraw teacher"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc unwithdraw teacher
// Route PUT /api/v1/admins/withdraw/teacher:id
// @access private
exports.adminUnWithdrawTeacherCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"admin unwithdraw teacher"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc admin publish exam results
// Route PUT /api/v1/admins/publish/exam:id
// @access private
exports.adminPublishResultsCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"admin publish exam"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};

// @desc admin unpublish exam results
// Route PUT /api/v1/admins/publish/exam:id
// @access private
exports.adminUnpublishResultsCtrl = (req,res)=>{
    try{
        res.status(201).json({
            status:"success",
            data:"admin unpublish exam"
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error.message,
        })
    }
};




/*module.exports ={
    registerAdminCtrl,
}*/