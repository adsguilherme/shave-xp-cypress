const bcrypt = require('bcrypt')
const express = require('express') // importa a biblioteca
const Joi = require('joi')
const app = express() // cria a constante app que vai ser igual a instância da biblioteca

const validator = require('express-joi-validation').createValidator({
  passError: true
})

app.use(express.json()) // código para utilizar a representação json

const { deleteUser, insertUser, findToken } = require('./db')

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  is_shaver: Joi.boolean().required()
})

app.get('/welcome', function (req, res) {
  res.json({message: 'Hello QAx'})
})

app.get('/token/:email', async function (req, res) {
  const {email} = req.params
  const token = await findToken(email)

  if (!token) {
    return res.status(404).end()
  }

  res.status(200).json(token)
})

app.delete('/user/:email', async function(req, res){
  console.log(req.params)
  const { email } = req.params
  await deleteUser(email)
  res.status(204).end()
})

app.post('/user', validator.body(userSchema), async function(req, res){
  console.log(req.body)

  const {name, email, password, is_shaver} = req.body
  const hashPass = await bcrypt.hash(password, 8) // O 8 é referente ao modelo de criptografia

  const user = {
    name: name,
    email: email,
    password: hashPass,
    is_shaver: is_shaver
  }

  // if (!user.name || !user.email || !user.password) {
  //   return res.status(400).json({ message: 'Every field is mandatory.' })
  // }

  // if (!user.name ) {
  //   return res.status(400).json({ message: 'Name is required' })
  // }

  // if (!user.email ) {
  //   return res.status(400).json({ message: 'Email is required' })
  // }

  // if (!user.password ) {
  //   return res.status(400).json({ message: 'Password is required' })
  // }

  // if (!user.is_shaver ) {
  //   return res.status(400).json({ message: 'Shaver is required' })
  // }

  console.log(user)

  /*
  const id = await insertUser(user)

  console.log(hashPass)

  res.status(201).json({ user_id: id })
  */

  try {

    await deleteUser(user.email) // Está sendo executado o método de delete aqui

    const id = await insertUser(user)

    res.status(201).json({ user_id: id })

  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro.', stack: error })
  }
})

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString()
    });
  } else {
    // pass on to another error handler
    next(err);
  }
})

app.listen(5000) // A aplicação está ativa na porta 5000

