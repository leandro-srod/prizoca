import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselStyles.css';

function BootstrapSlider({ images }) {
  return (
    <Carousel className="BootstrapSlider">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image}
            alt={`Slide ${index + 1}`}
          />
          {/* Opcional: Adicionar legendas */}
          {/* <Carousel.Caption>
            <h3>Título do Slide {index + 1}</h3>
            <p>Descrição do slide.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BootstrapSlider;