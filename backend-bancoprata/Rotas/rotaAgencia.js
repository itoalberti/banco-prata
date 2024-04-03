// ► ► ► ► ► ► ► ► ► ►  OK ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄ ◄
import { Router } from 'express';
import AgenciaCtrl from '../Controle/agenciaCtrl.js';

const agenciaCtrl = new AgenciaCtrl();
const rotaAgencia = new Router();

rotaAgencia.get('/', agenciaCtrl.consultar).post('/', agenciaCtrl.cadastrar).patch('/', agenciaCtrl.alterar).put('/', agenciaCtrl.alterar).delete('/', agenciaCtrl.excluir);

export default rotaAgencia;
