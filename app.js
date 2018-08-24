const express = require("express");
const mongoose = require("mongoose");
const articleModel = require("./models/article");
const bodyParser = require("body-parser");

const db = mongoose.connect("mongodb://0.0.0.0:27017/bbs-api");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bbsRouter = express.Router();

bbsRouter.route("/articles").get((req, res) => {
  articleModel.find((err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.json(articles);
    }
  });
});

bbsRouter.route("/article/:id").get((req, res) => {
  articleModel.findById(req.params.id, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.json(articles);
    }
  });
});

bbsRouter.route("/article").post((req, res) => {
  try {
    req.body = JSON.parse(Object.keys(req.body)[0]);
  } catch (err) {
    req.body = req.body;
  }
  
  const newArticle = new articleModel(req.body);
  newArticle.save();
  res.status(201).send(newArticle);
});

app.use("/api", bbsRouter);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log("Example app listening on port 8000!"));
