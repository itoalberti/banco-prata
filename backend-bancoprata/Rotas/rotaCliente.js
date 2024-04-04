import { Router } from 'express';
import ClienteCtrl from '../Controle/clienteCtrl.js';

const rotaCliente = new Router();
const clienteCtrl = new ClienteCtrl();

rotaCliente.get('/', clienteCtrl.consultar).post('/', clienteCtrl.cadastrar).put('/', clienteCtrl.alterar).delete('/', clienteCtrl.excluir);
// rotaCliente.post('/associarProdutoCliente', agenciaCtrl.associarProduto);

export default rotaCliente;
