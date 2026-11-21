import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"


const Register = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
    
  async function handleSubmit(e) {
    e.preventDefault()
     const response = await axios.post("http://localhost:3000/api/auth/register", {
      username,
       email,
       password
     },{withCredentials: true})
     console.log(response.data)

  }

  return (
   <>
   <main>
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input onInput={(e)=>{setusername(e.target.value)}}
         type="text"
          name='username' 
          placeholder='Enter Username' />
        <input onInput={(e)=>{setemail(e.target.value)}}
        type="email"
         name='email' 
         placeholder='Enter Email' />
        <input onInput={(e)=>{setpassword(e.target.value)}} 
        type="password"
         name='password'
          placeholder='Enter Password' />
        <button type='submit'>Register</button>
      </form>
      <p>Already have an account? <Link className='toggleauthform' to="/login">Login</Link></p>
    </div>
   </main>
   </>
  )
}

export default Register
