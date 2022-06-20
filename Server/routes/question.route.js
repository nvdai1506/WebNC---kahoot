import express from 'express';


import questionModel from '../models/question.model.js';
import quizModel from '../models/quiz.model.js';
const router = express.Router();

router.get('/', async function (req, res) {
  const list = await questionModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const question = await questionModel.findById(id);
  if (question === null) {
    return res.status(204).end();
  }
  res.json(question);
})
router.get('/quiz/:quiz_id', async function (req, res) {
  const quiz_id = req.params.quiz_id || 0;
  const questions = await questionModel.findAllQuestionsByQuizId(quiz_id);
  if (questions === null) {
    return res.status(204).end();
  }
  res.json(questions);
})

router.post('/', async function (req, res) {
  // body: {id,quizid,question,ans1,ans2,ans3,ans4,correctans}
  let question = req.body;
  console.log(question.quiz_id);
  const quiz = await quizModel.findById(question.quiz_id);
  console.log(quiz);
  if(!quiz){
    res.status(400).json({
      mess: "Quiz not found!"
    });
  }else{
    const ret = await questionModel.add(question);
    question = {
      question_id: ret[0],
      ...question
    }
    res.status(201).json(question);
  }
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await questionModel.del(id);

  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const question = req.body;
  const n = await questionModel.patch(id, question);
  res.json({
    affected: n
  });
})

export default router;