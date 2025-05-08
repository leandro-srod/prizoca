import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Formulario({id}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { label: 'Bolsa', value: 'bolsa' },
    { label: 'Carteira', value: 'carteira' },
    { label: 'Pochete', value: 'pochete' },
    { label: 'Porta moeda', value: 'portamoeda' },
    { label: 'Porta óculos', value: 'portaoculos' },
    { label: 'Nécessaire', value: 'necessaire' },
    { label: 'Mochila', value: 'mochila' },
    { label: 'Ecobag', value: 'ecobag' },
    { label: 'Lixeira carro', value: 'lixeiracarro' },
    { label: 'Personalizado', value: 'personalizado' },
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Produtos selecionados:', selectedOptions);
    // Aqui você envia os dados do formulário
  };

  return (
    <Form onSubmit={handleSubmit} id={id}>
      <Form.Group className="mb-3" controlId="formNome">
        
        <Form.Label>Nome:</Form.Label>
        <Form.Control type="text" placeholder="Insira seu nome" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formtel">
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="tel" placeholder="Insira seu telefone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" placeholder="Insira seu e-mail" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Selecione os produtos desejados:</Form.Label>
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

      <Form.Group className="mb-3" controlId="formMensagem"> {/* Alterei o controlId para algo mais descritivo */}
        <Form.Label>Mensagem:</Form.Label>
        <Form.Control
          as="textarea" // Define o componente como um <textarea>
          rows={4}     // Define o número inicial de linhas (ajuste conforme necessário)
          placeholder="Insira sua mensagem"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          style={{ backgroundColor: '#3DBAC2', borderColor: '#3DBAC2' }}
        >
          Enviar
        </Button>
      </div>
    </Form>
  );
}

export default Formulario;