const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const {
  hashPassword,
  isPassMatched,
} = require("../../utils/helpers");

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
