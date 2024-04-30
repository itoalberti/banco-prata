// CADASTRAR, EDITAR E EXCLUIR    OK
import conectar from '../Persistencia/Conexao.js';
import AgenciaBD from '../Persistencia/AgenciaBD.js';

export default class Agencia {
  #cod_ag;
  #endereco_ag;
  #cidade_ag;
  #uf_ag;

  constructor(cod_ag, endereco_ag, cidade_ag, uf_ag) {
    this.#cod_ag = cod_ag;
    this.#endereco_ag = endereco_ag;
    this.#cidade_ag = cidade_ag;
    this.#uf_ag = uf_ag;
  }

  // MÉTODOS PÚBLICOS

  // CÓDIGO DA AGÊNCIA
  get cod_ag() {
    return this.#cod_ag;
  }
  set cod_ag(novoCodigo) {
    this.#cod_ag = novoCodigo;
  }

  // ENDEREÇO DA AGÊNCIA
  get endereco_ag() {
    return this.#endereco_ag;
  }
  set endereco_ag(novoEnd_ag) {
    this.#endereco_ag = novoEnd_ag;
  }

  // CIDADE DA AGÊNCIA
  get cidade_ag() {
    return this.#cidade_ag;
  }
  set cidade_ag(novaCidade_ag) {
    this.#cidade_ag = novaCidade_ag;
  }

  // UF DA AGÊNCIA
  get uf_ag() {
    return this.#uf_ag;
  }
  set uf_ag(novaUf_ag) {
    this.#uf_ag = novaUf_ag;
  }

  toJSON() {
    return {
      cod_ag: this.#cod_ag,
      endereco_ag: this.#endereco_ag,
      cidade_ag: this.#cidade_ag,
      uf_ag: this.#uf_ag,
    };
  }

  // ------------------------------------CADASTRAR AGÊNCIA------------------------------------
  async cadastrarBD() {
    const agenciaBD = new AgenciaBD();
    this.#cod_ag = await agenciaBD.cadastrar(this);
  }

  // ------------------------------------ALTERAR AGÊNCIA ------------------------------------
  async alterarBD() {
    const agenciaBD = new AgenciaBD();
    await agenciaBD.alterar(this);
  }
  // ------------------------------------EXCLUIR AGÊNCIA------------------------------------
  async excluirBD() {
    const agenciaBD = new AgenciaBD();
    await agenciaBD.excluir(this);
  }

  // ------------------------------------LISTAR AGÊNCIAS------------------------------------
  async listarBD(cod_ag) {
    if (cod_ag == undefined) {
      const conexao = await conectar();
      const sql = 'SELECT * FROM Agencia';
      const parametros = ['%'];
      const [rows] = await conexao.query(sql, parametros);
      const listaAgencias = [];
      for (const row of rows) {
        const agencia = new Agencia(row['cod_ag'], row['endereco_ag'], row['cidade_ag'], row['uf_ag']);
        listaAgencias.push(agencia);
      }
      return listaAgencias;
    } else {
      const conexao = await conectar();
      const sql = 'SELECT * FROM Agencia WHERE cod_ag=?';
      const parametros = [cod_ag];
      const [rows] = await conexao.query(sql, parametros);
      const listaAgencias = [];
      for (const row of rows) {
        const agencia = new Agencia(row['cod_ag'], row['endereco_ag'], row['cidade_ag'], row['uf_ag']);
        listaAgencias.push(agencia);
      }
      return listaAgencias[0];
    }
  }
}
