const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const generatePassword = require('./public/javascripts/generate_password.js')

const expressHandlebars = require('express-handlebars')
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/generate', (req, res) => {
  const options = req.body
  const password = generatePassword(req.body)
  res.render('index', { options, password })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
