import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import menuIcon from '../../images/menuIcon.png';
import '../../App.css';

function Menu({ formRef }) { // Recebe a prop formRef
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const scrollToForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleClose(); // Inicia o fechamento do Offcanvas
    // Role para o formulário APÓS o Offcanvas começar a fechar
    setTimeout(() => {
      if (formRef && formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log("Referência ao formulário não encontrada!");
      }
    }, 350); // Ajuste o tempo de acordo com a duração da animação de fechamento do Offcanvas
  };

  return (
    <>
      <Button
        onClick={handleShow}
        style={{ backgroundColor: '#CA3E77', borderColor: '#CA3E77' }}
      >
        <img
          src={menuIcon}
          alt="Menu Icon"
          style={{ width: '28px', height: '28px', marginRight: '4px' }}
        />
      </Button>

      <Offcanvas show={show}
        onHide={handleClose}
        style={{ width: '70%', backgroundColor:'#3DBAC2' }} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>PRIZOCA</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="https://www.instagram.com/prizoca_feitos_a_mao/" target="_blank" rel="noopener noreferrer" className="offcanvas-link">Instagram</Nav.Link>
            <Nav.Link href="https://wa.me/5551986483772?text=Olá!Vi seus produtos e gostaria de maiores informações!" target="_blank" rel="noopener noreferrer" className="offcanvas-link">WhatsApp</Nav.Link>
            <Nav.Link onClick={scrollToForm} className="offcanvas-link" style={{ cursor: 'pointer' }}>Faça sua encomenda</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;