function errorHandler(err, req, res, next) {
   console.error(err)
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: err.message || 'Invalid data provided'
      })
    }
  
    if (err.message.includes('required')) {
      return res.status(400).json({
        error: 'Missing required fields'
      })
    }
  
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({
        error: 'Invalid ObjectId format'
      })
    }
  
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate entry, conflict with existing data'
      })
    }

     if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
      return res.status(400).json({ error: 'expected `username` to be unique' })
    }
   if  (err.name ===  'JsonWebTokenError') {
      return res.status(401).json({ error: 'token invalid' })
   }
   if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }
    return res.status(500).json({
      error: 'Internal Server Error'
    })
    
  }
  
  module.exports = errorHandler