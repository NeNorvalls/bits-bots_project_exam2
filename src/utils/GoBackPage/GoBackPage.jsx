import React from 'react';
import './GoBackButton.scss';

const handleGoBackToPortfolio = () => {
  window.location.href = "https://nenorvalls-portfolio.netlify.app/";
};

const GoBackButton = () => (
  <button
    id="goBackButton"
    className="go-back-button"
    onClick={handleGoBackToPortfolio}
  >
    Go back to portfolio!
  </button>
);

export { GoBackButton, handleGoBackToPortfolio };
