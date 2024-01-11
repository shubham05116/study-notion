const User = require('../models/User')
const OTP = require('../models/OTP')
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile")
const jwt = require('jsonwebtoken');
require("dotenv").config();


//sendOTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch the data 
        const { email } = req.body;

        //check if user already exits or not :
        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //generate OTP:
        var otp = otpGenerator.generate(6);
        console.log("otp generated", otp)

        let result = await OTP.findOne({ otp: otp })

        while (result) {
            otp = otpGenerator.generate(6)
            result = await OTP.findOne({ otp: otp })

        }
        const otpPayload = { email, otp };

        //create entry in db for otp:
        const otpBody = await OTP.create({ otpPayload })
        console.log(otpBody)

       return res.status(200).json({
            success: true,
            message: "otp sent successfully"
        })


    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Can't send OTP"
        })
    }
}


//signUp
exports.signUp = async (req, res) => {
    try {
        //fetch data from req body :
        const {
            email,
            firstName,
            lastName,
            password,
            confirmPassword,
            contactNumber,
            otp,
            accountType
        } = req.body;

        //check validation:
        if (!lastName || !email || !firstName || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        //check if email already exists:
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email Already exists"
            })
        }
        //passwords comparison:
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password mismatch"
            })
        }

        //find most recent otp stored for user:
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);

        //validate OTP:
        if (recentOtp.length == 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "OTP not found"
                })
        } else if (recentOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid otp"
            })
        }

        //hash password:
        const hashedPassword = await bcrypt.hash(password, 10);

        //entry in db:
        const profileDetails = await Profile.create(
            {
                gender: null,
                dateOfBirth: null,
                about: null,
                contactNumber: null
            }
        )

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })
        console.log(user)
       return res.status(200).json({
            success: true,
            message: "user is registered successfully"
        })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: "user is can't be registered"
        })
    }

}

//Login
exports.login = async (req, res) => {
    try {
        //fetch data from req body:
        const { email, password } = req.body

        //validate email and password
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        //check if user is already exits or not:
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "not a registered user"
            })
        }

        //generate jwt , by password matching :
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            })
        }
        else {
            return res.json({
                success: false,
                message: "Password is incorrect"
            })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: "error occurred during login"
        })

    }
}

//changePassword

exports.changePassword = async(req , res)=>{
    //get oldPassword , newPassword
   
}
