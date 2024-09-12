import { Button, Col, Container, Table } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import listaAgencias from '../dados/mockAgencias';
import { Link, useNavigate } from 'react-router-dom';

export default function TelaExibirAgencias(props) {
  const [agencias, setAgencias] = useState([]);
  const [selecionado, setSelecionado] = useState([]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate(path);
  };

  // function buscarAgencias() {
  //   fetch('https://localhost:3000/consultaragencias', { method: 'GET' })
  //     .then((resp) => resp.json)
  //     .then((retorno) => {
  //       if (retorno.status) {
  //         setAgencias(retorno.listaAgencias);
  //       } else {
  //         setAgencias([
  //           {
  //             id: 0,
  //           },
  //         ]);
  //       }
  //     });
  //   setAgencias();
  // }

  return (
    <Pagina>
      <Container>
        {/* <Col> */}
        {/* <CaixaSelecao endFonteDados='https://jsonplaceholder.typicode.com/users' campoChave='id' campoExibicao='name' funcaoSelecao={setSelecionado} /> */}
        {/* <CaixaSelecao endFonteDados='https://localhost:3001/agencia' campoChave='cidade' campoExibicao='endereco' funcaoSelecao={setSelecionado} /> */}
        {/* </Col> */}
        <br />
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Código da agência</th>
              <th style={{ width: '30%' }}>Endereço</th>
              <th style={{ width: '15%' }}>Cidade</th>
              <th style={{ width: '15%' }}>UF</th>
              <th style={{ width: '15%' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* ? →  método map só será chamado se listaClientes for um atributo válido */}
            {listaAgencias?.map((agencia) => {
              return (
                //   necessário identificar cada linha da tabela usando "key"
                // key → ajuda o React na rendereização dos componentes no DOM virtual
                <tr key={agencia.cod_ag}>
                  <td>{agencia.cod_ag}</td>
                  <td>{agencia.endereco}</td>
                  <td>{agencia.cidade}</td>
                  <td>{agencia.uf}</td>
                  <td>
                    <cell style={{ paddingRight: '10px' }}>
                      <Button variant='outline-warning'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-pencil'
                          viewBox='0 0 16 16'
                          // onClick={() => {
                          //   console.log('ALTERAR AGÊNCIA');
                          // }}
                          // onClick={routeChange}
                        >
                          <Link to={'uol.com.br'}>
                            <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.</Link>821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325' />
                          </Link>
                        </svg>
                      </Button>
                    </cell>
                    <cell>
                      <Button variant='outline-danger'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-trash3'
                          viewBox='0 0 16 16'
                          onClick={() => {
                            props.excluir(agencia);
                          }}
                        >
                          <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
                        </svg>
                      </Button>
                    </cell>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <LinkContainer to='/'>
        <Button variant='dark'>Voltar</Button>
      </LinkContainer>
    </Pagina>
  );
}

//____________________________CÓDIGO MAIS NOVO, COPIADO DE TelaConsultarContas.jsx____________________________