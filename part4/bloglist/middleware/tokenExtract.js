const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.slice(7)
    }
    return null
  }

  const token = getTokenFrom(request)

  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('Decoded Token:', decodedToken)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

    
  request.user = decodedToken
  next()
}

module.exports = tokenExtractor