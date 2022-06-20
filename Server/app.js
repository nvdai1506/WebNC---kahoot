import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import quizRouter from './routes/quiz.route.js';
import questionRouter from './routes/question.route.js';
import userRouter from './routes/users.route.js';
import authRouter from './routes/auth.route.js';

import auth from './middlewares/auth.mdw.js';

// import socketServer from './ws.js'
import io from './wsio.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
// app.use(cors({
//   origin: 'ws://localhost:3001',
//   methods: 'GET,PATCH,POST,DELETE'
// }));

app.get('/', function (req, res) {
    res.json({
      msg: 'hello from expressjs'
    });
});

app.use('/quiz',auth, quizRouter);
app.use('/question',auth, questionRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

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