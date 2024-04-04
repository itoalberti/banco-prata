import { Router } from 'express';
import ProdutoCtrl from '../Controle/produtoCtrl.js';

const rotaProduto = new Router();
const produtoCtrl = new ProdutoCtrl();

rotaProduto.get('/', produtoCtrl.consultar).post('/', produtoCtrl.cadastrar).delete('/', produtoCtrl.excluir);
// rotaAgencia.post('/associarProdutoAgencia', agenciaCtrl.associarProduto);

export default rotaProduto;
