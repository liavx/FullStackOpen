const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { validateUser } = require('../middleware/validateUser');

 
usersRouter.post('/', validateUser, async (request, response) => {
    const { username , password } = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      passwordHash,
    })
  
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  })

  usersRouter.get('/' , async (req,res) =>{
    const users = await User.find({}).populate('blogs', {title:1,author:1,likes:1})
    res.json(users)  
  })
  
  module.exports = usersRouter