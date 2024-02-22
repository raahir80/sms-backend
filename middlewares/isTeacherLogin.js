const Teacher = require("../model/Staff/Teacher");
const verifyToken = require("../utils/verifyToken");


const isTeacherLogin  = async (req,res,next) => {
    // get token from header

    const headerObj = req.headers;
    //const token = headerObj.authorization.split(" ")[1];
    const token = headerObj && headerObj.authorization && headerObj.authorization.split(" ")[1];
        
    // verify token 
    const verifiedToken = verifyToken(token)
    if(verifiedToken){
        //find the admin
        const user = await Teacher.findById(verifiedToken.id)

        //save the user into req.obj
        req.userAuth = user;
        next(); 
    }else{
        const err = new Error("Token expired/Invalid");
        next(err);
    }
    // save the user into req.obj

};   

module.exports = isTeacherLogin;
