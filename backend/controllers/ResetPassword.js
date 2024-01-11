const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt= require("bcrypt")

exports.resetPasswordToken = async (req, res) => {
    try {
        //get the email address:
        const email = req.body.email;
        //check if email is valid:
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "Please registered yourself first"
            })
        }

        //generate token:
        const token = crypto.randomUUID();

        //update the token in DB
        const updateToken = await User.findOneAndUpdate({ email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        },
            { new: true }

        )
        //create url :
        const url = `https://localhost:3000/update-password/${token}`

        //send email containing the url :
        await mailSender(email, "Reset password link", url);

        // return response
        return res.status(200).json({
            success: true,
            message: "email sent successfully"
        })
    }
    catch (error) {
        return res.json({
            success: false,
            message: "An error occurred"
        })
    }
}


//Reset password:
exports.resetPassword = async (req, res) => {
    try {
        //get data :
        const { password, confirmPassword, token } = req.body;

        //validation:
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "password not match"
            })
        }

        //get useDetails from db using token:
        const userDetails = await User.findOne({ token: token });

        //if no entry found :
        if (!userDetails) {
            return res.json({
                success: false,
                message: "token is invalid"
            })
        }

        //token time check:
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "token is expired"
            })
        }

        //hash password:
        const hashedPwd = await bcrypt.hash(password, 10);

        //password update:
        await User.findOneAndUpdate({
            token: token,
        },
            { password: hashedPwd },
            { new: true }
        )

        return res.json({
            success: true,
            message: "pwd reset successfully"
        })

    }
    catch (error) {
        return res.json({
            success: false,
            message: "An error occurred"
        })
    }
}