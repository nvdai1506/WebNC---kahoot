import express from 'express';
import jwt from 'jsonwebtoken';

import quizModel from '../models/quiz.model.js';
import questionModel from '../models/question.model.js';
const router = express.Router();

// get all quiz
router.get('/', async function (req, res) {
  const list = await quizModel.findAll();
  res.json(list);
})

// get quiz by id
router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const quiz = await quizModel.findById(id);
  if (quiz === null) {
    return res.status(204).end();
  }
  res.json(quiz);
})

// get quiz by user_id
router.get('/user/:user_id', async function (req, res) {
  const user_id = req.params.user_id || 0;
  const quizs = await quizModel.findAllQuizsByUserId(user_id);
  if (quizs === null) {
    return res.status(204).end();
  }
  res.json(quizs);
})

// add quiz
router.post('/', async function (req, res) {
  let quiz = req.body;
  // decode accesstoken to get user_id
  const accessToken = req.headers['x-access-token'];
  const decoded = jwt.verify(accessToken, 'SECRET_KEY');
  const user_id = decoded.userId;
  
  quiz.user_id = user_id;
  const ret = await quizModel.add(quiz);
  quiz = {
    quiz_id: ret[0],
    ...quiz
  }
  res.status(201).json(quiz);
})

// delete
router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const questionRows = await questionModel.findAllQuestionsByQuizId(id);
  let m = 0
  if(questionRows){
    // delete all questions with quiz_id before delete quiz
    for (let row of questionRows){
      m+=1;
      await questionModel.del(row.id);
    }
  }
  // console.log('m: ', m);
  const n = await quizModel.del(id);
  res.json({
    affected: n+m
  });
})

// update
router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const quiz = req.body;
  const n = await quizModel.patch(id, quiz);
  res.json({
    affected: n
  });
})

export default router;