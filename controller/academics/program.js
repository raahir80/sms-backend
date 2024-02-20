const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Program = require("../../model/Academic/Program");


//@desc Create Program
//@route POST /api/v1/programs
//@access private
exports.createProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // check if exists
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("Program already exists");
  }

  //create
  const programCreated = await Program.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  // push program into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.programs.push(programCreated._id);

  //save 
  await admin.save();

  res.status(201).json({
    status: "Success",
    message: "Program created successfully",
    data: programCreated,
  });
});

//@desc get all programs
//@route GEt /api/v1/programs
//@access private
exports.getPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find();
  res.status(201).json({
    status: "success",
    message: "Programs fetched successfully",
    data: programs,
  });
});

//@desc get single Program
//@route GEt /api/v1/class-levels/:id
//@access private
exports.getProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Program fetched successfully",
    data: program,
  });
});

//@desc update program
//@route PUT /api/v1/class-levels/:id
//@access private
exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //check name exists

  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("Program already exists");
  }
  const program = await Program.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "Program fetched successfully",
    data: program,
  });
});

//@desc delete class
//@route DELETE /api/v1/academic-years/:id
//@access private
exports.deleteProgram = AsyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Program deleted successfully",
  });
});
