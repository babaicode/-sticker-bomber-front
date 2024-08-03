import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Auth.css'
import { login } from '../services/authService'
import axios from 'axios'

const Login: React.FC = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = await login(email, password)
      setMessage(`Login successful`)
      if (data.token) {
        localStorage.setItem('authToken', data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `Error: ${error.response?.data.message || 'An error occurred'}`
        )
      } else {
        setMessage('An unexpected error occurred')
      }
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/">Do you need to register?</Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login
