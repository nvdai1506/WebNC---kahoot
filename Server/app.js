import express from 'express';
import morgan from 'morgan';

import questionRouter from './routes/question.route.js';
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.json({
      msg: 'hello from expressjs'
    });
});

app.use('/question', questionRouter);

app.post('/', function (req, res) {
    res.status(201).json({
      msg: 'data created'
    });
});

app.get('/err', function (req, res) {
    throw new Error('Error!');
})
  
app.use(function (req, res) {
    res.status(404).json({
      error: 'Endpoint not found.'
    });
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({
      error: 'Something wrong!'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Sakila API is listening at http://localhost:${PORT}`);
});