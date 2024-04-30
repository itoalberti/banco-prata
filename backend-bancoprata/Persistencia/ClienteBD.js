// OK
import Agencia from '../Modelo/Agencia.js';
import Cliente from '../Modelo/Cliente.js';
import conectar from './Conexao.js';

export default class ClienteBD {
  // ------------------------------------CADASTRAR CLIENTE NO BANCO DE DADOS------------------------------------
  async cadastrar(cliente) {
    if (cliente instanceof Cliente) {
      // const conexao = await conectar();
      // O correto para dar INSERT é inserir apenas a chave estrangeira cod_ag, e não o objeto inteiro
      const sql = 'INSERT INTO Cliente (nome, cpf, dataNasc, email, telefone, endereco, cidade, uf, cod_ag) VALUES(?,?,?,?,?,?,?,?,?)';
      // Para os parâmetros, o correto é inserir Cliente.agencia.cod_ag
      const parametros = [cliente.nome, cliente.cpf, cliente.dataNasc, cliente.email, cliente.telefone, cliente.endereco, cliente.cidade, cliente.uf, cliente.agencia.cod_ag];
      const conexao = await conectar();
      const resultado = await conexao.query(sql, parametros);
      cliente.cod_cli = resultado[0].insertId;
      conexao.release();
      // return await resultado[0].insertId;
    }
    // pool.releaseConnection(conexao);
  }

  // ------------------------------------ALTERAR CLIENTE NO BANCO DE DADOS------------------------------------
  // Dados passíveis de serem alterados: email, telefone, endereço, cidade, UF e cod_ag
  async alterar(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar();
      // O correto para dar UPDATE é inserir apenas a chave estrangeira cod_ag, e não o objeto inteiro
      const sql = 'UPDATE Cliente SET email=?, telefone=?, endereco=?, cidade=?, uf=?, cod_ag=? WHERE cod_cli=?';
      // Também está correto chamar cliente.agencia.cod_ag em vez de cod_ag nos parâmetros
      const parametros = [cliente.email, cliente.telefone, cliente.endereco, cliente.cidade, cliente.uf, cliente.agencia.cod_ag, cliente.cod_cli];
      await conexao.query(sql, parametros);
      // pool.releaseConnection();
      conexao.release();
    }
  }

  // ------------------------------------EXCLUIR CLIENTE DO BANCO DE DADOS------------------------------------
  async excluir(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar();
      const sql = 'DELETE FROM Cliente WHERE cod_cli=?';
      const parametros = [cliente.cod_cli];
      await conexao.query(sql, parametros);
      // pool.releaseConnection(conexao);
      conexao.release();
    }
  }

  // ------------------------------------CONSULTAR CLIENTES NO BANCO DE DADOS------------------------------------
  async listar() {
    const conexao = await conectar();
    const sql = `SELECT * FROM Cliente
    INNER JOIN Agencia
     ON Cliente.cod_ag = Agencia.cod_ag`;
    // const parametros = ['%'];
    const [rows] = await conexao.query(sql);
    const listaClientes = [];
    for (const row of rows) {
      const agencia = new Agencia(row.cod_ag, row.endereco, row.cidade, row.uf);
      const cliente = new Cliente(row.cod_cli, row.nome, row.cpf, row.dataNasc, row.email, row.telefone, row.endereco, row.cidade, row.uf, row.agencia.cod_ag);
      listaClientes.push(cliente);
    }
    // pool.releaseConnection(conexao);
    conexao.release();
    return listaClientes;
  }

  // ------------------------------------ASSOCIAR PRODUTO A CLIENTE------------------------------------
  // async associarProdutoAgencia(contratacao) {
  //   if (contratacao instanceof Contratacao) {
  //     const conexao = await conectar();
  //     const sql = 'INSERT INTO Contratacao (cod_cli, cod_prod) VALUES(?,?)';
  //     const parametros = [contratacao.cod_cli, contratacao.cod_prod];
  //     await conexao.query(sql, parametros);
  //   }
  // }
}
