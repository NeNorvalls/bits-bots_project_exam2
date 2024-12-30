import React, { useState, useEffect } from 'react'
import './BrowsePage.scss'
import { useCart } from '../../utils/CartContext/cartContext'
import Search from '../../utils/Search/Search'
import ProductDetails from '../ProductDetails/ProductDetails'
import Modal from 'react-modal'
import Category from '../../components/Category/Category'
import Loader from '../../utils/Loader/Loader'

const BrowsePage = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { cartItems, addToCart } = useCart()

  const productsPerPage = 9

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          'https://nenorvalls.no/wp-json/wp/v2/games?per_page=100',
          setIsLoading(false),
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const contentType = response.headers.get('Content-Type')

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          setProducts(data)
          setError(null)

          setIsLoading(false)
        } else {
          throw new Error('Unsupported content type')
        }
      } catch (error) {
        setError(error.message)
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const itemsPerRow = 3

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) =>
          product.acf.categories.includes(selectedCategory),
        )

  const indexOfLastItem = currentPage * productsPerPage
  const indexOfFirstItem = indexOfLastItem - productsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else if (
      direction === 'next' &&
      currentPage < Math.ceil(filteredProducts.length / productsPerPage)
    ) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id)

    if (existingCartItem) {
      existingCartItem.quantity += 1
    } else {
      addToCart({ ...product, quantity: 1 })
    }
  }

  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setModalIsOpen(false)
  }

  const rows = []
  for (let i = 0; i < currentItems.length; i += itemsPerRow) {
    const rowItems = currentItems.slice(i, i + itemsPerRow)
    rows.push(
      <div className="row" key={i}>
        {rowItems.map((product) => (
          <div
            key={product.id}
            className="col-md-4"
            onClick={() => handleViewProduct(product)}
          >
            <div className="product-card">
              <img
                src={product.game_image_url}
                className="product-card__image img-fluid"
                alt={product.title.rendered}
              />
              <div className="product-card__body">
                <h5 className="product-card__title">
                  {product.title.rendered}
                </h5>
                <p className="product-card__price">${product.acf.price}</p>
                <p className="product-card__category">
                  {product.acf.categories}
                </p>
                <div className="product-card__actions">
                  <button
                    className="product-card__btn product-card__btn--to-cart btn m-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="product-card__btn product-card__btn--view btn m-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewProduct(product)
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>,
    )
  }

  return (
    <div className="browse-page">
      {isLoading ? (
        <Loader active={isLoading} />
      ) : (
        <>
          <Search />
          <Category onSelectCategory={handleCategorySelect} />
          <h1 className="browse-page__title">Browse Products</h1>
          {error && <p className="browse-page__error-message">{error}</p>}
          <div className="container">{rows}</div>
          <div className="pagination d-flex justify-content-center">
            <button
              className="btn btn-pagination"
              onClick={() => handlePageChange('prev')}
            >
              Previous
            </button>
            <span className="mx-3">Page {currentPage}</span>
            <button
              className="btn btn-pagination"
              onClick={() => handlePageChange('next')}
            >
              Next
            </button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{ content: { width: 'auto' } }}
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            {selectedProduct && (
              <ProductDetails
                selectedGame={selectedProduct}
                handleGoBackClick={closeModal}
              />
            )}
            <div className="modal-button-container">
              <button className="btn btn-secondary mt-3" onClick={closeModal}>
                Close
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}

export default BrowsePage
