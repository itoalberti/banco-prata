import Cliente from '../Modelo/Cliente.js';
import conectar from './Conexao.js';

export default class ClienteBD {
  // ------------------------------------CADASTRAR CLIENTE NO BANCO DE DADOS------------------------------------
  async cadastrar(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar();
      const sql = 'INSERT INTO Cliente (nome, cpf, dataNasc, email, telefone, endereco, cidade, uf, cod_ag) VALUES(?,?,?,?,?,?,?,?,?)';
      const parametros = [cliente.nome, cliente.cpf, cliente.dataNasc, cliente.email, cliente.telefone, cliente.endereco, cliente.cidade, cliente.uf, cliente.cod_ag];
      const resultado = await conexao.query(sql, parametros);
      return await resultado[0].insertId;
    }
    pool.releaseConnection(conexao);
  }

  // ------------------------------------ALTERAR CLIENTE NO BANCO DE DADOS------------------------------------
  // Dados passíveis de serem alterados: email, telefone, endereço, cidade, UF e cod_ag
  async alterar(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar();
      const sql = 'UPDATE Cliente SET email=?, telefone=?, endereco=?, cidade=?, uf=?, cod_ag=? WHERE cod_cli=?';
      const parametros = [cliente.email, cliente.telefone, cliente.endereco, cliente.cidade, cliente.uf, cliente.cod_ag, cliente.cod_cli];
      await conexao.query(sql, parametros);
      pool.releaseConnection();
    }
  }

  // ------------------------------------EXCLUIR CLIENTE DO BANCO DE DADOS------------------------------------
  async excluir(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar();
      const sql = 'DELETE FROM Cliente WHERE cod_cli=?';
      const parametros = [cliente.cod_cli];
      await conexao.query(sql, parametros);
      pool.releaseConnection(conexao);
    }
  }

  // ------------------------------------CONSULTAR CLIENTES NO BANCO DE DADOS------------------------------------
  async consultar() {
    const conexao = await conectar();
    const sql = 'SELECT * FROM Cliente';
    const parametros = ['%'];
    const [rows] = await conexao.query(sql, parametros);
    const listaClientes = [];
    for (const row of rows) {
      const cliente = new Cliente(row['cod_cli'], row['nome'], row['cpf'], row['dataNasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['uf'], row['cod_ag']);
      listaClientes.push(cliente);
    }
    pool.releaseConnection(conexao);
    return listaClientes;
  }

  // ------------------------------------ASSOCIAR PRODUTO A CLIENTE------------------------------------
  // async associarProdutoAgencia(cliente_produto) {
  //   if (cliente_produto instanceof Cliente_Produto) {
  //     const conexao = await conectar();
  //     const sql = 'INSERT INTO Cliente_Produto (cod_cli, cod_prod) VALUES(?,?)';
  //     const parametros = [cliente_produto.cod_cli, cliente_produto.cod_prod];
  //     await conexao.query(sql, parametros);
  //   }
  // }
}
