import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { hostname, port } from '../dados/dados';
import { useNavigate } from 'react-router-dom';

import Pagina from '../templates/Pagina';
const urlAgencia = `http://${hostname}:${port}/agencia`;
const urlProduto = `http://${hostname}:${port}/produto`;

const TelaAssociarProdutoAgencia = () => {
  const [validado, setValidado] = useState(false);
  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [cods, setCods] = useState([]);
  const [ufSelecionada, setUfSelecionada] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  // const [enderecoSelecionado, setEnderecoSelecionado] = useState('');
  const [codSelecionado, setCodSelecionado] = useState('');
  const [agencias, setAgencias] = useState([]);
  const [associacao, set_agencia_produto] = useState({ cod_ag: '', cod_prod: '' });
  const [listaProdutos, setListaProdutos] = useState([]);
  useEffect(() => {
    fetch(urlProduto)
      .then((resp) => resp.json())
      .then((data) => {
        setListaProdutos(data);
      })
      .catch((erro) => console.error('Erro ao buscar produtos', erro));
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate(path);
  };

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    set_agencia_produto({ ...associacao, [id]: valor });
  }

  useEffect(() => {
    fetch(urlAgencia)
      .then((resp) => resp.json())
      .then((data) => {
        setAgencias(data);
      })
      .catch((erro) => console.error('Erro ao buscar agências', erro));
  }, []);

  useEffect(() => {
    const ufs = [...new Set(agencias.map((agencia) => agencia.uf))];
    setUfs(ufs);
  }, [agencias]);

  useEffect(() => {
    const cidades = [...new Set(agencias.filter((agencia) => agencia.uf === ufSelecionada).map((agencia) => agencia.cidade))];
    setCidades(cidades);
  }, [ufSelecionada, agencias]);

  useEffect(() => {
    const enderecos = [...new Set(agencias.filter((agencia) => agencia.cidade === cidadeSelecionada).map((agencia) => agencia.endereco))];
    setEnderecos(enderecos);
    const cods = [...new Set(agencias.filter((agencia) => agencia.cod_ag === cidadeSelecionada).map((agencia) => agencia.cod_ag))];
    setCods(cods);
  }, [cidadeSelecionada, agencias]);

  const manipularMudancaUf = (e) => {
    setUfSelecionada(e.target.value);
  };

  const manipularMudancaCidade = (e) => {
    setCidadeSelecionada(e.target.value);
  };

  const manipularMudancaEndereco = (e) => {
    const enderecoSelecionado = e.target.value;
    const agenciaSelecionada = agencias.find((agencia) => agencia.endereco === enderecoSelecionado);
    setCodSelecionado(agenciaSelecionada.cod_ag);
  };
  // function manipulaSubmissao(e) {
  //   const form = e.currentTarget;
  //   if (form.checkValidity()) {
  //     // dados válidos → proceder com o cadastro
  //     fetch(url_Agencia_Produto, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(agencia),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         let novasAgencias = [...props.listaAgencias, data];
  //         props.setAgencia(novasAgencias);
  //         setValidado(false);
  //       })
  //       .catch((error) => console.error('Erro ao cadastrar agência:', error));
  //   } else {
  //     setValidado(true);
  //   }
  //   e.preventDefault();
  //   e.stopPropagation();
  //   alert('Agência cadastrada com sucesso!');
  //   navigate('/');
  // }

  return (
    <>
      <Pagina>
        <h2>Associar produto a agência</h2>
        <br />
        <h4>Agência</h4>
        <Form
          noValidate
          validated={validado}
          // onSubmit={manipulaSubmissao}
        >
          <Row className='mb-3'>
            {/********************** UF **********************/}
            <Col xs='auto'>
              <Form.Group controlId='uf'>
                <Form.Label>UF:</Form.Label>
                <Form.Select id='uf' required onChange={manipularMudancaUf}>
                  <option value=''></option>
                  {ufs.map((uf, index) => (
                    <option key={index} value={uf}>
                      {uf}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback style={{ width: '200px' }} type='invalid'>
                  Informe a UF da agência!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/********************** CIDADE **********************/}
            <Col xs='auto'>
              <Form.Group controlId='cidade'>
                <Form.Label>Cidade:</Form.Label>
                <Form.Select id='cidade' required onChange={manipularMudancaCidade}>
                  <option></option>
                  {cidades.map((cidade, index) => (
                    <option key={index} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            {/********************** ENDEREÇO *********************/}
            <Col xs='auto'>
              <Form.Group controlId='endereco'>
                <Form.Label>Endereço:</Form.Label>
                <Form.Select id='endereco' required onChange={manipularMudancaEndereco}>
                  <option></option>
                  {enderecos.map((endereco, index) => (
                    <option key={index} value={endereco}>
                      {endereco}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            {/********************** CÓDIGO DA AGÊNCIA *********************/}
            <Col xs='auto'>
              <Form.Group controlId='cod_ag'>
                <Form.Label>Código:</Form.Label>
                {/* <Form.Control value={codSelecionado?.cod_ag} disabled /> */}
                <Form.Control value={codSelecionado ?? ''} disabled />
              </Form.Group>
            </Col>
          </Row>

          <br />
          <Row className='mb-3'>
            <h4>Produto</h4>
            {/* PRODUTO */}
            <Form.Group style={{ width: '320px' }}>
              {/* <Form.Label></Form.Label> */}
              <Form.Select required onChange={manipularMudanca} value={associacao.cod_prod} id='cod_prod'>
                <option value=''></option>
                {listaProdutos.map((produto) => (
                  <option key={produto.cod_prod} value={produto.cod_prod}>
                    {produto.cod_prod}: {produto.nome}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>Informe a agência da nova conta!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row className='mb-3'>
            {/* BOTÃO DE CADASTRAR */}
            <Col xs='auto'>
              <Button variant='dark' type='submit'>
                Associar produto à agência
              </Button>
            </Col>
            <br />
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
};

export default TelaAssociarProdutoAgencia;
