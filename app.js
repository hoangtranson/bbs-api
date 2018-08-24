const express = require('express')
const app = express();

const port = process.env.PORT || 3000;

const bbsRouter = express.Router();

bbsRouter.route('/articles').get( (req, res) => {
    const responseJson = { hello: 'hello the world'};
    res.json(responseJson);
});

app.use('/api', bbsRouter);
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening on port 8000!'))