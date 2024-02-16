const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

//@desc Create Academic year
//@route POST /api/v1/academic-years
//@access private
exports.createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  // check if exists
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    throw new Error("Acadmic year already exists");
  }

  //create
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });

  // push academic year into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();

  res.status(201).json({
    status: "Success",
    message: "Academic year created successfully",
    data: academicYearCreated,
  });
});

//@desc get all Academic years
//@route GEt /api/v1/academic-years     
//@access private
exports.getAcademicYears = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  res.status(201).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears,
  });
});

//@desc get single Academic years
//@route GEt /api/v1/academic-years/:id
//@access private
exports.getAcademicYear = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears,
  });
});

//@desc update Academic year
//@route PUT /api/v1/academic-years/:id
//@access private
exports.updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  //check name exists

  const createAcademicYearFound = await AcademicYear.findOne({ name });
  if (createAcademicYearFound) {
    throw new Error("Academic year already exists");
  }
  const academicYears = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears,
  });
});

//@desc delete Academic year
//@route DELETE /api/v1/academic-years/:id
//@access private
exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
  await AcademicYear.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Academic year deleted successfully",
  });
});
