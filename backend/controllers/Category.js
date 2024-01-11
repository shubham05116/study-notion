const Category = require("../models/Category");

//create category handler function:
exports.createCategory = async (req, res) => {
    try {
        //get data :
        const { name, description } = req.body;

        //validation:
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //create entry in DB:
        const categoryDetails = await Category.create({
            name: name,
            description: description
        })
        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: "error occurred while creating Category"
        })
    }
}


//get all Category handlers:
exports.showAllCategory = async (req, res) => {
    try {

        const allCategory = await Category.find({}, { name: true, description: true })

        res.status(200).json({
            success: true,
            message: "all Category returned successfully",
            allCategory
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "error occurred while getting all Category"
        })

    }
}