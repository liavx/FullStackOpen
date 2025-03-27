const express = require('express')
const app = express()
const errorHandler = require('./middleware/error_handler')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require("./controllers/blogcontrollers");
const { mongoUrl } = require("./utils/config");



mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use("/api", blogRouter);
app.use(errorHandler)


module.exports=app;
