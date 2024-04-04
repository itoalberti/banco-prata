import Produto from '../Modelo/Produto.js';

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
              msg: 'Produto cadastrado com sucesso!',
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

  // ------------------------EXCLUIR PRODUTO DO BANCO DE DADOS------------------------
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
  consultar(req, resp) {
    resp.type('application/json');

    if (req.method === 'GET') {
      const produto = new Produto();
      // método assíncrono consultar da camada de persistência
      produto
        .consultarBD()
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
  //     const cod_prod = dados.cod_prod;
  //     const cod_ag = dados.cod_ag;

  // ESSA PARTE DEVE ESTAR ERRADA
  //     if (cod_ag && cod_prod) {
  //       // const agencia = new Agencia(0, endereco, cidade);
  //       // CRIAR MODELO AGENCIAPRODUTO
  //       const agencia_produto = new Agencia_Produto(cod_ag, cod_prod);
  //       // console.log('Agência cadastrada (endereço) / cidade:', agencia.endereco, agencia.cidade);

  //       agencia_produto
  //         .cadastrarBD()
  //         .then(() => {
  //           resp.status(200).json({
  //             status: true,
  //             cod_ag: agencia_produto.cod_ag, //nao retirar
  //             cod_prod: agencia_produto.cod_prod,
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

  // ------------------------ALTERAR O PRODUTO NO BANCO DE DADOS------------------------
  // alterar(req, resp) {
  //   resp.type('application/json');
  //   if (req.method === 'PUT' && req.is('application/json')) {
  //     const dados = req.body;
  //     const cod_prod = dados.cod_prod;
  //     const nome = dados.nome;

  //     if (cod_prod && nome) {
  //       // alterar as informações do produto
  //       const produto = new Produto(cod_prod, nome);
  //       // chamando o método assíncrono alterar da camada de persistência
  //       produto
  //         .alterarBD()
  //         .then(() => {
  //           resp.status(200).json({
  //             status: true,
  //             msg: `Nome do produto ${cod_prod} alterado com sucesso!`,
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
  //         msg: 'Informe o novo nome do produto.',
  //       });
  //     }
  //   } else {
  //     // 4xx = 'Client error'
  //     resp.status(400).json({
  //       status: false,
  //       msg: 'O método não é permitido ou produto no formato JSON não foi fornecido. Consulte a documentação da API!',
  //     });
  //   }
  // }
}
