import { Button, Col, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { hostname, port } from '../dados/dados';
import { useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask';

import Pagina from '../templates/Pagina';

const urlAgencia = `http://${hostname}:${port}/agencia`;

export default function TelaAlterarAgencia(props) {
  const [validado, setValidado] = useState(false);
  const [agencia, setAgencia] = useState({
    cod_ag: props.cod_ag,
    // endereco: props.endereco,
    cidade: props.cidade,
    uf: props.uf,
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setAgencia({
        ...agencia,
        cod_ag: location.state.cod_ag,
        endereco: location.state.endereco,
        cidade: location.state.cidade,
        uf: location.state.uf,
      });
    }
  }, [location.state]);
  console.log('props:', props);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAgencia({ ...agencia, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity() && agencia.uf !== '') {
      // dados válidos → proceder com o cadastro
      fetch(urlAgencia, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agencia),
      })
        .then((resp) => resp.json())
        .then((data) => {
          let novasAgencias = [...props.listaAgencias, data];
          props.setAgencia(novasAgencias);
          setValidado(false);
          // props.exibirTabela(true);
        })
        .catch((error) => console.error('Erro ao alterar agência:', error));
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
    alert('Agência alterada com sucesso!');
  }

  return (
    <>
      <Pagina>
        <h2>Alterar endereço da agência {agencia.cod_ag}</h2>
        <br />
        <Row className='mb-3'>
          <Col xs='auto'>
            {/********************** CIDADE **********************/}
            <Form.Group controlId='ag_cidade'>
              <Form.Label>Cidade:</Form.Label>
              <Form.Control placeholder={agencia.cidade} disabled />
            </Form.Group>
          </Col>
          {/********************** UF **********************/}
          <Col xs='auto'>
            <Form.Group style={{ width: '50px' }} controlId='uf'>
              <Form.Label>UF:</Form.Label>
              <Form.Control placeholder={agencia.uf} disabled />
            </Form.Group>
          </Col>
        </Row>
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          <Row className='mb-3'>
            <Col xs='auto'>
              {/********************** ENDEREÇO *********************/}
              <Form.Group className='mb-3' style={{ width: '340px' }} controlId='endereco'>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control required type='text' placeholder={agencia.endereco} id='endereco' value={agencia.endereco} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o novo endereço da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>
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
              <LinkContainer to='/exibiragencias'>
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
