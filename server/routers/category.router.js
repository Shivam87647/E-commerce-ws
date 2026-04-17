const categoryRouter = require("express").Router();
const { create, read, getById, statusUpdate, deleteById, readById , update } = require("../controllers/category.controller");
const fileUploader = require("express-fileupload")
categoryRouter.post("/create", fileUploader({ createParentPath: true }), create);
categoryRouter.get("/", read);
categoryRouter.get("/:id", readById);
categoryRouter.get("/:id", getById);
categoryRouter.patch("/status-update/:id", statusUpdate)
categoryRouter.delete("/delete/:id", deleteById)
categoryRouter.put("/update/:id", fileUploader({ createParentPath: true }), update)

module.exports = categoryRouter;