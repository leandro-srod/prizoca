import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.css';
import emailjs from '@emailjs/browser';

function Formulario({ id }) {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // Armazena apenas os dígitos (valor "limpo")
  const [message, setMessage] = useState('');

  const [selectedOptions, setSelectedOptions] = useState([]); // Estado para as opções selecionadas

  // --- Estados para o campo de E-mail ---
  const [email, setEmail] = useState(''); // Valor do input de email
  const [emailErrorMessage, setEmailErrorMessage] = useStatgite(''); // Mensagem de erro do email

  // Estado para controlar se o formulário já foi submetido (para ativar o feedback visual)
  const [formValidated, setFormValidated] = useState(false);

  const phoneInputRef = useRef(null); // Ref para manipular o input de telefone diretamente

  // Definição das opções para os checkboxes
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

  // Lógica para adicionar/remover opções dos checkboxes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  // Aplica a máscara visualmente no input de telefone (usando a ref)
  function applyPhoneMask(event) {
    const inputElement = event.target;
    let value = inputElement.value;
    let cleanedValue = value.replace(/\D/g, '');

    // Limita para 11 dígitos antes de mascarar
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
    inputElement.value = maskedValue; // Atualiza o valor do DOM diretamente
  }

  // Atualiza o estado 'phone' com o valor numérico limpo (para envio)
  function handlePhoneChange(e) {
    let cleanedValue = e.target.value.replace(/\D/g, '');
    // Limita para 11 dígitos para o valor do estado
    if (cleanedValue.length > 11) {
      cleanedValue = cleanedValue.substring(0, 11);
    }
    setPhone(cleanedValue);
  }

  // --- Nova Função de Validação do E-mail ---
  const validateEmail = (emailValue) => {
    if (!emailValue.trim()) {
      return '* O endereço de email é obrigatório.';
    }
    // Regex para validar formato de email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
      return '* Por favor, insira um endereço de email válido.';
    }
    return ''; // Vazio se for válido
  };

  // --- Handlers de Evento para o Campo de E-mail ---
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Se o formulário já foi tentado (formValidated é true), valida em tempo real
    if (formValidated) {
      setEmailErrorMessage(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    // Valida quando o campo de email perde o foco
    setEmailErrorMessage(validateEmail(email));
  };


  // Função para enviar o formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o envio padrão do navegador
    event.stopPropagation(); // Impede a propagação do evento

    // Ativa o feedback visual do Bootstrap para todos os campos
    setFormValidated(true);

    // --- Validação Manual de Todos os Campos, incluindo o email ---
    let formIsValid = true;
    let emailError = validateEmail(email); // Valida o email na submissão
    setEmailErrorMessage(emailError); // Atualiza a mensagem de erro

    if (emailError) {
      formIsValid = false;
    }

    if (name.trim() === '' || phone.trim() === '' || message.trim() === '' || selectedOptions.length === 0) {
      formIsValid = false;
      // Você pode adicionar alerts mais específicos aqui se quiser, ou deixar o feedback do Bootstrap
      // alert('Por favor, preencha todos os campos e selecione pelo menos um item.');
    }

    // Se o formulário geral não é válido, para por aqui
    if (!formIsValid) {
        console.log('Formulário inválido, impedindo envio.');
        return;
    }

    // Se chegou aqui, o formulário é válido, então podemos enviar
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
        // Limpa os campos após o envio
        setName('');
        setEmail('');
        setMessage('');
        setPhone('');
        setSelectedOptions([]);
        if (phoneInputRef.current) {
          phoneInputRef.current.value = ''; // Limpa o valor visual do input de telefone
        }
        // Reseta o estado de validação para o próximo envio
        setFormValidated(false);
        alert("Formulário enviado com sucesso. Em breve entraremos em contato.");
      }, (err) => {
        console.log("ERRO: ", err);
        alert("Ocorreu um erro ao enviar o formulário.");
      });
  };

  return (
    // 'noValidate' desabilita a validação HTML5 padrão do navegador.
    // 'validated' ativa/desativa os estilos de feedback do Bootstrap.
    <Form noValidate validated={formValidated} onSubmit={handleSubmit} id={id}>

      <Form.Group className="mb-3" controlId="formNome">
        <Form.Label>Nome:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Insira seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required // Marca o campo como obrigatório (validação HTML5 que o Bootstrap usa)
          isInvalid={formValidated && name.trim() === ''} // Feedback visual se tentar enviar vazio
        />
        <Form.Control.Feedback type="invalid">
          * Por favor, insira seu nome.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTelefone">
        <Form.Label>Telefone:</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Insira seu telefone (Ex: (51) 99999-9999)"
          ref={phoneInputRef}
          onKeyUp={applyPhoneMask}
          onChange={handlePhoneChange}
          required // Marca o campo como obrigatório
          isInvalid={formValidated && phone.trim() === ''} // Feedback visual se tentar enviar vazio
        />
        <Form.Control.Feedback type="invalid">
          * Por favor, insira seu telefone.
        </Form.Control.Feedback>
      </Form.Group>

      {/* --- CAMPO DE E-MAIL COM VALIDAÇÃO MELHORADA --- */}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Insira seu e-mail"
          required // Mantém o atributo required
          value={email}
          onChange={handleEmailChange} // Novo handler para o email
          onBlur={handleEmailBlur} // **NOVO: Valida ao perder o foco**
          // isInvalid será true se o formulário foi tentado E houver uma mensagem de erro de email
          isInvalid={formValidated && !!emailErrorMessage}
        />
        <Form.Control.Feedback type="invalid">
          {emailErrorMessage} {/* Exibe a mensagem de erro específica do email */}
        </Form.Control.Feedback>
      </Form.Group>
      {/* --- FIM DO CAMPO DE E-MAIL --- */}

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
        {/* Feedback de erro para checkboxes */}
        {formValidated && selectedOptions.length === 0 && (
            <div className="invalid-feedback d-block">
                * Por favor, selecione pelo menos um item.
            </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMensagem">
        <Form.Label>Mensagem:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Insira sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required // Marca o campo como obrigatório
          isInvalid={formValidated && message.trim() === ''} // Feedback visual
        />
        <Form.Control.Feedback type="invalid">
          * Por favor, insira sua mensagem.
        </Form.Control.Feedback>
      </Form.Group>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button className='button' type="submit"> Enviar </Button>
      </div>
    </Form>
  );
}

export default Formulario;