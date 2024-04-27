import Agencia from '../Modelo/Agencia.js';
import conectar from './Conexao.js';

export default class AgenciaBD {
  // ------------------------------------CADASTRAR AGÊNCIA NO BANCO DE DADOS------------------------------------
  async cadastrar(agencia) {
    if (agencia instanceof Agencia) {
      const conexao = await conectar();
      const sql = 'INSERT INTO Agencia (endereco, cidade, uf) VALUES(?,?,?)';
      const parametros = [agencia.endereco, agencia.cidade, agencia.uf];
      const resultado = await conexao.query(sql, parametros);
      return await resultado[0].insertId;
    }
    pool.releaseConnection(conexao);
  }

  // ------------------------------------ALTERAR AGÊNCIA NO BANCO DE DADOS------------------------------------
  async alterar(agencia) {
    if (agencia instanceof Agencia) {
      const conexao = await conectar();
      const sql = 'UPDATE Agencia SET endereco=? WHERE cod_ag=?';
      const parametros = [agencia.endereco, agencia.cod_ag];
      await conexao.query(sql, parametros);
      pool.releaseConnection();
    }
  }

  // ------------------------------------EXCLUIR AGÊNCIA DO BANCO DE DADOS------------------------------------
  async excluir(agencia) {
    if (agencia instanceof Agencia) {
      const conexao = await conectar();
      const sqlCliente = 'DELETE FROM Cliente WHERE cod_ag=?';
      const sqlAgencia = 'DELETE FROM Agencia WHERE cod_ag =?';
      const parametros = [agencia.cod_ag, agencia.cod_ag];
      await conexao.query(sqlCliente, parametros);
      await conexao.query(sqlAgencia, parametros);
      pool.releaseConnection(conexao);
    }
  }

  // ------------------------------------LISTAR AGÊNCIAS NO BANCO DE DADOS------------------------------------
  async listar() {
    const conexao = await conectar();
    const sql = 'SELECT * FROM Agencia';
    const parametros = ['%'];
    const [rows] = await conexao.query(sql, parametros);
    const listaAgencias = [];
    for (const row of rows) {
      const agencia = new Agencia(row['cod_ag'], row['endereco'], row['cidade'], row['uf']);
      listaAgencias.push(agencia);
    }
    pool.releaseConnection(conexao);
    return listaAgencias;
  }

  // ------------------------------------ASSOCIAR PRODUTO A AGÊNCIA------------------------------------
  // async associarProdutoAgencia(agencia_produto) {
  //   if (agencia_produto instanceof Agencia_Produto) {
  //     const conexao = await conectar();
  //     const sql = 'INSERT INTO Agencia_Produto (cod_ag, cod_prod) VALUES(?,?)';
  //     const parametros = [agencia_produto.cod_ag, agencia_produto.cod_prod];
  //     await conexao.query(sql, parametros);
  //   }
  // }
}
