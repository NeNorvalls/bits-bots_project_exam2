import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import GameDetails from '../../pages/ProductDetails/ProductDetails'
import { Container, Form, Button } from 'react-bootstrap'
import './Search.scss'

const Search = ({ handleAddGameOrCategory }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const fetchGames = (query) => {
    let url = ''

    if (query.length === 1) {
      url = `https://nenorvalls.no/wp-json/wp/v2/games?title_like=${query}&per_page=100`
    } else {
      url = `https://nenorvalls.no/wp-json/wp/v2/games?title_like=${query}&per_page=100`
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleResultClick = (result) => {
    setSelectedResult(result)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setSelectedResult(null)
    setModalIsOpen(false)
  }

  useEffect(() => {
    if (query.trim() !== '') {
      fetchGames(query)
    } else {
      setResults([])
    }
  }, [query])

  const renderResults = () => {
    if (results.length === 0) {
      return <p className="search-results__message">No results found.</p>
    }

    return results.map((result) => (
      <div
        key={result.id}
        className="search-results__item"
        onClick={() => handleResultClick(result)}
      >
        <h3 className="search-results__title">{result.title.rendered}</h3>
      </div>
    ))
  }

  return (
    <Container>
      <Form>
        <Form.Group controlId="search">
          <Form.Label className="search-label my-2">
            Search by Game Title:
          </Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
        </Form.Group>
      </Form>

      <div className="search-results">{renderResults()}</div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{ content: { width: 'auto' } }}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedResult && (
          <>
            <GameDetails
              selectedGame={selectedResult}
              handleGoBackClick={closeModal}
              handleAddGameOrCategory={handleAddGameOrCategory}
            />
            <div className="modal-button-container">
              <Button
                variant="primary"
                onClick={closeModal}
                className="modal-button"
              >
                Close
              </Button>
            </div>
          </>
        )}
      </Modal>
    </Container>
  )
}

export default Search
