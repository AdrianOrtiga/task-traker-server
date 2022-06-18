const express = require('express');
const tasks = require('../model/task');
const router = express.Router();
const Task = require('../model/task')

/* GET tasks listing. */
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add
router.post('/', async (req, res) => {
  const date = req.body.date ? req.body.date : Date.now()

  console.log(date)

  const task = new Task({
    text: req.body.text,
    date: date,
    reminder: req.body.reminder,
    user: req.body.user,
  })

  try {
    const newTask = await task.save()
    res.status(201).json({ newTask })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// update
router.patch('/:id', getTask, async (req, res) => {
  res.task.reminder = !res.task.reminder

  try {
    const updateTask = await res.task.save()
    res.json({ delSucced: 'The task was deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// delete
router.delete('/:id', getTask, async (req, res) => {
  try {
    console.log(res.task)
    await res.task.remove()
    res.json({})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

async function getTask (req, res, next) {
  let task
  console.log(req.params)
  try {
    task = await Task.findById(req.params.id)
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task', req: req.params })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.task = task
  next()
}

module.exports = router;