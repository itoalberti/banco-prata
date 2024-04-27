import Agencia from '../Modelo/Agencia.js';
// import Associacao from '../Modelo/Associacao.js';

export default class AgenciaCtrl {
  // ------------------------GRAVAR A AGÊNCIA NO BANCO DE DADOS------------------------
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
              msg: 'Agência criada com sucesso!',
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
          msg: 'Informe todos os dados da agência: endereço, cidade e UF',
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

  // ------------------------ALTERAR A AGÊNCIA NO BANCO DE DADOS------------------------
  alterar(req, resp) {
    resp.type('application/json');
    if (req.method === 'PUT' && req.is('application/json')) {
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
          msg: 'Informe o novo endereço da agência.',
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

  // ------------------------EXCLUIR A AGÊNCIA DO BANCO DE DADOS------------------------
  excluir(req, resp) {
    resp.type('application/json');
    if (req.method === 'DELETE' && req.is('application/json')) {
      const dados = req.body;
      // const codigo = dados.codigo;
      if (dados.cod_ag) {
        const agencia = new Agencia();
        agencia.cod_ag = dados.cod_ag;
        agencia
          .excluirBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              msg: 'Agência excluída com sucesso!',
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

  // ------------------------LISTAR TODAS AS AGÊNCIAS------------------------
  listar(req, resp) {
    resp.type('application/json');

    if (req.method === 'GET') {
      const agencia = new Agencia();
      agencia
        .listarBD()
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

  // ------------------------ASSOCIAR PRODUTO A AGÊNCIA------------------------
  // associarProduto(req, resp) {
  //   resp.type('application/json');
  //   if (req.method === 'POST' && req.is('application/json')) {
  //     const dados = req.body;
  //     const cod_ag = dados.cod_ag;
  //     const cod_prod = dados.cod_prod;

  //     if (cod_ag && cod_prod) {
  //       // const agencia = new Agencia(0, endereco, cidade);
  //       // CRIAR MODELO AGENCIAPRODUTO
  //       const associacao = new Associacao(cod_ag, cod_prod);
  //       // console.log('Agência cadastrada (endereço) / cidade:', agencia.endereco, agencia.cidade);

  //       associacao
  //         .cadastrarBD()
  //         .then(() => {
  //           resp.status(200).json({
  //             status: true,
  //             cod_ag: associacao.cod_ag, //nao retirar
  //             cod_prod: associacao.cod_prod,
  //             msg: 'Agência criada com sucesso!',
  //           });
  //         })
  //         .catch((erro) => {
  //           resp.status(500).json({
  //             status: false,
  //             msg: erro.message,
  //           });
  //         });
  //     } else {
  //       resp.status(400).json({
  //         status: false,
  //         msg: 'Informe todos os dados da agência: endereço, cidade e UF',
  //       });
  //     }
  //   } else {
  //     // 4xx = 'Client error'
  //     resp.status(400).json({
  //       status: false,
  //       msg: 'O método não é permitido ou agência no formato JSON não foi fornecida. Consulte a documentação da API!',
  //     });
  //   }
  // }

  // ------------------------LISTAR PARA ALTERAR AGÊNCIA------------------------
  // listarParaAlterar(req, resp) {
  //   resp.type('application/json');

  //   if (req.method === 'GET') {
  //     const cod_ag = req.params.cod_ag;
  //     const agencia = new Agencia();
  //     // // método assíncrono listar da camada de persistência
  //     agencia
  //       .listarBD(cod_ag)
  //       .then((agencias) => {
  //         resp.status(200).json(agencias);
  //       })
  //       .catch((erro) => {
  //         resp.status(500).json({
  //           status: false,
  //           msg: erro.message,
  //         });
  //       });
  //     // console.log('backend funcionando para GET');
  //   } else {
  //     resp.status(400).json({
  //       status: false,
  //       msg: 'O método não é permitido! Consulte a documentação da API!',
  //     });
  //   }
  // }
}
