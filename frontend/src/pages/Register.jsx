import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import '../styles/Auth.css'

const Register = () => {
  const navigate = useNavigate()
  const { registerUser } = useAuth()
  const [phone, setPhone] = useState('+974')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    const result = registerUser({ phone: phone.trim(), password, name: name.trim() })
    if (!result.success) {
      setError(result.message)
      return
    }
    navigate('/history')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Demo Registration</h1>
        <p>Create a demo account with a Qatar phone number.</p>
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
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Demo User"
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
          <label>
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </label>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login">Login now</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
