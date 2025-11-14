function validateUser(req, res, next) {
  const { username, password } = req.body
  
  if (!username || username.length < 3) {
    return res.status(400).json({
      error: 'Username must be at least 3 characters long',
    })
  }
  
  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'Password must be at least 3 characters long',
    })
  }
  
  next() 
}
  
module.exports = { validateUser }