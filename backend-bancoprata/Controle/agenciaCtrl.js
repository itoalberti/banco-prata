import Agencia from '../Modelo/Agencia.js';

export default class AgenciaCtrl {
  // ----------------------CADASTRAR----------------------
  cadastrar(req, resp) {
    resp.type('application/json');
    if (req.method === 'POST') {
      const dados = req.body;
      const endereco = dados.endereco;
      const cidade = dados.cidade;
      const uf = dados.uf;
    }

    if (endereco && cidade && uf) {
      const agencia = new Agencia(0, endereco, cidade, uf);
      console.log('Agência cadastrada no endereço ' + agencia.endereco + ', cidade de ' + endereco.cidade);
    }
  }
  // ----------------------ALTERAR----------------------
  // ----------------------EXCLUIR----------------------
  // ----------------------CONSULTAR----------------------
}
