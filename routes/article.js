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
    
    articleRouter.use("/article/:id", (req,res,next) => {
      articleModel.findById(req.params.id, (err, article) => {
        if (err) {
          res.status(500).send(err);
        } else if(article){
          req.article = article;
          next();
        } else {
          res.status(404).send('article not found');
        }
      });
    });

    articleRouter.route("/article/:id")
    .get((req, res) => {
      res.json(req.article);
    })
    .put( (req, res) => {
      req.article.title = req.body.title;
      req.article.author = req.body.author;
      req.article.email = req.body.email;
      req.article.viewCount = req.body.viewCount;
      req.article.content = req.body.content;
      req.article.save();
      res.json(req.article);
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