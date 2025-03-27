const blogRouter = require('express').Router()
const Blog = require("../models/blog.js");
require('express-async-errors')



  blogRouter.get('/blogs' , async (req , res) => {
    const blogs = await Blog.find({})
    return res.json(blogs)
    
  })
  
  blogRouter.post('/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    if(!blog.likes){
      blog.likes = 0;
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })

  
  module.exports = blogRouter;