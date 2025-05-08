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


function Header({ formRef }) { // Recebe a prop formRef
  return (
    <header className="header py-3 position-relative d-flex align-items-center">
      {/* Menu à esquerda */}
      <div style={{ marginLeft: '20px' }}><Menu formRef={formRef} /></div> {/* Passa a prop formRef para Menu */}
      {/* Nome da marca centralizado */}
      <h1 className="m-0" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        PRIZOCA
      </h1>
    </header>
  );
}

function App() {
  const formRef = useRef(null);
  const images = [image1, image2, image3, image4, image5, image6];

  return (
    <div className="App">
       <Header formRef={formRef} /> {/* Passa a ref para o Header */}

      <main className="main">
        <BootstrapSlider images={images} />

        <img src={pri_image} alt="Priscila" className="pri_image" />
        <img src={logo} alt="Logotipo_Prizoca" className="logo" />

        <h2>Bem-vindo à Prizoca!</h2>
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
        <p><strong>Sinta-se em casa. Sinta-se Prizoca.<br></br></strong></p>

        <div ref={formRef} className="form">
          <h2 align="left">Vamos criar sua peça?</h2>
          <h5 align="left">Preencha o formulário abaixo que entraremos em contato</h5>
          <Formulario /> {/* Renderiza o formulário diretamente aqui */}
        </div>

        <LightWidgetComponent /> {/* Widget do Instagram dentro do main */}

      </main>

      <footer className='footer'>
        <div>
          <a href="https://wa.me/5551986483772?text=Olá!Vi seus produtos e gostaria de maiores informações!" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp} alt="WhatsApp" className="whatsapp" /></a></div>

        <div>
          <a href="https://www.instagram.com/prizoca_feitos_a_mao/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" className="instagram" /></a></div>
      </footer>

    </div>
  );
}

export default App;