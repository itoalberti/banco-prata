import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

export default function TelaCadastrarCliente(props) {
  const [validado, setValidado] = useState(false);
  const [cliente, setCliente] = useState({
    cod_cli: '',
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    uf: '',
    cod_ag: 0,
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setCliente({ ...cliente, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // dados válidos → proceder com o cadastro
      let clientes = props.listaClientes;
      clientes.push(cliente);
      props.setCliente(clientes);
      setValidado(false);
      // props.exibirTabela(true);
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <Pagina>
        <h2>Cadastro de novo cliente</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          {/********************** NOME *********************/}
          <Form.Group className='mb-3' controlId='nome' style={{ width: '340px' }}>
            <Form.Label>Nome:</Form.Label>
            <Form.Control required type='text' id='nome' value={cliente.nome} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o nome do cliente!</Form.Control.Feedback>
          </Form.Group>
          {/********************** CPF *********************/}
          <Form.Group className='mb-3' controlId='cpf' style={{ width: '340px' }}>
            <Form.Label>CPF:</Form.Label>
            <Form.Control required type='text' id='cpf' value={cliente.cpf} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o CPF do cliente!</Form.Control.Feedback>
          </Form.Group>
          {/********************** EMAIL *********************/}
          <Form.Group className='mb-3' controlId='email' style={{ width: '340px' }}>
            <Form.Label>Email:</Form.Label>
            <Form.Control required type='email' id='email' value={cliente.email} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o email do cliente!</Form.Control.Feedback>
          </Form.Group>
          {/********************** TELEFONE *********************/}
          <Form.Group className='mb-3' controlId='telefone' style={{ width: '340px' }}>
            <Form.Label>Email:</Form.Label>
            <Form.Control required type='text' id='telefone' value={cliente.telefone} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o telefone do cliente!</Form.Control.Feedback>
          </Form.Group>
          {/********************** ENDEREÇO *********************/}
          <Form.Group className='mb-3' controlId='endereco' style={{ width: '340px' }}>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control required type='text' id='endereco' value={cliente.endereco} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o endereço da agência!</Form.Control.Feedback>
          </Form.Group>
          {/********************** CIDADE **********************/}
          <Form.Group className='mb-3' controlId='cidade' style={{ width: '340px' }}>
            <Form.Label>Cidade:</Form.Label>
            <Form.Control required type='email' id='cidade' value={cliente.cidade} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe a cidade da agência!</Form.Control.Feedback>
          </Form.Group>
          {/* <Row> */}
          {/********************** UF **********************/}
          {/* <Col md='2'> */}
          <Form.Group className='mb-3' controlId='uf'>
            <Form.Label>UF:</Form.Label>
            {/* <Form.Label style={{ width: '50px' }}>UF:</Form.Label> */}
            <Form.Select className='mb-3' style={{ width: '100px' }} id='uf'>
              <option value=''></option>
              <option value='AC'>AC</option>
              <option value='AL'>AL</option>
              <option value='AP'>AP</option>
              <option value='AM'>AM</option>
              <option value='BA'>BA</option>
              <option value='CE'>CE</option>
              <option value='ES'>ES</option>
              <option value='GO'>GO</option>
              <option value='MA'>MA</option>
              <option value='MT'>MT</option>
              <option value='MS'>MS</option>
              <option value='MG'>MG</option>
              <option value='PA'>PA</option>
              <option value='PB'>PB</option>
              <option value='PR'>PR</option>
              <option value='PE'>PE</option>
              <option value='PI'>PI</option>
              <option value='RJ'>RJ</option>
              <option value='RN'>RN</option>
              <option value='RS'>RS</option>
              <option value='RO'>RO</option>
              <option value='RR'>RR</option>
              <option value='SC'>SC</option>
              <option value='SP'>SP</option>
              <option value='SE'>SE</option>
              <option value='TO'>TO</option>
              <option value='DF'>DF</option>
            </Form.Select>
            <Form.Control.Feedback type='invalid'>Informe o estado da agência!</Form.Control.Feedback>
          </Form.Group>
          {/* </Col> */}
          {/* </Row> */}

          <br />
          <Row>
            {/* BOTÃO DE CADASTRAR */}
            <Col xs='auto'>
              <Button variant='dark' type='submit'>
                Cadastrar cliente
              </Button>
            </Col>

            {/* BOTÃO DE CANCELAR */}
            <Col xs='auto'>
              <LinkContainer to='/'>
                <Button variant='secondary'>Cancelar</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Form>
      </Pagina>
    </>
  );
}
