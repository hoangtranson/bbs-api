const articleController = articleModel => {
    const get = (req, res) => {
        articleModel.find((err, articles) => {
            if (err) {
                console.log(err);
            } else {
                res.json(articles);
            }
        });
    }

    const getOne = (req, res) => {
        res.json(req.article);
    }

    const post = (req, res) => {
        try {
            req.body = JSON.parse(Object.keys(req.body)[0]);
        } catch (err) {
            req.body = req.body;
        }

        const newArticle = new articleModel(req.body);
        newArticle.save();
        res.status(201).send(newArticle);
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
        req.article.remove(err => {
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