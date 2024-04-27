import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { hostname, port } from '../dados/dados';

import Pagina from '../templates/Pagina';
import { useNavigate } from 'react-router-dom';
const urlAgencia = `http://${hostname}:${port}/agencia`;

const TelaAssociarProdutoAgencia = () => {
  const [validado, setValidado] = useState(false);
  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [ufSelecionada, setUfSelecionada] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [enderecoSelecionado, setEnderecoSelecionado] = useState('');
  const [agencias, setAgencias] = useState([]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate(path);
  };

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
  }, [cidadeSelecionada, agencias]);

  const manipularMudancaUf = (e) => {
    setUfSelecionada(e.target.value);
  };

  const manipularMudancaCidade = (e) => {
    setCidadeSelecionada(e.target.value);
  };

  const manipularMudancaEndereco = (e) => {
    setEnderecoSelecionado(e.target.value);
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
                  <option value=''>Selecione uma cidade</option>
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
                  <option value=''>Selecione um endereço</option>
                  {enderecos.map((endereco, index) => (
                    <option key={index} value={endereco}>
                      {endereco}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Pagina>
    </>
  );
};

export default TelaAssociarProdutoAgencia;
