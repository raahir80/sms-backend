const Admin = require("../model/Staff/Admin");
const verifyToken = require("../utils/verifyToken");

const isLogin  = async (req,res,next) => {
    // get token from header

    const headerObj = req.headers;
    //const token = headerObj.authorization.split(" ")[1];
    const token = headerObj && headerObj.authorization && headerObj.authorization.split(" ")[1];
        // verify token 

    const verifiedToken = verifyToken(token)
    if(verifiedToken){
        const user = await Admin.findById(verifiedToken.id)
        req.userAuth = user;
        next(); 
    }else{
        const err = new Error("Token expired/Invalid");
        next(err);
    }
    // save the user into req.obj

};

module.exports = isLogin;
