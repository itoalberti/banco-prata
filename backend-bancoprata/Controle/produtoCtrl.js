import Produto from '../Modelo/Produto.js';
// import Associacao from '../Modelo/Associacao.js';

export default class ProdutoCtrl {
  // ------------------------GRAVAR PRODUTO NO BANCO DE DADOS------------------------
  cadastrar(req, resp) {
    resp.type('application/json');
    if (req.method === 'POST' && req.is('application/json')) {
      const dados = req.body;
      const nome = dados.nome;

      if (nome) {
        const produto = new Produto(0, nome);
        produto
          .cadastrarBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              cod_prod: produto.cod_prod,
              msg: `Produto criado com sucesso!`,
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
          msg: 'Informe o nome do produto!',
        });
      }
    } else {
      // 4xx = 'Client error'
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido ou produto no formato JSON não foi fornecido. Consulte a documentação da API!',
      });
    }
  }

  // ------------------------EXCLUIR A AGÊNCIA DO BANCO DE DADOS------------------------
  excluir(req, resp) {
    resp.type('application/json');
    if (req.method === 'DELETE' && req.is('application/json')) {
      const dados = req.body;
      // const codigo = dados.codigo;
      if (dados.cod_prod) {
        const produto = new Produto();
        produto.cod_prod = dados.cod_prod;
        produto
          .excluirBD()
          .then(() => {
            resp.status(200).json({
              status: true,
              msg: 'Produto excluído com sucesso!',
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
          msg: 'Informe o código do produto a ser excluído.',
        });
      }
    } else {
      // 4xx = 'Client error'
      resp.status(400).json({
        status: false,
        msg: 'O método não é permitido ou produto no formato JSON não foi fornecido. Consulte a documentação da API!',
      });
    }
  }

  // ------------------------LISTAR TODOS OS PRODUTOS------------------------
  listar(req, resp) {
    resp.type('application/json');

    if (req.method === 'GET') {
      const produto = new Produto();
      produto
        .listarBD()
        .then((produtos) => {
          resp.status(200).json(produtos);
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
  //       // const produto = new Produto(0, endereco, cidade);
  //       // CRIAR MODELO AGENCIAPRODUTO
  //       const associacao = new Associacao(cod_ag, cod_prod);
  //       // console.log('Agência cadastrada (endereço) / cidade:', produto.endereco, produto.cidade);

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
  //     const produto = new Produto();
  //     // // método assíncrono listar da camada de persistência
  //     produto
  //       .listarBD(cod_ag)
  //       .then((produtos) => {
  //         resp.status(200).json(produtos);
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
