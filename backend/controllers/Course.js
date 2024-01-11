const Course = require("../models/Course")
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require('../utils/imageUploader')
require("dotenv").config();
//createCourse Handler function

exports.createCourse = async (req, res) => {
    try {
        //get all data:
        const { courseName, courseDescription, price, whatYouWillLearn, category } = req.body;

        //get thumbnail:
        const thumbnail = req.files.thumbnailImage;

        //validation:
        if (!courseName || !courseDescription || !price || !whatYouWillLearn || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //check for instructor:
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details", Details);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "No instructor"
            })
        }

        //check given Category is valid or not:
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found"
            })
        }
        //upload image to cloudinary :
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        //entry for new course in DB:

        const newCourse = await Course.create({
            courseName,
            courseDescription, instructor: instructorDetails._id, whatYouWillLearn, price, category: categoryDetails._id, thumbnail: thumbnailImage.secure_url
        })
        console.log(newCourse);

        //add the new course to the user schema of instructor:
        await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id
            },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            message: "Course Created successfully",
            data: newCourse
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "failed to create course",
        })
    }
}
//get all courses handler:
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }).populate("instructor").exec()

        return res.json({
            success: true,
            message: "data for all courses fetched successfully",
            data: allCourses
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "cannot fetch data for all courses",
        })
    }
}