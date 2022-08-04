import { useState } from 'react'
import { Link } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = (props) => {
  const [fields, setFields] = useState({ username: '', password: '' })

  const handleChange = (event) => { 
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(fields)
    })
    const data = await res.json()
    console.log(data.msg)
    props.handleLogin(data.authorised)
  }

  return (
    <div className="container register">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            value={fields.username}
            onChange={handleChange}
            name="username"
            type="text"
            id="username"
            className="form-text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            value={fields.password}
            onChange={handleChange}
            name="password"
            type="password"
            id="password"
            className="form-text"
          />
        </Form.Group><br/>
      <Button type="submit" value="Login" variant="light"/>
      <p>No account yet? <Link to="/register" className="link-text">Register here</Link></p>
    </Form>
    </div>
  )
}

export default Login
