const categoryRouter = require("express").Router();
const { create, read, getById, status } = require("../controllers/categoryController");

categoryRouter.post("/create", create);
categoryRouter.get("/", read);
categoryRouter.get("/:id", getById);
categoryRouter.patch("/status-update/:id", status)


module.exports = categoryRouter;