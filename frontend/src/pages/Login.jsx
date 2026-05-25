import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import '../styles/Auth.css'

const Login = () => {
  const navigate = useNavigate()
  const { loginUser } = useAuth()
  const [phone, setPhone] = useState('+974')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = loginUser({ phone: phone.trim(), password })
    if (!result.success) {
      setError(result.message)
      return
    }
    navigate('/history')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Demo Login</h1>
        <p>Use a phone number starting with <strong>+974</strong> and your password.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Phone number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+97412345678"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </label>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-button">Login</button>
        </form>
        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register">Register now</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
