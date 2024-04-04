import { Router } from 'express';
import ProdutoCtrl from '../Controle/produtoCtrl.js';

const rotaProduto = new Router();
const produtoCtrl = new ProdutoCtrl();

rotaProduto.get('/', produtoCtrl.consultar).post('/', produtoCtrl.cadastrar).put('/', produtoCtrl.alterar).delete('/', produtoCtrl.excluir);
// rotaAgencia.post('/associarProdutoAgencia', agenciaCtrl.associarProduto);
// rotaAgencia.get('/consultarParaAlterar/:cod_ag', agenciaCtrl.consultarParaAlterar);

export default rotaProduto;
