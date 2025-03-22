const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://liavlavi:${password}@phonebook.ya40x.mongodb.net/person?retryWrites=true&w=majority&appName=phonebook`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name:String,
  number:String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length == 3){
    Person.find({}).then(result => {
        if(result.length > 0){
        result.forEach(person => {
          console.log(person)
        })
    }else{
        console.log("database is empty")
    }
        mongoose.connection.close()
      })
} else if(process.argv.length == 5){
const person = new Person({
  name:process.argv[3],
  number:process.argv[4],
})

person.save().then(result => {
  console.log(`added ${result} to phonebook`)
  mongoose.connection.close()
})
} else {
    console.log("enter right arguments")
    process.exit(1);
}


