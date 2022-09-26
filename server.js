// DEPENDENCIES

// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create app object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middleware
const cors = require("cors");
const morgan = require("morgan");

// DATABASE CONNECTION
// establish connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// connection events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

// MODELS
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
});

const Cheese = mongoose.model("Cheese", CheeseSchema);

// MIDDLEWARE
app.use(cors());
app.use(morgan());
app.use(express.json());

// ROUTES
// test route
app.get("/", (req, res) => {
    res.send("hello big cheese")
});

// CHEESE INDEX ROUTE
app.get("/cheese", async (req, res) => {
    try {
        // send all cheese
        res.json(await Cheese.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// CHEESE CREATE ROUTE
app.post("/cheese", async (req, res) => {
    try {
        // send all cheese
        res.json(await Cheese.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// CHEESE DELETE ROUTE
app.delete("/cheese/:id", async (req, res) => {
    try {
        // send all cheese
        res.json(await Cheese.findByIdAndRemove(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// CHEESE UPDATE ROUTE
app.put("/cheese/:id", async (req, res) => {
    try {
        // send all cheese
        res.json(
            await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// LISTENER
app.listen(process.env.PORT || 4000, function () {
    console.log(`Express is listening on port ${PORT}`)
});