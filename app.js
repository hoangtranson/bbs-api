const express = require('express');
const mongoose = require('mongoose');
const articleModel = require('./models/article');

const db = mongoose.connect('mongodb://localhost:27017/bbs-api');
const app = express();

const port = process.env.PORT || 3000;

const bbsRouter = express.Router();

bbsRouter.route('/articles').get( (req, res) => {
    articleModel.find( (err, articles) => {
        if(err){
            console.log(err);
        } else {
            res.json(articles);
        }
    });
});

app.use('/api', bbsRouter);
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening on port 8000!'))