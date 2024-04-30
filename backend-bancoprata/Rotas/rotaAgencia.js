// CADASTRAR, EDITAR E EXCLUIR    OK
import { Router } from 'express';
import AgenciaCtrl from '../Controle/agenciaCtrl.js';

const rotaAgencia = new Router();
const agenciaCtrl = new AgenciaCtrl();

rotaAgencia.get('/', agenciaCtrl.listar).post('/', agenciaCtrl.cadastrar).put('/', agenciaCtrl.alterar).delete('/', agenciaCtrl.excluir);
// rotaAgencia.post('/associarProdutoAgencia', agenciaCtrl.associarProduto);
// rotaAgencia.get('/listarParaAlterar/:cod_ag', agenciaCtrl.listarParaAlterar);

export default rotaAgencia;
