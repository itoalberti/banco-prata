import { Router } from 'express';
import AgenciaCtrl from './Controle/agenciaCtrl';

const rotaAgencia = new Router();
const agenciaCtrl = new AgenciaCtrl();

rotaAgencia.get('/', agenciaCtrl.consultar).post('/', agenciaCtrl.cadastrar).put('/', agenciaCtrl.alterar).delete('/', agenciaCtrl.excluir);

export default rotaAgencia;
