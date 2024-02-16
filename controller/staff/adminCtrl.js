const Admin = require("../../model/Staff/Admin")
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const bcrypt = require("bcryptjs");
const { hashPassword, isPassMatched } = require("../../utils/helpers");


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
            name,email,password:await hashPassword(password)
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

        // verify password
       const isMatched = await isPassMatched(password,user.password);
       
       if(!isMatched){
        return res.json({message:"Invalid login credentials"});
       }else{
        return res.json({
            data:generateToken(user._id),
            message: "Admin logged in successfully"
        })
       }

});

// @desc get all admins
// Route GET /api/v1/admins
// @access private
exports.getAdminsCtrl = AsyncHandler(async(req,res)=>{
    const admins = await Admin.find();
    res.status(200).json({
        status:"success",
        message:"Admin fetched Successfully",
        data:admins
    })
});

// @desc get single admin:
// Route GET /api/v1/admins/:id
// @access private

exports.getAdminCtrl = AsyncHandler(async (req,res)=>{
    console.log(req.userAuth);
    const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt").populate("academicYears");
    if(!admin){
        throw new Error('Admin not found')
    }else{
        res.status(200).json({
            status:"Success",
            data:admin,
            message:"Admin profile fetched successfully"
        })
    }
});

// @desc update admin
// Route PUT /api/v1/admins/:id
// @access private
exports.updateAdminCtrl = AsyncHandler(async (req,res)=>{
   const {email,name,password} = req.body;
   // if email is taken
   const emailExist = await Admin.findOne({email})

   if(emailExist){
    throw new Error('This email is taken/exist');
   }

   // check if user is updating password
   if(password){
    const admin = await Admin.findByIdAndUpdate(req.userAuth._id,{
        email,name,password : await hashPassword(password) 
    },{
        new:true,
        runValidators:true
    });
    res.status(200).json({
        status:"success",
        data:admin,
        message:"Admin updated successfully"
    });
   

   }else{
    //update
    const admin = await Admin.findByIdAndUpdate(req.userAuth._id,{
        email,name
    },{
        new:true,
        runValidators:true
    });
    res.status(200).json({
        status:"success",
        data:admin,
        message:"Admin updated successfully"
    });
   
   }

   // update
    
});

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