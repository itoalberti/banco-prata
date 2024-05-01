// CADASTRAR, EDITAR E EXCLUIR    OK
import Agencia from '../Modelo/Agencia.js';
import conectar from './Conexao.js';

export default class AgenciaBD {
  // ------------------------------------CADASTRAR AGÊNCIA NO BANCO DE DADOS------------------------------------
  async cadastrar(agencia) {
    if (agencia instanceof Agencia) {
      const conexao = await conectar();
      const sql = 'INSERT INTO Agencia (endereco_ag, cidade_ag, uf_ag) VALUES(?,?,?)';
      const parametros = [agencia.endereco_ag, agencia.cidade_ag, agencia.uf_ag];
      const resultado = await conexao.query(sql, parametros);
      return await resultado[0].insertId;
    }
    // pool.releaseConnection(conexao);
    conexao.release();
  }

  // ------------------------------------ALTERAR AGÊNCIA NO BANCO DE DADOS------------------------------------
  async alterar(agencia) {
    if (agencia instanceof Agencia) {
      const conexao = await conectar();
      const sql = 'UPDATE Agencia SET endereco_ag=? WHERE cod_ag=?';
      const parametros = [agencia.endereco_ag, agencia.cod_ag];
      await conexao.query(sql, parametros);
      // pool.releaseConnection();
      conexao.release();
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
      // pool.releaseConnection(conexao);
      conexao.release();
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
      const agencia = new Agencia(row['cod_ag'], row['endereco_ag'], row['cidade_ag'], row['uf_ag']);
      listaAgencias.push(agencia);
    }
    // pool.releaseConnection(conexao);
    conexao.release();
    return listaAgencias;
  }

  // ------------------------------------ASSOCIAR PRODUTO A AGÊNCIA------------------------------------
  // async associarProdutoAgencia(associacao) {
  //   if (associacao instanceof Associacao) {
  //     const conexao = await conectar();
  //     const sql = 'INSERT INTO Associacao (cod_ag, cod_prod) VALUES(?,?)';
  //     const parametros = [associacao.cod_ag, associacao.cod_prod];
  //     await conexao.query(sql, parametros);
  //   }
  // }
}
