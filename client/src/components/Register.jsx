import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



const Register = (props) => {
  const navigate = useNavigate()

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
    navigate("/login")
    console.log(data)
  }
  
  return (
    <div className="container register">
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        <Button type="submit" variant="light">Register</Button>
        <p>Already have an account? <Link to="/login" className="link-text">Login here</Link></p>
      </Form>
    </div>
  )
}

export default Register
