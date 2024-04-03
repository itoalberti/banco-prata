import AgenciaBD from '../Persistencia/AgenciaBD.js';

export default class Agencia {
  #cod_ag;
  #endereco;
  #cidade;
  #uf;

  constructor(cod_ag, endereco, cidade, uf) {
    this.#cod_ag = cod_ag;
    this.#endereco = endereco;
    this.#cidade = cidade;
    this.#uf = uf;
  }

  // CÓDIGO
  get cod_ag() {
    return this.#cod_ag;
  }
  set cod_ag(novoCodigo) {
    this.#cod_ag = novoCodigo;
  }
  // ENDEREÇO
  get endereco() {
    return this.#endereco;
  }
  set endereco(novoEndereco) {
    this.#endereco = novoEndereco;
  }
  // CIDADE
  get cidade() {
    return this.#cidade;
  }
  set cidade(novaCidade) {
    this.#cidade = novaCidade;
  }
  // UF
  get uf() {
    return this.#uf;
  }
  set uf(novaUf) {
    this.#uf = novaUf;
  }

  toJSON() {
    return {
      cod_ag: this.#cod_ag,
      endereco: this.#endereco,
      cidade: this.#cidade,
      uf: this.#uf,
    };
  }

  // FUNÇÕES

  // ----------------------CADASTRAR----------------------
  async cadastrarBD() {
    const agenciaBD = new AgenciaBD();
    this.cod_ag = await agenciaBD.cadastrarBD(this);
  }

  // ----------------------ALTERAR----------------------
  async alterarBD() {
    const agenciaBD = new AgenciaBD();
    await agenciaBD.alterarBD(this);
  }
  // ----------------------EXCLUIR----------------------
  async excluirBD() {
    const agenciaBD = new AgenciaBD();
    await agenciaBD.excluirBD(this);
  }
  // ----------------------CONSULTAR----------------------
  async consultarBD(cod_ag) {
    if (cod_ag == undefined) {
      const conexao = await conectar();
      const sql = 'SELECT * FROM Agencia';
      const parametros = ['%'];
      const [rows] = await conexao.query(sql, parametros);
      const listaAgencias = [];
      for (const row of rows) {
        const agencia = new Agencia(row['cod_ag'], row['endereco'], row['cidade'], row['uf']);
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
        const agencia = new Agencia(row['cod_ag'], row['endereco'], row['cidade'], row['uf']);
        listaAgencias.push(agencia);
      }
      // PQ RETORNA [0] ?
      return listaAgencias[0];
    }
  }
}
