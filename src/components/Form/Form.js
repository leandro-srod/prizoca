import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.css';
import emailjs from '@emailjs/browser';

function Formulario({ id }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const phoneInputRef = useRef(null);

  const options = [
    { label: 'Bolsa', value: 'Bolsa' },
    { label: 'Carteira', value: 'Carteira' },
    { label: 'Pochete', value: 'Pochete' },
    { label: 'Estojo', value: 'Estojo' },
    { label: 'Porta óculos', value: 'Porta óculos' },
    { label: 'Necessaire', value: 'Necessaire' },
    { label: 'Mochila', value: 'Mochila' },
    { label: 'Ecobag', value: 'Ecobag' },
    { label: 'Lixeira carro', value: 'Lixeira carro' },
    { label: 'Personalizado', value: 'Personalizado' },
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  function applyPhoneMask(event) {
    const inputElement = event.target;
    let value = inputElement.value;
    let cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length > 11) {
      cleanedValue = cleanedValue.substring(0, 11);
    }

    let maskedValue = '';
    if (cleanedValue.length > 0) {
      maskedValue = `(${cleanedValue.substring(0, 2)}`;
    }
    if (cleanedValue.length > 2) {
      maskedValue = `${maskedValue}) ${cleanedValue.substring(2, 7)}`;
    }
    if (cleanedValue.length > 7) {
      maskedValue = `${maskedValue}-${cleanedValue.substring(7, 11)}`;
    }
    inputElement.value = maskedValue;
  }

  function handlePhoneChange(e) {
    let cleanedValue = e.target.value.replace(/\D/g, '');

    if (cleanedValue.length > 11) {
      cleanedValue = cleanedValue.substring(0, 11);
    }
    setPhone(cleanedValue);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === '' || email === '' || message === '' || phone === '' || selectedOptions.length === 0) {
      alert('Por favor, preencha todos os campos e selecione pelo menos um item.');
      return;
    }

    const templateParams = {
      from_name: name,
      email: email,
      phone: phone,
      message: message,
      selected_items: selectedOptions.join(', ')
    };

    emailjs.send("service_vh2puac", "template_xo7y7bg", templateParams, "zurs8oBDFRSW0jgHZ")
      .then((response) => {
        console.log("E-MAIL ENVIADO.", response.status, response.text);
        setName('');
        setEmail('');
        setMessage('');
        setPhone('');
        setSelectedOptions([]);
        if (phoneInputRef.current) {
          phoneInputRef.current.value = '';
        }
        alert("Formulário enviado com sucesso. Em breve entraremos em contato.");
      }, (err) => {
        console.log("ERRO: ", err);
        alert("Ocorreu um erro ao enviar o formulário.");
      });
  };

  return (
    <Form onSubmit={handleSubmit} id={id}>

      <Form.Group className="mb-3" controlId="formNome">
        <Form.Label>Nome:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Insira seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTelefone">
        <Form.Label>Telefone:</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Insira seu telefone (Ex: (51) 99999-9999)"
          ref={phoneInputRef}
          onKeyUp={applyPhoneMask} 
          onChange={handlePhoneChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Insira seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProdutos">
        <Form.Label>Selecione os itens de interesse:</Form.Label>
        {options.map((option) => (
          <Form.Check
            key={option.value}
            type="checkbox"
            id={`checkbox-${option.value}`}
            label={option.label}
            value={option.value}
            name="produtos"
            checked={selectedOptions.includes(option.value)}
            onChange={handleCheckboxChange}
          />
        ))}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMensagem">
        <Form.Label>Mensagem:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Insira sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form.Group>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button className='button' type="submit"> Enviar </Button>
      </div>
    </Form>
  );
}

export default Formulario;