const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const {
  hashPassword,
  isPassMatched ,
} = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const teacherRouter = require("../../routes/staff/teachers");



// @desc Teacher register
// Route POST /api/teachers/admin/register
// @access private

exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if teacher exist
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error("Teacher already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  //create
  const teacherCreated = await Teacher.create({
    email,
    name,
    password: hashedPassword,
  });

  //send the data
  res.status(200).json({
    status: "success",
    message: "Teacher registered Successfullty",
    data: teacherCreated,
  });
});

// @desc Teacher login
// Route POST /api/teachers/login
// @access Public


exports.loginTeacher = AsyncHandler(async(req,res)=>{
  
  const {email,password} = req.body;

  //find the user
  const teacher = await Teacher.findOne({email});
  if(!teacher){
    return res.json({message:"Invalid login credentials"})
  }

  //verify the password
  const isMatched = await isPassMatched(password,teacher?.password);

  if(!isMatched){
    
    return res.json({message:"Invalid login credentials"})
  }else{
    res.status(200).json({
      status:"success",
      message:"Teacher login successfully",
      data:generateToken(teacher?._id)
    })
  }
})

// @desc Get allTeacher 
// Route GET /api/v1/admin/teachers
// @access private admin only

exports.getAllTeacherAdmin = AsyncHandler(async(req,res) =>{
  const teachers = await Teacher.find();
  res.status(200).json({
    status:"success",
    message:"Teachers fetched successfully",
    data:teachers
  })
})  

//@desc Get single teacher
//Route GET /api/v1/admin/teachers/:teacherID/admin
//@access private
exports.getTeacherByAdmin = AsyncHandler(async(req,res)=>{
  const teacherID = req.params.teacherID;
  //find the teacher
  const teacher = await Teacher.findById(teacherID);

  if(!teacher){
    throw new Error("Teacher not found");
  }
  
  res.status(200).json({
    status:"success",
    message:"Teacher fetched Successfully",
    data:teacher
  })

})

//@desc teacher profile
//Route GET /api/v1/admin/teachers/profile
//@access private teacher only
exports.getTeacherprofile = AsyncHandler(async(req,res)=>{
  const teacher = await Teacher.findById(req.userAuth?._id).select('-password -createAt -updatedAt');
  if(!teacher){
    throw new Error("Teacher not found")
  }
  res.status(200).json({
    status:"success",
    message:"Teacher Profile fetched Successfully",
    data:teacher
  })

})

//@desc teacher update
//Route PUT /api/v1/admin/teachers/:is/update
//@access private teacher only
exports.teacherUpdateProfile = AsyncHandler(async(req,res)=>{
  const {email,name,password} = req.body;

  //if email is taken
  const emailExist = await Teacher.findOne({email});
  if(emailExist){
    throw new Error("This email is taken/exist")
  }

  //hash password
  //check if user is updating password
  if(password){
    //update 
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password:await hashPassword(password),
        name,
      },
      {
        new:true,
        runValidators:true
      }
    )
  res.status(200).json({
    status:"success",
    message:"Teacher updated Successfully",
    data:teacher
  });  
}else{
  //update
  const teacher = await Teacher.findByIdAndUpdate(
    req.userAuth._id,
    {
      email,name,
    },{
      new:true,
      runValidators:true
    }
  )
  res.status(200).json({
    status:"success",
    message:"Teacher updated Successfully",
    data:teacher
  });
}
});


//@desc admin updating teacher profile 
//Route UPDATE /api/v1/admin/teachers/:is/update
//@access private admin only
exports.adminUpdateTeacher = AsyncHandler(async(req,res)=>{
  const {program,classLevel,academicYear,subject} = req.body;

  //if email is taken
  const teacherFound = await Teacher.findById(req.params.teacherID)
  if(!teacherFound){
    throw new Error("teacher not found")
  }

  //check if teacher is withdrawn
  if(teacherFound.isWithdrawn){
    throw new Error ("Action denied, teacher is withdrawn")
  }

  //assign a program
  if(program){
    teacherFound.program = program;
    await teacherFound.save();
    res.status(200).json({
      status:"success",
      message:"Teacher updated Successfully",
      data:teacherFound
    })
  }

  //assign class level
  if(classLevel){
    teacherFound.classLevel=classLevel;
    await teacherFound.save();
    res.status(200).json({
      status:"success",
      message:"Teacher updated Successfully",
      data:teacherFound
  })
}
// assign academic year
if(academicYear){
  teacherFound.academicYear=academicYear;
  await teacherFound.save();
  res.status(200).json({
    status:"success",
    message:"Teacher updated Successfully",
    data:teacherFound
  })
}
  //assign subject
  if(subject){
  teacherFound.subject=subject;
  await teacherFound.save();
  res.status(200).json({
    status:"success",
    message:"Teacher updated Successfully",
    data:teacherFound
  })
}
});