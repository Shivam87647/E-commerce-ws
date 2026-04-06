const categoryModel = require("../models/categoryModel");

const create = async (req, res) => {
    try {
        const { name, slug } = req.body
        if (!name || !slug) {
            return res.status(200).json({
                msg: "All field is required ",
                success: false
            })
        }
        const category = await categoryModel.findOne({ name });
        if (category) {
            return res.status(200).json(
                {
                    msg: "Category already existed",
                    success: false
                }
            )
        }

        await categoryModel.create({ name, slug });
        return res.status(201).json(
            {
                msg: "Category created succesfully",
                success: true
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                msg: "Internal Server Error",
                success: false
            }
        )
    }
}
const read = async (req, res) => {
    try {
        const category = await categoryModel.find();
        if (category) {
            return res.status(200).json({
                msg: "category find",
                success: true,
                categories: category
            })
        }

    } catch (error) {
        res.status(500).json(
            {
                msg: "Internal Server Error",
                success: false
            }
        )
    }
}

module.exports = {
    create, read
}