const blogRouter = require('express').Router()
const Blog = require("../models/blog.js");


  blogRouter.get('/blogs' , async (req , res) => {
    const blogs = await Blog.find({})
    return res.json(blogs)
    
  })
  
  blogRouter.post('/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
  module.exports = blogRouter;