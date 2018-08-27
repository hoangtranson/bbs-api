const   should = require('should'),
        request = require('supertest'),
        app = require('../app'),
        mongoose = require('mongoose'),
        articleModel = mongoose.model('articleModel'),
        agent = request.agent(app);

describe(' Article CRUD test', () => {
    it('Should allow an article to be posted and return a read and _id', (done) => {
        const articlePost = {
            "author": "test 1",
            "email": "test1@yopmail",
            "content": "test 1",
            "title": "test 1"
        }

        agent.post('/api/article')
        .send(articlePost)
        .expect(200)
        .end( (err,res) => {
            res.body.should.have.property('_id');
            done();
        })
    });

    afterEach( done => {
        articleModel.deleteOne().exec();
        done();
    })
})

