import { Button, Col, Container, Table } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { hostname, port } from '../dados/dados';
import listaAgencias from '../dados/mockAgencias';
import { Link, useNavigate } from 'react-router-dom';

const urlAgencia = `http://${hostname}:${port}/agencia`;

export default function TelaExibirAgencias(props) {
  const [selecionado, setSelecionado] = useState([]);
  const [listaAgencias, setListaAgencias] = useState([]);
  useEffect(() => {
    fetch(urlAgencia)
      .then((resp) => resp.json())
      .then((data) => setListaAgencias(data))
      .catch((erro) => console.error('Erro ao buscar agências', erro));
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate(path);
  };

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
                      <Button
                        variant='primary'
                        style={{ marginRight: '5px' }}
                        onClick={() => {
                          props.alterarAgencia(agencia);
                        }}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square' viewBox='0 0 16 16'>
                          <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                          <path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z' />
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

// // ************************************************  BACKUP  ************************************************
// export default function TelaExibirAgencias(props) {
//   const [exibirTabela, setExibirTabela] = useState(true);
//   const [listaAgencias, setListaAgencias] = useState([]);
//   const [atualizar, setAtualizar] = useState(false);
//   const [agencia, setAgencia] = useState({
//     cod_ag: 0,
//     endereco: '',
//     cidade: '',
//     uf: '',
//   });

//   // ------------------------------------LISTAR AGÊNCIAS------------------------------------
//   async function listarAgencias() {
//     await fetch(urlAgencia, { method: 'GET' })
//       .then((resp) => resp.json())
//       .then((output) => {
//         if (output.status) {
//           setListaAgencias(output.listaAgencias);
//         } else {
//           alert(output.msg);
//         }
//       })
//       .catch((erro) => {
//         alert(`Erro: ${erro.message}`);
//       });
//   }
//   useEffect(() => {
//     if (exibirTabela) listarAgencias();
//   }, [exibirTabela]);

//   // ------------------------------------CADASTRAR AGÊNCIA------------------------------------
//   async function cadastrarAgencia(agencia) {
//     if (!atualizando) {
//       await fetch(urlCliente, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cliente),
//       })
//         .then((resposta) => resposta.json())
//         .then((retorno) => {
//           if (retorno.status) {
//             alert(retorno.mensagem + ' Código do cliente: ' + retorno.codigoGerado);
//           } else {
//             alert(retorno.mensagem);
//           }
//         })
//         .catch((erro) => {
//           alert('Erro: ' + erro.message);
//         });
//     } else {
//       await fetch(urlCliente, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cliente),
//       })
//         .then((resposta) => resposta.json())
//         .then((retorno) => {
//           if (retorno.status) {
//             alert(retorno.mensagem);
//           } else {
//             alert(retorno.mensagem);
//           }
//         })
//         .catch((erro) => {
//           alert('Erro: ' + erro.message);
//         });
//       setAtualizando(false);
//     }
//     setExibirTabela(true);
//     setClienteAtual(clienteVazio);
//   }

//   // ------------------------------------ALTERAR AGÊNCIA------------------------------------
//   // ------------------------------------EXCLUIR AGÊNCIA------------------------------------

//   return (
//     <Pagina>
//       <Container>
//         {/* <Col> */}
//         {/* <CaixaSelecao endFonteDados='https://jsonplaceholder.typicode.com/users' campoChave='id' campoExibicao='name' funcaoSelecao={setSelecionado} /> */}
//         {/* <CaixaSelecao endFonteDados='https://localhost:3001/agencia' campoChave='cidade' campoExibicao='endereco' funcaoSelecao={setSelecionado} /> */}
//         {/* </Col> */}
//         <br />
//         <Table striped bordered hover variant='dark'>
//           <thead>
//             <tr>
//               <th style={{ width: '15%' }}>Código da agência</th>
//               <th style={{ width: '30%' }}>Endereço</th>
//               <th style={{ width: '15%' }}>Cidade</th>
//               <th style={{ width: '15%' }}>UF</th>
//               <th style={{ width: '15%' }}>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* ? →  método map só será chamado se listaClientes for um atributo válido */}
//             {listaAgencias?.map((agencia) => {
//               return (
//                 //   necessário identificar cada linha da tabela usando "key"
//                 // key → ajuda o React na rendereização dos componentes no DOM virtual
//                 <tr key={agencia.cod_ag}>
//                   <td>{agencia.cod_ag}</td>
//                   <td>{agencia.endereco}</td>
//                   <td>{agencia.cidade}</td>
//                   <td>{agencia.uf}</td>
//                   <td>
//                     <cell style={{ paddingRight: '10px' }}>
//                       <Button
//                         variant='primary'
//                         style={{ marginRight: '5px' }}
//                         onClick={() => {
//                           props.alterarAgencia(agencia);
//                         }}
//                       >
//                         <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square' viewBox='0 0 16 16'>
//                           <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
//                           <path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z' />
//                         </svg>
//                       </Button>
//                     </cell>
//                     <cell>
//                       <Button variant='outline-danger'>
//                         <svg
//                           xmlns='http://www.w3.org/2000/svg'
//                           width='16'
//                           height='16'
//                           fill='currentColor'
//                           class='bi bi-trash3'
//                           viewBox='0 0 16 16'
//                           onClick={() => {
//                             props.excluir(agencia);
//                           }}
//                         >
//                           <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
//                         </svg>
//                       </Button>
//                     </cell>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </Container>
//       <LinkContainer to='/'>
//         <Button variant='dark'>Voltar</Button>
//       </LinkContainer>
//     </Pagina>
//   );
// }

// // function buscarAgencias() {
// //   fetch('https://localhost:3000/consultaragencias', { method: 'GET' })
// //     .then((resp) => resp.json)
// //     .then((retorno) => {
// //       if (retorno.status) {
// //         setAgencias(retorno.listaAgencias);
// //       } else {
// //         setAgencias([
// //           {
// //             id: 0,
// //           },
// //         ]);
// //       }
// //     });
// //   setAgencias();
// // }
