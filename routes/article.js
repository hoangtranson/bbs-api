const express = require("express");

const routes = function(articleModel){
    const articleRouter = express.Router();

    articleRouter.route("/articles").get((req, res) => {
      articleModel.find((err, articles) => {
        if (err) {
          console.log(err);
        } else {
          res.json(articles);
        }
      });
    });
    
    articleRouter.route("/article/:id")
    .get((req, res) => {
      articleModel.findById(req.params.id, (err, articles) => {
        if (err) {
          console.log(err);
        } else {
          res.json(articles);
        }
      });
    })
    .put( (req, res) => {
      articleModel.findById(req.params.id, (err, article) => {
        if (err) {
          res.status(500).send(err);
        } else {
          article.title = req.body.title;
          article.author = req.body.author;
          article.email = req.body.email;
          article.viewCount = req.body.viewCount;
          article.content = req.body.content;
          article.save();
          res.json(article);
        }
      });
    });
    
    articleRouter.route("/article").post((req, res) => {
      try {
        req.body = JSON.parse(Object.keys(req.body)[0]);
      } catch (err) {
        req.body = req.body;
      }
    
      const newArticle = new articleModel(req.body);
      newArticle.save();
      res.status(201).send(newArticle);
    });

    return articleRouter;
};

module.exports = routes;