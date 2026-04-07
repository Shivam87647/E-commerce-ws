require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/category", require("./routers/categoryRouter"));


mongoose.connect(process.env.MONGODB_URL).then(
    () => {
        console.log("Database Connected");

        app.listen(
            process.env.PORT,
            () => {
                console.log("Server Started")
            }
        )
    }
).catch(
    (error) => {
        console.log("Database Not Connected")
    }
)