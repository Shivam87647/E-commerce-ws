const { sendCreated, sendBadRequest, sendNotFound, sendServerError, sendConflict, sendSuccess } = require("../utils/response");
const CategoryModel = require("../models/category.model");
const { createUniqueName } = require("../utils/helper");

const create = async (req, res) => {
    try {
        const { name, slug } = req.body;

        const image = req.files.image;
        if (!name || !slug || !image) return sendBadRequest(res);

        const category = await CategoryModel.findOne({ slug });
        if (category) return sendConflict(res);
        const img_name = createUniqueName(image.name)
        const destination = `./public/category/${img_name}`
        image.mv(destination, async (err) => {
            if (err) return sendServerError(res, "Unable to upload file")
            await CategoryModel.create({ name, slug, image: img_name });
            return sendCreated(res);
        })
    } catch (error) {
        const message = error?.message || "Internal server error";
        sendServerError(res, message)
    }
}

const read = async (req, res) => {
    try {
        const category = await CategoryModel.find();
        const total = await CategoryModel.find().countDocuments();
        return sendSuccess(res, "category found", category, {
            total,
            imageBaseUrl: "http://localhost:5000/category/"
        })

    } catch (error) {
        return sendServerError(res);
    }
};

const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
        return sendSuccess(res, "category found", category, {
            imageBaseUrl: "http://localhost:5000/category/"
        })

    } catch (error) {
        return sendServerError(res);
    }
};

const statusUpdate = async (req, res) => {
    try {
        const { field } = req.body;
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
        if (!category) return sendNotFound(res);
        const msg = `${field} Updated successfully`

        await CategoryModel.findByIdAndUpdate(id, {
            $set: {
                [field]: !category[field]

            }
        });
        return sendSuccess(res, msg);
    } catch (error) {
        console.error(error);
        return sendServerError(res);
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
            return sendSuccess(res, "category found", category, {
                imageBaseUrl : "http://localhost:5000/category/"
            });

    } catch (error) {
        sendServerError(res);
        console.error(error);
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
        if (!category) return notFound_Response(res);
        await CategoryModel.findOneAndDelete({ _id: id });
        return sendSuccess(res, "Delete successfully")

    } catch (error) {
        console.log(TypeError);
        return sendServerError(res);
    }
}

const update = async (req, res) => {
    try {
        const image = req.files?.image || null;
        const id = req.params.id;

        const category = await CategoryModel.findById(id);
        if (!category) return sendNotFound(res);

        const object = {};

        //name & slug update
        if (req.body.name) {
            object.name = req.body.name;
            object.slug = req.body.slug;
        }

        //image update

        if (image) {
            const img = createUniqueName(image.name);
            const destination = "./public/category/" + img;

            await image.mv(destination);
            object.image = img;
        }

        await CategoryModel.updateOne(
            { _id: id },
            { $set: object }
        );
        return sendSuccess(res, "Category updated successfully ");

    } catch (error) {
        console.log(error);
        return sendServerError(res);
    }
};


module.exports = {
    create,
    read,
    getById,
    statusUpdate,
    deleteById,
    readById,
    update
};