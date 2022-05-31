require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
//app.use(morgan('tiny'))

const generateId = () => Math.floor(Math.random() * 100000)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!<h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  const outstring = `<p>Phonebook has info for ${persons.length} people<p><p>${date}<p>`
  response.send(outstring)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = Person.find({id: id}).then(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name){
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if(!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }

  // Person.find({name: body.name})
  // .then(result => {
  //   if(result){
  //     return response.status(400).json({
  //       error: 'name must be unique'
  //     })
  //   }
  // })

  const person = new Person({
    "id": generateId(),
    "name": body.name,
    "number": body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})