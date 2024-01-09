const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");
//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token :
        const token = req.cookies.token || req.header("Authorization").replace("Bearer", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token is missing"
            })
        }

        //verify the token:
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            res.json({
                success: false,
                message: "token is invalid"
            })

        }
        next();

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error Occurred during auth route "
        })    }
}


//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students"
            })

        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error Occurred during student route "
        })    }
}

//isInstructor:
exports.isInstructor= async(req , res , next)=>{
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor"
            })

        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error Occurred during instructor route "
        })
    }
}




//isAdmin