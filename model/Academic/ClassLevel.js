const mongoose = require("mongoose");


const classLevelSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,

        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin",
            required:true
        },
        students:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Student"
            }
         ],
         subjects:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Subject",
            },
         ],
         teachers:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Teacher"
            },
         ],
    },
    {
        timestamps:true
    }
);

const ClassLevel = mongoose.model("ClassLevel",classLevelSchema);

module.exports = ClassLevel;