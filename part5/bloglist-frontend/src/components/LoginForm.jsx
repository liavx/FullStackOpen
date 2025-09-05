import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'

const LoginForm = ({ setUser , setMessage}) => {
  const [username,setUsername] = useState([])
  const [password,setPassword] = useState([])



  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username,password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setMessage(`Hey ${user.username} you have logged sucssesfully`)
      setUsername('')
      setPassword('')
    }catch(exception){
      setMessage('Wrong credentials')
    }
  }

  return(
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
            autoComplete="username"
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="password"
            autoComplete="current-password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

}


export default LoginForm