const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");
const YearGroup = require("../../model/Academic/YearGroup");


//@desc Create yearGroup
//@route POST /api/v1/years-group
//@access private
exports.createYearGroup = AsyncHandler(async (req, res) => {
  const { name,academicYear} = req.body;

  // check if exists
  const yeargroup = await YearGroup.findOne({ name });
  if (yeargroup) {
    throw new Error("Year Group already exists");
  }

  //create
  const subjectYearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });

  // // push program into admin
  // const admin = await Admin.findById(req.userAuth._id);
  // admin.programs.push(programCreated._id);

    //push to the program
  const admin = await Admin.findById(req.userAuth._id);
  if(!admin){
    throw new Error("Admin not found")
  }

  // push year group into admin 
  //save 
  await admin.save();
  res.status(201).json({
    status: "Success",
    message: "Year Group created successfully",
    data: subjectYearGroup,
  });
});

//@desc get all Year groups
//@route GEt /api/v1/year-groups
//@access private
exports.getYearGroups = AsyncHandler(async (req, res) => {
  const groups = await YearGroup.find();
  res.status(201).json({
    status: "success",
    message: "Year Groups fetched successfully",
    data: groups,
  });
});

//@desc get single year group
//@route GEt /api/v1/year-group/:id
//@access private
exports.getYearGroup = AsyncHandler(async (req, res) => {
  const group = await YearGroup.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Year Group fetched successfully",
    data: group,
  });
});

//@desc update year group
//@route PUT /api/v1/year-group/:id
//@access private
exports.updateYeaGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear} = req.body;

  //check name exists

  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) {
    throw new Error("Year Group already exists");
  }
  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "Year Group updated successfully",
    data: yearGroup,
  });
});

//@desc delete subject
//@route DELETE /api/v1/subjects/:id
//@access private
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Year Group deleted successfully",
  });
});
