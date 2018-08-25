const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleModel =  new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    email: {
        type: String
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    viewCount: {
        type: Number,
        default: 0
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model('articleModel', articleModel);