const AsyncHandler = require("express-async-handler");
const Question = require("../../model/Academic/Questions");
const Teacher = require("../../model/Staff/Teacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const Exam = require("../../model/Academic/Exam");

//@desc Create Questions
//@route POST /api/v1/questions/:examID
//@access private teachers only

exports.createQuestions = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  //find the exam
  const examFound = await Exam.findById(req.params.examID);
  if (!examFound) {
    throw new Error("Exam not found");
  }

  //check if question exist
  const questionExists = await Question.findOne({question})
  if (questionExists) {
    throw new Error("Question already exists");
  }
  //create exam
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth._id,
  });

  //add the question into exam
  examFound.questions.push(questionCreated?._id);


  //save
  res.status(200).json({
    status:"success",
    message:"Question created",
    data:questionCreated
  })
});


//@desc Get all Questions
//@route POST /api/v1/questions/
//@access private teachers only

exports.getQuestions = AsyncHandler(async (req, res) => {
    const questions = await Question.find();
    res.status(201).json({
      status: "success",
      message: "Questions fetched successfully",
      data: questions,
    });
  });


//@desc get single Question
//@route GEt /api/v1/questions/:id
//@access private
exports.getQuestion = AsyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.status(201).json({
      status: "success",
      message: "Question fetched successfully",
      data: question,
    });
  });


//@desc update question
//@route PUT /api/v1/questions/:id
//@access private
exports.updateQuestion = AsyncHandler(async (req, res) => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer  } = req.body;
  
    //check name exists
  
    const questionFound = await Question.findOne({ question });
    if (questionFound) {
      throw new Error("Question already exists");
    }
    const questions= await Question.findByIdAndUpdate(
      req.params.id,
      { 
        question, optionA, optionB, optionC, optionD, correctAnswer 
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "success",
      message: "Question fetched successfully",
      data: questions,
    });
  });