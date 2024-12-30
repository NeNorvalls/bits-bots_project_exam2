import React, { useState } from 'react'
import './Register.scss'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (validateData()) {
      localStorage.setItem(formData.email, JSON.stringify(formData))
      alert('Registration successful. You can now log in.')
      navigate('/login')
    }
  }

  const validateData = () => {
    let formErrors = {}

    // Validate Name
    if (!formData.name) {
      formErrors.name = 'Name is required'
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
    if (!formData.email) {
      formErrors.email = 'Email is required'
    } else if (!emailPattern.test(String(formData.email).toLowerCase())) {
      formErrors.email = 'Invalid email format'
    }

    // Validate Password
    const passwordRegEx = /^(?=.*[A-Z]).{8,}$/
    if (!formData.password) {
      formErrors.password = 'Password is required'
    } else if (!passwordRegEx.test(String(formData.password))) {
      formErrors.password =
        'Password must be at least 8 characters long and contain at least one uppercase letter.'
    }

    // Validate Confirm Password
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  return (
      <>
          <div className="register-form">
            <h1 className="register-form__title">Register</h1>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="name" className="register-form__label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control register-form__input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="register-form__label">
                  Email:
                </label>
                <input
                  type="email"
                  id="registerEmail"
                  name="email"
                  className="form-control register-form__input"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="username"
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="register-form__label">
                  Password:
                </label>
                <input
                  type="password"
                  id="registerPassword"
                  name="password"
                  className="form-control register-form__input"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="confirmPassword"
                  className="register-form__label"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control register-form__input"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              </div>
              {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
              <div className="form-group text-center">
                <button
                  type="submit"
                  className="btn btn-primary register-form__submit-btn"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
      </>
  )
}

export default RegisterForm
