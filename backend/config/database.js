const mongoose = require('mongoose')
require("dotenv").config();

const dbConnect = () => {
	mongoose.connect(process.env.MONGODB_UR, {})
		.then(() => console.log("DB connected successfully"))
		.catch((err) => console.log(err, "Error connecting to MongoDB"))
}

module.exports = dbConnect;