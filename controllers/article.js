const articleController = articleModel => {
    const get = (req, res) => {
        articleModel.find((err, articles) => {
            if (err) {
                console.log(err);
            } else {
                const articleList = [];
                articles.forEach(element => {
                    const item = element.toJSON();
                    item.links = {};
                    item.links.self = `http://${req.headers.host}/api/article/${element._id}`;
                    articleList.push(item);
                });
                res.json(articleList);
            }
        });
    }

    const getOne = (req, res) => {
        res.json(req.article);
    }

    const post = (req, res) => {
        const newArticle = new articleModel(req.body);
        
        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        } else {
            newArticle.save();
            res.status(201);
            res.send(newArticle);
        }
    }

    const put = (req, res) => {
        req.article.title = req.body.title;
        req.article.author = req.body.author;
        req.article.email = req.body.email;
        req.article.viewCount = req.body.viewCount;
        req.article.content = req.body.content;
        req.article.save();
        res.json(req.article);
    }

    const patch = (req, res) => {
        if (req.body._id) {
            delete req.body._id;
        }

        for (let p in req.body) {
            req.article[p] = req.body[p];
        }

        req.article.save(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.article);
            }
        });
    }

    const remove = (req, res) => {
        req.article.deleteOne(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed!!!!');
            }
        });
    }

    return {
        get,
        getOne,
        post,
        put,
        patch,
        remove
    }
}

module.exports = articleController;