const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL
mongoose.connect(url)


  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name:{type:String,minLength:3},
  number:{type:String, minLength:10,
    validate:{
        validator:function(v) {
        return /^0\d{2,3}-\d{7}/.test(v) //for israeli phone number
        },
        message: props => `${props.value} is not a vaild number!`
    },
        required:[true,'User phone number required']
}
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
