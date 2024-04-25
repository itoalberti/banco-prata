import { Button, Col, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { hostname, port } from '../dados/dados';

import Pagina from '../templates/Pagina';
const urlAgencia = `http://${hostname}:${port}/agencia`;
const urlProduto = `http://${hostname}:${port}/produto`;

export default function TelaAssociarProdutoAgencia(props) {
  const [validado, setValidado] = useState(false);
  const [agenciaProduto, setAgenciaProduto] = useState({
    cod_ag: '',
    cod_prod: '',
  });
  const [agencia, setAgencia] = useState({
    cod_ag: '',
    endereco: '',
    cidade: '',
    uf: '',
  });
  const [produto, setProduto] = useState({
    cod_prod: '',
    descricao: '',
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAgenciaProduto({ ...agenciaProduto, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // dados válidos → proceder com o cadastro
      fetch(urlAgencia, urlProduto, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agenciaProduto),
      })
        .then((resp) => resp.json())
        .then((data) => {
          let associacoes = [...props.listaAgencias, data];
          props.setAgencia(associacoes);
          setValidado(false);
          props.exibirTabela(true);
        })
        .catch((error) => console.error('Erro ao associar produto à agência:', error));
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
    alert('Agência cadastrada com sucesso!');
  }

  return (
    <>
      <Pagina>
        <h2>Cadastro de nova agência</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          <Row className='mb-3'>
            {/********************** ENDEREÇO *********************/}
            <Col xs='auto'>
              <Form.Group style={{ width: '360px' }} controlId='endereco'>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control required type='text' id='endereco' value={agenciaProduto.endereco} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o endereço da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/********************** CIDADE **********************/}
            <Col xs='auto'>
              <Form.Group style={{ width: '240px' }} controlId='cidade'>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control required type='text' id='cidade' value={agenciaProduto.cidade} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe a cidade da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/********************** UF **********************/}
            <Col xs='auto'>
              <Form.Group controlId='uf'>
                <Form.Label>UF:</Form.Label>
                <Form.Select id='uf' required value={agenciaProduto.uf} onChange={manipularMudanca}>
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

          <br />
          <Row>
            {/* BOTÃO DE CADASTRAR */}
            <Col xs='auto'>
              <Button variant='dark' type='submit'>
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
