import React, { useRef } from 'react';
import Menu from './components/Menu/Menu.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapSlider from './components/Carousel/BootstrapSlider.js';

import Formulario from './components/Form/Form.js';
import LightWidgetComponent from './components/LightWidgetEmbed/LightWidgetEmbed.js';

import pri_image from './images/pri_image_quadrada.jpg';
import logo from './images/logo.png';
import image1 from './images/img1.jpg';
import image2 from './images/img2.jpg';
import image3 from './images/img3.jpg';
import image4 from './images/img4.jpg';
import image5 from './images/img5.jpg';
import image6 from './images/img6.jpg';

import iconeBolsa from './images/bolsa.png';
import iconeCasa from './images/casa.png';
import iconeMao from './images/mao.png';
import iconeFitaMetrica from './images/fita-metrica.png';

import whatsapp from './images/whatsapp.png';
import instagram from './images/instagram.png';
import './App.css';

function Header({ formRef }) {
  const handleEncomendaClick = (event) => {
    event.preventDefault();
    if (formRef && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className="header">

      <div className="menu-cellphone" ><Menu formRef={formRef} /></div>
      
      <h1 className="prizoca_header">
        PRIZOCA
      </h1>

      <nav className="nav-links-tablet">
        <a href="https://www.instagram.com/prizoca_feitos_a_mao/" target="_blank" rel="noopener noreferrer" className="link-tablet">Instagram </a>
        <a href="https://wa.me/5551986483772?text=Olá!Vi seus produtos e gostaria de maiores informações!" target="_blank" rel="noopener noreferrer" className="link-tablet">WhatsApp</a>
         <a
            href="faca-sua-encomenda"
            className="link-tablet"
            onClick={handleEncomendaClick}
          >
            Faça sua encomenda
          </a>
      </nav>
      
    </header>
  );
}

function App() {
  const formRef = useRef(null);
   const slidesData = [
    {
      imageUrl: image1,
      title: 'Leve com você',
      description: 'Praticidade que floresce no dia a dia'
    },
    {
      imageUrl: image2,
      title: 'Feito com carinho',
      description: 'Cada ponto carrega cuidado e cor'
    },
    {
      imageUrl: image3,
      title: 'Beleza útil',
      description: 'Encanto que acompanha sua rotina com leveza'
    },
     {
      imageUrl: image4,
      title: 'Amor à primeira vista',
      description: 'Acessórios leves, feitos com o coração'
    },
     {
      imageUrl: image5,
      title: 'Flor de bolso',
      description: 'Detalhes que cabem na palma da mão e enchem de alegria'
    },
     {
      imageUrl: image6,
      title: 'Tudo no seu lugar',
      description: 'Organizar também pode ser encantador'
    },
  ];
  
  return (
    <div className="App">

       <Header formRef={formRef} /> 
    
      <main className="main">

        <BootstrapSlider slides={slidesData} interval={0.5} className="carousel" />

        <img src={pri_image} alt="Priscila" className="pri_image" />
        <img src={logo} alt="Logotipo_Prizoca" className="logo" />

        <p className="slogan">Bem-vindo à Prizoca!</p>

        <p className="textoSobre" >Aqui, cada peça é feita à mão, com carinho, propósito e aquele toque único que só quem acredita no poder do artesanal entende. A gente acredita que o que é verdadeiro leva tempo — e é exatamente isso que você encontra por aqui: criações pensadas para quem valoriza o que é feito com alma e respeito à natureza.</p>
        <p className="textoSobre" >Na Prizoca, a sustentabilidade não é moda, é compromisso. Escolhemos caminhos mais conscientes porque sabemos que o futuro é feito das escolhas de hoje. E a nossa escolha é fazer diferente, fazer bonito e fazer com amor.
          Seja para se presentear ou para espalhar esse sentimento mundo afora, você está no lugar certo. </p>

        <div className="icon-description-grid">
          <div className="icon-description-item" >
            <img src={iconeBolsa} alt="Ícone Bolsa" className="icon" />
            <p className="description">Peças exclusivas</p>
          </div>

          <div className="icon-description-item" >
            <img src={iconeMao} alt="Ícone Mão" className="icon" />
            <p className="description">Feito à mão</p>
          </div>

          <div className="icon-description-item" >
            <img src={iconeCasa} alt="Ícone Casa" className="icon" />
            <p className="description">Receba em casa</p>
          </div>

          <div className="icon-description-item" >
            <img src={iconeFitaMetrica} alt="Ícone Fita Métrica" className="icon" />
            <p className="description">Crie sua peça</p>
          </div>
        </div>

        <p className="slogan">Sinta-se em casa. Sinta-se Prizoca.</p>

        <div ref={formRef} className="form">
          <h3 align="left">Vamos criar sua peça?</h3>
          <h5 align="left">Preencha o formulário abaixo que entraremos em contato</h5>
          <Formulario /> 
        </div>

        <LightWidgetComponent /> 

      </main>

      <footer className="footer">

        <div>
          <a href="https://wa.me/5551986483772?text=Olá!Vi seus produtos e gostaria de maiores informações!" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp} alt="WhatsApp" className="whatsapp" /></a></div>

        <div>
          <a href="https://www.instagram.com/prizoca_feitos_a_mao/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" className="instagram" /></a></div>

             <div className="footer-tablet-desktop">
             <div>PRIZOCA - Feitos à mão  |  CNPJ - 38.313.620/0001-53</div>
             <div>Desenvolvido por <a href="https://www.linkedin.com/in/leandro-rodrigues-ti/" target="_blank" rel="noopener noreferrer" className="link-tablet">Leandro Rodrigues</a></div>
             <div>Copyright © 2025 PRIZOCA - Todos os direitos reservados.</div>
             </div>
      </footer>

    </div>
  );
}

export default App;