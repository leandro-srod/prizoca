import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselStyles.css';

function BootstrapSlider({ slides }) {
  return (
    <Carousel className="BootstrapSlider">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={slide.imageUrl}
            alt={`Slide ${index + 1}`}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BootstrapSlider;