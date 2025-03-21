const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :data'));
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

morgan.token('data', function (req) {
    return req.body ? JSON.stringify(req.body) : ''
  })
let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons' , (req,res) =>{
    res.json(phonebook)
})

app.get('/api/info' , (req,res) =>{
    const info = `phonebook has info for ${phonebook.length} people`
    const date = new Date()
    res.send(info + `<br/>` + date)
})

app.get('/api/persons/:id' , (req,res) =>{
const singlePerson = phonebook.find(person => person.id === req.params.id)
if(singlePerson){
    res.json(singlePerson)
} else{
    res.statusMessage = "No valid ID";
    res.status(404).end("NO ID BEEN FOUND")
}

})

app.post('/api/persons' , (req,res) => {
    const body = req.body
    console.log(body)

    if(!body.name || !body.number) {
        return res.status(400).json({
            error:'content missing'
        })
    }

    if(phonebook.some(person => person.name ===body.name)){
        return res.status(400).json({error:'name already exists'})
    }

    const person = {
        name:body.name,
        number:body.number,
        id:Math.floor(Math.random() * 100000000000)
    }
    phonebook = phonebook.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req,res) =>{
    phonebook = phonebook.filter(person => person.id != req.params.id)
    res.status(204).end()
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})