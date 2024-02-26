const AsyncHandler = require("express-async-handler");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const Student = require("../../model/Academic/Student");

// @desc student register
// Route POST /api/students/admin/register
// @access private
exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if teacher exist
  const student = await Student.findOne({ email });
  if (student) {
    throw new Error("Student already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  //create
  const studentCreated = await Student.create({
    email,
    name,
    password: hashedPassword,
  });

  //send the data
  res.status(200).json({
    status: "success",
    message: "Student registered Successfullty",
    data: studentCreated,
  });
});

// @desc Student login
// Route POST /api/students/login
// @access Public
exports.loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find the user
  const student = await Student.findOne({ email });
  if (!student) {
    return res.json({ message: "Invalid login credentials" });
  }

  //verify the password
  const isMatched = await isPassMatched(password, student?.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    res.status(200).json({
      status: "success",
      message: "Student login successfully",
      data: generateToken(student?._id),
    });
  }
});

//@desc student profile
//Route GET /api/v1/admin/student/profile
//@access private student only
exports.getStudentProfile = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth?._id).select(
    "-password -createAt -updatedAt"
  );
  if (!student) {
    throw new Error("Student not found");
  }
  res.status(200).json({
    status: "success",
    message: "Student Profile fetched Successfully",
    data: student,
  });
});

// @desc Get allStudents
// Route GET /api/v1/admin/teachers
// @access private admin only

exports.getAllStudentByAdmin = AsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: "success",
    message: "Students fetched successfully",
    data: students,
  });
});

//@desc Get single student
//Route GET /api/v1/admin/students/:teacherID/admin
//@access private
exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
  const studentID = req.params.studentID;
  //find the teacher
  const student = await Student.findById(studentID);

  if (!student) {
    throw new Error("Student not found");
  }

  res.status(200).json({
    status: "success",
    message: "Student fetched Successfully",
    data: student,
  });
});

//@desc student update
//Route PUT /api/v1/admin/students/update
//@access private stuent only
exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //if email is taken
  const emailExist = await Student.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //hash password
  //check if user is updating password
  if (password) {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Student updated Successfully",
      data: student,
    });
  } else {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Student updated Successfully",
      data: student,
    });
  }
});

exports.adminUpdateStudent = AsyncHandler(async (req, res) => {
  const { classLevels, academicYear, program, name, email, perfectName } =
    req.body;

  //find the student by id

  const studentFound = await Student.findById(req.params.studentID);
  if (!studentFound) {
    throw new Error("Student not found");
  }
  
  // update
  const studentUpdated = await Student.findByIdAndUpdate(req.params.studentID, 
    {
        $set: {
        name,
        email,
        academicYear,
        program,
        perfectName,
        },
        $addToSet: {
        classLevels,
        },
    },
    {
        new:true,
    }
  );

  //send response
    res.status(200).json({
        status:"success",
        data:studentUpdated,
        message:"Student updated Successfully"

    })
});
