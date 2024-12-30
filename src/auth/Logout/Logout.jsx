import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Logout.scss'

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="logout">
      <h2 className="logout__title">Are you sure you want to log out?</h2>
      <button className="logout__button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Logout
