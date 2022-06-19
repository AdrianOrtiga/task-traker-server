const express = require('express');
const tasks = require('../model/task');
const router = express.Router();
const Task = require('../model/task')
const auth = require('../middleware/auth')

/* GET tasks listing. */
router.get('/', auth, async (req, res) => {
  const userId = req.user.id
  try {
    const tasks = await Task.find({ userId })
    res.json(tasks)
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add
router.post('/', auth, async (req, res) => {
  const date = req.body.date ? req.body.date : Date.now()
  const userId = req.user.id

  const task = new Task({
    text: req.body.text,
    date: date,
    reminder: req.body.reminder,
    userId,
  })

  try {
    const newTask = await task.save()
    res.status(201).json({ newTask })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// update
router.patch('/:id', auth, getTask, async (req, res) => {
  res.task.reminder = !res.task.reminder

  try {
    const updateTask = await res.task.save()
    res.json({ messageOk: 'The task was updated', updateTask })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// delete
router.delete('/:id', auth, getTask, async (req, res) => {
  try {
    await res.task.remove()
    res.json({ messageOk: 'The task was deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

async function getTask (req, res, next) {
  let task
  const userId = req.user.id

  try {
    task = await Task.findById(req.params.id)
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task', req: req.params })
    }
    if (task.userId != userId) {
      return res.status(400).json({ message: 'Something wrong', req: req.params })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.task = task
  next()
}

module.exports = router;