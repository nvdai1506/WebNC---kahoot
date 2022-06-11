import express from 'express';

import questionModel from '../models/question.model.js';
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

router.post('/', async function (req, res) {
  let question = req.body;
  const ret = await questionModel.add(question);

  question = {
    question_id: ret[0],
    ...question
  }
  res.status(201).json(question);
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