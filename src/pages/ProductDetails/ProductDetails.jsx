import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useCart } from '../../utils/CartContext/cartContext'
import './ProductDetails.scss'

const ProductDetails = ({ selectedGame }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(selectedGame)
  }

  if (!selectedGame || !selectedGame.title) {
    return <p>Game details not available.</p>
  }

  return (
    <Container>
      <Row>
        <Col className="product-details-custom__col" lg={6}>
          {selectedGame.game_image_url && (
            <img
              src={selectedGame.game_image_url}
              alt={selectedGame.title.rendered}
              className="product-details-custom__image"
            />
          )}
        </Col>
        <Col className="product-details-custom__col" lg={6}>
          <div>
            <h3 className="product-details-custom__title">
              {selectedGame.title.rendered}
            </h3>
            <p className="product-details-custom__info">
              Description: {selectedGame.acf.Description}
            </p>
            <p className="product-details-custom__info">
              Price: ${selectedGame.acf.price}
            </p>
            <p className="product-details-custom__info">
              Release Date: {selectedGame.acf.release_date}
            </p>
            <p className="product-details-custom__info">
              In Stock: {selectedGame.acf.in_stock ? 'Yes' : 'No'}
            </p>
            <p className="product-details-custom__info">Categories:</p>
            <ul className="product-details-custom__category-list">
              {selectedGame.categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </div>

          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetails
