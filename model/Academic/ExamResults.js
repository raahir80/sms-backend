const mongoose = require("mongoose");

const examResultSchema = new mongoose.Schema(
    {
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student",
            required:true
        },
        exam:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Exam",
            required:true
        },
        grade:{
            type:Number,
            required:true
        },
        score:{
            type:Number,
            required:true
        },
        passMark:{
            type:Number,
            required:true,
            default:50
        },
        // failed, passed
        status:{
            type:String,
            required:true,
            default:"Fail",
            enum:["Fail","Pass"]
        },
        remarks:{
            type:String,
            required:true,
            enum:["Excellent","Good","Poor"],
            default:"Poor"
        },
        // position:{
        //     type:Number,
        //     required:true
        // },
        subject:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subject"
        },
        classLevel:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"ClassLevel"        },
        academicTerm:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"AcademicTerm",
            required:true
        },
        academicYear:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"AcademicYear",
            required:true
        },
        isPublished:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
);

const ExamResult = mongoose.model("ExamResult",examResultSchema);

module.exports=ExamResult;