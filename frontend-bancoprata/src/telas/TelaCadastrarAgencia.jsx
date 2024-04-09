import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

// const port = 4000;
const port = 3306;
const hostname = 'localhost';

const urlAgencia = `http://${hostname}:${port}/agencia`;

export default function TelaCadastrarAgencia(props) {
  const [validado, setValidado] = useState(false);
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaAgencias, setListaAgencias] = useState([]);
  const [atualizando, setAtualizando] = useState(false);
  const [agencia, setAgencia] = useState({
    cod_ag: '',
    endereco: '',
    cidade: '',
    uf: '',
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAgencia({ ...agencia, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // dados válidos → proceder com o cadastro
      let agencias = props.listaAgencias;
      agencias.push(agencia);
      props.setAgencia(agencias);
      setValidado(false);
      props.exibirTabela(true);
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <Pagina>
        <h2>Cadastro de nova agência</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          {/********************** ENDEREÇO *********************/}
          <Form.Group className='mb-3' controlId='endereco' style={{ width: '340px' }}>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control required type='text' id='endereco' value={agencia.endereco} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o endereço da agência!</Form.Control.Feedback>
          </Form.Group>

          {/********************** CIDADE **********************/}
          <Form.Group className='mb-3' controlId='cidade' style={{ width: '340px' }}>
            <Form.Label>Cidade:</Form.Label>
            <Form.Control required type='text' id='cidade' value={agencia.cidade} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe a cidade da agência!</Form.Control.Feedback>
          </Form.Group>

          <Row>
            {/********************** UF **********************/}
            <Col md='2'>
              <Form.Group className='mb-3' controlId='uf'>
                <Form.Label style={{ width: '50px' }}>UF:</Form.Label>
                <select className='mb-3' style={{ width: '60px' }} id='uf'>
                  <option value='invalid'></option>
                  <option required type='text' value={agencia.uf}>
                    AC
                  </option>
                  <option required type='text' value={agencia.uf}>
                    AL
                  </option>
                  <option required type='text' value={agencia.uf}>
                    AP
                  </option>
                  <option required type='text' value={agencia.uf}>
                    AM
                  </option>
                  <option required type='text' value={agencia.uf}>
                    BA
                  </option>
                  <option required type='text' value={agencia.uf}>
                    CE
                  </option>
                  <option required type='text' value={agencia.uf}>
                    ES
                  </option>
                  <option required type='text' value={agencia.uf}>
                    GO
                  </option>
                  <option required type='text' value={agencia.uf}>
                    MA
                  </option>
                  <option required type='text' value={agencia.uf}>
                    MT
                  </option>
                  <option required type='text' value={agencia.uf}>
                    MS
                  </option>
                  <option required type='text' value={agencia.uf}>
                    MG
                  </option>
                  <option required type='text' value={agencia.uf}>
                    PA
                  </option>
                  <option required type='text' value={agencia.uf}>
                    PB
                  </option>
                  <option required type='text' value={agencia.uf}>
                    PR
                  </option>
                  <option required type='text' value={agencia.uf}>
                    PE
                  </option>
                  <option required type='text' value={agencia.uf}>
                    PI
                  </option>
                  <option required type='text' value={agencia.uf}>
                    RJ
                  </option>
                  <option required type='text' value={agencia.uf}>
                    RN
                  </option>
                  <option required type='text' value={agencia.uf}>
                    RS
                  </option>
                  <option required type='text' value={agencia.uf}>
                    RO
                  </option>
                  <option required type='text' value={agencia.uf}>
                    RR
                  </option>
                  <option required type='text' value={agencia.uf}>
                    SC
                  </option>
                  <option required type='text' value={agencia.uf}>
                    SP
                  </option>
                  <option required type='text' value={agencia.uf}>
                    SE
                  </option>
                  <option required type='text' value={agencia.uf}>
                    TO
                  </option>
                  <option required type='text' value={agencia.uf}>
                    DF
                  </option>
                  {/* <option value='DF'>DF</option> */}
                </select>
                <Form.Control.Feedback type='invalid'>Informe o estado da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <br />
          <Row>
            {/* BOTÃO DE CADASTRAR */}
            <Col xs='auto'>
              <Button
                variant='dark'
                type='submit'
                onClick={() => {
                  setExibirTabela(false);
                }}
              >
                Cadastrar agência
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
