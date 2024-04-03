// ► ► ► ► ► ► ► ► ► ►  OK ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄
import Agencia from '../Modelo/Agencia.js';
import conectar from './Conexao.js';

export default class AgenciaBD {
  async cadastrarBD(agencia) {
    if (agencia instanceof Agencia) {
      const conexao = await conectar();
      await conexao.beginTransaction();
      try {
        const sql = 'INSERT INTO Agencia(endereco, cidade, uf) VALUES(?,?,?)';
        const parametros = [agencia.endereco, agencia.cidade, agencia.uf];
        const resp = await conexao.execute(sql, parametros);
        agencia.cod_ag = resp[0].insertId;
        await conexao.commit();
      } catch (erro) {
        await conexao.rollback();
        throw erro;
      } finally {
        conexao.release();
      }
    }
  }

  async alterarBD(agencia) {
    if (agencia instanceof Agencia) {
      const conexao = await conectar();
      await conexao.beginTransaction();
      try {
        const sql = 'UPDATE Agencia SET endereco=? WHERE cod_ag=?';
        const parametros = [agencia.endereco, agencia.cod_ag];
        await conexao.execute(sql, parametros);
        await conexao.commit();
      } catch (erro) {
        await conexao.rollback();
        throw erro;
      } finally {
        conexao.release();
      }
    }
  }

  async excluirBD(agencia) {
    if (agencia instanceof Agencia) {
      const conexao = await conectar();
      await conexao.beginTransaction();
      try {
        const sql = 'DELETE FROM Agencia WHERE cod_ag=?';
        const parametros = [agencia.cod_ag];
        await conexao.execute(sql, parametros);
        await conexao.commit();
      } catch (erro) {
        await conexao.rollback();
        throw erro;
      } finally {
        conexao.release();
      }
    }
  }

  async consultarBD() {
    const conexao = await conectar();
    const sql = 'SELECT * FROM Agencia';
    const parametros = ['%'];
    const [rows] = await conexao.query(sql, parametros);
    const listaAgencias = [];
    for (const row of rows) {
      // const agencia = new Agencia(row['cod_ag'], row['endereco'], row['cidade'], row['uf']);
      const agencia = new Agencia(row.cod_ag, row.endereco, row.cidade, row.uf);
      listaAgencias.push(agencia);
    }
    conexao.release();
    return listaAgencias;
  }
}
