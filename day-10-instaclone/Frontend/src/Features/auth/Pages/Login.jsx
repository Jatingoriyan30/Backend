import { Link } from "react-router-dom"
import "../style/form.scss"
import { useState } from "react"
import axios from "axios"

const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  async function handleLogin(e) {
    e.preventDefault()

    const response = await axios.post("http://localhost:3000/api/auth/login",{
      username,
      password
    },{withCredentials: true})
    console.log(response.data)
    
  }
  return (
    <>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleLogin} >
            <input onInput={(e)=>{setusername(e.target.value)}}
            type="text" 
            name='username' 
            placeholder='Enter Username' />
            <input onInput={(e)=>{setpassword(e.target.value)}}
            type="password" 
            name='password' 
            placeholder='Enter Password' />
            <button type='submit'>Login</button>
          </form>
          <p>Don't have an account? <Link className="toggleauthform" to="/register">Register</Link> </p>
        </div>
      </main>

    </>
  )
}

export default Login
