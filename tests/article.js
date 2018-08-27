const should = require('should');
const sinon = require('sinon');

describe('Article controller test', () => {
    describe('post new article', () => {
        it('should not alow an empty title on post', () => {
            const req = {
                body: {
                    author: 'hoang'
                }
            }

            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            const articleModel = require("../models/article");
            const articleController = require('../controllers/article')(articleModel);
            articleController.post(req, res);
            res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})