const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const app = express()
const Person = require('./models/person.js')
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :data'));
app.use(express.static('dist'))

morgan.token('data', function (req) {
    return req.body ? JSON.stringify(req.body) : ''
  })

app.get('/api/persons' , (req,res) =>{
       Person.find({}).then(persons => {
        if(persons.length > 0){
        res.json(persons)
    }else{
        console.log("database is empty")
    }
      })
})

app.get('/api/info' , (req,res) =>{
    Person.countDocuments({}).then(count =>{
    const info = `phonebook has info for ${count} people`
    const date = new Date()
    res.send(info + `<br/>` + date)
    }).catch(error => res.status(500).json({error:'Error retrieving data'}))
})

app.get('/api/persons/:id' , (req,res,next) =>{
    Person.findById(req.params.id).then(person =>{
        if(person){
            res.json(person)
        }
        else{
            res.statusMessage = "No valid ID";
            res.status(404).end("NO ID BEEN FOUND")
        
        }
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(newPerson => res.json(newPerson))
        .catch(error => {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map(err => err.message)
                return res.status(400).json({ error: messages.join(', ') })
            }
            next(error)
        })
})

app.delete('/api/persons/:id', (req,res,next) =>{
    Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.put(`/api/persons/:id`, (req,res,next) => {
    const {name , number} = req.body
    Person.findById(req.params.id)
    .then(person => {
        if (!person){
            return res.status(404).end("Person does not exist");
        }
        person.name = name;
        person.number = number;
        
        return person.save()
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))
    })
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})