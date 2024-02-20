const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const ClassLevel = require("../../model/Academic/ClassLevel");


//@desc Create Class Level
//@route POST /api/v1/class-levels
//@access private
exports.createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  // check if exists
  const classFound = await ClassLevel.findOne({ name });
  if (classFound) {
    throw new Error("Class already exists");
  }

  //create
  const classCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  // push academic year into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(classCreated._id);

  //save 
  await admin.save();

  res.status(201).json({
    status: "Success",
    message: "Class created successfully",
    data: classCreated,
  });
});

//@desc get all classes
//@route GEt /api/v1/class-levels
//@access private
exports.getClassLevels = AsyncHandler(async (req, res) => {
  const classes = await ClassLevel.find();
  res.status(201).json({
    status: "success",
    message: "Classes fetched successfully",
    data: classes,
  });
});

//@desc get single classLevel
//@route GEt /api/v1/class-levels/:id
//@access private
exports.getClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Academic term fetched successfully",
    data: classLevel,
  });
});

//@desc update classes
//@route PUT /api/v1/class-levels/:id
//@access private
exports.updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  //check name exists

  const ClassFound = await ClassLevel.findOne({ name });
  if (ClassFound) {
    throw new Error("Class already exists");
  }
  const classLevel = await ClassLevel.findByIdAndUpdate(
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
    message: "Class fetched successfully",
    data: classLevel,
  });
});

//@desc delete class
//@route DELETE /api/v1/academic-years/:id
//@access private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Class deleted successfully",
  });
});
