const AsyncHandler = require("express-async-handler");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const Student = require("../../model/Academic/Student");
const Exam = require("../../model/Academic/Exam");
const ExamResult = require("../../model/Academic/ExamResults");

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
  const studentUpdated = await Student.findByIdAndUpdate(
    req.params.studentID,
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
      new: true,
    }
  );

  //send response
  res.status(200).json({
    status: "success",
    data: studentUpdated,
    message: "Student updated Successfully",
  });
});

//@desc Student taking exam
//@route POST /api//v1/students/exams/:examID/write
//@access Private student only

exports.writeExam = AsyncHandler(async (req, res) => {
  //get student
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error("Student not found");
  }

  //Get exam
  const examFound = await Exam.findById(req.params.examID).populate(
    "questions"
  );
  if (!examFound) {
    throw new Error("Exam not found");
  }

  //get Questions
  const questions = examFound?.questions;

  //get students questions
  const studentAnswers = req.body.answers;

  //check if student answered all questions
  if (studentAnswers.length !== questions.length) {
    throw new Error("You have not answered all the questions");
  }

  //check if stduent has already takesn the exam
  const studentFoundResults = await ExamResult.findOne({student:studentFound?._id});
  if(studentFoundResults){
    throw new Error("You have already given exam")
  }


  //Build report object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let status='';
  let totalQuestions = 0;
  let grade = 0;
  let remarks ='';
  let score = 0;
  let answeredQuestions = [];

  
  //check for answers
  for (let i = 0; i < questions.length; i++) {
    //find the question
    const question = questions[i];
    //check if the answer is correct
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }

  //calculate reports
  totalQuestions = questions.length;
  grade = (correctAnswers / totalQuestions) * 100;
  answeredQuestions = questions.map((question) => {
    return {
      question: question.question,
      correctanswer: question.correctAnswer,
      isCorrect: question.isCorrect,
    };
  });


  //calculate status
  if(grade >= 50){
    status ="Pass"
  }else{
    status="Fail"
  }

  //Remarks
  if(grade >= 80){
    remarks = "Excellent"
  }else if(grade >= 70){
    remarks = "Very good"
  }else if(grade >= 50){
    remarks ="Fair"
  }else{
    remarks = "Poor"
  }



  //Generate Exam Results
  const examResults =await ExamResult.create({
    student:studentFound?._id,
    exam:examFound?._id,
    grade,
    score,
    status,remarks,
    classLevel:examFound?.classLevel,
    academicTerm:examFound?.academicTerm,
    academicYear:examFound?.academicYear
  });

  // push results into students
  studentFound.examResults.push(examResults?._id)

  //save
  await studentFound.save();
  res.status(200).json({
    status: "success",
    correctAnswers,
    wrongAnswers,
    score,
    grade,
    remarks,
    answeredQuestions,
    totalQuestions,
    status,
    examResults
    
  });
});
