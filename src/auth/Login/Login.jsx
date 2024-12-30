import React, { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    const storedUser = JSON.parse(localStorage.getItem(formData.email))

    if (!storedUser) {
      setError('User not found')
    } else if (storedUser.password !== formData.password) {
      setError('Incorrect password')
    } else {
      alert('Successful Login')
      setIsLoggedIn(true)
      localStorage.setItem('currentUser', JSON.stringify(formData.email))
      navigate('/browse')
    }
  }

  return (
      <>
          <div className="login-form">
            <h1 className="login-form__title">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username" className="login-form__label">
                  Email:
                </label>
                <input
                  type="text"
                  id="loginEmail"
                  name="email"
                  className="form-control login-form__input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="login-form__label">
                  Password:
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  className="form-control login-form__input"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="form-group text-center">
                <button
                  type="submit"
                  className="btn btn-primary login-form__submit-btn"
                >
                  Login
                </button>
              </div>
              <div className="login-form__register-link text-center">
                <p>Don't have an account? Register now!</p>
              </div>
            </form>
          </div>
      </>
  )
}

export default LoginForm
