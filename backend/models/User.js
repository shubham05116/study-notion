const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName:
    {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,

    },
     contactNumber: {
        type: String,
        trim: true,
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Instructor"]
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"

    },
    token: {
        type: Sting,
    },
    resetPasswordExpires: {
        type: Date,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    }],
    image: {
        type: String,
        required: true,
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CourseProgress"
    }]
})


module.exports = mongoose.model('User', userSchema)