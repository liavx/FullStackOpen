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
        mongoose.connection.close()
      })
})

app.get('/api/info' , (req,res) =>{
    Person.countDocuments({}).then(count =>{
    const info = `phonebook has info for ${count} people`
    const date = new Date()
    res.send(info + `<br/>` + date)
    }).catch(error => res.status(500).json({error:'Error retrieving data'}))
})

app.get('/api/persons/:id' , (req,res) =>{
    Person.findById(req.params.id).then(person =>{
        if(person){
            res.json(person)
        }
        else{
            res.statusMessage = "No valid ID";
            res.status(404).end("NO ID BEEN FOUND")
        
        }
    })
})

app.post('/api/persons' , (req,res) => {
    const body = req.body
    if(!body.name || !body.number) {
        return res.status(400).json({
            error:'content missing'
        })
    }

    const person = new Person ({
        name:body.name,
        number:body.number,
    })

    person.save().then(newNote => res.json(newNote))
})

app.delete('/api/persons/:id', (req,res) =>{
    phonebook = phonebook.filter(person => person.id != req.params.id)
    res.status(204).end()
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})