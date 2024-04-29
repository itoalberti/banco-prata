import { Button, Col, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { hostname, port } from '../dados/dados';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';

import Pagina from '../templates/Pagina';
const urlCliente = `http://${hostname}:${port}/cliente`;

export default function TelaAlterarCliente(props) {
  const [validado, setValidado] = useState(false);
  const [cliente, setCliente] = useState({
    nome: props.nome,
    cpf: props.cpf,
    dataNasc: props.dataNasc,
    endereco: props.endereco,
    cidade: props.cidade,
    uf: props.uf,
    telefone: props.telefone,
    email: props.email,
    // senha: props.senha,
    cod_ag: props.cod_ag,
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setCliente({
        ...cliente,
        cod_cli: location.state.cod_cli,
        nome: location.state.nome,
        cpf: location.state.cpf,
        dataNasc: location.state.dataNasc,
        endereco: location.state.endereco,
        cidade: location.state.cidade,
        uf: location.state.uf,
        telefone: location.state.telefone,
        email: location.state.email,
        // senha: location.state.senha,
        cod_ag: location.state.cod_ag,
      });
    }
  }, [location.state]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate(path);
  };

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setCliente({ ...cliente, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity() && cliente.uf !== '') {
      // dados válidos → proceder com o cadastro
      fetch(urlCliente, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      })
        .then((resp) => resp.json())
        .then((data) => {
          let novosClientes = [...props.listaclientes, data];
          props.setCliente(novosClientes);
          setValidado(false);
          // props.exibirTabela(true);
        })
        .catch((error) => console.error('Erro ao alterar cliente:', error));
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
    alert('Cliente alterado com sucesso!');
    navigate('/exibirclientes');
  }

  return (
    <>
      <Pagina>
        <h2>Alterar dados do(a) cliente {cliente.nome}</h2>
        <br />
        <Row className='mb-3'>
          {/********************** CÓDIGO **********************/}
          <Col xs='auto'>
            <Form.Group controlId='cod_cli' style={{ width: '45px' }}>
              <Form.Label>Código:</Form.Label>
              <Form.Control placeholder={cliente.cod_cli} disabled />
            </Form.Group>
          </Col>
          {/********************** AGÊNCIA **********************/}
          <Col xs='auto' style={{ width: '80px' }}>
            <Form.Group controlId='cod_ag' style={{ width: '45px' }}>
              <Form.Label>Agência:</Form.Label>
              <Form.Control placeholder={cliente.cod_ag} disabled />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          {/********************** NOME **********************/}
          <Col xs='auto'>
            <Form.Group controlId='nome' style={{ width: '200px' }}>
              <Form.Label>Nome:</Form.Label>
              <Form.Control placeholder={cliente.nome} disabled />
            </Form.Group>
          </Col>
          {/********************** CPF **********************/}
          <Col xs='auto' style={{ width: '160px' }}>
            <Form.Group controlId='cpf'>
              <Form.Label>CPF:</Form.Label>
              <Form.Control placeholder={cliente.cpf} disabled />
            </Form.Group>
          </Col>
          {/********************** DATA DE NASCIMENTO **********************/}
          <Col xs='auto'>
            <Form.Group controlId='dataNasc'>
              <Form.Label>Data de nascimento:</Form.Label>
              <Form.Control placeholder={cliente.dataNasc} style={{ width: '110px' }} disabled />
            </Form.Group>
          </Col>
        </Row>
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          <Row className='mb-3'>
            {/********************** ENDEREÇO **********************/}
            <Col xs='auto' style={{ width: '350px' }}>
              <Form.Group controlId='endereco'>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control required placeholder={cliente.endereco} value={cliente.endereco} onChange={manipularMudanca} />
              </Form.Group>
            </Col>
            {/********************** CIDADE **********************/}
            <Col xs='auto' style={{ width: '200px' }}>
              <Form.Group controlId='cidade'>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control required placeholder={cliente.cidade} value={cliente.cidade} onChange={manipularMudanca} />
              </Form.Group>
            </Col>
            {/********************** UF **********************/}
            <Col xs='auto'>
              <Form.Group controlId='uf'>
                <Form.Label>UF:</Form.Label>
                <Form.Select id='uf' required value={cliente.uf} placeholder={cliente.uf} onChange={manipularMudanca}>
                  <option value=''></option>
                  <option>AC</option>
                  <option>AL</option>
                  <option>AM</option>
                  <option>AP</option>
                  <option>BA</option>
                  <option>CE</option>
                  <option>DF</option>
                  <option>ES</option>
                  <option>GO</option>
                  <option>MA</option>
                  <option>MG</option>
                  <option>MS</option>
                  <option>MT</option>
                  <option>PA</option>
                  <option>PB</option>
                  <option>PE</option>
                  <option>PI</option>
                  <option>PR</option>
                  <option>RJ</option>
                  <option>RN</option>
                  <option>RO</option>
                  <option>RR</option>
                  <option>RS</option>
                  <option>SC</option>
                  <option>SE</option>
                  <option>SP</option>
                  <option>TO</option>
                </Form.Select>
                <Form.Control.Feedback style={{ width: '200px' }} type='invalid'>
                  Informe o estado da agência!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            {/********************** TELEFONE **********************/}
            <Col xs='auto' style={{ width: '170px' }}>
              <Form.Group controlId='telefone'>
                <Form.Label>Telefone:</Form.Label>
                <ReactInputMask mask='(99) 99999-9999' value={cliente.telefone} onChange={manipularMudanca}>
                  {(inputProps) => <Form.Control {...inputProps} required type='text' id='telefone' />}
                </ReactInputMask>
              </Form.Group>
            </Col>
            {/********************** EMAIL **********************/}
            <Col xs='auto' style={{ width: '220px' }}>
              <Form.Group controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control placeholder={cliente.email} value={cliente.email} onChange={manipularMudanca} />
              </Form.Group>
            </Col>
            {/********************** SENHA **********************/}
            {/* <Col xs='auto' style={{ width: '150px' }}>
              <Form.Group controlId='senha'>
                <Form.Label>Senha:</Form.Label>
                <Form.Control type='password' value={cliente.senha} placeholder={cliente.senha} onChange={manipularMudanca} />
              </Form.Group>
            </Col> */}
          </Row>
          {/*********************** PRODUTOS ***********************/}
          {/* <Row className='mb-3'>
            <Form.Group className='mb-3' style={{ width: '340px' }} controlId='endereco'>
              <Form.Label>Produtos:</Form.Label>
              <Form.Control required type='text' id='produtos' value={agencia.produtos} onChange={manipularMudanca} />
              <Form.Control.Feedback type='invalid'>Informe os produtos oferecidos pela agência!</Form.Control.Feedback>
            </Form.Group>
          </Row> */}

          <br />
          <Row className='mb-3'>
            {/* ALTERAR */}
            <Col xs='auto'>
              <Button variant='dark' type='submit'>
                Confirmar alterações
              </Button>
            </Col>

            {/* CANCELAR */}
            <Col xs='auto'>
              <LinkContainer to='/exibirclientes'>
                <Button variant='secondary'>Voltar</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Form>
      </Pagina>
    </>
  );
}

// ________________________BACKUP________________________
// import { useState } from 'react';

// export default function TelaAlterarAgencia() {
//   const [validado, setValidado] = useState(false);
//   const [agencia, setAgencia] = useState({
//     cod_ag: '',
//     endereco: '',
//     cidade: '',
//     uf: '',
//   });

//   function manipulaMudanca(e) {
//     const elemForm = e.currentTarget;
//     const id = elemForm.id;
//     const valor = elemForm.value;
//     setAgencia({ ...agencia, [id]: valor });
//   }

//   return <div>alterar agencia</div>;
// }
