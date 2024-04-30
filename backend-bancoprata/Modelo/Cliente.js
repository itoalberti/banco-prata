// OK
import conectar from '../Persistencia/Conexao.js';
import ClienteBD from '../Persistencia/ClienteBD.js';
import Agencia from './Agencia.js';

export default class Cliente {
  #cod_cli;
  #nome;
  #cpf;
  #dataNasc;
  #email;
  #telefone;
  #endereco;
  #cidade;
  #uf;
  #agencia;

  constructor(cod_cli, nome, cpf, dataNasc, email, telefone, endereco, cidade, uf, agencia = {}) {
    this.#cod_cli = cod_cli;
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNasc = dataNasc;
    this.#email = email;
    this.#telefone = telefone;
    this.#endereco = endereco;
    this.#cidade = cidade;
    this.#uf = uf;
    this.#agencia = agencia; //Objeto do tipo Agência
  }

  // MÉTODOS PÚBLICOS

  // ---------CÓDIGO DO CLIENTE---------
  get cod_cli() {
    return this.#cod_cli;
  }
  set cod_cli(novoCod_Cli) {
    this.#cod_cli = novoCod_Cli;
  }

  // ---------NOME DO CLIENTE---------
  get nome() {
    return this.#nome;
  }
  set nome(novoNome) {
    this.#nome = novoNome;
  }

  // ---------CPF DO CLIENTE---------
  get cpf() {
    return this.#cpf;
  }
  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  // ---------DATA DE NASCIMENTO DO CLIENTE---------
  get dataNasc() {
    return this.#dataNasc;
  }
  set dataNasc(novaDataNasc) {
    this.#dataNasc = novaDataNasc;
  }

  // ---------EMAIL DO CLIENTE---------
  get email() {
    return this.#email;
  }
  set email(novoEmail) {
    this.#email = novoEmail;
  }

  // ---------TELEFONE DO CLIENTE---------
  get telefone() {
    return this.#telefone;
  }
  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  // ---------ENDEREÇO DO CLIENTE---------
  get endereco() {
    return this.#endereco;
  }
  set endereco(novoEndereco) {
    this.#endereco = novoEndereco;
  }

  // ---------CIDADE DO CLIENTE---------
  get cidade() {
    return this.#cidade;
  }
  set cidade(novaCidade) {
    this.#cidade = novaCidade;
  }

  // ---------UF DO CLIENTE---------
  get uf() {
    return this.#uf;
  }
  set uf(novaUf) {
    this.#uf = novaUf;
  }

  // ---------AGÊNCIA DO CLIENTE---------
  get agencia() {
    return this.#agencia;
  }
  set agencia(novaAgencia) {
    this.#agencia = novaAgencia;
  }

  toJSON() {
    return {
      cod_cli: this.#cod_cli,
      nome: this.#nome,
      cpf: this.#cpf,
      dataNasc: this.#dataNasc,
      email: this.#email,
      telefone: this.#telefone,
      endereco: this.#endereco,
      cidade: this.#cidade,
      uf: this.#uf,
      agencia: this.#agencia,
    };
  }

  // --------------------------------------CADASTRAR CLIENTE--------------------------------------
  async cadastrarBD() {
    const clienteBD = new ClienteBD();
    this.#cod_cli = await clienteBD.cadastrar(this);
  }

  // ------------------------------------ALTERAR CLIENTE------------------------------------
  async alterarBD() {
    const clienteBD = new ClienteBD();
    await clienteBD.alterar(this);
  }
  // ------------------------------------EXCLUIR CLIENTE------------------------------------
  async excluirBD() {
    const clienteBD = new ClienteBD();
    await clienteBD.excluir(this);
  }

  // ------------------------------------CONSULTAR CLIENTES------------------------------------
  async listarBD(cod_cli) {
    if (cod_cli == undefined) {
      const conexao = await conectar();
      const sql = `SELECT * FROM Cliente
      INNER JOIN Agencia
      ON Cliente.cod_ag = Agencia.cod_ag;`;
      const parametros = ['%'];
      const [rows] = await conexao.query(sql, parametros);
      const listaClientes = [];
      for (const row of rows) {
        const agencia = new Agencia(row.cod_ag, row.endereco_ag, row.cidade_ag, row.uf_ag);
        const cliente = new Cliente(row.cod_cli, row.nome, row.cpf, row.dataNasc, row.email, row.telefone, row.endereco, row.cidade, row.uf, agencia);
        listaClientes.push(cliente);
      }
      return listaClientes;
    } else {
      const conexao = await conectar();
      const sql = `SELECT * FROM Cliente
      INNER JOIN Agencia
      ON Cliente.cod_ag = Agencia.cod_ag;`;
      const parametros = [cod_cli];
      const [rows] = await conexao.query(sql, parametros);
      const listaClientes = [];
      for (const row of rows) {
        // const cliente = new Cliente(row['cod_cli'], row['nome'], row['cpf'], row['dataNasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['uf'], row['cod_ag'], row['agencia.endereco'], row['agencia.cidade'], row['uf']);
        const agencia = new Agencia(row.cod_ag, row.endereco_ag, row.cidade_ag, row.uf_ag);
        const cliente = new Cliente(row.cod_cli, row.nome, row.cpf, row.dataNasc, row.email, row.telefone, row.endereco, row.cidade, row.uf, agencia);
        listaClientes.push(cliente);
      }
      return listaClientes[0];
    }
  }
}
