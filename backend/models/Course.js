const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Section"
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "RatingAndReview"
        }
    ],
    price: {
        type: String,
        required:true,

    },
    thumbnail: {
        type: String,
        required:true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    studentsEnrolled: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})


module.exports = mongoose.model('Course', courseSchema)