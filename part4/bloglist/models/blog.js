const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  url: { type: String, required: true },
  likes: { type: Number },
    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})
module.exports = mongoose.model('Blog',blogSchema)