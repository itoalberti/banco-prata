import { Button, Col, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { hostname, port } from '../dados/dados';

import Pagina from '../templates/Pagina';
const urlAgencia = `http://${hostname}:${port}/agencia`;
const urlProduto = `http://${hostname}:${port}/produto`;

export default function TelaAssociarProdutoAgencia(props) {
  // const [listaAgencias, setListaAgencias] = useState([]);
  const [validado, setValidado] = useState(false);
  const [todasCidades, setTodasCidades] = useState([]);
  const [filtrarCidades, setFiltrarCidades] = useState([]);
  const [todosEnderecos, setTodosEnderecos] = useState([]);
  const [filtrarEnderecos, setFiltrarEnderecos] = useState([]);

  useEffect(() => {
    fetch(urlAgencia)
      .then((resp) => resp.json())
      .then((data) => {
        setTodasCidades(data);
        setFiltrarCidades(data);
        setTodosEnderecos(data);
        setFiltrarEnderecos(data);
      })
      .catch((erro) => console.error('Erro ao buscar agências', erro));
  }, []);

  const [agencia_produto, set_agencia_produto] = useState({
    cod_ag: '',
    cod_prod: '',
  });
  // const [agencia, setAgencia] = useState({
  //   cod_ag: '',
  //   endereco: '',
  //   cidade: '',
  //   uf: '',
  // });
  // const [produto, setProduto] = useState({
  //   cod_prod: '',
  //   descricao: '',
  // });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    if (id === 'uf') {
      setFiltrarCidades(todasCidades.filter((agencia) => agencia.uf === valor));
    }
    if (id === 'cidade') {
      setFiltrarEnderecos(todosEnderecos.filter((endereco) => endereco.cidade === valor));
    }
    set_agencia_produto({ ...agencia_produto, [id]: valor });
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
        body: JSON.stringify(agencia_produto),
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
    alert(`Produto cadastrado com sucesso na agência!`);
  }

  return (
    <>
      <Pagina>
        <h2>Associar produto a agência</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          <Row className='mb-3'>
            {/********************** UF **********************/}
            <Col xs='auto'>
              <Form.Group controlId='uf'>
                <Form.Label>UF:</Form.Label>
                <Form.Select id='uf' required value={agencia_produto.uf} onChange={manipularMudanca}>
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
            {/********************** CIDADE **********************/}
            <Col xs='auto'>
              <Form.Group style={{ width: '240px' }} controlId='cidade'>
                <Form.Label>Cidade:</Form.Label>
                <Form.Select id='cidade' required onChange={manipularMudanca}>
                  {filtrarCidades.map((agencia) => (
                    <option key={agencia.cidade} value={agencia.cidade}>
                      {agencia.cidade}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>Informe a cidade da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/********************** ENDEREÇO **********************/}
            <Col xs='auto'>
              <Form.Group controlId='endereco'>
                <Form.Label>Endereço da agência:</Form.Label>
                <Form.Select id='endereco' required onChange={manipularMudanca}>
                  {filtrarEnderecos.map((agencia) => (
                    <option key={agencia.cod_ag} value={agencia.cod_ag}>
                      {agencia.endereco}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>Informe o código da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/********************** CÓDIGO DA AGÊNCIA *********************/}
            <Col xs='auto'>
              <Form.Group controlId='cod_ag'>
                <Form.Label>Código:</Form.Label>
                <Form.Select id='cod_ag' required value={agencia_produto.cod_ag} onChange={manipularMudanca}>
                  {filtrarEnderecos.map((agencia) => (
                    <option key={agencia.cod_ag} value={agencia.cod_ag}>
                      {agencia.cod_ag}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>Informe o código da agência!</Form.Control.Feedback>
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
