const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");

//@desc Create Program
//@route POST /api/v1/subjects/:programID
//@access private
exports.createSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  const programFound = await Program.findById(req.params.programID);
  if(!programFound){
    throw new Error("Program not Found");
  }
  // check if exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("Subject already exists");
  }

  //create
  const subjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  });

  // // push program into admin
  // const admin = await Admin.findById(req.userAuth._id);
  // admin.programs.push(programCreated._id);

    //push to the program
  programFound.subjects.push(subjectCreated._id);
  //save 
  await programFound.save();
  res.status(201).json({
    status: "Success",
    message: "Subject created successfully",
    data: subjectCreated,
  });
});

//@desc get all subjects
//@route GEt /api/v1/subjects
//@access private
exports.getSubjects = AsyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(201).json({
    status: "success",
    message: "Subjects fetched successfully",
    data: subjects,
  });
});

//@desc get single Subject
//@route GEt /api/v1/subjects/:id
//@access private
exports.getSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Subject fetched successfully",
    data: subject,
  });
});

//@desc update subject
//@route PUT /api/v1/subjects/:id
//@access private
exports.updateSubject = AsyncHandler(async (req, res) => {
  const { name, description,academicTerm} = req.body;

  //check name exists

  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("Subject already exists");
  }
  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "Subject updated successfully",
    data: subject,
  });
});

//@desc delete subject
//@route DELETE /api/v1/subjects/:id
//@access private
exports.deleteSubject = AsyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Subject deleted successfully",
  });
});
