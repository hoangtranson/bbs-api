const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const articleModel = require("./models/article");
const articleRoute = require("./routes/article")(articleModel);

const db = mongoose.connect("mongodb://0.0.0.0:27017/bbs-api");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", articleRoute);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log("Example app listening on port 8000!"));
