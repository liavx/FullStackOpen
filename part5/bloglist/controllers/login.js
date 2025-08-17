const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/' , async (req , res) =>{
    const {username,password} = req.body
    const user = await User.findOne({username})

      const errors = {
        username: 'invalid username',
        password: 'invalid password'
      }
      
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({
          error: !user ? errors.username : errors.password
        });
      
    }
    const userForToken = {
        username: user.username,
        id: user.id,
      }
    
      const token = jwt.sign(userForToken, process.env.SECRET,{ expiresIn: 60*60 })
    
      res
        .status(200)
        .send({ token, username: user.username, name: user.name })
    })
    
    module.exports = loginRouter
