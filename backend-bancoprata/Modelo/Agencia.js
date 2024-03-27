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

  // ----------------------ALTERAR----------------------

  // ----------------------EXCLUIR----------------------

  // ----------------------CONSULTAR----------------------
}
