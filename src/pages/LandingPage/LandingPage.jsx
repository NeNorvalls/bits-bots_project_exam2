import React from 'react'
import ImageSlider from '../../utils/ImageSlider/ImageSlider'
import LoginForm from '../../auth/Login/Login'
import RegisterForm from '../../auth/Register/Register'
import './LandingPage.scss'

const LandingPage = ({ setIsLoggedIn }) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 landing-page__header">
            <h1 className="landing-page__header-title">Features</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row slider-row">
          <div className="col-md-12 landing-page__features-container">
            <ImageSlider />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row" id='form-row'>
          <div className="column">
            <div className="landing-page__login-form">
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            </div>
          </div>
          <div className="column">
            <div className="landing-page__register-form">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
