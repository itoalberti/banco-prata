import mockClientes from '../dados/mockClientes';
import { Button, Container, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { hostname, port } from '../dados/dados';
import { useNavigate } from 'react-router-dom';

import Pagina from '../templates/Pagina';
const urlCliente = `http://${hostname}:${port}/cliente`;

export default function TelaExibirClientes(props) {
  const [listaClientes, setListaClientes] = useState([]);

  // function excluirCliente(cod_cli) {
  //   fetch(`${urlCliente}/${cod_cli}`, {
  //     method: 'DELETE',
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       // Remova o cliente da lista no estado do componente
  //       const listaAtualizada = listaClientes.filter((cliente) => cliente.cod_cli !== cod_cli);
  //       setListaClientes(listaAtualizada);
  //     })
  //     .catch((error) => console.error('Erro ao excluir cliente:', error));
  // }
  // function excluirCliente(cod_cli) {
  //   fetch(urlCliente, {
  //     method: 'DELETE',
  //     body: JSON.stringify({ cod_cli: cod_cli }),
  //   })
  //   const listaAtualizada = listaClientes.filter((cliente) => cliente.cod_cli !== cod_cli);
  //   setListaClientes(listaAtualizada);
  // }
  function excluirCliente(props) {
    fetch(urlCliente, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        cod_cli: props,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        console.log(resp);
        alert(resp.msg);
      });
  }

  useEffect(() => {
    fetch(urlCliente)
      .then((resp) => resp.json())
      .then((data) => {
        setListaClientes(data);
      })
      .catch((erro) => console.error('Erro ao buscar agências', erro));
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate(path);
  };

  return (
    <Pagina>
      <Container style={{ width: '100vw' }}>
        <br />
        <Table striped bordered hover variant='dark' style={{ fontSize: '0.8rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Cód.</th>
              <th style={{ textAlign: 'center' }}>Ag.</th>
              <th>Nome</th>
              <th>CPF</th>
              <th style={{ textAlign: 'center' }}>Data Nasc.</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th style={{ textAlign: 'center' }}>UF</th>
              <th>Email</th>
              <th>Telefone</th>
              {/* <th style={{ width: '5%' }}>Senha</th> */}
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* ? →  método map só será chamado se listaClientes for um atributo válido */}
            {listaClientes?.map((cliente) => {
              return (
                //   necessário identificar cada linha da tabela usando "key"
                // key → ajuda o React na rendereização dos componentes no DOM virtual
                <tr key={cliente.cod_cli}>
                  <td style={{ textAlign: 'center' }}>{cliente.cod_cli}</td>
                  <td style={{ textAlign: 'center' }}>{cliente.cod_ag}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  <td style={{ textAlign: 'center' }}>{cliente.dataNasc}</td>
                  <td>{cliente.endereco}</td>
                  <td>{cliente.cidade}</td>
                  <td style={{ textAlign: 'center' }}>{cliente.uf}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button
                        style={{ marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px', padding: '0' }}
                        title='Editar'
                        variant='primary'
                        onClick={() => {
                          navigate('/alterarcliente', {
                            state: {
                              // Dados imutáveis: Tipo, nome, CPF, RG, data de nascimento e gênero
                              cod_cli: cliente.cod_cli,
                              nome: cliente.nome,
                              cpf: cliente.cpf,
                              dataNasc: cliente.dataNasc,
                              endereco: cliente.endereco,
                              cidade: cliente.cidade,
                              uf: cliente.uf,
                              telefone: cliente.telefone,
                              email: cliente.email,
                              senha: cliente.senha,
                              cod_ag: cliente.cod_ag,
                            },
                          });
                        }}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' width='12.8' height='12.8' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
                          <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325' />
                        </svg>
                      </Button>
                      <Button
                        size='sm'
                        style={{ marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px', padding: '0' }}
                        variant='danger'
                        title='Excluir'
                        // EXCLUIR CLIENTE
                        onClick={() => {
                          if (window.confirm('Deseja excluir o cliente ' + cliente.cod_cli + '?')) {
                            excluirCliente(cliente.cod_cli);
                          }
                        }}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash3' viewBox='0 0 16 16'>
                          <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
                        </svg>
                      </Button>
                    </div>
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
