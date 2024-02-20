const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const AcademicTerm = require("../../model/Academic/AcademicTerm");

//@desc Create Academic term
//@route POST /api/v1/academic-years
//@access private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  // check if exists
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    throw new Error("Acadmic term already exists");
  }

  //create
  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });

  // push academic year into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();

  res.status(201).json({
    status: "Success",
    message: "Academic Term created successfully",
    data: academicTermCreated,
  });
});

//@desc get all Academic terms
//@route GEt /api/v1/academic-years     
//@access private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  res.status(201).json({
    status: "success",
    message: "Academic terms fetched successfully",
    data: academicTerms,
  });
});

//@desc get single Academic term
//@route GEt /api/v1/academic-years/:id
//@access private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Academic term fetched successfully",
    data: academicTerms,
  });
});

//@desc update Academic term
//@route PUT /api/v1/academic-years/:id
//@access private
exports.updateAcademicTerms = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  //check name exists

  const createAcademicTermFound = await AcademicTerm.findOne({ name });
  if (createAcademicTermFound) {
    throw new Error("Academic term already exists");
  }
  const academicTerms = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "Academic terms fetched successfully",
    data: academicTerms,
  });
});

//@desc delete Academic term
//@route DELETE /api/v1/academic-years/:id
//@access private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Academic term deleted successfully",
  });
});
