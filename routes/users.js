const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')

/* GET users listing. */
router.post('/login', async (req, res) => {
  const { body } = req
  const { username, password } = body

  try {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!passwordCorrect) {
      return res.status(401).json({
        error: 'invalid user or password'
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    )

    return res.send({ token })
  } catch (error) {
    return res.status(400).json(error)
  }
})

router.post('/register', async (req, res) => {
  const { body } = req
  const { username, email, password } = body

  try {
    const saltHash = 10
    const passwordHash = await bcrypt.hash(password, saltHash)

    const newUser = new User({
      username,
      email,
      password: passwordHash
    })

    const savedUser = await newUser.save()
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    )

    return res.send({ token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/logout', (req, res) => {
  return res.send({ token: '' })
})

module.exports = router;
