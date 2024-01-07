const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    contactNumber: {
        type: String,
        trim: true,
    },
    dataOfBirth: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
    },
    about:{
        type:string
    }


})


module.exports = mongoose.model('Profile', profileSchema)