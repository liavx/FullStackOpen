const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { response } = require('../app')

loginRouter.post('/' , async (req , res) =>{
    const {username,pass} = req.body
    const user = await User.findOne({username})

      const errors = {
        username: 'invalid username',
        password: 'invalid password'
      }
      
      if (!user || !(await bcrypt.compare(pass, user.passwordHash))) {
        return response.status(401).json({
          error: !user ? errors.username : errors.password
        });
      
    }
    const userForToken = {
        username: user.username,
        id: user.id,
      }
    
      const token = jwt.sign(userForToken, process.env.SECRET)
    
      response
        .status(200)
        .send({ token, username: user.username, name: user.name })
    })
    
    module.exports = loginRouter
