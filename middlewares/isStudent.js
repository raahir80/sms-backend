const Student = require("../model/Academic/Student");
const verifyToken = require("../utils/verifyToken");

const isStudent  = async (req,res,next) => {
    // find the user
    const userId = req?.userAuth?._id
    const studentFound = await Student.findById(userId);

    // check if admin
    if(studentFound?.role === "student"){
        next();
    }else{
        next (new Error('Access Denied, student only'));
    }
};

module.exports = isStudent;
