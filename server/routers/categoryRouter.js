const categoryRouter = require("express").Router();
const { create, read } = require("../controllers/categoryController");

categoryRouter.post("/create", create);
categoryRouter.get("/", read);


module.exports = categoryRouter;