import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import './Checkout.scss'
import { useCart } from '../../utils/CartContext/cartContext'

const Checkout = () => {
  const { cartItems, clearCart } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const validateData = () => {
    let formErrors = {}

    // Validate Name
    if (!formData.fullName) {
      formErrors.fullName = 'Name is required'
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
    if (!formData.email) {
      formErrors.email = 'Email is required'
    } else if (!emailPattern.test(String(formData.email).toLowerCase())) {
      formErrors.email = 'Invalid email format'
    }

    // Validate Card Name
    if (!formData.cardName) {
      formErrors.cardName = 'Name on card is required'
    }

    // Validate Card Number
    const creditCardPattern = /^[0-9]{16}$/
    if (!formData.cardNumber) {
      formErrors.cardNumber = 'Card number is required'
    } else if (!creditCardPattern.test(String(formData.cardNumber))) {
      formErrors.cardNumber = 'Invalid card number'
    }

    // Validate Expiration Month
    if (!formData.expMonth) {
      formErrors.expMonth = 'Expiration month is required'
    }

    // Validate Expiration Year
    if (!formData.expYear) {
      formErrors.expYear = 'Expiration year is required'
    }

    // Validate CVV
    if (!formData.cvv) {
      formErrors.cvv = 'CVV is required'
    }

    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleConfirmPayment = () => {
    clearCart()
    localStorage.clear()
    setShowModal(false)
    navigate('/browse')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateData()) {
      setShowModal(true)
    }
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout__items">{cartItems.length} Items in Cart</div>
      <Container className="checkout__container">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="checkout__section">
              <h2 className="checkout__title">Billing Information</h2>
              <div className="checkout__field">
                <label className="checkout__label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="checkout__input"
                  placeholder="John M. Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="error">{errors.fullName}</div>
                )}
              </div>
              <div className="checkout__field">
                <label className="checkout__label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="checkout__input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
            </Col>
            <Col md={6} className="checkout__section">
              <h2 className="checkout__title">Payment Information</h2>
              <div className="checkout__field">
                <label className="checkout__label" htmlFor="cardName">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  className="checkout__input"
                  placeholder="John More Doe"
                  value={formData.cardName}
                  onChange={handleChange}
                />
                {errors.cardName && (
                  <div className="error">{errors.cardName}</div>
                )}
              </div>
              <div className="checkout__field">
                <label className="checkout__label" htmlFor="cardNumber">
                  Credit card number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="checkout__input"
                  placeholder="1111-2222-3333-4444"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                {errors.cardNumber && (
                  <div className="error">{errors.cardNumber}</div>
                )}
              </div>
              <div className="checkout__field">
                <label className="checkout__label" htmlFor="expMonth">
                  Exp Month
                </label>
                <input
                  type="text"
                  id="expMonth"
                  name="expMonth"
                  className="checkout__input"
                  placeholder="September"
                  value={formData.expMonth}
                  onChange={handleChange}
                />
                {errors.expMonth && (
                  <div className="error">{errors.expMonth}</div>
                )}
              </div>
              <div className="checkout__field">
                <label className="checkout__label" htmlFor="expYear">
                  Exp Year
                </label>
                <input
                  type="text"
                  id="expYear"
                  name="expYear"
                  className="checkout__input"
                  placeholder="2018"
                  value={formData.expYear}
                  onChange={handleChange}
                />
                {errors.expYear && (
                  <div className="error">{errors.expYear}</div>
                )}
              </div>
              <div className="checkout__field">
                <label className="checkout__label" htmlFor="cvv">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="checkout__input"
                  placeholder="352"
                  value={formData.cvv}
                  onChange={handleChange}
                />
                {errors.cvv && <div className="error">{errors.cvv}</div>}
              </div>
            </Col>
          </Row>
          <button type="submit" className="checkout__button">
            Confirm and Pay
          </button>
        </form>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Title>Checkout Success</Modal.Title>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Thank you for your purchase!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmPayment}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Checkout
