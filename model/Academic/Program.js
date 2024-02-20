const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
    {
        name :{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:String,
            required:true,
            default:"4 Years"
        },
        //created automatically
        //CSFTY
        code:{
            type:String,
            default:function(){
                return(
                    this.name
                        .split(" ")
                        .map(name => name[0])
                        .join("")
                        .toUpperCase() +
                    Math.floor(10 + Math.random() * 90)+
                    Math.floor(10 + Math.random() * 90)
                );
                },
            },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Admin",
            required:true,
        },

        // we will push the teachers that are in charge of the program

        teachers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Teacher",
        },
    ],
        students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student",
            default:[]
        },
    ],
        subjects:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subject",
            default:[],
        },
    ],
    },
    {timestamps:true}
);

const Program = mongoose.model("Program",ProgramSchema);

module.exports=Program;
