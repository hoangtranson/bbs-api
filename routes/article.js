const express = require("express");
const paginate = require('express-paginate');

const routes = function(articleModel){
    const articleRouter = express.Router();

    const articleController = require('../controllers/article')(articleModel);

    articleRouter.use("/articles", paginate.middleware(10, 50));
    articleRouter.route("/articles").get(articleController.get);

    articleRouter.route("/article").post(articleController.post);

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
    .get(articleController.getOne)
    .put(articleController.put)
    .patch(articleController.patch)
    .delete(articleController.remove);
    
    return articleRouter;
};

module.exports = routes;