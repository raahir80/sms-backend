const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");



//@desc Create Exam
//@route POST /api/v1/exams
//@access private teachers only

exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    classLevel,
    examStatus, 
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
  } = req.body;

  //find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);

  if (!teacherFound) {
    throw new Error("Teacher not Found");
  }

  // exam exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already Exists");
  }

  //create
  const examCreated = new Exam({
    name,
    description,
    academicYear,
    academicTerm,
    classLevel,
    createdBy,
    duration,
    examDate,
    examStatus,
    examTime,
    examType,
    subject,
    program,
    createdBy:req.userAuth?._id,
  });

  // push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);

  //save exam
  await examCreated.save();
  await teacherFound.save();
  res.status(200).json({
    status:"success",
    message:"Exam created",
    data:examCreated
  })
});

//@desc Get all exams
//@route GET /api/v1/exams
//@access private 

exports.getExams = AsyncHandler(async (req, res) => {
    const exams = await Exam.find();
    res.status(201).json({
      status: "success",
      message: "Exams fetched successfully",
      data: exams,
    });
  });


  //@desc get single exam
//@route GEt /api/v1/exams/:id
//@access private teacher Only
exports.getExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Exam fetched successfully",
    data: exam,
  });
});


//@desc update exam
//@route PUT /api/v1/exams/:id
//@access private teacher only
exports.updateExam = AsyncHandler(async (req, res) => {
    const { name,
        description,
        subject,
        program,
        academicTerm,
        classLevel,
        examStatus, 
        duration,
        examDate,
        examTime,
        examType,
        createdBy,
        academicYear,
    } = req.body;
  
    //check name exists
  
    const examFound = await Exam.findOne({ name });
    if (examFound) {
      throw new Error("Exam already exists");
    }
    const examUpdated = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        academicYear,
        academicTerm,
        classLevel,
        createdBy,
        duration,
        examDate,
        examStatus,
        examTime,
        examType,
        subject,
        program,
        createdBy:req.userAuth?._id,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "success",
      message: "Exam updated successfully",
      data: examUpdated,
    });
  });