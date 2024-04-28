import Produto from '../Modelo/Produto.js';
import conectar from './Conexao.js';

export default class ProdutoBD {
  // ------------------------------------CADASTRAR PRODUTO NO BANCO DE DADOS------------------------------------
  async cadastrar(produto) {
    if (produto instanceof Produto) {
      const conexao = await conectar();
      const sql = 'INSERT INTO Produto (nome, cod_ag), VALUE(?,?)';
      const parametros = [produto.nome, produto.agencia.cod_ag];
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
    // const sql = 'SELECT * FROM Produto';
    // Caso queira mostrar na tabela todas as agências onde o produto está associado:
    const sql = `SELECT * FROM Produto,
    INNER JOIN Agencia ON Produto.cod_ag = Agencia.cod_ag`;

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
  // async associarProdutoAgencia(associacao) {
  //   if (associacao instanceof Associacao) {
  //     const conexao = await conectar();
  //     const sql = 'INSERT INTO Associacao (cod_ag, cod_prod) VALUES(?,?)';
  //     const parametros = [associacao.cod_ag, associacao.cod_prod];
  //     await conexao.query(sql, parametros);
  //   }
  // }
}
