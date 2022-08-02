import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = (props) => {
  const [fields, setFields] = useState({ username: '', password: '' })

  const handleChange = (event) => { 
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(fields)
    })
    const data = await res.json()
    console.log(data)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={fields.username}
          onChange={handleChange}
          name="username"
          type="text"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={fields.password}
          onChange={handleChange}
          name="password"
          type="password"
          id="password"
        />
      </div>
      <input type="submit" value="Register" />
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
  )
}

export default Register
