const categoryModel = require("../models/categoryModel");
const { sendCreated, sendBadRequest, sendNotFound, sendServerError, sendConflict, sendSuccess, sendOk } = require("../utils/response")

const create = async (req, res) => {
    try {
        const { name, slug } = req.body
        if (!name || !slug) return sendBadRequest(res);

        const category = await categoryModel.findOne({ name });
        if (category) return sendConflict(res);

        await categoryModel.create({ name, slug });
        return sendCreated(res);
    } catch (error) {
        sendServerError(res);
    }
}
const read = async (req, res) => {
    try {
        const category = await categoryModel.find();
        const count = await categoryModel.countDocuments();
        if (category) {
            return sendSuccess(res, "category find", category, {
                total: count
            });
        }

    } catch (error) {
        sendServerError(res);
        console.error(error);
    }
}


const getById = async (req, res) => {
    try {
        const id = req.params.id
        const category = await categoryModel.findById(id);
        // const count = await categoryModel.countDocuments();
        if (category) {
            return sendSuccess(res, "category find", category);
        }

    } catch (error) {
        sendServerError(res);
        console.error(error);
    }
}

const status = async (req, res) => {
    try {
        const { field } = req.body;
        const id = req.params.id;
        const category = await categoryModel.findById(id);
        if (!category) return sendNotFound(res);
        const fields = ["is_home", "status" ,"is_top", "is_popular"];

        if (!fields.includes(field)) {
            return sendBadRequest(res)
        }

        await categoryModel.findByIdAndUpdate(
            id,
            {
                [field]: !category[field]
            }
        )
        return sendOk(res, "status update");

    } catch (error) {
        console.error(error);
        sendServerError(res);
    }
}

module.exports = {
    create,
    read,
    getById,
    status
};