// ► ► ► ► ► ► ► ► ► ►  OK ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄
import Agencia from '../Modelo/Agencia.js';

export default class AgenciaCtrl {
  //
  // ----------------------CADASTRAR AGÊNCIA----------------------
  cadastrar(req, resp) {
    resp.type('application/json');
    if (req.method === 'POST' && req.is('application/json')) {
      const dados = req.body;
      const endereco = dados.endereco;
      const cidade = dados.cidade;
      const uf = dados.uf;

      if (endereco && cidade && uf) {
        const agencia = new Agencia(0, endereco, cidade, uf);

        agencia
          .cadastrarBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              cod_ag: agencia.cod_ag,
              msg: `Agência criada com sucesso!`,
            });
          })
          .catch((erro) => {
            resp.status(500).json({
              status: false,
              msg: erro.message,
            });
          });
      } else {
        resp.status(400).json({
          status: false,
          msg: 'Informe todos os dados da agencia: endereço, cidade e UF',
        });
      }
    } else {
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido ou a agência no formato JSON não foi fornecida.',
      });
    }
  }

  // ----------------------ALTERAR AGÊNCIA----------------------
  alterar(req, resp) {
    resp.type('application/json');
    if ((req.method === 'PUT' || req.method === 'PATCH') && req.is('application/json')) {
      const dados = req.body;
      const cod_ag = dados.cod_ag;
      const endereco = dados.endereco;
      const cidade = dados.cidade;
      const uf = dados.uf;

      // if (cod_ag && endereco && cidade && uf) {
      if (cod_ag && endereco && cidade && uf) {
        // alterar as informações da agência
        const agencia = new Agencia(cod_ag, endereco, cidade, uf);
        // chamando o método assíncrono alterar da camada de persistência
        agencia
          .alterarBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              msg: `Endereço da agência ${cod_ag} alterado com sucesso!`,
            });
          })
          .catch((erro) => {
            resp.status(500).json({
              status: false,
              msg: erro.message,
            });
          });
      } else {
        resp.status(400).json({
          status: false,
          msg: `Informe o novo endereço da agência ${cod_ag}.`,
        });
      }
    } else {
      // 4xx = 'Client error'
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido ou agência no formato JSON não foi fornecida. Consulte a documentação da API!',
      });
    }
  }

  // ----------------------EXCLUIR AGÊNCIA----------------------
  excluir(req, resp) {
    resp.type('application/json');
    if (req.method === 'DELETE' && req.is('application/json')) {
      const dados = req.body;
      // const cod_ag = dados.cod_ag;
      if (dados.cod_ag) {
        const agencia = new Agencia(dados.cod_ag);
        // agencia.cod_ag = dados.cod_ag;
        agencia
          .excluirBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              msg: `Agência ${agencia.cod_ag} excluída com sucesso!`,
            });
          })
          .catch((erro) => {
            resp.status(500).json({
              status: false,
              msg: erro.message,
            });
          });
      } else {
        resp.status(400).json({
          status: false,
          msg: 'Informe o código da agência a ser excluída.',
        });
      }
    } else {
      // 4xx = 'Client error'
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido ou agência no formato JSON não foi fornecida. Consulte a documentação da API!',
      });
    }
  }

  // ----------------------CONSULTAR AGÊNCIAS----------------------
  consultar(req, resp) {
    resp.type('application/json');

    if (req.method === 'GET') {
      const agencia = new Agencia();
      // // método assíncrono consultar da camada de persistência
      agencia
        .consultarBD()
        .then((agencias) => {
          resp.status(200).json(agencias);
        })
        .catch((erro) => {
          resp.status(500).json({
            status: false,
            msg: erro.message,
          });
        });
    } else {
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido! Consulte a documentação da API!',
      });
    }
  }
}
