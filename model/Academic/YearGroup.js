const mongoose = require("mongoose");

const yearGroupSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"Admin",
            required:true
        },
        academicYear:{
            type:Schema.Types.ObjectId,
            ref:"AcademicYear",
            required:true
        }

    },
    {
        timestamps:true
    }
);

const YearGroup = mongoose.model("YearGroup",yearGroupSchema);

module.exports = YearGroup;

