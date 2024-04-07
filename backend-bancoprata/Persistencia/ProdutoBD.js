import Produto from '../Modelo/Produto.js';
import conectar from './Conexao.js';

export default class ProdutoBD {
  // ------------------------------------CADASTRAR PRODUTO NO BANCO DE DADOS------------------------------------
  async cadastrar(produto) {
    if (produto instanceof Produto) {
      const conexao = await conectar();
      const sql = 'INSERT INTO Produto (nome) VALUE(?)';
      const parametros = [produto.nome];
      const resultado = await conexao.query(sql, parametros);
      return await resultado[0].insertId;
    }
    pool.releaseConnection(conexao);
  }

  // ------------------------------------EXCLUIR PRODUTO DO BANCO DE DADOS------------------------------------
  async excluir(produto) {
    if (produto instanceof Produto) {
      const conexao = await conectar();
      const sql = 'DELETE FROM Produto WHERE cod_prod=?';
      const parametros = [produto.cod_prod];
      await conexao.query(sql, parametros);
      pool.releaseConnection(conexao);
    }
  }

  // ------------------------------------CONSULTAR PRODUTOS NO BANCO DE DADOS------------------------------------
  async listar() {
    const conexao = await conectar();
    const sql = 'SELECT * FROM Produto';
    const parametros = ['%'];
    const [rows] = await conexao.query(sql, parametros);
    const listaProdutos = [];
    for (const row of rows) {
      const produto = new Produto(row['cod_prod'], row['nome']);
      listaProdutos.push(produto);
    }
    pool.releaseConnection(conexao);
    return listaProdutos;
  }

  // ------------------------------------ALTERAR PRODUTO NO BANCO DE DADOS------------------------------------
  // async alterar(produto) {
  //   if (produto instanceof Produto) {
  //     const conexao = await conectar();
  //     const sql = 'UPDATE Produto SET endereco=? WHERE cod_ag=?';
  //     const parametros = [produto.endereco, produto.cod_ag];
  //     await conexao.query(sql, parametros);
  //     pool.releaseConnection();
  //   }
  // }

  // ------------------------------------ASSOCIAR PRODUTO A PRODUTO------------------------------------
  // async associarProdutoAgencia(agencia_produto) {
  //   if (agencia_produto instanceof Agencia_Produto) {
  //     const conexao = await conectar();
  //     const sql = 'INSERT INTO Agencia_Produto (cod_ag, cod_prod) VALUES(?,?)';
  //     const parametros = [agencia_produto.cod_ag, agencia_produto.cod_prod];
  //     await conexao.query(sql, parametros);
  //   }
  // }
}
