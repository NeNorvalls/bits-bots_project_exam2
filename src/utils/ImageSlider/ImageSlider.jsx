import React, { useState } from 'react'
import './ImageSlider.scss'

import image1 from '../../images/life_is_strange.jpg'
import image2 from '../../images/BioShock Infinite.jpg'
import image3 from '../../images/Divinity_ Original Sin 2.jpg'
import image4 from '../../images/Grand Theft Auto V.jpg'
import image5 from '../../images/Monster Hunter_World.jpg'
import image6 from '../../images/The Elder Scrolls V_ Skyrim.jpg'
import image7 from '../../images/Human Resource Machine.jpg'
import image8 from '../../images/Civilization VI.jpg'
import image9 from '../../images/Minecraft.jpg'
import image10 from '../../images/Limbo.png'
import image11 from '../../images/Kerbal Space Program.jpg'
import image12 from '../../images/Mortal Kombat 11.jpg'

function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: image1,
      alt: 'Life is Strange Game Cover',
    },
    {
      image: image2,
      alt: 'BioShock Infinite Game Cover',
    },
    {
      image: image3,
      alt: 'Divinity: Original Sin 2 Game Cover',
    },
    {
      image: image4,
      alt: 'Grand Theft Auto V Game Cover',
    },
    {
      image: image5,
      alt: 'Monster Hunter: World Game Cover',
    },
    {
      image: image6,
      alt: 'The Elder Scrolls V: Skyrim Game Cover',
    },
    {
      image: image7,
      alt: 'Human Resource Machine Game Cover',
    },
    {
      image: image8,
      alt: 'Civilization VI Game Cover',
    },
    {
      image: image9,
      alt: 'Minecraft Game Cover',
    },
    {
      image: image10,
      alt: 'Limbo Game Cover',
    },
    {
      image: image11,
      alt: 'Kerbal Space Program Game Cover',
    },
    {
      image: image12,
      alt: 'Mortal Kombat 11 Game Cover',
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1,
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    )
  }

  return (
    <div className="slider-container">
      <div className="slider-container__slide">
        <img src={slides[currentSlide].image} alt={slides[currentSlide].alt} />
      </div>
      <div className="slider-container__button-container">
        <button className="slider-container__prev-button" onClick={prevSlide}>
          Previous
        </button>
        <button className="slider-container__next-button" onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  )
}

export default ImageSlider
