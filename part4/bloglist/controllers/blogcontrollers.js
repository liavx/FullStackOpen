const blogRouter = require('express').Router()
const Blog = require("../models/blog.js");
require('express-async-errors')
const User = require('../models/user') 



  blogRouter.get('/blogs' , async (req , res) => {
    const blogs = await Blog.find({}).populate('user',{username:1})
    return res.json(blogs)
    
  })
  
  blogRouter.post('/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    const user = await User.findById(request.body.userId)
    blog.user = user.id

    if(!blog.likes){
      blog.likes = 0;
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()  
    response.status(201).json(savedBlog)
  })

  blogRouter.delete('/blogs/:id', async (req,res) =>{
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
  })

  blogRouter.put('/blogs/:id' , async (req , res) =>{
    const {likes} = req.body
    blogToUpdate = await Blog.findById(req.params.id)
    if(!blogToUpdate){
      return res.status(404).end()
    }
    blogToUpdate.likes = likes
    updatedBlog = await blogToUpdate.save()
    res.json(updatedBlog)
  })
    
  module.exports = blogRouter;