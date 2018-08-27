const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const articleModel = require("./models/article");
const articleRoute = require("./routes/article")(articleModel);

let db;

if(process.env.ENV == 'Test'){
    db = mongoose.connect("mongodb://0.0.0.0:27017/bbs-api-test");
} else {
    db = mongoose.connect("mongodb://0.0.0.0:27017/bbs-api");
}
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use("/api", articleRoute);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log("Example app listening on port 8000!"));


module.exports = app;