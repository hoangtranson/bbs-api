const paginate = require('express-paginate');

const articleController = articleModel => {
    const get = async (req, res, next) => {
        try {
            const [results, itemCount] = await Promise.all([
                articleModel.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
                articleModel.count({})
            ]);

            const pageCount = Math.ceil(itemCount / req.query.limit);
            res.json({
                has_more: paginate.hasNextPages(req)(pageCount),
                pageCount,
                data: results
            });
            // if (req.accepts('json')) {
            //     // inspired by Stripe's API response for list objects
            //     res.json({
            //         object: 'list',
            //         has_more: paginate.hasNextPages(req)(pageCount),
            //         pageCount,
            //         data: results
            //     });
            // } else {
            //     res.render('articles', {
            //         articles: results,
            //         pageCount,
            //         itemCount,
            //         pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
            //     });
            // }

        } catch (e) {
            next(e);
        }
    }

    const getOne = (req, res) => {
        res.json(req.article);
    }

    const post = (req, res) => {
        const newArticle = new articleModel(req.body);

        if (!req.body.title) {
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