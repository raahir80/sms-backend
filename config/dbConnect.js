const mongoose = require("mongoose");
const dbConnect = async() =>{
    try{
        await mongoose.connect("mongodb+srv://raahir80:raahir80@cluster0.37lzqjp.mongodb.net/sms?retryWrites=true&w=majority")
        //await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected Successfully");
    }catch(error){
        console.log("DB connection failed",error.message);
    }
};

module.exports =dbConnect;